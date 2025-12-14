'use client';

import { motion } from 'framer-motion';

export default function SpeechBubble() {
  return (
    <motion.div
      className="speech-bubble"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <p>Давайте обсудим вместе, какой сайт вам нужен.</p>
    </motion.div>
  );
}
