'use client';

import { useState, useEffect } from 'react';
import {
  CustomModal,
  CustomModalBody,
  CustomModalFooter,
  CustomInput,
  CustomPhoneInput,
} from '@/components/ui';
import { saveCalculatorSubmissionAction } from '@/app/actions/calculator';
import { services } from '@/utils/consts';
import { useServiceQuestions } from '../ai-block/hooks/use-service-questions';
import './_calculator-modal.scss';

interface CalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CalculatorFormData {
  selectedService: string;
  websiteType: string;
  pagesCount: number;
  designStyle: string;
  features: string[];
  cmsRequired: boolean;
  ecommerce: boolean;
  paymentSystems: string;
  mobileApp: boolean;
  seoOptimization: boolean;
  contentManagement: boolean;
  serviceAnswers: Record<string, string>;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
}

export default function CalculatorModal({
  isOpen,
  onClose,
}: CalculatorModalProps) {
  const { getServiceQuestions } = useServiceQuestions();
  const [step, setStep] = useState<'calculator' | 'contact'>('calculator');
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [formData, setFormData] = useState<CalculatorFormData>({
    selectedService: '',
    websiteType: '',
    pagesCount: 5,
    designStyle: '',
    features: [],
    cmsRequired: false,
    ecommerce: false,
    paymentSystems: '',
    mobileApp: false,
    seoOptimization: false,
    contentManagement: false,
    serviceAnswers: {},
  });

  const [contactData, setContactData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (isOpen) {
      setStep('calculator');
      setEstimatedPrice(null);
      setSubmitMessage(null);
      setCurrentQuestionIndex(0);
      setFormData({
        selectedService: '',
        websiteType: '',
        pagesCount: 5,
        designStyle: '',
        features: [],
        cmsRequired: false,
        ecommerce: false,
        paymentSystems: '',
        mobileApp: false,
        seoOptimization: false,
        contentManagement: false,
        serviceAnswers: {},
      });
      setContactData({
        name: '',
        email: '',
        phone: '',
      });
    }
  }, [isOpen]);

  const selectedServiceQuestions = formData.selectedService
    ? getServiceQuestions(formData.selectedService)
    : [];

  const calculatePrice = () => {
    let basePrice = 0;
    const service = formData.selectedService;

    // Base price by service type (в рублях, согласно российскому рынку)
    if (service.includes('Лендинг')) {
      basePrice = 25000;
    } else if (service.includes('Корпоративный сайт')) {
      basePrice = 80000;
    } else if (service.includes('Сайт-визитка')) {
      basePrice = 30000;
    } else if (service.includes('Интернет-магазин')) {
      basePrice = 150000;
    } else if (service.includes('Веб-приложения')) {
      basePrice = 200000;
    } else if (service.includes('SEO') || service.includes('Продвижение')) {
      basePrice = 30000;
    } else if (service.includes('UI/UX') || service.includes('Дизайн')) {
      basePrice = 50000;
    } else if (service.includes('Техническая поддержка')) {
      basePrice = 15000;
    } else if (service.includes('Хостинг') || service.includes('домен')) {
      basePrice = 5000;
    } else if (service.includes('Интеграция платежных')) {
      basePrice = 40000;
    } else if (service.includes('Автоматизация')) {
      basePrice = 100000;
    } else if (service.includes('Разработка Сайтов')) {
      basePrice = 60000;
    } else {
      basePrice = 50000;
    }

    // Pages count multiplier (если применимо)
    if (formData.pagesCount > 0) {
      const pagesMultiplier = Math.max(1, formData.pagesCount / 5);
      basePrice = basePrice * pagesMultiplier;
    }

    // Design style multiplier (если применимо)
    if (formData.designStyle) {
      switch (formData.designStyle) {
        case 'simple':
          basePrice *= 1;
          break;
        case 'standard':
          basePrice *= 1.3;
          break;
        case 'premium':
          basePrice *= 1.7;
          break;
        case 'luxury':
          basePrice *= 2.2;
          break;
      }
    }

    // Features (в рублях)
    if (formData.cmsRequired) basePrice += 15000;
    if (formData.ecommerce) basePrice += 50000;
    if (formData.paymentSystems && formData.paymentSystems !== 'none') {
      if (formData.paymentSystems === 'single') {
        basePrice += 20000;
      } else if (formData.paymentSystems === 'multiple') {
        basePrice += 35000;
      }
    }
    if (formData.mobileApp) basePrice += 100000;
    if (formData.seoOptimization) basePrice += 20000;
    if (formData.contentManagement) basePrice += 12000;

    // Additional features
    basePrice += formData.features.length * 8000;

    return Math.round(basePrice);
  };

  const handleServiceSelect = (service: string) => {
    // Map service to websiteType for backward compatibility
    let websiteType = '';
    if (service.includes('Лендинг')) websiteType = 'landing';
    else if (service.includes('Корпоративный')) websiteType = 'corporate';
    else if (service.includes('Интернет-магазин')) websiteType = 'ecommerce';
    else if (service.includes('Сайт-визитка')) websiteType = 'portfolio';
    else if (service.includes('Веб-приложения')) websiteType = 'custom';
    else websiteType = 'custom';

    setFormData((prev) => ({
      ...prev,
      selectedService: service,
      websiteType: websiteType,
      serviceAnswers: {},
    }));
    setCurrentQuestionIndex(0);
    setSubmitMessage(null);
  };

  const handleQuestionAnswer = (question: string, answer: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceAnswers: {
        ...prev.serviceAnswers,
        [question]: answer,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedServiceQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleCalculate = () => {
    if (!formData.selectedService) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, выберите услугу',
      });
      return;
    }

    const price = calculatePrice();
    setEstimatedPrice(price);
    setStep('contact');
    setSubmitMessage(null);
  };

  const handleSubmit = async () => {
    if (!contactData.name.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, введите ваше имя',
      });
      return;
    }

    if (!contactData.email.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, введите ваш email',
      });
      return;
    }

    if (!contactData.phone.trim()) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, введите ваш телефон',
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email.trim())) {
      setSubmitMessage({
        type: 'error',
        text: 'Пожалуйста, введите корректный email',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      // Combine service answers into features string
      const serviceAnswersText = Object.entries(formData.serviceAnswers)
        .map(([question, answer]) => `${question}: ${answer}`)
        .join('; ');

      const result = await saveCalculatorSubmissionAction({
        ...formData,
        websiteType: formData.selectedService || formData.websiteType,
        features: [
          ...formData.features,
          ...(serviceAnswersText ? [serviceAnswersText] : []),
        ],
        estimatedPrice: estimatedPrice || 0,
        name: contactData.name.trim(),
        email: contactData.email.trim(),
        phone: contactData.phone.trim(),
      });

      if (result.success) {
        setSubmitMessage({
          type: 'success',
          text: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
        });
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
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

  const handleClose = () => {
    setStep('calculator');
    setEstimatedPrice(null);
    setSubmitMessage(null);
    onClose();
  };

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={handleClose}
      title={
        step === 'calculator'
          ? 'Калькулятор стоимости сайта'
          : 'Контактные данные'
      }
      className="calculator-modal-wide"
    >
      <CustomModalBody>
        {step === 'calculator' ? (
          <div className="calculator-form">
            <div className="form-section">
              <h3 className="section-title">Выберите услугу</h3>
              <div className="radio-group">
                {services.map((service) => (
                  <label key={service.title} className="radio-option">
                    <input
                      type="radio"
                      name="selectedService"
                      value={service.title}
                      checked={formData.selectedService === service.title}
                      onChange={() => handleServiceSelect(service.title)}
                    />
                    <span>{service.title}</span>
                  </label>
                ))}
              </div>
            </div>

            {formData.selectedService &&
              selectedServiceQuestions.length > 0 && (
                <div className="form-section">
                  <h3 className="section-title">
                    Вопросы по услуге "{formData.selectedService}"
                  </h3>
                  <div className="questions-wrapper">
                    {selectedServiceQuestions.map((question, index) => (
                      <div
                        key={index}
                        className={`question-item ${
                          index === currentQuestionIndex ? 'active' : ''
                        } ${index < currentQuestionIndex ? 'answered' : ''}`}
                      >
                        <p className="question-text">{question}</p>
                        <CustomInput
                          placeholder="Введите ваш ответ..."
                          value={formData.serviceAnswers[question] || ''}
                          onChange={(e) =>
                            handleQuestionAnswer(question, e.target.value)
                          }
                        />
                      </div>
                    ))}
                    {selectedServiceQuestions.length > 1 && (
                      <div className="question-navigation">
                        <button
                          type="button"
                          className="nav-button"
                          onClick={handlePrevQuestion}
                          disabled={currentQuestionIndex === 0}
                        >
                          ← Назад
                        </button>
                        <span className="question-counter">
                          {currentQuestionIndex + 1} /{' '}
                          {selectedServiceQuestions.length}
                        </span>
                        <button
                          type="button"
                          className="nav-button"
                          onClick={handleNextQuestion}
                          disabled={
                            currentQuestionIndex ===
                            selectedServiceQuestions.length - 1
                          }
                        >
                          Далее →
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Показываем дополнительные параметры только для определенных услуг */}
            {(formData.selectedService.includes('Лендинг') ||
              formData.selectedService.includes('Корпоративный') ||
              formData.selectedService.includes('Сайт-визитка') ||
              formData.selectedService.includes('Интернет-магазин') ||
              formData.selectedService.includes('Веб-приложения') ||
              formData.selectedService.includes('Разработка Сайтов')) && (
              <>
                <div className="form-section">
                  <h3 className="section-title">Количество страниц</h3>
                  <div className="range-input">
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={formData.pagesCount}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pagesCount: parseInt(e.target.value),
                        }))
                      }
                    />
                    <span className="range-value">
                      {formData.pagesCount} страниц
                    </span>
                  </div>
                </div>

                <div className="form-section">
                  <h3 className="section-title">Стиль дизайна</h3>
                  <div className="radio-group">
                    {[
                      { value: 'simple', label: 'Простой' },
                      { value: 'standard', label: 'Стандартный' },
                      { value: 'premium', label: 'Премиум' },
                      { value: 'luxury', label: 'Люкс' },
                    ].map((option) => (
                      <label key={option.value} className="radio-option">
                        <input
                          type="radio"
                          name="designStyle"
                          value={option.value}
                          checked={formData.designStyle === option.value}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              designStyle: e.target.value,
                            }))
                          }
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="form-section">
              <h3 className="section-title">Дополнительные функции</h3>
              <div className="checkbox-group">
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={formData.cmsRequired}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cmsRequired: e.target.checked,
                      }))
                    }
                  />
                  <span>CMS система управления</span>
                </label>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={formData.ecommerce}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        ecommerce: e.target.checked,
                      }))
                    }
                  />
                  <span>Интернет-магазин</span>
                </label>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={formData.mobileApp}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        mobileApp: e.target.checked,
                      }))
                    }
                  />
                  <span>Мобильное приложение</span>
                </label>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={formData.seoOptimization}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        seoOptimization: e.target.checked,
                      }))
                    }
                  />
                  <span>SEO оптимизация</span>
                </label>
                <label className="checkbox-option">
                  <input
                    type="checkbox"
                    checked={formData.contentManagement}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contentManagement: e.target.checked,
                      }))
                    }
                  />
                  <span>Управление контентом</span>
                </label>
              </div>
            </div>

            {formData.ecommerce && (
              <div className="form-section">
                <h3 className="section-title">Платежные системы</h3>
                <div className="radio-group">
                  {[
                    { value: 'none', label: 'Не требуется' },
                    { value: 'single', label: 'Одна система' },
                    { value: 'multiple', label: 'Несколько систем' },
                  ].map((option) => (
                    <label key={option.value} className="radio-option">
                      <input
                        type="radio"
                        name="paymentSystems"
                        value={option.value}
                        checked={formData.paymentSystems === option.value}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            paymentSystems: e.target.value,
                          }))
                        }
                      />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="form-section">
              <h3 className="section-title">Дополнительные опции</h3>
              <div className="checkbox-group">
                {[
                  'Многоязычность',
                  'Интеграция с соцсетями',
                  'Онлайн-чат',
                  'Форма обратной связи',
                  'Галерея изображений',
                  'Видео интеграция',
                  'Блог',
                  'Новостная лента',
                ].map((feature) => (
                  <label key={feature} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.features.includes(feature)}
                      onChange={() => toggleFeature(feature)}
                    />
                    <span>{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            {submitMessage && (
              <div className={`submit-message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}
          </div>
        ) : (
          <div className="contact-form">
            {estimatedPrice !== null && (
              <div className="estimated-price">
                <h3>Примерная стоимость</h3>
                <div className="price-value">
                  {estimatedPrice.toLocaleString('ru-RU')} ₽
                </div>
                <p className="price-note">
                  Это примерная стоимость. Точную цену мы рассчитаем после
                  обсуждения деталей вашего проекта и изучения рынка.
                </p>
              </div>
            )}

            <CustomInput
              label="Имя"
              placeholder="Введите ваше имя"
              value={contactData.name}
              onChange={(e) =>
                setContactData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <CustomInput
              label="Email"
              placeholder="Введите ваш email"
              type="email"
              value={contactData.email}
              onChange={(e) =>
                setContactData((prev) => ({ ...prev, email: e.target.value }))
              }
              required
            />
            <CustomPhoneInput
              label="Телефон"
              value={contactData.phone}
              onChange={(value) =>
                setContactData((prev) => ({ ...prev, phone: value }))
              }
              required
            />

            {submitMessage && (
              <div className={`submit-message ${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}
          </div>
        )}
      </CustomModalBody>
      <CustomModalFooter>
        {step === 'calculator' ? (
          <>
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
              onClick={handleCalculate}
            >
              Рассчитать стоимость
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="custom-button cancel-button"
              onClick={() => setStep('calculator')}
            >
              Назад
            </button>
            <button
              type="button"
              className="custom-button submit-button"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          </>
        )}
      </CustomModalFooter>
    </CustomModal>
  );
}
