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
  const pathname = headersList.get('x-pathname') || '/services/ui-ux-design';
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
    title: t.uiUxDesign.pageTitle,
    description: t.uiUxDesign.pageDescription,
    keywords: t.uiUxDesign.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.uiUxDesign.openGraphTitle,
      description: t.uiUxDesign.openGraphDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function UIUXDesignPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.uiUxDesign.title}
        description={t.uiUxDesign.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: formatPrice(80000, locale), label: t.uiUxDesign.stats.fromPrice },
          { number: '20-40%', label: t.uiUxDesign.stats.conversionGrowth },
          { number: '2-3', label: t.uiUxDesign.stats.weeksDevelopment },
          { number: '100+', label: t.uiUxDesign.stats.designProjects },
        ]}
        benefits={[
          {
            title: t.uiUxDesign.benefits.conversionIncrease.title,
            description: t.uiUxDesign.benefits.conversionIncrease.description,
            icon: 'fas fa-chart-line',
          },
          {
            title: t.uiUxDesign.benefits.usability.title,
            description: t.uiUxDesign.benefits.usability.description,
            icon: 'fas fa-user-tie',
          },
          {
            title: t.uiUxDesign.benefits.modernDesign.title,
            description: t.uiUxDesign.benefits.modernDesign.description,
            icon: 'fas fa-palette',
          },
          {
            title: t.uiUxDesign.benefits.responsiveness.title,
            description: t.uiUxDesign.benefits.responsiveness.description,
            icon: 'fas fa-mobile-alt',
          },
          {
            title: t.uiUxDesign.benefits.userResearch.title,
            description: t.uiUxDesign.benefits.userResearch.description,
            icon: 'fas fa-search',
          },
          {
            title: t.uiUxDesign.benefits.prototyping.title,
            description: t.uiUxDesign.benefits.prototyping.description,
            icon: 'fas fa-drafting-compass',
          },
        ]}
        features={[
          t.uiUxDesign.features.audienceAnalysis,
          t.uiUxDesign.features.competitorResearch,
          t.uiUxDesign.features.userScenarios,
          t.uiUxDesign.features.wireframes,
          t.uiUxDesign.features.visualDesign,
          t.uiUxDesign.features.designSystem,
          t.uiUxDesign.features.interactivePrototypes,
          t.uiUxDesign.features.responsiveDesign,
          t.uiUxDesign.features.mockupsPreparation,
          t.uiUxDesign.features.testingIterations,
        ]}
        faq={[
          {
            question: t.uiUxDesign.faq.uiUxDifference.question,
            answer: t.uiUxDesign.faq.uiUxDifference.answer,
          },
          {
            question: t.uiUxDesign.faq.cost.question,
            answer: t.uiUxDesign.faq.cost.answer,
          },
          {
            question: t.uiUxDesign.faq.developmentTime.question,
            answer: t.uiUxDesign.faq.developmentTime.answer,
          },
          {
            question: t.uiUxDesign.faq.designSystem.question,
            answer: t.uiUxDesign.faq.designSystem.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.uiUxDesign.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
