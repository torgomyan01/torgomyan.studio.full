'use client';

import { useState, useEffect } from 'react';
import {
  CustomModal,
  CustomModalBody,
  CustomModalFooter,
  CustomInput,
  CustomPhoneInput,
} from '@/components/ui';
import { saveChatInquiryAction } from '@/app/actions/chat-inquiry';
import './_promotion-block.scss';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';

const PROMOTION_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds
const STORAGE_KEY = 'promotion_timer_start';

export default function PromotionBlock() {
  const locale = useLocale();
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  useEffect(() => {
    // Check if timer already exists in localStorage
    const timerStart = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (timerStart) {
      const elapsed = now - parseInt(timerStart, 10);
      const remaining = PROMOTION_DURATION - elapsed;

      if (remaining > 0) {
        setIsActive(true);
        setTimeLeft(remaining);
      } else {
        // Timer expired, remove from localStorage
        localStorage.removeItem(STORAGE_KEY);
        setIsActive(false);
        setTimeLeft(null);
      }
    } else {
      // Start new timer
      localStorage.setItem(STORAGE_KEY, now.toString());
      setIsActive(true);
      setTimeLeft(PROMOTION_DURATION);
    }
  }, []);

  useEffect(() => {
    if (!isActive || timeLeft === null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null) return null;
        const newTime = prev - 1000;

        if (newTime <= 0) {
          localStorage.removeItem(STORAGE_KEY);
          setIsActive(false);
          return null;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSubmitMessage(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ name: '', email: '', phone: '' });
    setSubmitMessage(null);
  };

  const handleSubmit = async () => {
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setSubmitMessage({
        type: 'error',
        text: getTranslation(locale, 'promotion.fillAllFields'),
      });
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitMessage({
        type: 'error',
        text: getTranslation(locale, 'promotion.enterValidEmail'),
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Check if promotion timer is still active
      const timerStart = localStorage.getItem(STORAGE_KEY);
      let discountEligible = false;
      let discountPercentage: number | undefined = undefined;

      if (timerStart) {
        const now = Date.now();
        const elapsed = now - parseInt(timerStart, 10);
        const remaining = PROMOTION_DURATION - elapsed;

        if (remaining > 0) {
          discountEligible = true;
          discountPercentage = 25;
          // Remove timer after use
          localStorage.removeItem(STORAGE_KEY);
        }
      }

      const result = await saveChatInquiryAction({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        discountEligible,
        discountPercentage,
      });

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: discountEligible
            ? getTranslation(locale, 'promotion.thankYouDiscount')
            : getTranslation(locale, 'promotion.thankYouNoDiscount'),
        });
        setIsActive(false);
        setTimeLeft(null);
        setTimeout(() => {
          handleCloseModal();
        }, 3000);
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.error || getTranslation(locale, 'promotion.errorSaving'),
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: getTranslation(locale, 'promotion.errorSaving'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isActive || timeLeft === null) {
    return null;
  }

  const minutes = Math.floor(timeLeft / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);

  return (
    <>
      <div className="promotion-block">
        <div className="promotion-content">
          <div className="promotion-left">
            <div className="promotion-badge">
              {getTranslation(locale, 'promotion.badge')}
            </div>
            <h3 className="promotion-title">
              {getTranslation(locale, 'promotion.discount')}
            </h3>
            <p className="promotion-description">
              {getTranslation(locale, 'promotion.registerWithin')}{' '}
              <strong>
                {minutes}:{seconds.toString().padStart(2, '0')}
              </strong>{' '}
              {getTranslation(locale, 'promotion.andGet')}
            </p>
          </div>
          <div className="promotion-center">
            <div className="promotion-timer">
              <span className="timer-label">
                {getTranslation(locale, 'promotion.timeLeft')}
              </span>
              <span className="timer-value">
                {minutes}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
          <div className="promotion-right">
            <button
              type="button"
              onClick={handleOpenModal}
              className="promotion-button"
            >
              {getTranslation(locale, 'promotion.getDiscount')}
            </button>
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={getTranslation(locale, 'promotion.getDiscountTitle')}
      >
        <CustomModalBody>
          <div className="promotion-form">
            <CustomInput
              label={getTranslation(locale, 'common.name')}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder={getTranslation(locale, 'common.enterName')}
              required
            />
            <CustomInput
              label={getTranslation(locale, 'common.email')}
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder={getTranslation(locale, 'common.enterEmail')}
              required
            />
            <CustomPhoneInput
              label={getTranslation(locale, 'common.phone')}
              value={formData.phone}
              onChange={(value) => setFormData({ ...formData, phone: value })}
              placeholder={getTranslation(locale, 'common.enterPhone')}
              required
            />
            {submitMessage && (
              <div
                className={`submit-message ${
                  submitMessage.type === 'success' ? 'success' : 'error'
                }`}
              >
                {submitMessage.text}
              </div>
            )}
          </div>
        </CustomModalBody>
        <CustomModalFooter>
          <button
            type="button"
            onClick={handleCloseModal}
            className="modal-cancel-btn"
            disabled={isSubmitting}
          >
            {getTranslation(locale, 'common.cancel')}
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="modal-submit-btn"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? getTranslation(locale, 'common.submitting')
              : getTranslation(locale, 'common.submit')}
          </button>
        </CustomModalFooter>
      </CustomModal>
    </>
  );
}
