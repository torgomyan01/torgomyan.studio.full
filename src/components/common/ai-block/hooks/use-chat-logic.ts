import { useState, useRef, useEffect } from 'react';
import { Message, ChatData, ChatStep } from '../types';
import { useServiceQuestions } from './use-service-questions';
import {
  useAISalesEngine,
  createConversationContext,
} from './use-ai-sales-engine';
import {
  saveAnswerToChatData,
  saveChatInquiry,
} from '../utils/chat-data-handler';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';

// These will be initialized in the hook based on locale
let INITIAL_MESSAGE: Message;
let BUDGET_OPTIONS: string[];
let TIMELINE_OPTIONS: string[];

function initializeMessages(locale: string) {
  const localeTyped = locale as 'hy' | 'ru' | 'en';

  INITIAL_MESSAGE = {
    id: '1',
    text: getTranslation(localeTyped, 'aiBlock.initialMessage'),
    sender: 'bot',
    timestamp: new Date(),
  };

  BUDGET_OPTIONS = [
    getTranslation(localeTyped, 'aiBlock.budgetOptions.5000_50000'),
    getTranslation(localeTyped, 'aiBlock.budgetOptions.50000_200000'),
    getTranslation(localeTyped, 'aiBlock.budgetOptions.200000_500000'),
    getTranslation(localeTyped, 'aiBlock.budgetOptions.500000_plus'),
    getTranslation(localeTyped, 'aiBlock.budgetOptions.notDecided'),
  ];

  TIMELINE_OPTIONS = [
    getTranslation(localeTyped, 'aiBlock.timelineOptions.1_2weeks'),
    getTranslation(localeTyped, 'aiBlock.timelineOptions.1month'),
    getTranslation(localeTyped, 'aiBlock.timelineOptions.2_3months'),
    getTranslation(localeTyped, 'aiBlock.timelineOptions.3plus_months'),
    getTranslation(localeTyped, 'aiBlock.timelineOptions.notDecided'),
  ];
}

export function useChatLogic() {
  const locale = useLocale();

  // Initialize messages based on locale
  initializeMessages(locale);

  const [messages, setMessages] = useState<Message[]>(() => [INITIAL_MESSAGE]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('service');
  const [questionStep, setQuestionStep] = useState<number>(0);
  const [chatData, setChatData] = useState<ChatData>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { getServiceQuestions } = useServiceQuestions();
  const {
    analyzeUserAnswer,
    generateAdaptiveResponse,
    generateUpsellProposal,
  } = useAISalesEngine();

  // Update initial message when locale changes (only if chat hasn't started)
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === '1') {
      initializeMessages(locale);
      setMessages([INITIAL_MESSAGE]);
    }
  }, [locale]);

  const scrollToBottom = () => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: 'bot' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateTyping = (callback: () => void) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      callback();
    }, 1000);
  };

  const handleServiceSelection = (service: string) => {
    setChatData({ ...chatData, selectedService: service, questionStep: 0 });
    setQuestionStep(0);
    addMessage(service, 'user');

    simulateTyping(() => {
      const questions = getServiceQuestions(service);
      if (questions.length > 0) {
        addMessage(questions[0], 'bot');
        setCurrentStep('details');
      }
    });
  };

  const handleDetailsInput = () => {
    if (!inputValue.trim()) return;

    addMessage(inputValue, 'user');
    const currentInput = inputValue;
    setInputValue('');

    if (currentStep === 'details') {
      const service = chatData.selectedService || '';
      const questions = getServiceQuestions(service);
      const currentQuestionStep = chatData.questionStep || 0;
      const allQuestionsAnswered = currentQuestionStep >= questions.length;

      if (allQuestionsAnswered) {
        // All service questions answered, handle timeline/budget input
        if (!chatData.timeline) {
          const updatedData = { ...chatData, timeline: currentInput };
          setChatData(updatedData);
          simulateTyping(() => {
            addMessage(getTranslation(locale, 'aiBlock.budgetQuestion'), 'bot');
          });
        } else if (!chatData.budget) {
          const updatedData = { ...chatData, budget: currentInput };
          setChatData(updatedData);
          simulateTyping(() => {
            addMessage(
              'Спасибо за всю информацию! Теперь нам нужны ваши контактные данные: Как вас зовут?',
              'bot'
            );
            setCurrentStep('contact');
          });
        }
      } else {
        // Still answering service-specific questions
        const updatedData = saveAnswerToChatData(
          service,
          currentQuestionStep,
          currentInput,
          chatData
        );

        const currentQuestion = questions[currentQuestionStep];

        // Создаем контекст разговора для более умного анализа
        const context = createConversationContext(messages);
        const analysis = analyzeUserAnswer(currentInput, context);

        // AI анализ ответа и генерация адаптивного ответа с учетом контекста
        const adaptiveResponse = generateAdaptiveResponse(
          currentQuestion,
          currentInput,
          service,
          updatedData,
          context
        );

        // Проверяем, был ли это ответ на убеждение (повторный ответ на тот же вопрос)
        const isConvincingResponse =
          chatData.questionStep === currentQuestionStep &&
          updatedData.questionStep === currentQuestionStep;

        const nextStep = currentQuestionStep + 1;

        simulateTyping(() => {
          // Если нужна убеждение или upsell, показываем адаптивный ответ
          if (
            adaptiveResponse &&
            (analysis.needsConvincing || analysis.needsUpsell) &&
            !isConvincingResponse
          ) {
            addMessage(adaptiveResponse, 'bot');
            // Не переходим к следующему вопросу, ждем ответа пользователя
            updatedData.questionStep = currentQuestionStep;
            setChatData(updatedData);
            setQuestionStep(currentQuestionStep);
          } else {
            // Переходим к следующему вопросу или завершаем
            updatedData.questionStep = nextStep;
            setChatData(updatedData);
            setQuestionStep(nextStep);

            if (nextStep < questions.length) {
              // Стандартный переход к следующему вопросу
              addMessage(questions[nextStep], 'bot');
            } else {
              // All service questions answered, ask timeline
              addMessage(
                getTranslation(locale, 'aiBlock.timelineQuestion'),
                'bot'
              );
            }
          }
        });
      }
    } else if (currentStep === 'contact') {
      if (!chatData.name) {
        setChatData({ ...chatData, name: currentInput });
        simulateTyping(() => {
          addMessage(getTranslation(locale, 'aiBlock.contactEmail'), 'bot');
        });
      } else if (!chatData.email) {
        setChatData({ ...chatData, email: currentInput });
        simulateTyping(() => {
          addMessage(getTranslation(locale, 'aiBlock.contactPhone'), 'bot');
        });
      } else if (!chatData.phone) {
        const finalData = { ...chatData, phone: currentInput };
        setChatData(finalData);
        simulateTyping(() => {
          addMessage(getTranslation(locale, 'aiBlock.thankYou'), 'bot');
          saveChatInquiry(finalData);
        });
      }
    }
  };

  const handleTimelineSelection = (timeline: string) => {
    const updatedData = { ...chatData, timeline };
    setChatData(updatedData);
    addMessage(timeline, 'user');

    simulateTyping(() => {
      if (!chatData.budget) {
        addMessage(getTranslation(locale, 'aiBlock.budgetQuestion'), 'bot');
      } else {
        addMessage(getTranslation(locale, 'aiBlock.contactName'), 'bot');
        setCurrentStep('contact');
      }
    });
  };

  const handleBudgetSelection = (budget: string) => {
    const updatedData = { ...chatData, budget };
    setChatData(updatedData);
    addMessage(budget, 'user');

    simulateTyping(() => {
      addMessage(getTranslation(locale, 'aiBlock.contactName'), 'bot');
      setCurrentStep('contact');
    });
  };

  return {
    messages,
    currentStep,
    questionStep,
    chatData,
    inputValue,
    setInputValue,
    isTyping,
    showChat,
    setShowChat,
    messagesEndRef,
    messagesContainerRef,
    handleServiceSelection,
    handleDetailsInput,
    handleTimelineSelection,
    handleBudgetSelection,
    getServiceQuestions,
    budgetOptions: BUDGET_OPTIONS,
    timelineOptions: TIMELINE_OPTIONS,
  };
}
