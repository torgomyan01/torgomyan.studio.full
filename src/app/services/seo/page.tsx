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
  const pathname = headersList.get('x-pathname') || '/services/seo';
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
    title: t.seo.pageTitle,
    description: t.seo.pageDescription,
    keywords: t.seo.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.seo.openGraphTitle,
      description: t.seo.openGraphDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function SEOPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.seo.title}
        description={t.seo.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: formatPrice(40000, locale), label: t.seo.stats.fromPricePerMonth },
          { number: '2-3', label: t.seo.stats.monthsToResults },
          { number: '100+', label: t.seo.stats.promotedSites },
          { number: '30%', label: t.seo.stats.trafficGrowth },
        ]}
        benefits={[
          {
            title: t.seo.benefits.organicTraffic.title,
            description: t.seo.benefits.organicTraffic.description,
            icon: 'fas fa-chart-line',
          },
          {
            title: t.seo.benefits.longTermResult.title,
            description: t.seo.benefits.longTermResult.description,
            icon: 'fas fa-calendar-check',
          },
          {
            title: t.seo.benefits.conversionGrowth.title,
            description: t.seo.benefits.conversionGrowth.description,
            icon: 'fas fa-bullseye',
          },
          {
            title: t.seo.benefits.technicalOptimization.title,
            description: t.seo.benefits.technicalOptimization.description,
            icon: 'fas fa-cog',
          },
          {
            title: t.seo.benefits.contentWork.title,
            description: t.seo.benefits.contentWork.description,
            icon: 'fas fa-pencil',
          },
          {
            title: t.seo.benefits.regularReporting.title,
            description: t.seo.benefits.regularReporting.description,
            icon: 'fas fa-chart-bar',
          },
        ]}
        features={[
          t.seo.features.siteCompetitorAudit,
          t.seo.features.keywordResearch,
          t.seo.features.technicalOptimization,
          t.seo.features.contentOptimization,
          t.seo.features.newContentCreation,
          t.seo.features.internalLinking,
          t.seo.features.externalLinks,
          t.seo.features.analyticsSetup,
          t.seo.features.positionMonitoring,
          t.seo.features.monthlyReporting,
        ]}
        faq={[
          {
            question: t.seo.faq.resultsTime.question,
            answer: t.seo.faq.resultsTime.answer,
          },
          {
            question: t.seo.faq.cost.question,
            answer: t.seo.faq.cost.answer,
          },
          {
            question: t.seo.faq.yandexGoogle.question,
            answer: t.seo.faq.yandexGoogle.answer,
          },
          {
            question: t.seo.faq.advertisingCombination.question,
            answer: t.seo.faq.advertisingCombination.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.seo.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
