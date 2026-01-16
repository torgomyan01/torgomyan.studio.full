'use client';

import { useRef, useEffect } from 'react';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';

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
  placeholder,
  disabled = false,
  autoFocus = false,
}: ChatInputProps) {
  const locale = useLocale();
  const defaultPlaceholder =
    placeholder || getTranslation(locale, 'aiBlock.inputPlaceholder');
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
        placeholder={defaultPlaceholder}
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
