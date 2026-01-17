'use client';

import { useState, useEffect } from 'react';
import CustomCalendar from '@/components/common/contact-us/custom-calendar';
import {
  CustomInput,
  CustomTimeInput,
  CustomPhoneInput,
} from '@/components/ui';
import {
  CalendarDate,
  CalendarDateTime,
  getLocalTimeZone,
  today,
} from '@internationalized/date';
import { scheduleCallAction } from '@/app/actions/chat-inquiry';
import MainTemplate from '@/components/common/main-template/main-template';
import { useLocale } from '@/i18n/use-locale';
import { getTranslations } from '@/i18n';
import '@/components/common/contact-us/_contact-us.scss';
import './_schedule-call.scss';

export default function ScheduleCallPage() {
  const locale = useLocale();
  const t = getTranslations(locale);

  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);
  const [selectedTime, setSelectedTime] = useState<CalendarDateTime | null>(
    null
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  // Reset time when date changes
  useEffect(() => {
    if (selectedDate && !selectedTime) {
      setSelectedTime(
        new CalendarDateTime(
          selectedDate.year,
          selectedDate.month,
          selectedDate.day,
          9,
          0
        )
      );
    }
  }, [selectedDate, selectedTime]);

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime) {
      setSubmitMessage({
        type: 'error',
        text: t.scheduleCallPage.errors.selectDateAndTime,
      });
      return;
    }

    if (!name.trim()) {
      setSubmitMessage({
        type: 'error',
        text: t.scheduleCallPage.errors.enterName,
      });
      return;
    }

    if (!email.trim()) {
      setSubmitMessage({
        type: 'error',
        text: t.scheduleCallPage.errors.enterEmail,
      });
      return;
    }

    if (!phone.trim()) {
      setSubmitMessage({
        type: 'error',
        text: t.scheduleCallPage.errors.enterPhone,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Format date as YYYY-MM-DD
      const dateStr = `${selectedDate.year}-${String(
        selectedDate.month
      ).padStart(2, '0')}-${String(selectedDate.day).padStart(2, '0')}`;
      // Format time as HH:MM
      const timeStr = `${String(selectedTime.hour).padStart(2, '0')}:${String(
        selectedTime.minute
      ).padStart(2, '0')}`;

      // Check for discount eligibility from localStorage
      let discountPercentage: number | undefined;
      let discountEligible = false;

      if (typeof window !== 'undefined') {
        const discountData = localStorage.getItem('discount-eligible');
        if (discountData) {
          try {
            const discount = JSON.parse(discountData);
            const expiresAt = discount.expiresAt;
            const now = Date.now();

            // Check if discount is still valid (not expired)
            if (expiresAt && now < expiresAt && !discount.claimed) {
              discountPercentage = discount.percentage;
              discountEligible = true;
              // Mark as claimed
              localStorage.setItem(
                'discount-eligible',
                JSON.stringify({ ...discount, claimed: true })
              );
            }
          } catch (e) {
            console.error('Error parsing discount data:', e);
          }
        }
      }

      const result = await scheduleCallAction({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        scheduledDate: dateStr,
        scheduledTime: timeStr,
        discountPercentage,
        discountEligible,
      });

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: t.scheduleCallPage.success,
        });
        // Reset form after success
        setTimeout(() => {
          setSelectedDate(null);
          setSelectedTime(null);
          setName('');
          setEmail('');
          setPhone('');
          setSubmitMessage(null);
        }, 3000);
      } else {
        setSubmitMessage({
          type: 'error',
          text: result.error || t.scheduleCallPage.errors.general,
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: t.scheduleCallPage.errors.general,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainTemplate>
      <div className="schedule-call-page">
        <div className="container">
          <div className="schedule-call-content">
            <h1 className="page-title">{t.scheduleCallPage.title}</h1>
            <p className="page-subtitle">{t.scheduleCallPage.subtitle}</p>

            <div className="schedule-call-form">
              <div className="calendar-time-wrapper">
                <div className="calendar-section">
                  <h3 className="section-label">
                    {t.scheduleCallPage.selectDate}
                  </h3>
                  <CustomCalendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minValue={today(getLocalTimeZone())}
                  />
                </div>
                <div className="time-section">
                  <h3 className="section-label">
                    {t.scheduleCallPage.selectTime}
                  </h3>
                  <CustomTimeInput
                    label={t.scheduleCallPage.time}
                    value={selectedTime}
                    onChange={setSelectedTime}
                    hourCycle={24}
                    granularity="minute"
                    placeholderValue={
                      selectedDate
                        ? new CalendarDateTime(
                            selectedDate.year,
                            selectedDate.month,
                            selectedDate.day,
                            9,
                            0
                          )
                        : undefined
                    }
                    isDisabled={!selectedDate}
                  />
                </div>
              </div>
              <CustomInput
                label={t.scheduleCallPage.name}
                placeholder={t.scheduleCallPage.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <CustomInput
                label={t.scheduleCallPage.email}
                placeholder={t.scheduleCallPage.emailPlaceholder}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <CustomPhoneInput
                label={t.scheduleCallPage.phone}
                value={phone}
                onChange={setPhone}
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
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="submit-button w-auto! max-w-[unset]! rounded-4xl! overflow-hidden"
                >
                  {isSubmitting ? (
                    <span className="button-loading">
                      <span className="spinner"></span>
                      {t.scheduleCallPage.submitting}
                    </span>
                  ) : (
                    <>
                      <span>{t.scheduleCallPage.schedule}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainTemplate>
  );
}
