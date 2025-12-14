'use client';

import { motion } from 'framer-motion';

interface TimelineOptionsProps {
  options: string[];
  onSelect: (timeline: string) => void;
}

export default function TimelineOptions({
  options,
  onSelect,
}: TimelineOptionsProps) {
  return (
    <div className="timeline-options">
      {options.map((timeline) => (
        <motion.button
          key={timeline}
          type="button"
          className="option-btn"
          onClick={(e) => {
            e.preventDefault();
            onSelect(timeline);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {timeline}
        </motion.button>
      ))}
    </div>
  );
}
