/**
 * Calculator pricing logic — single source of truth for service detection and price calculation.
 * Prices are competitive “starts from” RUB (AI-era, ÷6 vs prior list).
 */

export interface CalculatorPricingInput {
  selectedService: string;
  websiteType: string;
  pagesCount: number;
  designStyle: string;
  features: string[];
  paymentSystems: string;
  serviceAnswers: Record<string, string>;
}

export interface ServicePricingConfig {
  basePrice: number;
  complexityMultiplier: number;
  isWebsite: boolean;
  isEcommerce: boolean;
  isApp: boolean;
  isOngoing: boolean;
  /** Max pages for slider / pricing (landing = fewer pages) */
  maxPages: number;
}

const FEATURE_COSTS: Record<string, number> = {
  Многоязычность: 4000,
  'Интеграция с соцсетями': 2500,
  'Онлайн-чат': 2000,
  'Форма обратной связи': 1000,
  'Галерея изображений': 1000,
  'Видео интеграция': 2500,
  Блог: 3000,
  'Новостная лента': 3000,
  'A/B тестирование': 3500,
  'Интеграция с рекламой': 3000,
  'Карта и контакты': 1500,
  'CRM интеграция': 6000,
  'Фильтры товаров': 3500,
  'Скидки и промокоды': 4000,
  'Интеграция доставки': 5000,
  'Отзывы и рейтинги': 2500,
  'Поиск по каталогу': 2000,
  'Личный кабинет покупателя': 3000,
  'Интеграция внешних API': 6000,
  'Роли пользователей': 4000,
  'Уведомления (email/push)': 3500,
  'Загрузка файлов': 2500,
  'Аналитика и дашборды': 5000,
  'Интерактивный прототип': 5000,
  'Дизайн-система': 6000,
  'UX-исследование': 4000,
  'Мобильная версия': 3500,
  'Презентация для инвесторов': 2500,
  'Юзабилити-тестирование': 3500,
  'Обновления безопасности': 2000,
  'Обновление контента': 1500,
  'Резервное копирование': 1500,
  'Мониторинг производительности': 2500,
  'Исправление ошибок': 2000,
  Консультации: 1500,
  'SSL-сертификат': 500,
  'Ежедневное резервное копирование': 1000,
  'Почта на домене': 800,
  'CDN и ускорение': 2000,
  'Регистрация домена': 500,
  'Мониторинг сервера': 1200,
  'ЮKassa / местные системы': 3000,
  'Stripe / международные': 4000,
  'Рекуррентные платежи': 5000,
  'Оплата по счёту': 2000,
  Мультивалютность: 3500,
  'Возвраты и refunds': 2500,
  'Email-автоматизация': 3500,
  'Генерация отчётов': 3000,
  'API интеграция': 5000,
  'Автоматизация workflow': 4500,
  'Чат-бот интеграция': 4000,
};

export interface ServiceFeatureOption {
  id: string;
  translationKey: string;
}

const feature = (id: string, translationKey: string): ServiceFeatureOption => ({
  id,
  translationKey,
});

const SERVICE_FEATURE_GROUPS: Array<{
  match: (service: string) => boolean;
  options: ServiceFeatureOption[];
}> = [
  {
    match: (s) => s.includes('Интернет-магазин'),
    options: [
      feature('Фильтры товаров', 'productFilters'),
      feature('Скидки и промокоды', 'discountsPromocodes'),
      feature('Интеграция доставки', 'deliveryIntegration'),
      feature('Отзывы и рейтинги', 'reviewsRatings'),
      feature('Поиск по каталогу', 'catalogSearch'),
      feature('Личный кабинет покупателя', 'userAccount'),
      feature('Многоязычность', 'multilingual'),
      feature('Интеграция с соцсетями', 'socialIntegration'),
    ],
  },
  {
    match: (s) => s.includes('Веб-приложения'),
    options: [
      feature('Интеграция внешних API', 'externalApiIntegration'),
      feature('Роли пользователей', 'userRoles'),
      feature('Уведомления (email/push)', 'notifications'),
      feature('Загрузка файлов', 'fileUpload'),
      feature('Аналитика и дашборды', 'analyticsDashboard'),
      feature('Многоязычность', 'multilingual'),
    ],
  },
  {
    match: (s) => s.includes('Корпоративный сайт'),
    options: [
      feature('Многоязычность', 'multilingual'),
      feature('CRM интеграция', 'crmIntegration'),
      feature('Форма обратной связи', 'contactForm'),
      feature('Блог', 'blog'),
      feature('Новостная лента', 'newsFeed'),
      feature('Галерея изображений', 'imageGallery'),
      feature('Онлайн-чат', 'onlineChat'),
      feature('Интеграция с соцсетями', 'socialIntegration'),
      feature('Видео интеграция', 'videoIntegration'),
    ],
  },
  {
    match: (s) => s.includes('Сайт-визитка'),
    options: [
      feature('Форма обратной связи', 'contactForm'),
      feature('Галерея изображений', 'imageGallery'),
      feature('Карта и контакты', 'mapIntegration'),
      feature('Интеграция с соцсетями', 'socialIntegration'),
      feature('Многоязычность', 'multilingual'),
      feature('Онлайн-чат', 'onlineChat'),
    ],
  },
  {
    match: (s) => s.includes('Лендинг'),
    options: [
      feature('Форма обратной связи', 'contactForm'),
      feature('Видео интеграция', 'videoIntegration'),
      feature('Онлайн-чат', 'onlineChat'),
      feature('Интеграция с соцсетями', 'socialIntegration'),
      feature('A/B тестирование', 'abTesting'),
      feature('Интеграция с рекламой', 'adIntegration'),
      feature('Многоязычность', 'multilingual'),
    ],
  },
  {
    match: (s) => s.includes('Разработка Сайтов'),
    options: [
      feature('Многоязычность', 'multilingual'),
      feature('Интеграция с соцсетями', 'socialIntegration'),
      feature('Онлайн-чат', 'onlineChat'),
      feature('Форма обратной связи', 'contactForm'),
      feature('Галерея изображений', 'imageGallery'),
      feature('Видео интеграция', 'videoIntegration'),
      feature('Блог', 'blog'),
      feature('Новостная лента', 'newsFeed'),
    ],
  },
  {
    match: (s) => s.includes('UI/UX'),
    options: [
      feature('Интерактивный прототип', 'prototype'),
      feature('Дизайн-система', 'designSystem'),
      feature('UX-исследование', 'userResearch'),
      feature('Мобильная версия', 'mobileDesign'),
      feature('Презентация для инвесторов', 'presentation'),
      feature('Юзабилити-тестирование', 'usabilityTesting'),
    ],
  },
  {
    match: (s) => s.includes('Техническая поддержка'),
    options: [
      feature('Обновления безопасности', 'securityUpdates'),
      feature('Обновление контента', 'contentUpdates'),
      feature('Резервное копирование', 'backup'),
      feature('Мониторинг производительности', 'performanceMonitoring'),
      feature('Исправление ошибок', 'bugFixes'),
      feature('Консультации', 'consultation'),
    ],
  },
  {
    match: (s) => s.includes('Хостинг') || s.includes('домен'),
    options: [
      feature('SSL-сертификат', 'sslCertificate'),
      feature('Ежедневное резервное копирование', 'dailyBackup'),
      feature('Почта на домене', 'emailHosting'),
      feature('CDN и ускорение', 'cdnSetup'),
      feature('Регистрация домена', 'domainRegistration'),
      feature('Мониторинг сервера', 'serverMonitoring'),
    ],
  },
  {
    match: (s) => s.includes('Интеграция платежных'),
    options: [
      feature('ЮKassa / местные системы', 'yookassa'),
      feature('Stripe / международные', 'stripe'),
      feature('Рекуррентные платежи', 'recurringPayments'),
      feature('Оплата по счёту', 'invoicePayments'),
      feature('Мультивалютность', 'multiCurrency'),
      feature('Возвраты и refunds', 'refundHandling'),
    ],
  },
  {
    match: (s) => s.includes('Автоматизация'),
    options: [
      feature('CRM интеграция', 'crmIntegration'),
      feature('Email-автоматизация', 'emailAutomation'),
      feature('Генерация отчётов', 'reportGeneration'),
      feature('API интеграция', 'apiIntegration'),
      feature('Автоматизация workflow', 'workflowAutomation'),
      feature('Чат-бот интеграция', 'chatbotIntegration'),
    ],
  },
];

export function getServiceFeatureOptions(
  service: string
): ServiceFeatureOption[] {
  if (!service) return [];
  const group = SERVICE_FEATURE_GROUPS.find((g) => g.match(service));
  return group?.options ?? [];
}

function getFeatureCost(featureId: string): number {
  return FEATURE_COSTS[featureId] ?? 2000;
}

function roundPrice(price: number): number {
  if (price <= 0) return 0;
  if (price < 1000) return Math.round(price / 50) * 50;
  if (price < 10000) return Math.round(price / 100) * 100;
  return Math.round(price / 1000) * 1000;
}

/** Detect service type from Russian canonical title (consts.services) */
export function getServicePricingConfig(
  service: string
): ServicePricingConfig {
  if (!service) {
    return {
      basePrice: 0,
      complexityMultiplier: 1,
      isWebsite: false,
      isEcommerce: false,
      isApp: false,
      isOngoing: false,
      maxPages: 50,
    };
  }

  if (service.includes('Интернет-магазин')) {
    return {
      basePrice: 33000,
      complexityMultiplier: 1.5,
      isWebsite: true,
      isEcommerce: true,
      isApp: false,
      isOngoing: false,
      maxPages: 50,
    };
  }

  if (service.includes('Веб-приложения')) {
    return {
      basePrice: 50000,
      complexityMultiplier: 2.0,
      isWebsite: false,
      isEcommerce: false,
      isApp: true,
      isOngoing: false,
      maxPages: 50,
    };
  }

  if (service.includes('Корпоративный сайт')) {
    return {
      basePrice: 20000,
      complexityMultiplier: 1.2,
      isWebsite: true,
      isEcommerce: false,
      isApp: false,
      isOngoing: false,
      maxPages: 50,
    };
  }

  if (service.includes('Сайт-визитка')) {
    return {
      basePrice: 8000,
      complexityMultiplier: 0.7,
      isWebsite: true,
      isEcommerce: false,
      isApp: false,
      isOngoing: false,
      maxPages: 15,
    };
  }

  if (service.includes('Лендинг')) {
    return {
      basePrice: 7000,
      complexityMultiplier: 0.8,
      isWebsite: true,
      isEcommerce: false,
      isApp: false,
      isOngoing: false,
      maxPages: 5,
    };
  }

  if (service.includes('Разработка Сайтов')) {
    return {
      basePrice: 15000,
      complexityMultiplier: 1.0,
      isWebsite: true,
      isEcommerce: false,
      isApp: false,
      isOngoing: false,
      maxPages: 50,
    };
  }

  if (service.includes('UI/UX')) {
    return {
      basePrice: 13000,
      complexityMultiplier: 1.1,
      isWebsite: false,
      isEcommerce: false,
      isApp: false,
      isOngoing: false,
      maxPages: 1,
    };
  }

  if (service.includes('Техническая поддержка')) {
    return {
      basePrice: 2500,
      complexityMultiplier: 1,
      isWebsite: false,
      isEcommerce: false,
      isApp: false,
      isOngoing: true,
      maxPages: 1,
    };
  }

  if (service.includes('Хостинг') || service.includes('домен')) {
    return {
      basePrice: 80,
      complexityMultiplier: 1,
      isWebsite: false,
      isEcommerce: false,
      isApp: false,
      isOngoing: true,
      maxPages: 1,
    };
  }

  if (service.includes('Интеграция платежных')) {
    return {
      basePrice: 7500,
      complexityMultiplier: 1.3,
      isWebsite: false,
      isEcommerce: false,
      isApp: false,
      isOngoing: false,
      maxPages: 1,
    };
  }

  if (service.includes('Автоматизация')) {
    return {
      basePrice: 25000,
      complexityMultiplier: 1.8,
      isWebsite: false,
      isEcommerce: false,
      isApp: false,
      isOngoing: false,
      maxPages: 1,
    };
  }

  return {
    basePrice: 12000,
    complexityMultiplier: 1,
    isWebsite: false,
    isEcommerce: false,
    isApp: false,
    isOngoing: false,
    maxPages: 50,
  };
}

function getDesignMultiplier(designStyle: string): number {
  switch (designStyle) {
    case 'simple':
      return 0.95;
    case 'premium':
      return 1.5;
    case 'luxury':
      return 2.0;
    case 'standard':
    default:
      return 1.0;
  }
}

function getPagesCost(basePrice: number, pages: number): number {
  if (pages <= 5) return 0;
  if (pages <= 10) return basePrice * 0.15 * (pages - 5);
  if (pages <= 20) {
    return basePrice * 0.15 * 5 + basePrice * 0.12 * (pages - 10);
  }
  return (
    basePrice * 0.15 * 5 +
    basePrice * 0.12 * 10 +
    basePrice * 0.08 * (pages - 20)
  );
}

function countAnsweredQuestions(answers: Record<string, string>): number {
  return Object.values(answers).filter((a) => a.trim().length > 0).length;
}

/** Whether payment systems block applies in UI and pricing */
export function needsPaymentSystems(config: ServicePricingConfig): boolean {
  return config.isEcommerce;
}

export function showWebsiteConfigurator(config: ServicePricingConfig): boolean {
  return config.isWebsite;
}

export function hasServiceFeatureOptions(service: string): boolean {
  return getServiceFeatureOptions(service).length > 0;
}

export function calculateProjectPrice(input: CalculatorPricingInput): number {
  const service = input.selectedService;
  if (!service) return 0;

  const config = getServicePricingConfig(service);
  let price = config.basePrice;

  // Pages + design — only for website projects
  if (config.isWebsite) {
    const pages = Math.min(
      Math.max(1, input.pagesCount),
      config.maxPages
    );
    price += getPagesCost(config.basePrice, pages);

    if (input.designStyle) {
      price *= getDesignMultiplier(input.designStyle);
    }
  }

  // Complexity applies to base scope (before flat add-ons)
  price *= config.complexityMultiplier;

  if (config.isEcommerce) {
    const paymentChoice =
      input.paymentSystems || (config.isEcommerce ? 'single' : '');
    if (paymentChoice && paymentChoice !== 'none') {
      price += paymentChoice === 'multiple' ? 8000 : 5000;
    }
  }

  const allowedFeatures = new Set(
    getServiceFeatureOptions(service).map((option) => option.id)
  );
  input.features.forEach((feature) => {
    if (allowedFeatures.has(feature)) {
      price += getFeatureCost(feature);
    }
  });

  const answeredCount = countAnsweredQuestions(input.serviceAnswers);
  if (answeredCount > 0) {
    price *= Math.min(1 + answeredCount * 0.02, 1.15);
  }

  return roundPrice(price);
}

export function calculatePriceRange(basePrice: number): {
  min: number;
  max: number;
} {
  if (basePrice <= 0) return { min: 0, max: 0 };
  return {
    min: roundPrice(basePrice * 0.85),
    max: roundPrice(basePrice * 1.15),
  };
}

/** Defaults when user picks a new service */
export function getFormDefaultsForService(
  service: string,
  prev: CalculatorPricingInput
): Partial<CalculatorPricingInput> {
  const config = getServicePricingConfig(service);
  const websiteType = getWebsiteTypeSlug(service);

  const base: Partial<CalculatorPricingInput> = {
    selectedService: service,
    websiteType,
    serviceAnswers: {},
    features: [],
  };

  if (!config.isWebsite && !config.isApp) {
    return {
      ...base,
      pagesCount: 1,
      designStyle: '',
      paymentSystems: '',
    };
  }

  const pagesCount = config.isWebsite
    ? Math.min(prev.pagesCount || 5, config.maxPages)
    : 1;

  return {
    ...base,
    pagesCount: Math.max(1, pagesCount),
    designStyle: config.isWebsite ? prev.designStyle : '',
    paymentSystems: config.isEcommerce ? prev.paymentSystems || 'single' : '',
  };
}

export function getWebsiteTypeSlug(service: string): string {
  if (service.includes('Лендинг')) return 'landing';
  if (service.includes('Корпоративный')) return 'corporate';
  if (service.includes('Интернет-магазин')) return 'ecommerce';
  if (service.includes('Сайт-визитка')) return 'portfolio';
  if (service.includes('Веб-приложения')) return 'webapp';
  if (service.includes('UI/UX')) return 'design';
  if (service.includes('Техническая поддержка')) return 'support';
  if (service.includes('Хостинг') || service.includes('домен')) return 'hosting';
  if (service.includes('Интеграция платежных')) return 'payments';
  if (service.includes('Автоматизация')) return 'automation';
  if (service.includes('Разработка Сайтов')) return 'website';
  return 'custom';
}
