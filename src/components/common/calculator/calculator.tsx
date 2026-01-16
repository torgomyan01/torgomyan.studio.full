'use client';

import { useState, useEffect } from 'react';
import { CustomInput, CustomPhoneInput } from '@/components/ui';
import { saveCalculatorSubmissionAction } from '@/app/actions/calculator';
import { services } from '@/utils/consts';
import { useServiceQuestions } from '../ai-block/hooks/use-service-questions';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
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
  const locale = useLocale();
  const { getServiceQuestions } = useServiceQuestions();
  const [step, setStep] = useState<'calculator' | 'contact'>('calculator');

  // Map service titles to translation keys
  const serviceTranslationMap: Record<string, string> = {
    'Разработка Сайтов': 'services.websiteDevelopment',
    Лендинг: 'services.landingPage',
    'Сайт-визитка': 'services.businessCardWebsite',
    'Корпоративный сайт': 'services.corporateWebsite',
    'Интернет-магазин': 'services.onlineShop',
    'Веб-приложения': 'services.webApplications',
    'Продвижение сайтов (SEO)': 'services.seo',
    'Дизайн интерфейсов (UI/UX)': 'services.uiUxDesign',
    'Техническая поддержка': 'services.technicalSupport',
    'Хостинг и домены': 'services.hostingDomains',
    'Интеграция платежных систем': 'services.paymentIntegration',
    'Автоматизация бизнес-процессов': 'services.businessAutomation',
  };

  const getServiceTitle = (originalTitle: string): string => {
    const translationKey = serviceTranslationMap[originalTitle];
    if (translationKey) {
      return getTranslation(locale, translationKey);
    }
    return originalTitle;
  };
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<{
    min: number;
    max: number;
  } | null>(null);
  const [showPrice, setShowPrice] = useState(false);
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
    setShowPrice(false);
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
    let complexityMultiplier = 1;
    let isOngoingService = false; // Для услуг с ежемесячной оплатой

    // Определение базовой цены и типа услуги
    const serviceConfig = {
      isWebsite: false,
      isEcommerce: false,
      isApp: false,
      isDesign: false,
      isOngoing: false,
    };

    // Base price by service type (в рублях, оптимизировано согласно рыночным ценам 2024)
    if (service.includes('Лендинг')) {
      basePrice = 45000;
      serviceConfig.isWebsite = true;
      complexityMultiplier = 0.8; // Проще чем корпоративный сайт
    } else if (service.includes('Корпоративный сайт')) {
      basePrice = 130000;
      serviceConfig.isWebsite = true;
      complexityMultiplier = 1.2;
    } else if (service.includes('Сайт-визитка')) {
      basePrice = 55000;
      serviceConfig.isWebsite = true;
      complexityMultiplier = 0.7;
    } else if (service.includes('Интернет-магазин')) {
      basePrice = 220000;
      serviceConfig.isWebsite = true;
      serviceConfig.isEcommerce = true;
      complexityMultiplier = 1.5;
    } else if (service.includes('Веб-приложения')) {
      basePrice = 350000;
      serviceConfig.isApp = true;
      complexityMultiplier = 2.0;
    } else if (service.includes('SEO') || service.includes('Продвижение')) {
      basePrice = 45000; // Месячная стоимость
      serviceConfig.isOngoing = true;
      isOngoingService = true;
    } else if (service.includes('UI/UX') || service.includes('Дизайн')) {
      basePrice = 90000;
      serviceConfig.isDesign = true;
      complexityMultiplier = 1.1;
    } else if (service.includes('Техническая поддержка')) {
      basePrice = 18000; // Месячная стоимость
      serviceConfig.isOngoing = true;
      isOngoingService = true;
    } else if (service.includes('Хостинг') || service.includes('домен')) {
      basePrice = 1200; // Месячная стоимость
      serviceConfig.isOngoing = true;
      isOngoingService = true;
    } else if (service.includes('Интеграция платежных')) {
      basePrice = 50000;
      complexityMultiplier = 1.3;
    } else if (service.includes('Автоматизация')) {
      basePrice = 180000;
      complexityMultiplier = 1.8;
    } else if (service.includes('Разработка Сайтов')) {
      basePrice = 90000;
      serviceConfig.isWebsite = true;
      complexityMultiplier = 1.0;
    } else {
      basePrice = 70000;
      complexityMultiplier = 1.0;
    }

    // Улучшенный расчет количества страниц (нелинейное масштабирование)
    if (serviceConfig.isWebsite && formData.pagesCount > 0) {
      const pages = formData.pagesCount;
      let pagesCost = 0;

      // Первые 5 страниц включены в базовую цену
      if (pages <= 5) {
        pagesCost = 0;
      } else if (pages <= 10) {
        // Страницы 6-10: умеренная стоимость
        pagesCost = basePrice * 0.15 * (pages - 5);
      } else if (pages <= 20) {
        // Страницы 11-20: стандартная стоимость
        pagesCost = basePrice * 0.15 * 5 + basePrice * 0.12 * (pages - 10);
      } else {
        // Страницы 21+: сниженная стоимость за счет тиражирования
        pagesCost =
          basePrice * 0.15 * 5 +
          basePrice * 0.12 * 10 +
          basePrice * 0.08 * (pages - 20);
      }

      basePrice += pagesCost;
    }

    // Design style multiplier (более точные коэффициенты)
    if (formData.designStyle && serviceConfig.isWebsite) {
      switch (formData.designStyle) {
        case 'simple':
          basePrice *= 0.95; // Небольшая скидка за простоту
          break;
        case 'standard':
          basePrice *= 1.0; // Базовая цена
          break;
        case 'premium':
          basePrice *= 1.5; // Премиум дизайн
          break;
        case 'luxury':
          basePrice *= 2.0; // Люкс дизайн с уникальными элементами
          break;
      }
    }

    // Улучшенный расчет функций в зависимости от типа услуги
    if (serviceConfig.isWebsite || serviceConfig.isApp) {
      // CMS система управления
      if (formData.cmsRequired) {
        if (serviceConfig.isEcommerce) {
          basePrice += 25000; // Для интернет-магазина дороже
        } else {
          basePrice += 22000;
        }
      }

      // E-commerce функционал (только если не выбран интернет-магазин как основная услуга)
      if (formData.ecommerce && !serviceConfig.isEcommerce) {
        basePrice += 70000; // Полноценный e-commerce модуль
      }

      // Платежные системы
      if (formData.paymentSystems && formData.paymentSystems !== 'none') {
        if (formData.paymentSystems === 'single') {
          basePrice += 30000;
        } else if (formData.paymentSystems === 'multiple') {
          basePrice += 50000; // Интеграция нескольких систем сложнее
        }
      }

      // Мобильное приложение
      if (formData.mobileApp) {
        if (serviceConfig.isApp) {
          basePrice += 80000; // Если уже веб-приложение, мобильная версия дешевле
        } else {
          basePrice += 140000; // Полноценное мобильное приложение
        }
      }

      // SEO оптимизация
      if (formData.seoOptimization) {
        basePrice += 30000; // Базовая SEO настройка
      }

      // Управление контентом
      if (formData.contentManagement) {
        basePrice += 18000;
      }

      // Дополнительные функции с учетом сложности
      const featureCosts: Record<string, number> = {
        Многоязычность: 25000,
        'Интеграция с соцсетями': 15000,
        'Онлайн-чат': 12000,
        'Форма обратной связи': 5000,
        'Галерея изображений': 8000,
        'Видео интеграция': 15000,
        Блог: 20000,
        'Новостная лента': 18000,
      };

      formData.features.forEach((feature) => {
        basePrice += featureCosts[feature] || 10000;
      });
    }

    // Применение коэффициента сложности
    basePrice *= complexityMultiplier;

    // Учет ответов на вопросы по услуге (может влиять на сложность)
    const serviceAnswersCount = Object.keys(formData.serviceAnswers).length;
    if (serviceAnswersCount > 0) {
      // Если есть детальные ответы, это может увеличить сложность на 5-15%
      const answersComplexityMultiplier = 1 + serviceAnswersCount * 0.02;
      basePrice *= Math.min(answersComplexityMultiplier, 1.15);
    }

    // Для услуг с ежемесячной оплатой показываем месячную стоимость
    // (но можно добавить опцию выбора периода)
    if (isOngoingService) {
      // Для SEO и поддержки можно умножить на количество месяцев
      // Пока оставляем месячную стоимость
    }

    // Округление до ближайшей тысячи для более понятной цены
    return Math.round(basePrice / 1000) * 1000;
  };

  // Расчет диапазона цен (минимальная и максимальная оценка)
  const calculatePriceRange = (basePrice: number) => {
    // Диапазон ±15% от базовой цены
    const minPrice = Math.round((basePrice * 0.85) / 1000) * 1000;
    const maxPrice = Math.round((basePrice * 1.15) / 1000) * 1000;
    return { min: minPrice, max: maxPrice };
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
        text: getTranslation(locale, 'calculator.errors.selectService'),
      });
      return;
    }

    const price = calculatePrice();
    const range = calculatePriceRange(price);
    setEstimatedPrice(price);
    setPriceRange(range);
    setShowPrice(false); // Не показываем цену до отправки формы
    setStep('contact');
    setSubmitMessage(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!contactData.name.trim()) {
      setSubmitMessage({
        type: 'error',
        text: getTranslation(locale, 'calculator.errors.enterName'),
      });
      return;
    }

    if (!contactData.email.trim()) {
      setSubmitMessage({
        type: 'error',
        text: getTranslation(locale, 'calculator.errors.enterEmail'),
      });
      return;
    }

    if (!contactData.phone.trim()) {
      setSubmitMessage({
        type: 'error',
        text: getTranslation(locale, 'calculator.errors.enterPhone'),
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email.trim())) {
      setSubmitMessage({
        type: 'error',
        text: getTranslation(locale, 'calculator.errors.invalidEmail'),
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    // Рассчитываем цену, если она еще не была рассчитана
    let finalPrice = estimatedPrice;
    let finalPriceRange = priceRange;
    if (finalPrice === null) {
      finalPrice = calculatePrice();
      finalPriceRange = calculatePriceRange(finalPrice);
      setEstimatedPrice(finalPrice);
      setPriceRange(finalPriceRange);
    }

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
        estimatedPrice: finalPrice || 0,
        name: contactData.name.trim(),
        email: contactData.email.trim(),
        phone: contactData.phone.trim(),
      });

      if (result.success) {
        setShowPrice(true); // Показываем цену после успешной отправки
        setSubmitMessage({
          type: 'success',
          text: getTranslation(locale, 'calculator.success.thankYou'),
        });
        setTimeout(() => {
          // Reset form after success
          setStep('calculator');
          setEstimatedPrice(null);
          setShowPrice(false);
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
        }, 15000);
      } else {
        setSubmitMessage({
          type: 'error',
          text:
            result.error ||
            getTranslation(locale, 'calculator.errors.generalError'),
        });
      }
    } catch (error) {
      setSubmitMessage({
        type: 'error',
        text: getTranslation(locale, 'calculator.errors.submitError'),
      });
    } finally {
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <h1 className="main-title">
            {getTranslation(locale, 'calculator.hero.title')}
          </h1>
          <p className="main-subtitle">
            {getTranslation(locale, 'calculator.hero.subtitle')}
          </p>
        </section>

        {/* Calculator Form */}
        <section className="calculator-section">
          {step === 'calculator' ? (
            <div className="calculator-form">
              <div className="form-section">
                <h3 className="section-title">
                  {getTranslation(locale, 'calculator.form.selectService')}
                </h3>
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
                      <span>{getServiceTitle(service.title)}</span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.selectedService &&
                selectedServiceQuestions.length > 0 && (
                  <div className="form-section">
                    <h3 className="section-title">
                      {getTranslation(
                        locale,
                        'calculator.form.serviceQuestions',
                        {
                          service: getServiceTitle(formData.selectedService),
                        }
                      )}
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
                            placeholder={getTranslation(
                              locale,
                              'calculator.form.enterAnswer'
                            )}
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
                            {getTranslation(locale, 'calculator.form.prev')}
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
                            {getTranslation(locale, 'calculator.form.next')}
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
                    <h3 className="section-title">
                      {getTranslation(locale, 'calculator.form.pagesCount')}
                    </h3>
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
                        {getTranslation(locale, 'calculator.form.pages', {
                          count: formData.pagesCount.toString(),
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3 className="section-title">
                      {getTranslation(locale, 'calculator.form.designStyle')}
                    </h3>
                    <div className="radio-group">
                      {[
                        { value: 'simple', key: 'simple' },
                        { value: 'standard', key: 'standard' },
                        { value: 'premium', key: 'premium' },
                        { value: 'luxury', key: 'luxury' },
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
                          <span>
                            {getTranslation(
                              locale,
                              `calculator.designStyles.${option.key}`
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="form-section">
                <h3 className="section-title">
                  {getTranslation(locale, 'calculator.form.additionalFeatures')}
                </h3>
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
                    <span>
                      {getTranslation(locale, 'calculator.features.cms')}
                    </span>
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
                    <span>
                      {getTranslation(locale, 'calculator.features.ecommerce')}
                    </span>
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
                    <span>
                      {getTranslation(locale, 'calculator.features.mobileApp')}
                    </span>
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
                    <span>
                      {getTranslation(locale, 'calculator.features.seo')}
                    </span>
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
                    <span>
                      {getTranslation(
                        locale,
                        'calculator.features.contentManagement'
                      )}
                    </span>
                  </label>
                </div>
              </div>

              {formData.ecommerce && (
                <div className="form-section">
                  <h3 className="section-title">
                    {getTranslation(locale, 'calculator.form.paymentSystems')}
                  </h3>
                  <div className="radio-group">
                    {[
                      { value: 'none', key: 'none' },
                      { value: 'single', key: 'single' },
                      { value: 'multiple', key: 'multiple' },
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
                        <span>
                          {getTranslation(
                            locale,
                            `calculator.paymentSystems.${option.key}`
                          )}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="form-section">
                <h3 className="section-title">
                  {getTranslation(locale, 'calculator.form.additionalOptions')}
                </h3>
                <div className="checkbox-group">
                  {[
                    { key: 'multilingual', original: 'Многоязычность' },
                    {
                      key: 'socialIntegration',
                      original: 'Интеграция с соцсетями',
                    },
                    { key: 'onlineChat', original: 'Онлайн-чат' },
                    { key: 'contactForm', original: 'Форма обратной связи' },
                    { key: 'imageGallery', original: 'Галерея изображений' },
                    { key: 'videoIntegration', original: 'Видео интеграция' },
                    { key: 'newsFeed', original: 'Новостная лента' },
                  ].map((feature) => (
                    <label key={feature.original} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={formData.features.includes(feature.original)}
                        onChange={() => toggleFeature(feature.original)}
                      />
                      <span>
                        {getTranslation(
                          locale,
                          `calculator.features.${feature.key}`
                        )}
                      </span>
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
                  {getTranslation(locale, 'calculator.form.calculatePrice')}
                </button>
              </div>
            </div>
          ) : (
            <div className="contact-form">
              {!showPrice && estimatedPrice !== null && (
                <div className="price-info-message">
                  <div className="info-icon">💰</div>
                  <div className="info-text">
                    <h3>
                      {getTranslation(
                        locale,
                        'calculator.priceInfo.calculationComplete'
                      )}
                    </h3>
                    <p>
                      {getTranslation(
                        locale,
                        'calculator.priceInfo.calculationCompleteText'
                      )}
                    </p>
                  </div>
                </div>
              )}

              {showPrice && estimatedPrice !== null && (
                <div className="estimated-price">
                  <h3>
                    {getTranslation(
                      locale,
                      'calculator.priceInfo.estimatedPrice'
                    )}
                  </h3>
                  <div className="price-value">
                    {estimatedPrice.toLocaleString(
                      locale === 'ru'
                        ? 'ru-RU'
                        : locale === 'hy'
                          ? 'hy-AM'
                          : 'en-US'
                    )}{' '}
                    ₽
                  </div>
                  {priceRange && (
                    <div className="price-range">
                      <span className="range-label">
                        {getTranslation(locale, 'calculator.priceInfo.range')}
                      </span>
                      <span className="range-values">
                        {priceRange.min.toLocaleString(
                          locale === 'ru'
                            ? 'ru-RU'
                            : locale === 'hy'
                              ? 'hy-AM'
                              : 'en-US'
                        )}{' '}
                        -{' '}
                        {priceRange.max.toLocaleString(
                          locale === 'ru'
                            ? 'ru-RU'
                            : locale === 'hy'
                              ? 'hy-AM'
                              : 'en-US'
                        )}{' '}
                        ₽
                      </span>
                    </div>
                  )}
                  <p className="price-note">
                    {getTranslation(locale, 'calculator.priceInfo.note')}
                  </p>
                </div>
              )}

              <div className="form-section">
                <h3 className="section-title">
                  {getTranslation(locale, 'calculator.form.contactData')}
                </h3>
                <CustomInput
                  label={getTranslation(locale, 'common.name')}
                  placeholder={getTranslation(locale, 'common.enterName')}
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
                  label={getTranslation(locale, 'common.email')}
                  placeholder={getTranslation(locale, 'common.enterEmail')}
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
                  label={getTranslation(locale, 'common.phone')}
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
                    onClick={() => {
                      setStep('calculator');
                      setShowPrice(false);
                    }}
                  >
                    {getTranslation(locale, 'calculator.form.back')}
                  </button>
                  <button
                    type="button"
                    className="submit-button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? getTranslation(locale, 'calculator.form.submitting')
                      : getTranslation(locale, 'calculator.form.submit')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Benefits Section */}
        <section className="calculator-benefits">
          <div className="container">
            <h2 className="section-title">
              {getTranslation(locale, 'calculator.benefits.title')}
            </h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">💰</div>
                <h3>
                  {getTranslation(
                    locale,
                    'calculator.benefits.transparentPrices.title'
                  )}
                </h3>
                <p>
                  {getTranslation(
                    locale,
                    'calculator.benefits.transparentPrices.text'
                  )}
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">⚡</div>
                <h3>
                  {getTranslation(
                    locale,
                    'calculator.benefits.fastDelivery.title'
                  )}
                </h3>
                <p>
                  {getTranslation(
                    locale,
                    'calculator.benefits.fastDelivery.text'
                  )}
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🎯</div>
                <h3>
                  {getTranslation(
                    locale,
                    'calculator.benefits.individualApproach.title'
                  )}
                </h3>
                <p>
                  {getTranslation(
                    locale,
                    'calculator.benefits.individualApproach.text'
                  )}
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">🛡️</div>
                <h3>
                  {getTranslation(
                    locale,
                    'calculator.benefits.qualityGuarantee.title'
                  )}
                </h3>
                <p>
                  {getTranslation(
                    locale,
                    'calculator.benefits.qualityGuarantee.text'
                  )}
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
                <div className="stat-label">
                  {getTranslation(locale, 'calculator.trust.completedProjects')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">7+</div>
                <div className="stat-label">
                  {getTranslation(locale, 'calculator.trust.yearsExperience')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">98%</div>
                <div className="stat-label">
                  {getTranslation(locale, 'calculator.trust.satisfiedClients')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">
                  {getTranslation(locale, 'calculator.trust.support')}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="calculator-faq">
          <div className="container">
            <h2 className="section-title">
              {getTranslation(locale, 'calculator.faq.title')}
            </h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3 className="faq-question">
                  {getTranslation(locale, 'calculator.faq.howItWorks.question')}
                </h3>
                <p className="faq-answer">
                  {getTranslation(locale, 'calculator.faq.howItWorks.answer')}
                </p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">
                  {getTranslation(
                    locale,
                    'calculator.faq.priceAccuracy.question'
                  )}
                </h3>
                <p className="faq-answer">
                  {getTranslation(
                    locale,
                    'calculator.faq.priceAccuracy.answer'
                  )}
                </p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">
                  {getTranslation(
                    locale,
                    'calculator.faq.developmentTime.question'
                  )}
                </h3>
                <p className="faq-answer">
                  {getTranslation(
                    locale,
                    'calculator.faq.developmentTime.answer'
                  )}
                </p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">
                  {getTranslation(
                    locale,
                    'calculator.faq.whatIncluded.question'
                  )}
                </h3>
                <p className="faq-answer">
                  {getTranslation(locale, 'calculator.faq.whatIncluded.answer')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="calculator-cta">
          <div className="container">
            <div className="cta-content">
              <h2 className="cta-title">
                {getTranslation(locale, 'calculator.cta.title')}
              </h2>
              <p className="cta-text">
                {getTranslation(locale, 'calculator.cta.text')}
              </p>
              <div className="cta-buttons">
                <a href="#contact" className="cta-button-primary">
                  {getTranslation(locale, 'calculator.cta.getOffer')}
                </a>
                <a href="tel:+37477769668" className="cta-button-secondary">
                  {getTranslation(locale, 'calculator.cta.callUs')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
