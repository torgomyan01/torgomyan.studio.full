import { SITE_BASE_URL } from '@/utils/seo';

export default async function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_BASE_URL}/sitemap.xml`,
  };
}
