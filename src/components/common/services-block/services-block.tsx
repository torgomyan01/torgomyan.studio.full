'use client';

import { motion } from 'framer-motion';
import './_services.scss';
import { services } from '@/utils/consts';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

interface IThisProps {
  but?: string;
}

function ServicesBlock({ but = '' }: IThisProps) {
  const locale = useLocale();

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

  // Map services to FontAwesome icons
  const serviceIconMap: Record<string, string> = {
    'Разработка Сайтов': 'fa-code',
    Лендинг: 'fa-bolt',
    'Сайт-визитка': 'fa-briefcase',
    'Корпоративный сайт': 'fa-building',
    'Интернет-магазин': 'fa-shopping-cart',
    'Веб-приложения': 'fa-laptop-code',
    'Продвижение сайтов (SEO)': 'fa-chart-line',
    'Дизайн интерфейсов (UI/UX)': 'fa-palette',
    'Техническая поддержка': 'fa-headset',
    'Хостинг и домены': 'fa-globe',
    'Интеграция платежных систем': 'fa-credit-card',
    'Автоматизация бизнес-процессов': 'fa-cogs',
  };

  const getServiceIcon = (originalTitle: string): string => {
    return serviceIconMap[originalTitle] || 'fa-globe';
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
                  whileHover={{ scale: 1.05, y: -5 }}
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
                  <div className="services-card-icon">
                    <i className={`fas ${getServiceIcon(service.title)}`}></i>
                  </div>
                  <h3 className="services-card-title">
                    {getServiceTitle(service.title)}
                  </h3>
                  <div className="services-card-arrow">
                    <i className="fas fa-arrow-right"></i>
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
