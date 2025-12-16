'use client';

import { motion } from 'framer-motion';
import { RefObject, useRef } from 'react';
import './_ai-block.scss';
import { useChatLogic } from './hooks/use-chat-logic';
import { useScrollDetection } from './hooks/use-scroll-detection';
import SmileyButton from './smiley-button';
import SpeechBubble from './speech-bubble';
import ChatContent from './chat-content';

function AiBlock() {
  const blockRef = useRef<HTMLDivElement>(null);
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

  const isScrolled = useScrollDetection(
    200,
    blockRef as RefObject<HTMLElement>
  );
  const showBackdrop = isScrolled && showChat;

  // Check if all service-specific questions are answered
  const service = chatData.selectedService || '';
  const questions = getServiceQuestions(service);
  const allQuestionsAnswered =
    chatData.questionStep !== undefined &&
    chatData.questionStep >= questions.length;

  return (
    <>
      {isScrolled && <div className="block sm:hidden h-[500px]" />}
      {showBackdrop && (
        <motion.div
          className="chat-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowChat(false)}
        />
      )}
      {showChat && isScrolled ? (
        <ChatContent
          messages={messages}
          currentStep={currentStep}
          chatData={chatData}
          inputValue={inputValue}
          setInputValue={setInputValue}
          isTyping={isTyping}
          showChat={showChat}
          messagesEndRef={messagesEndRef}
          messagesContainerRef={messagesContainerRef}
          handleServiceSelection={handleServiceSelection}
          handleDetailsInput={handleDetailsInput}
          handleTimelineSelection={handleTimelineSelection}
          handleBudgetSelection={handleBudgetSelection}
          getServiceQuestions={getServiceQuestions}
          budgetOptions={budgetOptions}
          timelineOptions={timelineOptions}
          className="floating-open"
          onClose={() => setShowChat(false)}
        />
      ) : (
        <div
          ref={blockRef}
          className={`ai-block ${isScrolled ? 'floating-mode' : ''}`}
        >
          {!showChat ? (
            <div className="chat-toggle-wrapper">
              {!isScrolled && <SpeechBubble />}
              <SmileyButton
                onClick={() => setShowChat(true)}
                showChat={showChat}
              />
              {!isScrolled && (
                <button
                  className="hover-open-btn"
                  onClick={() => setShowChat(true)}
                >
                  Давайте обсудим
                </button>
              )}
            </div>
          ) : (
            <ChatContent
              messages={messages}
              currentStep={currentStep}
              chatData={chatData}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isTyping={isTyping}
              showChat={showChat}
              messagesEndRef={messagesEndRef}
              messagesContainerRef={messagesContainerRef}
              handleServiceSelection={handleServiceSelection}
              handleDetailsInput={handleDetailsInput}
              handleTimelineSelection={handleTimelineSelection}
              handleBudgetSelection={handleBudgetSelection}
              getServiceQuestions={getServiceQuestions}
              budgetOptions={budgetOptions}
              timelineOptions={timelineOptions}
              onClose={() => setShowChat(false)}
            />
          )}
        </div>
      )}
    </>
  );
}

export default AiBlock;
