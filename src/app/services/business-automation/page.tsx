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
  const pathname = headersList.get('x-pathname') || '/services/business-automation';
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
    title: t.businessAutomation.pageTitle,
    description: t.businessAutomation.pageDescription,
    keywords: t.businessAutomation.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.businessAutomation.openGraphTitle,
      description: t.businessAutomation.openGraphDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function BusinessAutomationPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.businessAutomation.title}
        description={t.businessAutomation.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: formatPrice(150000, locale), label: t.businessAutomation.stats.fromPrice },
          { number: '30%', label: t.businessAutomation.stats.timeSavings },
          { number: '1-6', label: t.businessAutomation.stats.monthsImplementation },
          { number: '50+', label: t.businessAutomation.stats.automatedProcesses },
        ]}
        benefits={[
          {
            title: t.businessAutomation.benefits.efficiencyIncrease.title,
            description: t.businessAutomation.benefits.efficiencyIncrease.description,
            icon: 'fas fa-bolt',
          },
          {
            title: t.businessAutomation.benefits.errorReduction.title,
            description: t.businessAutomation.benefits.errorReduction.description,
            icon: 'fas fa-check-circle',
          },
          {
            title: t.businessAutomation.benefits.resourceSavings.title,
            description: t.businessAutomation.benefits.resourceSavings.description,
            icon: 'fas fa-tag',
          },
          {
            title: t.businessAutomation.benefits.scalability.title,
            description: t.businessAutomation.benefits.scalability.description,
            icon: 'fas fa-expand-arrows-alt',
          },
          {
            title: t.businessAutomation.benefits.analytics.title,
            description: t.businessAutomation.benefits.analytics.description,
            icon: 'fas fa-chart-bar',
          },
          {
            title: t.businessAutomation.benefits.integrations.title,
            description: t.businessAutomation.benefits.integrations.description,
            icon: 'fas fa-plug',
          },
        ]}
        features={[
          t.businessAutomation.features.processAnalysis,
          t.businessAutomation.features.systemDesign,
          t.businessAutomation.features.solutionDevelopment,
          t.businessAutomation.features.systemIntegration,
          t.businessAutomation.features.notificationsReports,
          t.businessAutomation.features.staffTraining,
          t.businessAutomation.features.testingOptimization,
          t.businessAutomation.features.technicalSupport,
          t.businessAutomation.features.systemMonitoring,
          t.businessAutomation.features.continuousImprovement,
        ]}
        faq={[
          {
            question: t.businessAutomation.faq.processesToAutomate.question,
            answer: t.businessAutomation.faq.processesToAutomate.answer,
          },
          {
            question: t.businessAutomation.faq.cost.question,
            answer: t.businessAutomation.faq.cost.answer,
          },
          {
            question: t.businessAutomation.faq.implementationTime.question,
            answer: t.businessAutomation.faq.implementationTime.answer,
          },
          {
            question: t.businessAutomation.faq.existingSystems.question,
            answer: t.businessAutomation.faq.existingSystems.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.businessAutomation.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
