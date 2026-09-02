'use client';

import { motion } from 'framer-motion';
import './_services.scss';
import { services } from '@/utils/consts';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';
import ServiceCardVisual from './service-card-visual';

interface IThisProps {
  but?: string;
}

const serviceTranslationMap: Record<
  string,
  { title: string; description: string }
> = {
  'Разработка Сайтов': {
    title: 'services.websiteDevelopment',
    description: 'services.cardDescriptions.websiteDevelopment',
  },
  Лендинг: {
    title: 'services.landingPage',
    description: 'services.cardDescriptions.landingPage',
  },
  'Сайт-визитка': {
    title: 'services.businessCardWebsite',
    description: 'services.cardDescriptions.businessCardWebsite',
  },
  'Корпоративный сайт': {
    title: 'services.corporateWebsite',
    description: 'services.cardDescriptions.corporateWebsite',
  },
  'Интернет-магазин': {
    title: 'services.onlineShop',
    description: 'services.cardDescriptions.onlineShop',
  },
  'Веб-приложения': {
    title: 'services.webApplications',
    description: 'services.cardDescriptions.webApplications',
  },
  'Дизайн интерфейсов (UI/UX)': {
    title: 'services.uiUxDesign',
    description: 'services.cardDescriptions.uiUxDesign',
  },
  'Техническая поддержка': {
    title: 'services.technicalSupport',
    description: 'services.cardDescriptions.technicalSupport',
  },
  'Хостинг и домены': {
    title: 'services.hostingDomains',
    description: 'services.cardDescriptions.hostingDomains',
  },
  'Интеграция платежных систем': {
    title: 'services.paymentIntegration',
    description: 'services.cardDescriptions.paymentIntegration',
  },
  'Автоматизация бизнес-процессов': {
    title: 'services.businessAutomation',
    description: 'services.cardDescriptions.businessAutomation',
  },
};

function ServicesBlock({ but = '' }: IThisProps) {
  const locale = useLocale();

  const getServiceContent = (originalTitle: string) => {
    const keys = serviceTranslationMap[originalTitle];
    if (!keys) {
      return { title: originalTitle, description: '' };
    }

    return {
      title: getTranslation(locale, keys.title),
      description: getTranslation(locale, keys.description),
    };
  };

  return (
    <div className="services-block">
      <div className="container">
        <h2 className="main-title">
          {getTranslation(locale, 'common.services')}
        </h2>
        <p className="main-subtitle">
          {getTranslation(locale, 'common.forCompanies')}
        </p>
        <div className="services-grid">
          {services.map(
            (service) =>
              service.title !== but && (
                <motion.a
                  whileHover={{ y: -6 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  key={service.title}
                  href={addLocaleToPath(service.href, locale)}
                  className="services-card"
                >
                  <div className="services-card-visual">
                    <ServiceCardVisual serviceHref={service.href} />
                  </div>
                  <div className="services-card-body">
                    <h3 className="services-card-title">
                      {getServiceContent(service.title).title}
                    </h3>
                    <p className="services-card-description">
                      {getServiceContent(service.title).description}
                    </p>
                    <span className="services-card-arrow" aria-hidden="true">
                      <i className="fas fa-arrow-right" />
                    </span>
                  </div>
                </motion.a>
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default ServicesBlock;
