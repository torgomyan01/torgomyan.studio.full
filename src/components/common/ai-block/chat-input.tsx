'use client';

import { useRef, useEffect } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
}

export default function ChatInput({
  value,
  onChange,
  onSend,
  placeholder = 'Введите ваш ответ...',
  disabled = false,
  autoFocus = false,
}: ChatInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      onSend();
    }
  };

  return (
    <div className="chat-input-container">
      <input
        ref={inputRef}
        type="text"
        className="chat-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <button
        type="button"
        className="send-btn"
        onClick={(e) => {
          e.preventDefault();
          onSend();
        }}
        disabled={!value.trim() || disabled}
      >
        ➤
      </button>
    </div>
  );
}
