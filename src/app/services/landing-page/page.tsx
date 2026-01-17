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
  const pathname = headersList.get('x-pathname') || '/services/landing-page';
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
    title: t.landingPage.pageTitle,
    description: t.landingPage.pageDescription,
    keywords: t.landingPage.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.landingPage.openGraphTitle,
      description: t.landingPage.openGraphDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function LandingPagePage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.landingPage.title}
        description={t.landingPage.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: formatPrice(40000, locale), label: t.landingPage.stats.fromPrice },
          { number: '2-3x', label: t.landingPage.stats.higherConversion },
          { number: '1-2', label: t.landingPage.stats.weeksToLaunch },
          { number: '90+', label: t.landingPage.stats.successfulLandings },
        ]}
        benefits={[
          {
            title: t.landingPage.benefits.highConversion.title,
            description: t.landingPage.benefits.highConversion.description,
            icon: 'fas fa-chart-line',
          },
          {
            title: t.landingPage.benefits.fastLaunch.title,
            description: t.landingPage.benefits.fastLaunch.description,
            icon: 'fas fa-bolt',
          },
          {
            title: t.landingPage.benefits.focusOnGoal.title,
            description: t.landingPage.benefits.focusOnGoal.description,
            icon: 'fas fa-bullseye',
          },
          {
            title: t.landingPage.benefits.abTesting.title,
            description: t.landingPage.benefits.abTesting.description,
            icon: 'fas fa-flask',
          },
          {
            title: t.landingPage.benefits.mobileOptimization.title,
            description: t.landingPage.benefits.mobileOptimization.description,
            icon: 'fas fa-mobile-alt',
          },
          {
            title: t.landingPage.benefits.adIntegration.title,
            description: t.landingPage.benefits.adIntegration.description,
            icon: 'fas fa-ad',
          },
        ]}
        features={[
          t.landingPage.features.audienceAnalysis,
          t.landingPage.features.uniqueDesign,
          t.landingPage.features.compellingContent,
          t.landingPage.features.leadForms,
          t.landingPage.features.analyticsIntegration,
          t.landingPage.features.abTestingSetup,
          t.landingPage.features.mobileAdaptation,
          t.landingPage.features.seoOptimization,
          t.landingPage.features.adSystemsIntegration,
        ]}
        faq={[
          {
            question: t.landingPage.faq.difference.question,
            answer: t.landingPage.faq.difference.answer,
          },
          {
            question: t.landingPage.faq.cost.question,
            answer: t.landingPage.faq.cost.answer,
          },
          {
            question: t.landingPage.faq.launchTime.question,
            answer: t.landingPage.faq.launchTime.answer,
          },
          {
            question: t.landingPage.faq.adHelp.question,
            answer: t.landingPage.faq.adHelp.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.landingPage.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
