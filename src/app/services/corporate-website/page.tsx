import { Metadata } from 'next';
import { headers } from 'next/headers';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import OurWorks from '@/components/common/our-works/our-works';
import ContactUs from '@/components/common/contact-us/contact-us';
import DiscussBlock from '@/components/layout/services/discuss-block/discuss-block';
import SEOMarketingBlocks from '@/components/common/seo-marketing-blocks/seo-marketing-blocks';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslations } from '@/i18n';
import { getPathnameWithoutLocale } from '@/i18n/utils';
import { locales, defaultLocale } from '@/i18n/config';
import { formatPrice } from '@/i18n/utils';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname =
    headersList.get('x-pathname') || '/services/corporate-website';
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

  const baseUrl = 'https://torgomyan-studio.am';

  // Generate hreflang alternates
  const alternates: Record<string, string> = {};
  locales.forEach((loc) => {
    const localePath =
      loc === defaultLocale ? pathWithoutLocale : `/${loc}${pathWithoutLocale}`;
    alternates[loc] = `${baseUrl}${localePath === '/' ? '' : localePath}`;
  });

  return {
    title: t.corporateWebsite.pageTitle,
    description: t.corporateWebsite.pageDescription,
    keywords: t.corporateWebsite.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.corporateWebsite.openGraphTitle,
      description: t.corporateWebsite.openGraphDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function CorporateWebsitePage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.corporateWebsite.title}
        description={t.corporateWebsite.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: formatPrice(120000, locale), label: t.corporateWebsite.stats.fromPrice },
          { number: '10-30', label: t.corporateWebsite.stats.pagesIncluded },
          { number: '3-6', label: t.corporateWebsite.stats.weeksDevelopment },
          { number: '24/7', label: t.corporateWebsite.stats.support },
        ]}
        benefits={[
          {
            title: t.corporateWebsite.benefits.fullFunctionality.title,
            description:
              t.corporateWebsite.benefits.fullFunctionality.description,
            icon: 'fas fa-briefcase',
          },
          {
            title: t.corporateWebsite.benefits.corporateStyle.title,
            description: t.corporateWebsite.benefits.corporateStyle.description,
            icon: 'fas fa-palette',
          },
          {
            title: t.corporateWebsite.benefits.scalability.title,
            description: t.corporateWebsite.benefits.scalability.description,
            icon: 'fas fa-chart-line',
          },
          {
            title: t.corporateWebsite.benefits.multilingual.title,
            description: t.corporateWebsite.benefits.multilingual.description,
            icon: 'fas fa-globe',
          },
          {
            title: t.corporateWebsite.benefits.integrations.title,
            description: t.corporateWebsite.benefits.integrations.description,
            icon: 'fas fa-plug',
          },
          {
            title: t.corporateWebsite.benefits.security.title,
            description: t.corporateWebsite.benefits.security.description,
            icon: 'fas fa-shield-alt',
          },
        ]}
        features={[
          t.corporateWebsite.features.structureDevelopment,
          t.corporateWebsite.features.uniqueDesign,
          t.corporateWebsite.features.sectionsDevelopment,
          t.corporateWebsite.features.cms,
          t.corporateWebsite.features.multilingualSupport,
          t.corporateWebsite.features.crmIntegration,
          t.corporateWebsite.features.contactForms,
          t.corporateWebsite.features.blogNews,
          t.corporateWebsite.features.galleryPortfolio,
          t.corporateWebsite.features.seoOptimization,
          t.corporateWebsite.features.technicalSupport,
        ]}
        faq={[
          {
            question: t.corporateWebsite.faq.pagesCount.question,
            answer: t.corporateWebsite.faq.pagesCount.answer,
          },
          {
            question: t.corporateWebsite.faq.cost.question,
            answer: t.corporateWebsite.faq.cost.answer,
          },
          {
            question: t.corporateWebsite.faq.crmIntegration.question,
            answer: t.corporateWebsite.faq.crmIntegration.answer,
          },
          {
            question: t.corporateWebsite.faq.multilingual.question,
            answer: t.corporateWebsite.faq.multilingual.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.corporateWebsite.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
