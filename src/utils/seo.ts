import type { Metadata } from 'next';
import { locales, defaultLocale, type Locale } from '@/i18n/config';

export const SITE_BASE_URL = 'https://torgomyan-studio.am';
export const SITE_NAME = 'Torgomyan.Studio';
export const DEFAULT_OG_IMAGE = `${SITE_BASE_URL}/images/tend.am.png`;

export const ORGANIZATION_ID = `${SITE_BASE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_BASE_URL}/#website`;

export function getOgLocale(locale: Locale): string {
  if (locale === 'hy') return 'hy_AM';
  if (locale === 'ru') return 'ru_RU';
  return 'en_US';
}

export function buildLocalizedUrl(path: string, locale: Locale): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  if (locale === defaultLocale) {
    return `${SITE_BASE_URL}${normalizedPath === '/' ? '' : normalizedPath}`;
  }

  return `${SITE_BASE_URL}/${locale}${normalizedPath === '/' ? '' : normalizedPath}`;
}

export function buildLanguageAlternates(
  pathWithoutLocale: string
): Record<string, string> {
  const languages: Record<string, string> = {};

  locales.forEach((loc) => {
    languages[loc] = buildLocalizedUrl(pathWithoutLocale, loc);
  });

  languages['x-default'] = buildLocalizedUrl(pathWithoutLocale, defaultLocale);

  return languages;
}

export interface PageMetadataInput {
  locale: Locale;
  pathWithoutLocale: string;
  title: string;
  description: string;
  keywords?: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const {
    locale,
    pathWithoutLocale,
    title,
    description,
    keywords,
    openGraphTitle,
    openGraphDescription,
    image = DEFAULT_OG_IMAGE,
    imageAlt = SITE_NAME,
    type = 'website',
    noIndex = false,
  } = input;

  const canonical = buildLocalizedUrl(pathWithoutLocale, locale);
  const ogTitle = openGraphTitle || title;
  const ogDescription = openGraphDescription || description;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical,
      languages: buildLanguageAlternates(pathWithoutLocale),
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type,
      locale: getOgLocale(locale),
      siteName: SITE_NAME,
      url: canonical,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [image],
    },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
  };
}

interface OrganizationSchemaInput {
  description: string;
  address: string;
  locale: Locale;
}

export function buildOrganizationSchema({
  description,
  address,
  locale,
}: OrganizationSchemaInput) {
  return {
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_BASE_URL,
    logo: `${SITE_BASE_URL}/images/logo.svg`,
    image: DEFAULT_OG_IMAGE,
    description,
    telephone: '+37477769668',
    email: 'info@torgomyan-studio.am',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: 'Martuni',
      addressRegion: 'Gegharkunik',
      addressCountry: 'AM',
    },
    areaServed: ['AM', 'RU', 'US', 'EU'],
    sameAs: ['https://t.me/torgomyan01', 'https://wa.me/37477769668'],
    inLanguage: locale,
  };
}

export function buildWebSiteSchema({
  name,
  description,
  locale,
}: {
  name: string;
  description: string;
  locale: Locale;
}) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name,
    description,
    url: SITE_BASE_URL,
    inLanguage: locale,
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function buildProfessionalServiceSchema({
  description,
  address,
  locale,
}: OrganizationSchemaInput) {
  return {
    '@type': 'ProfessionalService',
    '@id': `${SITE_BASE_URL}/#localbusiness`,
    name: SITE_NAME,
    url: SITE_BASE_URL,
    image: DEFAULT_OG_IMAGE,
    description,
    telephone: '+37477769668',
    email: 'info@torgomyan-studio.am',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
      addressLocality: 'Martuni',
      addressRegion: 'Gegharkunik',
      addressCountry: 'AM',
    },
    areaServed: ['AM', 'RU', 'US', 'EU'],
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
    parentOrganization: { '@id': ORGANIZATION_ID },
    inLanguage: locale,
  };
}

export function buildGraphSchema(graph: Record<string, unknown>[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function buildServiceSchema({
  name,
  description,
  url,
  locale,
}: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    inLanguage: locale,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: {
      '@type': 'Country',
      name: 'Armenia',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      url,
    },
  };
}

export function buildFaqPageSchema(
  faq: Array<{ question: string; answer: string }>
) {
  if (!faq.length) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function buildWebPageSchema({
  name,
  description,
  url,
  locale,
}: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORGANIZATION_ID },
  };
}

export function buildContactPageSchema({
  name,
  description,
  url,
  locale,
  address,
  streetAddress,
}: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
  address: string;
  streetAddress: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name,
    description,
    url,
    inLanguage: locale,
    mainEntity: {
      '@id': ORGANIZATION_ID,
      '@type': 'Organization',
      name: SITE_NAME,
      telephone: '+37477769668',
      url: SITE_BASE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress,
        addressLocality: address,
        addressCountry: 'AM',
      },
    },
  };
}

export function buildWebApplicationSchema({
  name,
  description,
  url,
  locale,
}: {
  name: string;
  description: string;
  url: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name,
    description,
    url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: locale === 'hy' ? 'AMD' : locale === 'en' ? 'USD' : 'RUB',
    },
    provider: { '@id': ORGANIZATION_ID },
    inLanguage: locale,
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildOfferCatalogSchema({
  name,
  description,
  services,
}: {
  name: string;
  description: string;
  services: Array<{ name: string; url: string }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name,
    description,
    provider: { '@id': ORGANIZATION_ID },
    itemListElement: services.map((service, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: service.name,
        url: service.url,
      },
    })),
  };
}
