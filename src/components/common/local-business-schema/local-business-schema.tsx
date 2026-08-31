import { getTranslations } from '@/i18n';
import { Locale } from '@/i18n/config';

interface LocalBusinessSchemaProps {
  locale: Locale;
}

export default function LocalBusinessSchema({ locale }: LocalBusinessSchemaProps) {
  const t = getTranslations(locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Torgomyan.Studio',
    description: t.meta.description,
    url: 'https://torgomyan-studio.am',
    telephone: '+37477769668',
    email: 'info@torgomyan-studio.am',
    image: 'https://torgomyan-studio.am/images/logo.svg',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Martuni',
      addressRegion: 'Gegharkunik',
      addressCountry: 'AM',
      streetAddress: t.contact.address,
    },
    areaServed: ['AM', 'RU', 'US', 'EU'],
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '09:00',
      closes: '20:00',
    },
    sameAs: [
      'https://t.me/torgomyan01',
      'https://wa.me/37477769668',
    ],
    inLanguage: locale,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
