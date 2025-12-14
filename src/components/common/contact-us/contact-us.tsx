'use client';

import { useState, useEffect } from 'react';
import CustomCalendar from './custom-calendar';
import {
  CustomModal,
  CustomModalBody,
  CustomModalFooter,
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
import './_contact-us.scss';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { SITE_URL } from '@/utils/consts';

function ContactUs() {
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOpen = () => {
    setIsOpen(true);
    setSubmitMessage(null);
  };

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
  }, [selectedDate]);

  const handleClose = () => {
    setIsOpen(false);
    setSelectedDate(null);
    setSelectedTime(null);
    setName('');
    setEmail('');
    setPhone('');
    setSubmitMessage(null);
  };

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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, введите корректный email',
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
      // Format time as HH:MM (5 characters to fit VarChar(8))
      const timeStr = `${String(selectedTime.hour).padStart(2, '0')}:${String(
        selectedTime.minute
      ).padStart(2, '0')}`;

      console.log('Submitting scheduled call:', {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        scheduledDate: dateStr,
        scheduledTime: timeStr,
      });

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

      console.log('Schedule call result:', result);

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: 'Звонок успешно запланирован!',
        });
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        console.error('Schedule call failed:', result.error);
        setSubmitMessage({
          type: 'error',
          text: result.error || 'Произошла ошибка',
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: 'Произошла ошибка при отправке',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-us" id="contact">
      <div className="container">
        <h2 className="main-title">Связаться с нами </h2>
        <p className="main-subtitle">
          Обсудим ваш проект? Я — разработчик сайтов
        </p>
        <div className="buttons">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleOpen();
            }}
          >
            Запланировать звонок
            <img src="/images/link-arrow.svg" alt="" />
          </a>
          <a href="tel:+37477769668">
            Звонить
            <img src="/images/link-arrow.svg" alt="" />
          </a>
        </div>

        <CustomModal
          isOpen={isOpen}
          onClose={handleClose}
          title="Запланировать звонок"
        >
          <CustomModalBody>
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
              <div className={`submit-message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}
          </CustomModalBody>
          <CustomModalFooter>
            <button
              type="button"
              className="custom-button cancel-button"
              onClick={handleClose}
            >
              Отмена
            </button>
            <button
              type="button"
              className="custom-button submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Запланировать'}
            </button>
          </CustomModalFooter>
        </CustomModal>

        <div className="contact-info">
          <div className="info">
            <p>
              <img src="/images/contact-icon1.svg" alt="" />
              Армения, Мартуни, Мясникян 62
            </p>
            <a href="tel:+37477769668" className="text">
              <img src="/images/contact-icon2.svg" alt="" />
              +374 77 76-96-68
            </a>
            <a
              href="https://wa.me/37477769668"
              target="_blank"
              rel="noopener noreferrer"
              className="text"
            >
              <img src="/images/contact-icon3.svg" alt="" />
              +374 77 76-96-68
            </a>
            <a
              href="https://t.me/torgomyan01"
              target="_blank"
              rel="noopener noreferrer"
              className="text"
            >
              <img src="/images/contact-icon4.svg" alt="" />
              @torgomyan01
            </a>
            <Link href={SITE_URL.CALCULATOR} className="btn cursor-pointer">
              <i className="fa-solid fa-calculator mr-2"></i>
              <span>Калькулятор</span>
            </Link>
          </div>
          <div id="map">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Af026db7051cfc7952a3361c3d3bf24998f1427bd3b64e28673a2f5ade3b074ab&amp;source=constructor"
              width="821"
              height="500"
              frameBorder="0"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
