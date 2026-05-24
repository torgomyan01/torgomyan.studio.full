'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CustomInput, CustomPhoneInput } from '@/components/ui';
import { saveCalculatorSubmissionAction } from '@/app/actions/calculator';
import { services } from '@/utils/consts';
import { useServiceQuestions } from '../ai-block/hooks/use-service-questions';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import {
  calculatePriceRange,
  calculateProjectPrice,
  getFormDefaultsForService,
  getServicePricingConfig,
  needsPaymentSystems,
  showProjectFeatureOptions,
  showWebsiteConfigurator,
} from '@/utils/calculator-pricing';
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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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

  const selectedServiceQuestions = formData.selectedService
    ? getServiceQuestions(formData.selectedService)
    : [];

  const serviceConfig = formData.selectedService
    ? getServicePricingConfig(formData.selectedService)
    : null;

  const handleServiceSelect = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      ...getFormDefaultsForService(service, prev),
    }));
    setCurrentQuestionIndex(0);
    setSubmitMessage(null);
    setEstimatedPrice(null);
    setPriceRange(null);
    setShowPrice(false);
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

    const price = calculateProjectPrice(formData);
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
      finalPrice = calculateProjectPrice(formData);
      finalPriceRange = calculatePriceRange(finalPrice);
      setEstimatedPrice(finalPrice);
      setPriceRange(finalPriceRange);
    }

    try {
      // Combine service answers into features string
      const serviceAnswersText = Object.entries(formData.serviceAnswers)
        .map(([question, answer]) => `${question}: ${answer}`)
        .join('; ');

      const serviceLabel = getServiceTitle(formData.selectedService);

      const result = await saveCalculatorSubmissionAction({
        ...formData,
        websiteType: formData.websiteType || formData.selectedService,
        features: [
          `Услуга: ${serviceLabel}`,
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

  const localeTag =
    locale === 'ru' ? 'ru-RU' : locale === 'hy' ? 'hy-AM' : 'en-US';

  const formatPrice = (value: number) =>
    value.toLocaleString(localeTag);

  const getServiceIconClass = (title: string): string => {
    if (title.includes('Лендинг')) return 'fas fa-rocket';
    if (title.includes('Интернет-магазин')) return 'fas fa-shopping-cart';
    if (title.includes('Корпоративный')) return 'fas fa-building';
    if (title.includes('Сайт-визитка')) return 'fas fa-briefcase';
    if (title.includes('Веб-приложения')) return 'fas fa-code';
    if (title.includes('SEO') || title.includes('Продвижение'))
      return 'fas fa-chart-line';
    if (title.includes('UI/UX') || title.includes('Дизайн'))
      return 'fas fa-palette';
    if (title.includes('Техническая поддержка')) return 'fas fa-headset';
    if (title.includes('Хостинг') || title.includes('домен'))
      return 'fas fa-server';
    if (title.includes('Интеграция платежных'))
      return 'fas fa-credit-card';
    if (title.includes('Автоматизация')) return 'fas fa-cogs';
    if (title.includes('Разработка Сайтов')) return 'fas fa-laptop-code';
    return 'fas fa-laptop-code';
  };

  const designStyleIcons: Record<string, string> = {
    simple: 'fas fa-file',
    standard: 'fas fa-pencil',
    premium: 'fas fa-palette',
    luxury: 'fas fa-badge-check',
  };

  const benefitIcons = [
    'fas fa-money-simple-from-bracket',
    'fas fa-bolt',
    'fas fa-bullseye',
    'fas fa-shield-alt',
  ];

  const trustIcons = [
    'fas fa-badge-check',
    'fas fa-calendar-check',
    'fas fa-users',
    'fas fa-headset',
  ];

  const flowStep = useMemo(() => {
    if (step === 'contact') return showPrice ? 4 : 3;
    if (!formData.selectedService) return 1;
    return 2;
  }, [step, showPrice, formData.selectedService]);

  const livePreview = useMemo(() => {
    if (!formData.selectedService) return null;
    const price = calculateProjectPrice(formData);
    if (price <= 0) return null;
    return { price, range: calculatePriceRange(price) };
  }, [formData]);

  const progressSteps = [
    getTranslation(locale, 'calculator.progress.step1'),
    getTranslation(locale, 'calculator.progress.step2'),
    getTranslation(locale, 'calculator.progress.step3'),
    getTranslation(locale, 'calculator.progress.step4'),
  ];

  const faqItems = [
    {
      q: getTranslation(locale, 'calculator.faq.howItWorks.question'),
      a: getTranslation(locale, 'calculator.faq.howItWorks.answer'),
    },
    {
      q: getTranslation(locale, 'calculator.faq.priceAccuracy.question'),
      a: getTranslation(locale, 'calculator.faq.priceAccuracy.answer'),
    },
    {
      q: getTranslation(locale, 'calculator.faq.developmentTime.question'),
      a: getTranslation(locale, 'calculator.faq.developmentTime.answer'),
    },
    {
      q: getTranslation(locale, 'calculator.faq.whatIncluded.question'),
      a: getTranslation(locale, 'calculator.faq.whatIncluded.answer'),
    },
  ];

  const showWebsiteFields =
    serviceConfig !== null && showWebsiteConfigurator(serviceConfig);

  const showFeatureOptions =
    serviceConfig !== null && showProjectFeatureOptions(serviceConfig);

  const showPaymentFields =
    serviceConfig !== null &&
    needsPaymentSystems(serviceConfig, formData.ecommerce);

  const pagesMax = serviceConfig?.maxPages ?? 50;

  return (
    <div className="calculator-page-wrapper">
    <div className="calculator-page">
      <div className="container">
        <section className="calculator-hero">
          <div className="calculator-hero__glow" aria-hidden="true" />
          <span className="calculator-hero__badge">
            <i className="fas fa-badge-check" aria-hidden="true" />
            {getTranslation(locale, 'calculator.hero.badge')}
          </span>
          <h1 className="main-title">
            {getTranslation(locale, 'calculator.hero.title')}
          </h1>
          <p className="main-subtitle">
            {getTranslation(locale, 'calculator.hero.subtitle')}
          </p>
          <div className="calculator-steps">
            {progressSteps.map((label, index) => {
              const stepNum = index + 1;
              const isActive = flowStep === stepNum;
              const isDone = flowStep > stepNum;
              return (
                <div
                  key={label}
                  className={`calculator-step${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
                >
                  <span className="calculator-step__num">
                    {isDone ? (
                      <i className="fas fa-circle-check" aria-hidden="true" />
                    ) : (
                      stepNum
                    )}
                  </span>
                  <span className="calculator-step__label">{label}</span>
                </div>
              );
            })}
          </div>
        </section>

        <div className="calculator-layout">
          <aside className="calculator-sidebar">
            <div className="calculator-sidebar__card">
              <div className="calculator-sidebar__header">
                <div className="calculator-sidebar__header-icon">
                  <i className="fas fa-calculator" aria-hidden="true" />
                </div>
                <h2 className="calculator-sidebar__title">
                  {getTranslation(locale, 'calculator.sidebar.title')}
                </h2>
              </div>
              {livePreview ? (
                <div className="calculator-sidebar__price-block">
                  <div className="calculator-sidebar__price-ring">
                    <p className="calculator-sidebar__price-label">
                      <i className="fas fa-tag" aria-hidden="true" />
                      {getTranslation(locale, 'calculator.sidebar.from')}
                    </p>
                    <div className="calculator-sidebar__price-value">
                      <span className="calculator-sidebar__currency">₽</span>
                      {formatPrice(livePreview.price)}
                    </div>
                    <p className="calculator-sidebar__price-range">
                      <i className="fas fa-chart-line" aria-hidden="true" />
                      {formatPrice(livePreview.range.min)} –{' '}
                      {formatPrice(livePreview.range.max)} ₽
                    </p>
                  </div>
                </div>
              ) : (
                <div className="calculator-sidebar__empty">
                  <i className="fas fa-pencil" aria-hidden="true" />
                  <p className="calculator-sidebar__hint">
                    {getTranslation(locale, 'calculator.sidebar.hint')}
                  </p>
                </div>
              )}
              {formData.selectedService && (
                <dl className="calculator-sidebar__meta">
                  <div className="calculator-sidebar__meta-item">
                    <dt>
                      <i
                        className={getServiceIconClass(formData.selectedService)}
                        aria-hidden="true"
                      />
                      {getTranslation(locale, 'calculator.sidebar.selected')}
                    </dt>
                    <dd>{getServiceTitle(formData.selectedService)}</dd>
                  </div>
                  {showWebsiteFields && (
                    <div className="calculator-sidebar__meta-item">
                      <dt>
                        <i className="fas fa-file" aria-hidden="true" />
                        {getTranslation(locale, 'calculator.sidebar.pages')}
                      </dt>
                      <dd>{formData.pagesCount}</dd>
                    </div>
                  )}
                  {formData.designStyle && (
                    <div className="calculator-sidebar__meta-item">
                      <dt>
                        <i
                          className={
                            designStyleIcons[formData.designStyle] ||
                            'fas fa-palette'
                          }
                          aria-hidden="true"
                        />
                        {getTranslation(locale, 'calculator.sidebar.design')}
                      </dt>
                      <dd>
                        {getTranslation(
                          locale,
                          `calculator.designStyles.${formData.designStyle}`
                        )}
                      </dd>
                    </div>
                  )}
                </dl>
              )}
            </div>
          </aside>

          <div className="calculator-main">
            <section className="calculator-panel">
              <AnimatePresence mode="wait">
                {step === 'calculator' ? (
                  <motion.div
                    key="calculator-step"
                    className="calculator-form"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                  >
              <div className="form-section">
                <h3 className="section-title">
                  {getTranslation(locale, 'calculator.form.selectService')}
                </h3>
                <div className="service-grid">
                  {services.map((service) => (
                    <label
                      key={service.title}
                      className={`service-card${
                        formData.selectedService === service.title
                          ? ' selected'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="selectedService"
                        value={service.title}
                        checked={formData.selectedService === service.title}
                        onChange={() => handleServiceSelect(service.title)}
                      />
                      <span className="service-card__icon">
                        <i
                          className={getServiceIconClass(service.title)}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="service-card__title">
                        {getServiceTitle(service.title)}
                      </span>
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

              {showWebsiteFields && (
                <>
                  <div className="form-section">
                    <h3 className="section-title">
                      {getTranslation(locale, 'calculator.form.pagesCount')}
                    </h3>
                    <div className="range-input">
                      <input
                        type="range"
                        min="1"
                        max={pagesMax}
                        value={Math.min(formData.pagesCount, pagesMax)}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            pagesCount: Math.min(
                              parseInt(e.target.value, 10) || 1,
                              pagesMax
                            ),
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
                    <div className="design-grid">
                      {[
                        { value: 'simple', key: 'simple' },
                        { value: 'standard', key: 'standard' },
                        { value: 'premium', key: 'premium' },
                        { value: 'luxury', key: 'luxury' },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`design-card${
                            formData.designStyle === option.value
                              ? ' selected'
                              : ''
                          }`}
                        >
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
                          <i
                            className={
                              designStyleIcons[option.value] || 'fas fa-palette'
                            }
                            aria-hidden="true"
                          />
                          <span className="design-card__label">
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

              {showFeatureOptions && (
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
                  {!serviceConfig?.isEcommerce && (
                  <label className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.ecommerce}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          ecommerce: e.target.checked,
                          paymentSystems: e.target.checked
                            ? prev.paymentSystems || 'single'
                            : '',
                        }))
                      }
                    />
                    <span>
                      {getTranslation(locale, 'calculator.features.ecommerce')}
                    </span>
                  </label>
                  )}
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
              )}

              {showPaymentFields && (
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

              {showFeatureOptions && (
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
              )}

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
                  <i className="fas fa-calculator" aria-hidden="true" />
                  {getTranslation(locale, 'calculator.form.calculatePrice')}
                </button>
              </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="contact-step"
                    className="contact-form"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.3 }}
                  >
              {!showPrice && estimatedPrice !== null && (
                <div className="price-info-message">
                  <div className="info-icon">
                    <i className="fas fa-badge-check" aria-hidden="true" />
                  </div>
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
                    {formatPrice(estimatedPrice)} ₽
                  </div>
                  {priceRange && (
                    <div className="price-range">
                      <span className="range-label">
                        {getTranslation(locale, 'calculator.priceInfo.range')}
                      </span>
                      <span className="range-values">
                        {formatPrice(priceRange.min)} –{' '}
                        {formatPrice(priceRange.max)} ₽
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
                  </motion.div>
                )}
              </AnimatePresence>
            </section>
          </div>
        </div>

        {/* Benefits Section */}
        <section className="calculator-benefits">
          <div className="container">
            <h2 className="section-title">
              {getTranslation(locale, 'calculator.benefits.title')}
            </h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className={benefitIcons[0]} aria-hidden="true" />
                </div>
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
                <div className="benefit-icon">
                  <i className={benefitIcons[1]} aria-hidden="true" />
                </div>
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
                <div className="benefit-icon">
                  <i className={benefitIcons[2]} aria-hidden="true" />
                </div>
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
                <div className="benefit-icon">
                  <i className={benefitIcons[3]} aria-hidden="true" />
                </div>
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
                <div className="stat-icon">
                  <i className={trustIcons[0]} aria-hidden="true" />
                </div>
                <div className="stat-number">100+</div>
                <div className="stat-label">
                  {getTranslation(locale, 'calculator.trust.completedProjects')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className={trustIcons[1]} aria-hidden="true" />
                </div>
                <div className="stat-number">7+</div>
                <div className="stat-label">
                  {getTranslation(locale, 'calculator.trust.yearsExperience')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className={trustIcons[2]} aria-hidden="true" />
                </div>
                <div className="stat-number">98%</div>
                <div className="stat-label">
                  {getTranslation(locale, 'calculator.trust.satisfiedClients')}
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <i className={trustIcons[3]} aria-hidden="true" />
                </div>
                <div className="stat-number">24/7</div>
                <div className="stat-label">
                  {getTranslation(locale, 'calculator.trust.support')}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="calculator-faq">
          <h2 className="section-title">
            {getTranslation(locale, 'calculator.faq.title')}
          </h2>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className={`faq-item${openFaqIndex === index ? ' open' : ''}`}
              >
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() =>
                    setOpenFaqIndex(openFaqIndex === index ? null : index)
                  }
                  aria-expanded={openFaqIndex === index}
                >
                  {item.q}
                  <i
                    className="fas fa-chevron-down faq-chevron"
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openFaqIndex === index && (
                    <motion.div
                      className="faq-answer-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="faq-answer">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
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
                  <i className="fas fa-paper-plane" aria-hidden="true" />
                  {getTranslation(locale, 'calculator.cta.getOffer')}
                </a>
                <a href="tel:+37477769668" className="cta-button-secondary">
                  <i className="fas fa-phone" aria-hidden="true" />
                  {getTranslation(locale, 'calculator.cta.callUs')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
  );
}
