'use client';

import { motion } from 'framer-motion';
import { services } from '@/utils/consts';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';

interface ServiceOptionsProps {
  onSelect: (service: string) => void;
}

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

export default function ServiceOptions({ onSelect }: ServiceOptionsProps) {
  const locale = useLocale();

  const getServiceTitle = (originalTitle: string): string => {
    const translationKey = serviceTranslationMap[originalTitle];
    if (translationKey) {
      return getTranslation(locale, translationKey);
    }
    return originalTitle;
  };

  return (
    <div className="service-options">
      {services.map((service) => {
        const translatedTitle = getServiceTitle(service.title);
        return (
          <motion.button
            key={service.title}
            type="button"
            className="service-btn"
            onClick={(e) => {
              e.preventDefault();
              // Pass both translated and original title for service detection
              onSelect(translatedTitle);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {translatedTitle}
          </motion.button>
        );
      })}
    </div>
  );
}
