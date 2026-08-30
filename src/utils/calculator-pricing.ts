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
  cmsRequired: boolean;
  ecommerce: boolean;
  paymentSystems: string;
  mobileApp: boolean;
  seoOptimization: boolean;
  contentManagement: boolean;
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
};

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
export function needsPaymentSystems(
  config: ServicePricingConfig,
  ecommerceChecked: boolean
): boolean {
  return config.isEcommerce || ecommerceChecked;
}

export function showWebsiteConfigurator(config: ServicePricingConfig): boolean {
  return config.isWebsite;
}

export function showProjectFeatureOptions(config: ServicePricingConfig): boolean {
  return config.isWebsite || config.isApp;
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

  // Flat add-ons — website & web app only
  if (config.isWebsite || config.isApp) {
    if (input.cmsRequired) {
      price += 4000;
    }

    if (input.ecommerce && !config.isEcommerce) {
      price += 12000;
    }

    const includePayments = needsPaymentSystems(config, input.ecommerce);
    const paymentChoice =
      input.paymentSystems || (config.isEcommerce ? 'single' : '');
    if (includePayments && paymentChoice && paymentChoice !== 'none') {
      price += paymentChoice === 'multiple' ? 8000 : 5000;
    }

    if (input.mobileApp) {
      price += config.isApp ? 13000 : 23000;
    }

    if (input.seoOptimization) {
      price += 5000;
    }

    if (input.contentManagement) {
      price += 3000;
    }

    input.features.forEach((feature) => {
      price += FEATURE_COSTS[feature] ?? 2000;
    });
  }

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
    cmsRequired: false,
    mobileApp: false,
    seoOptimization: false,
    contentManagement: false,
  };

  if (!config.isWebsite && !config.isApp) {
    return {
      ...base,
      pagesCount: 1,
      designStyle: '',
      ecommerce: false,
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
    ecommerce: config.isEcommerce,
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
