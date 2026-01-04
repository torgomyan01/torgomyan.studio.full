import { SITE_URL, Works } from '@/utils/consts';
import { headers } from 'next/headers';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();
  const host = await headersList.get('host');
  const proto = (await headersList.get('x-forwarded-proto')) || 'https';
  const baseUrl = `${proto}://${host}`;

  const now = new Date();

  // Blog articles
  const blogArticles = [
    {
      slug: '10-oshibok-pri-sozdanii-sajta',
      title: '10 ошибок при создании сайта',
    },
    {
      slug: 'kak-sozdat-uspeshnyj-lending',
      title: 'Как создать успешный лендинг',
    },
    {
      slug: 'kak-vybrat-cms',
      title: 'Как выбрать CMS',
    },
    {
      slug: 'kak-vybrat-veb-studiyu',
      title: 'Как выбрать веб-студию',
    },
    {
      slug: 'optimizaciya-skorosti-sajta',
      title: 'Оптимизация скорости сайта',
    },
    {
      slug: 'seo-optimizaciya-sajta',
      title: 'SEO оптимизация сайта',
    },
    {
      slug: 'trendy-veb-dizajna',
      title: 'Тренды веб-дизайна',
    },
  ];

  // Main pages with priorities
  const mainPages: MetadataRoute.Sitemap = [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Main services page
    {
      url: `${baseUrl}${SITE_URL.SERVICES}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Individual service pages - high priority
    {
      url: `${baseUrl}${SITE_URL.WEBSITE_DEVELOPMENT}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.LANDING_PAGE}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.BUSINESS_CARD_WEBSITE}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.CORPORATE_WEBSITE}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.ONLINE_SHOP}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.WEB_APPLICATIONS}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.SEO}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.UI_UX_DESIGN}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.TECHNICAL_SUPPORT}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.HOSTING_DOMAINS}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.PAYMENT_INTEGRATION}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}${SITE_URL.BUSINESS_AUTOMATION}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Portfolio page
    {
      url: `${baseUrl}${SITE_URL.OUR_WORKS}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Project detail pages - medium priority
    ...Works.map((work) => ({
      url: `${baseUrl}/our-works/${work.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // Calculator page
    {
      url: `${baseUrl}${SITE_URL.CALCULATOR}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    // Blog main page
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Blog articles - medium priority
    ...blogArticles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // Privacy policy - lower priority
    {
      url: `${baseUrl}${SITE_URL.PRIVACY_POLICY}`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  return mainPages;
}
