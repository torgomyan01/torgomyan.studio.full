'use client';

import { motion } from 'framer-motion';
import { services } from '@/utils/consts';

interface ServiceOptionsProps {
  onSelect: (service: string) => void;
}

export default function ServiceOptions({ onSelect }: ServiceOptionsProps) {
  return (
    <div className="service-options">
      {services.map((service) => (
        <motion.button
          key={service.title}
          type="button"
          className="service-btn"
          onClick={(e) => {
            e.preventDefault();
            onSelect(service.title);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {service.title}
        </motion.button>
      ))}
    </div>
  );
}
