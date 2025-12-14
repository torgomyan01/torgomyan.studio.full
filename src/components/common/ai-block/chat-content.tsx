'use client';

import { AnimatePresence, motion } from 'framer-motion';
import ChatMessage from './chat-message';
import TypingIndicator from './typing-indicator';
import ServiceOptions from './service-options';
import TimelineOptions from './timeline-options';
import BudgetOptions from './budget-options';
import ChatInput from './chat-input';
import ChatHeader from './chat-header';
import { Message, ChatData, ChatStep } from './types';

interface ChatContentProps {
  messages: Message[];
  currentStep: ChatStep;
  chatData: ChatData;
  inputValue: string;
  setInputValue: (value: string) => void;
  isTyping: boolean;
  showChat: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
  handleServiceSelection: (service: string) => void;
  handleDetailsInput: () => void;
  handleTimelineSelection: (timeline: string) => void;
  handleBudgetSelection: (budget: string) => void;
  getServiceQuestions: (service: string) => string[];
  budgetOptions: string[];
  timelineOptions: string[];
  className?: string;
  onClose: () => void;
}

export default function ChatContent({
  messages,
  currentStep,
  chatData,
  inputValue,
  setInputValue,
  isTyping,
  showChat,
  messagesEndRef,
  messagesContainerRef,
  handleServiceSelection,
  handleDetailsInput,
  handleTimelineSelection,
  handleBudgetSelection,
  getServiceQuestions,
  budgetOptions,
  timelineOptions,
  className = '',
  onClose,
}: ChatContentProps) {
  const service = chatData.selectedService || '';
  const questions = getServiceQuestions(service);
  const allQuestionsAnswered =
    chatData.questionStep !== undefined &&
    chatData.questionStep >= questions.length;

  return (
    <motion.div
      className={`chat-container ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <ChatHeader onClose={onClose} />

      <div className="chat-messages" ref={messagesContainerRef}>
        <AnimatePresence>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              id={message.id}
              text={message.text}
              sender={message.sender}
            />
          ))}
        </AnimatePresence>

        {isTyping && <TypingIndicator />}

        {currentStep === 'service' && messages.length === 1 && (
          <ServiceOptions onSelect={handleServiceSelection} />
        )}

        {currentStep === 'details' &&
          allQuestionsAnswered &&
          !chatData.timeline && (
            <TimelineOptions
              options={timelineOptions}
              onSelect={handleTimelineSelection}
            />
          )}

        {currentStep === 'details' &&
          allQuestionsAnswered &&
          chatData.timeline &&
          !chatData.budget && (
            <BudgetOptions
              options={budgetOptions}
              onSelect={handleBudgetSelection}
            />
          )}

        <div ref={messagesEndRef} />
      </div>

      {(currentStep === 'details' || currentStep === 'contact') && (
        <ChatInput
          value={inputValue}
          onChange={setInputValue}
          onSend={handleDetailsInput}
          autoFocus={showChat}
        />
      )}
    </motion.div>
  );
}
