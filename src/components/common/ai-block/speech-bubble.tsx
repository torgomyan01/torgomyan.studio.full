'use client';

import { motion } from 'framer-motion';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';

export default function SpeechBubble() {
  const locale = useLocale();

  return (
    <motion.div
      className="speech-bubble"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <p>{getTranslation(locale, 'aiBlock.speechBubble')}</p>
    </motion.div>
  );
}
