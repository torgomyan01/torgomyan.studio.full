'use client';

import { motion } from 'framer-motion';
import './_services.scss';
import { services } from '@/utils/consts';

interface IThisProps {
  but?: string;
}

function ServicesBlock({ but = '' }: IThisProps) {
  return (
    <div className="services-block">
      <div className="container">
        <h2 className="main-title">Услуги </h2>
        <p className="main-subtitle"> для компаний и предпринимателей</p>
        {services.map(
          (service) =>
            service.title !== but && (
              <motion.a
                whileHover={{ scale: 1.05, x: 10 }}
                initial="init"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                key={service.title}
                href={service.href}
                className="services-link"
              >
                {service.title}
                <img src="/images/link-arrow.svg" alt="" />
              </motion.a>
            )
        )}
      </div>
    </div>
  );
}

export default ServicesBlock;
