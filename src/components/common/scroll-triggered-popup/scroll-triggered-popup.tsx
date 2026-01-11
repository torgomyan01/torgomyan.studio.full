'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import './_scroll-triggered-popup.scss';

const STORAGE_KEY = 'scroll-triggered-popup-shown';
const STORAGE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const SCROLL_THRESHOLD = 70; // Show popup at 70% scroll
const VISIT_TIME_KEY = 'site-visit-time';
const DISCOUNT_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const DISCOUNT_PERCENTAGE = 20; // 20% discount

export default function ScrollTriggeredPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [hasDiscount, setHasDiscount] = useState(false);

  // Initialize visit time tracking
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const visitTime = localStorage.getItem(VISIT_TIME_KEY);
    if (!visitTime) {
      // First visit - store current time
      localStorage.setItem(VISIT_TIME_KEY, Date.now().toString());
    }
  }, []);

  useEffect(() => {
    // Check if popup was shown recently
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

    const wasShownRecently = checkStorage();
    if (wasShownRecently) {
      setHasShown(true);
      return;
    }

    const calculateScrollPercentage = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollableHeight = documentHeight - windowHeight;
      const scrolled = scrollTop;

      if (scrollableHeight === 0) return 0;

      return (scrolled / scrollableHeight) * 100;
    };

    const handleScroll = () => {
      if (hasShown) return;

      const scrollPercentage = calculateScrollPercentage();

      if (scrollPercentage >= SCROLL_THRESHOLD) {
        setIsOpen(true);
        // Store timestamp in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem(STORAGE_KEY, Date.now().toString());

          // Check if discount is still available
          const visitTime = localStorage.getItem(VISIT_TIME_KEY);
          if (visitTime) {
            const timeSinceVisit = Date.now() - parseInt(visitTime, 10);
            if (timeSinceVisit < DISCOUNT_DURATION) {
              setHasDiscount(true);
              setTimeRemaining(DISCOUNT_DURATION - timeSinceVisit);
            }
          }
        }
        setHasShown(true);
      }
    };

    // Throttle scroll events for better performance
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

    // Add event listener
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });

    // Check initial scroll position (in case user refreshes at >70%)
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConsultationClick = () => {
    // Store discount eligibility if discount is active
    if (hasDiscount && timeRemaining !== null && timeRemaining > 0) {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'discount-eligible',
          JSON.stringify({
            percentage: DISCOUNT_PERCENTAGE,
            expiresAt: Date.now() + timeRemaining,
            claimed: false,
          })
        );
      }
    }

    window.location.href = '/schedule-call';
    setIsOpen(false);
  };

  const handleTelegramClick = () => {
    window.open('https://t.me/torgomyan01', '_blank');
    setIsOpen(false);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/37477769668', '_blank');
    setIsOpen(false);
  };

  // Prevent body scroll when popup is open
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

  // Timer countdown effect
  useEffect(() => {
    if (!isOpen || !hasDiscount || timeRemaining === null) return;

    if (timeRemaining <= 0) {
      setHasDiscount(false);
      setTimeRemaining(null);
      return;
    }

    const interval = setInterval(() => {
      const visitTime = localStorage.getItem(VISIT_TIME_KEY);
      if (visitTime) {
        const timeSinceVisit = Date.now() - parseInt(visitTime, 10);
        const remaining = DISCOUNT_DURATION - timeSinceVisit;

        if (remaining > 0) {
          setTimeRemaining(remaining);
        } else {
          setHasDiscount(false);
          setTimeRemaining(null);
          clearInterval(interval);
        }
      }
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, [isOpen, hasDiscount, timeRemaining]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Format time remaining
  const formatTimeRemaining = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="scroll-triggered-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={handleClose}
          />

          {/* Popup */}
          <div className="scroll-triggered-popup-wrapper">
            <motion.div
              className="scroll-triggered-popup-container"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="scroll-triggered-close-btn"
                onClick={handleClose}
                aria-label="Закрыть"
              >
                ✕
              </button>

              {/* Content */}
              <div className="scroll-triggered-popup-content">
                <div className="scroll-triggered-icon">
                  <svg
                    width="64"
                    height="64"
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

                {hasDiscount && timeRemaining !== null && (
                  <div className="scroll-triggered-discount-badge">
                    <div className="discount-percentage">
                      {DISCOUNT_PERCENTAGE}% СКИДКА
                    </div>
                    <div className="discount-timer">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>
                        Осталось: {formatTimeRemaining(timeRemaining)}
                      </span>
                    </div>
                  </div>
                )}

                <h2 className="scroll-triggered-title">
                  {hasDiscount
                    ? 'Специальное предложение!'
                    : 'Вы уже прочитали 70% — пора поговорить'}
                </h2>

                <p className="scroll-triggered-subtitle">
                  {hasDiscount
                    ? `Отправьте заявку в течение 10 минут и получите ${DISCOUNT_PERCENTAGE}% скидку`
                    : 'Получите бесплатную консультацию по созданию сайта'}
                </p>

                <p className="scroll-triggered-description">
                  {hasDiscount
                    ? 'Успейте воспользоваться специальным предложением! Мы поможем вам выбрать оптимальное решение для вашего бизнеса.'
                    : 'Мы поможем вам выбрать оптимальное решение для вашего бизнеса и ответим на все ваши вопросы'}
                </p>

                {/* Action Buttons */}
                <div className="scroll-triggered-actions">
                  <Link
                    href="/schedule-call"
                    className={`scroll-triggered-btn scroll-triggered-btn-primary ${
                      hasDiscount ? 'has-discount' : ''
                    }`}
                    onClick={() => {
                      handleConsultationClick();
                    }}
                  >
                    {hasDiscount
                      ? `Получить ${DISCOUNT_PERCENTAGE}% скидку`
                      : 'Получить консультацию'}
                  </Link>

                  <div className="scroll-triggered-social-buttons">
                    <button
                      type="button"
                      className="scroll-triggered-social-btn telegram"
                      onClick={handleTelegramClick}
                      aria-label="Telegram"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.09-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"
                          fill="currentColor"
                        />
                      </svg>
                      <span>Telegram</span>
                    </button>

                    <button
                      type="button"
                      className="scroll-triggered-social-btn whatsapp"
                      onClick={handleWhatsAppClick}
                      aria-label="WhatsApp"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                          fill="currentColor"
                        />
                      </svg>
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
