import { SITE_URL, Works } from '@/utils/consts';
import { MetadataRoute } from 'next';
import { locales, defaultLocale, type Locale } from '@/i18n/config';
import {
  SITE_BASE_URL,
  HREFLANG_BY_LOCALE,
  buildLocalizedUrl,
} from '@/utils/seo';

function buildSitemapLanguages(path: string): Record<string, string> {
  const languages: Record<string, string> = {};

  locales.forEach((locale) => {
    const url = buildLocalizedUrl(path === '/' ? '/' : path, locale);
    languages[HREFLANG_BY_LOCALE[locale]] = url;
    languages[locale] = url;
  });

  languages['x-default'] = buildLocalizedUrl(
    path === '/' ? '/' : path,
    defaultLocale
  );

  return languages;
}

function generateLocalizedUrls(path: string): MetadataRoute.Sitemap {
  const normalizedPath = path === '/' ? '/' : path;

  return locales.map((locale: Locale) => ({
    url: buildLocalizedUrl(normalizedPath, locale),
    lastModified: new Date(),
    alternates: {
      languages: buildSitemapLanguages(normalizedPath),
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const mainPages: MetadataRoute.Sitemap = [
    ...generateLocalizedUrls('/').map((page) => ({
      ...page,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    })),
    ...generateLocalizedUrls(SITE_URL.SERVICES).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...generateLocalizedUrls(SITE_URL.WEBSITE_DEVELOPMENT).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.LANDING_PAGE).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.BUSINESS_CARD_WEBSITE).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.CORPORATE_WEBSITE).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.ONLINE_SHOP).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.WEB_APPLICATIONS).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.UI_UX_DESIGN).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.TECHNICAL_SUPPORT).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.HOSTING_DOMAINS).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.PAYMENT_INTEGRATION).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.BUSINESS_AUTOMATION).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...generateLocalizedUrls(SITE_URL.OUR_WORKS).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...Works.flatMap((work) =>
      generateLocalizedUrls(`/our-works/${work.slug}`).map((page) => ({
        ...page,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    ),
    ...generateLocalizedUrls(SITE_URL.CALCULATOR).map((page) => ({
      ...page,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...generateLocalizedUrls(SITE_URL.CONTACT).map((page) => ({
      ...page,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...generateLocalizedUrls('/schedule-call').map((page) => ({
      ...page,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...generateLocalizedUrls(SITE_URL.PRIVACY_POLICY).map((page) => ({
      ...page,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];

  return mainPages;
}
