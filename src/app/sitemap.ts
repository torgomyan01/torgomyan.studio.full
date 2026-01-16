import { SITE_URL, Works } from '@/utils/consts';
import { headers } from 'next/headers';
import { MetadataRoute } from 'next';
import { locales, defaultLocale } from '@/i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = await headersList.get('host');
  const proto = (await headersList.get('x-forwarded-proto')) || 'https';
  const baseUrl = `${proto}://${host}`;

  const now = new Date();

  // Helper function to generate URLs for all locales
  const generateLocalizedUrls = (path: string): MetadataRoute.Sitemap => {
    return locales.map((locale) => ({
      url:
        locale === defaultLocale
          ? `${baseUrl}${path}`
          : `${baseUrl}/${locale}${path}`,
      lastModified: now,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [
            loc,
            loc === defaultLocale
              ? `${baseUrl}${path}`
              : `${baseUrl}/${loc}${path}`,
          ])
        ),
      },
    }));
  };

  // Main pages with priorities - generate for all locales
  const mainPages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    ...generateLocalizedUrls('/').map((page) => ({
      ...page,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    })),
    // Main services page
    ...generateLocalizedUrls(SITE_URL.SERVICES).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    // Individual service pages - high priority
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
    ...generateLocalizedUrls(SITE_URL.SEO).map((page) => ({
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
    // Portfolio page
    ...generateLocalizedUrls(SITE_URL.OUR_WORKS).map((page) => ({
      ...page,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    // Project detail pages - medium priority
    ...Works.flatMap((work) =>
      generateLocalizedUrls(`/our-works/${work.slug}`).map((page) => ({
        ...page,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    ),
    // Calculator page
    ...generateLocalizedUrls(SITE_URL.CALCULATOR).map((page) => ({
      ...page,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    // Privacy policy - lower priority
    ...generateLocalizedUrls(SITE_URL.PRIVACY_POLICY).map((page) => ({
      ...page,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];

  return mainPages;
}
