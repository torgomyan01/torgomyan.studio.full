'use client';

import { motion } from 'framer-motion';
import './_services.scss';
import { services } from '@/utils/consts';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';
import Link from 'next/link';

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

  return (
    <div className="services-block">
      <div className="container">
        <h2 className="main-title">
          {getTranslation(locale, 'common.services')}
        </h2>
        <p className="main-subtitle">
          {getTranslation(locale, 'common.forCompanies')}
        </p>
        {services.map(
          (service) =>
            service.title !== but && (
              <motion.a
                whileHover={{ scale: 1.05, x: 10 }}
                initial="init"
                whileInView="animate"
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                key={service.title}
                href={addLocaleToPath(service.href, locale)}
                className="services-link"
              >
                {getServiceTitle(service.title)}
                <img src="/images/link-arrow.svg" alt="" />
              </motion.a>
            )
        )}
      </div>
    </div>
  );
}

export default ServicesBlock;
