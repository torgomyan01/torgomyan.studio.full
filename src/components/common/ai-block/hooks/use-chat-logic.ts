import { useState, useRef, useEffect } from 'react';
import { Message, ChatData, ChatStep } from '../types';
import { useServiceQuestions } from './use-service-questions';
import {
  saveAnswerToChatData,
  saveChatInquiry,
} from '../utils/chat-data-handler';

const INITIAL_MESSAGE: Message = {
  id: '1',
  text: 'Здравствуйте! Я помогу вам выбрать наиболее подходящий сайт для вашего бизнеса. Начнем с вопросов: Какой тип сайта вы хотите создать?',
  sender: 'bot',
  timestamp: new Date(),
};

const BUDGET_OPTIONS = [
  '5,000 - 50,000 ₽',
  '50,000 - 200,000 ₽',
  '200,000 - 500,000 ₽',
  '500,000+ ₽',
  'Еще не определился',
];

const TIMELINE_OPTIONS = [
  '1-2 недели',
  '1 месяц',
  '2-3 месяца',
  '3+ месяца',
  'Еще не определился',
];

export function useChatLogic() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [currentStep, setCurrentStep] = useState<ChatStep>('service');
  const [questionStep, setQuestionStep] = useState<number>(0);
  const [chatData, setChatData] = useState<ChatData>({});
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const { getServiceQuestions } = useServiceQuestions();

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
            addMessage(
              'Отлично! Теперь давайте обсудим бюджет. Какой бюджет вы планируете для вашего проекта?',
              'bot'
            );
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

        const nextStep = currentQuestionStep + 1;
        updatedData.questionStep = nextStep;
        setChatData(updatedData);
        setQuestionStep(nextStep);

        simulateTyping(() => {
          if (nextStep < questions.length) {
            addMessage(questions[nextStep], 'bot');
          } else {
            // All service questions answered, ask timeline
            addMessage(
              'Хорошо! В какие сроки вы хотите завершить проект?',
              'bot'
            );
          }
        });
      }
    } else if (currentStep === 'contact') {
      if (!chatData.name) {
        setChatData({ ...chatData, name: currentInput });
        simulateTyping(() => {
          addMessage('Отлично! Какой у вас адрес электронной почты?', 'bot');
        });
      } else if (!chatData.email) {
        setChatData({ ...chatData, email: currentInput });
        simulateTyping(() => {
          addMessage('Хорошо! Какой у вас номер телефона?', 'bot');
        });
      } else if (!chatData.phone) {
        const finalData = { ...chatData, phone: currentInput };
        setChatData(finalData);
        simulateTyping(() => {
          addMessage(
            'Спасибо за всю информацию! Мы скоро свяжемся с вами. Ваши данные сохранены.',
            'bot'
          );
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
        addMessage(
          'Отлично! Теперь давайте обсудим бюджет. Какой бюджет вы планируете для вашего проекта?',
          'bot'
        );
      } else {
        addMessage(
          'Спасибо за всю информацию! Теперь нам нужны ваши контактные данные: Как вас зовут?',
          'bot'
        );
        setCurrentStep('contact');
      }
    });
  };

  const handleBudgetSelection = (budget: string) => {
    const updatedData = { ...chatData, budget };
    setChatData(updatedData);
    addMessage(budget, 'user');

    simulateTyping(() => {
      addMessage(
        'Спасибо за всю информацию! Теперь нам нужны ваши контактные данные: Как вас зовут?',
        'bot'
      );
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
