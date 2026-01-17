'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useLocale } from '@/i18n/use-locale';
import { addLocaleToPath } from '@/i18n/utils';
import { localStorageKeys } from '@/utils/consts';
import './_cookie-consent.scss';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    // Check if user has already given consent
    if (typeof window === 'undefined') return;

    const consent = localStorage.getItem(localStorageKeys.cookieComplete);
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(localStorageKeys.cookieComplete, 'accepted');
      setIsVisible(false);
    }
  };

  const handleDecline = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(localStorageKeys.cookieComplete, 'declined');
      setIsVisible(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="cookie-consent-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
        >
          <div className="cookie-consent-content">
            <div className="cookie-consent-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  fill="currentColor"
                />
              </svg>
            </div>

            <div className="cookie-consent-text">
              <p className="cookie-consent-message">
                Мы используем cookies для улучшения работы сайта и
                персонализации контента. Продолжая использовать сайт, вы
                соглашаетесь с нашей{' '}
                <Link
                  href={addLocaleToPath('/privacy-policy', locale)}
                  className="cookie-consent-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  политикой конфиденциальности
                </Link>
                .
              </p>
            </div>

            <div className="cookie-consent-actions">
              <button
                type="button"
                className="cookie-consent-btn cookie-consent-btn-accept"
                onClick={handleAccept}
              >
                Принять
              </button>
              <button
                type="button"
                className="cookie-consent-btn cookie-consent-btn-decline"
                onClick={handleDecline}
              >
                Отклонить
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
