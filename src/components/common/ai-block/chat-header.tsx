'use client';

import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';

interface ChatHeaderProps {
  title?: string;
  onClose: () => void;
}

export default function ChatHeader({ title, onClose }: ChatHeaderProps) {
  const locale = useLocale();
  const chatTitle = title || getTranslation(locale, 'aiBlock.chatTitle');

  return (
    <div className="chat-header">
      <h3>{chatTitle}</h3>
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}
