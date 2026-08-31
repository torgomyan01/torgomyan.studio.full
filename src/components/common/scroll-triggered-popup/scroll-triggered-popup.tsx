'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import './_scroll-triggered-popup.scss';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

const STORAGE_KEY = 'scroll-triggered-popup-shown';
const STORAGE_DURATION = 72 * 60 * 60 * 1000; // 72 hours
const SCROLL_THRESHOLD = 90;

export default function ScrollTriggeredPopup() {
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const checkStorage = () => {
      if (typeof window === 'undefined') return false;

      const lastShown = localStorage.getItem(STORAGE_KEY);
      if (lastShown) {
        const timeDiff = Date.now() - parseInt(lastShown, 10);
        if (timeDiff < STORAGE_DURATION) {
          return true;
        }
      }
      return false;
    };

    if (checkStorage()) {
      setHasShown(true);
      return;
    }

    const calculateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;

      if (scrollableHeight === 0) return 0;

      return (scrollTop / scrollableHeight) * 100;
    };

    const handleScroll = () => {
      if (hasShown) return;
      if (window.innerWidth < 768) return;

      if (calculateScrollPercentage() >= SCROLL_THRESHOLD) {
        setIsOpen(true);
        localStorage.setItem(STORAGE_KEY, Date.now().toString());
        setHasShown(true);
      }
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [hasShown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="scroll-triggered-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(false)}
          />

          <div className="scroll-triggered-popup-wrapper">
            <motion.div
              className="scroll-triggered-popup-container"
              initial={{ opacity: 0, scale: 0.95, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 24 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="scroll-triggered-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label={getTranslation(locale, 'common.close')}
              >
                ✕
              </button>

              <div className="scroll-triggered-popup-content">
                <div className="scroll-triggered-icon">
                  <i className="fas fa-comments" aria-hidden="true" />
                </div>

                <h2 className="scroll-triggered-title">
                  {getTranslation(locale, 'popups.title')}
                </h2>

                <p className="scroll-triggered-subtitle">
                  {getTranslation(locale, 'popups.subtitle')}
                </p>

                <p className="scroll-triggered-description">
                  {getTranslation(locale, 'popups.description')}
                </p>

                <div className="scroll-triggered-actions">
                  <Link
                    href={addLocaleToPath('/schedule-call', locale)}
                    className="scroll-triggered-btn scroll-triggered-btn-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {getTranslation(locale, 'common.primaryCta')}
                  </Link>

                  <div className="scroll-triggered-social-buttons">
                    <button
                      type="button"
                      className="scroll-triggered-social-btn telegram"
                      onClick={() => {
                        window.open('https://t.me/torgomyan01', '_blank');
                        setIsOpen(false);
                      }}
                      aria-label="Telegram"
                    >
                      <i className="fab fa-telegram-plane" aria-hidden="true" />
                      <span>Telegram</span>
                    </button>

                    <button
                      type="button"
                      className="scroll-triggered-social-btn whatsapp"
                      onClick={() => {
                        window.open('https://wa.me/37477769668', '_blank');
                        setIsOpen(false);
                      }}
                      aria-label="WhatsApp"
                    >
                      <i className="fab fa-whatsapp" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
