'use client';

import { motion } from 'framer-motion';

interface BudgetOptionsProps {
  options: string[];
  onSelect: (budget: string) => void;
}

export default function BudgetOptions({
  options,
  onSelect,
}: BudgetOptionsProps) {
  return (
    <div className="budget-options">
      {options.map((budget) => (
        <motion.button
          key={budget}
          type="button"
          className="option-btn"
          onClick={(e) => {
            e.preventDefault();
            onSelect(budget);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {budget}
        </motion.button>
      ))}
    </div>
  );
}
