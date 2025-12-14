'use client';

import { useState, useEffect } from 'react';
import { CustomInput, CustomPhoneInput } from '@/components/ui';
import { saveCalculatorSubmissionAction } from '@/app/actions/calculator';
import { services } from '@/utils/consts';
import { useServiceQuestions } from '../ai-block/hooks/use-service-questions';
import './_calculator.scss';

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

export default function Calculator() {
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
  }, []);

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
          // Reset form after success
          setStep('calculator');
          setEstimatedPrice(null);
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
        }, 3000);
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

  const toggleFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }));
  };

  return (
    <div className="calculator-page">
      <div className="container">
        {/* Hero Section */}
        <section className="calculator-hero">
          <h1 className="main-title">Калькулятор стоимости сайта</h1>
          <p className="main-subtitle">
            Рассчитайте примерную стоимость вашего проекта за несколько минут.
            Получите персональное предложение после заполнения формы.
          </p>
        </section>

        {/* Calculator Form */}
        <section className="calculator-section">
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

              <div className="form-actions">
                <button
                  type="button"
                  className="calculate-button"
                  onClick={handleCalculate}
                >
                  Рассчитать стоимость
                </button>
              </div>
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

              <div className="form-section">
                <h3 className="section-title">Контактные данные</h3>
                <CustomInput
                  label="Имя"
                  placeholder="Введите ваше имя"
                  value={contactData.name}
                  onChange={(e) =>
                    setContactData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
                <CustomInput
                  label="Email"
                  placeholder="Введите ваш email"
                  type="email"
                  value={contactData.email}
                  onChange={(e) =>
                    setContactData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
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

                <div className="form-actions">
                  <button
                    type="button"
                    className="back-button"
                    onClick={() => setStep('calculator')}
                  >
                    Назад
                  </button>
                  <button
                    type="button"
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Benefits Section */}
        <section className="calculator-benefits">
          <div className="container">
            <h2 className="section-title">Почему выбирают нас?</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>Прозрачные цены</h3>
                <p>
                  Никаких скрытых платежей. Вы видите стоимость до начала работы
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>Быстрые сроки</h3>
                <p>Соблюдаем оговоренные сроки без компромиссов в качестве</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>Индивидуальный подход</h3>
                <p>Каждый проект уникален. Мы учитываем все ваши требования</p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🛡️</div>
                <h3>Гарантия качества</h3>
                <p>
                  Предоставляем гарантию на все работы и техническую поддержку
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="calculator-trust">
          <div className="container">
            <div className="trust-stats">
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Реализованных проектов</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">7+</div>
                <div className="stat-label">Лет опыта</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">Довольных клиентов</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Техническая поддержка</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="calculator-faq">
          <div className="container">
            <h2 className="section-title">Часто задаваемые вопросы</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3 className="faq-question">
                  Как работает калькулятор стоимости сайта?
                </h3>
                <p className="faq-answer">
                  Калькулятор учитывает тип сайта, количество страниц, стиль
                  дизайна и дополнительные функции. После заполнения формы вы
                  получите примерную стоимость и персональное предложение.
                </p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">
                  Точна ли цена, рассчитанная калькулятором?
                </h3>
                <p className="faq-answer">
                  Калькулятор показывает примерную стоимость. Точную цену мы
                  рассчитаем после изучения всех деталей вашего проекта и
                  анализа рынка.
                </p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">
                  Сколько времени занимает разработка сайта?
                </h3>
                <p className="faq-answer">
                  Сроки зависят от сложности проекта. Простой лендинг - 1-2
                  недели, корпоративный сайт - 2-4 недели, интернет-магазин -
                  1-3 месяца.
                </p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">
                  Что входит в стоимость разработки?
                </h3>
                <p className="faq-answer">
                  В стоимость входит дизайн, верстка, программирование,
                  настройка, тестирование и базовая техническая поддержка. Все
                  детали обсуждаются индивидуально.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="calculator-cta">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">Готовы начать свой проект?</h2>
              <p className="cta-text">
                Оставьте заявку и получите персональное предложение с точной
                стоимостью в течение 24 часов
              </p>
              <div className="cta-buttons">
                <a href="#contact" className="cta-button-primary">
                  Получить предложение
                </a>
                <a href="tel:+37477769668" className="cta-button-secondary">
                  Позвонить нам
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
