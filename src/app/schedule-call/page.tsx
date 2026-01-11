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
import '@/components/common/contact-us/_contact-us.scss';
import './_schedule-call.scss';

export default function ScheduleCallPage() {
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
        text: 'Пожалуйста, выберите дату и время',
      });
      return;
    }

    if (!name.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, введите ваше имя',
      });
      return;
    }

    if (!email.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, введите ваш email',
      });
      return;
    }

    if (!phone.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, введите ваш телефон',
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
          text: 'Звонок успешно запланирован! Мы свяжемся с вами в указанное время.',
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
          text: result.error || 'Произошла ошибка при планировании звонка',
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Произошла ошибка при планировании звонка',
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
            <h1 className="page-title">Запланировать звонок</h1>
            <p className="page-subtitle">
              Выберите удобное для вас время, и мы свяжемся с вами
            </p>

            <div className="schedule-call-form">
              <div className="calendar-time-wrapper">
                <div className="calendar-section">
                  <h3 className="section-label">Выберите дату</h3>
                  <CustomCalendar
                    value={selectedDate}
                    onChange={setSelectedDate}
                    minValue={today(getLocalTimeZone())}
                  />
                </div>
                <div className="time-section">
                  <h3 className="section-label">Выберите время</h3>
                  <CustomTimeInput
                    label="Время"
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
                label="Имя"
                placeholder="Введите ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <CustomInput
                label="Email"
                placeholder="Введите ваш email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <CustomPhoneInput
                label="Телефон"
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
                      Отправка...
                    </span>
                  ) : (
                    <>
                      <span>Запланировать</span>
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
