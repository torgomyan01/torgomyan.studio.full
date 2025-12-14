'use client';

interface ChatHeaderProps {
  title?: string;
  onClose: () => void;
}

export default function ChatHeader({
  title = 'AI Помощник',
  onClose,
}: ChatHeaderProps) {
  return (
    <div className="chat-header">
      <h3>{title}</h3>
      <button className="close-btn" onClick={onClose}>
        ✕
      </button>
    </div>
  );
}
