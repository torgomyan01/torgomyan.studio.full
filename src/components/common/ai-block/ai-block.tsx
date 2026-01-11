'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import './_ai-block.scss';
import { useChatLogic } from './hooks/use-chat-logic';
import SmileyButton from './smiley-button';
import SpeechBubble from './speech-bubble';
import ChatContent from './chat-content';

function AiBlock() {
  const blockRef = useRef<HTMLDivElement>(null);
  const scrollBlockRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    currentStep,
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
    budgetOptions,
    timelineOptions,
  } = useChatLogic();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showChat) {
      // Save current scroll position
      const scrollY = window.scrollY;
      // Set body overflow hidden
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [showChat]);

  // Check if all service-specific questions are answered
  const service = chatData.selectedService || '';
  const questions = getServiceQuestions(service);
  const allQuestionsAnswered =
    chatData.questionStep !== undefined &&
    chatData.questionStep >= questions.length;

  // Common ChatContent component props
  const chatContentProps = {
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
    onClose: () => setShowChat(false),
  };

  return (
    <>
      {/* Backdrop - always show when chat is open */}
      {showChat && (
        <motion.div
          className="chat-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowChat(false)}
        />
      )}

      {/* Main block - always stays in place */}
      <div ref={blockRef} className="ai-block hidden md:block">
        {!showChat && (
          <div className="chat-toggle-wrapper">
            <SpeechBubble />
            <SmileyButton
              onClick={() => setShowChat(true)}
              showChat={showChat}
              isScrolled={false}
            />
            <button
              className="hover-open-btn"
              onClick={() => setShowChat(true)}
            >
              Давайте обсудим
            </button>
          </div>
        )}
      </div>

      {/* ChatContent - always renders as modal when chat is open */}
      {showChat && (
        <ChatContent {...chatContentProps} className="floating-open" />
      )}
    </>
  );
}

export default AiBlock;
