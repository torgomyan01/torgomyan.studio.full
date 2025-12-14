'use client';

import { motion } from 'framer-motion';

interface ChatMessageProps {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

export default function ChatMessage({ id, text, sender }: ChatMessageProps) {
  return (
    <motion.div
      key={id}
      className={`message ${sender}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div className="message-content">{text}</div>
    </motion.div>
  );
}
