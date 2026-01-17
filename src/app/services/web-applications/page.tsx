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
  const pathname = headersList.get('x-pathname') || '/services/web-applications';
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
    title: t.webApplications.pageTitle,
    description: t.webApplications.pageDescription,
    keywords: t.webApplications.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.webApplications.openGraphTitle,
      description: t.webApplications.openGraphDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function WebApplicationsPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.webApplications.title}
        description={t.webApplications.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: formatPrice(300000, locale), label: t.webApplications.stats.fromPrice },
          { number: '1-6', label: t.webApplications.stats.monthsDevelopment },
          { number: '90+', label: t.webApplications.stats.projects },
          { number: '99.9%', label: t.webApplications.stats.uptime },
        ]}
        benefits={[
          {
            title: t.webApplications.benefits.customDevelopment.title,
            description: t.webApplications.benefits.customDevelopment.description,
            icon: 'fas fa-code',
          },
          {
            title: t.webApplications.benefits.modernTechnologies.title,
            description: t.webApplications.benefits.modernTechnologies.description,
            icon: 'fas fa-laptop-code',
          },
          {
            title: t.webApplications.benefits.highPerformance.title,
            description: t.webApplications.benefits.highPerformance.description,
            icon: 'fas fa-bolt',
          },
          {
            title: t.webApplications.benefits.security.title,
            description: t.webApplications.benefits.security.description,
            icon: 'fas fa-shield-alt',
          },
          {
            title: t.webApplications.benefits.scalability.title,
            description: t.webApplications.benefits.scalability.description,
            icon: 'fas fa-expand-arrows-alt',
          },
          {
            title: t.webApplications.benefits.apiIntegrations.title,
            description: t.webApplications.benefits.apiIntegrations.description,
            icon: 'fas fa-plug',
          },
        ]}
        features={[
          t.webApplications.features.requirementsAnalysis,
          t.webApplications.features.architectureDevelopment,
          t.webApplications.features.uiCreation,
          t.webApplications.features.backendDevelopment,
          t.webApplications.features.databaseSetup,
          t.webApplications.features.externalApiIntegration,
          t.webApplications.features.testingDebugging,
          t.webApplications.features.performanceOptimization,
          t.webApplications.features.deploymentSetup,
          t.webApplications.features.technicalSupport,
        ]}
        faq={[
          {
            question: t.webApplications.faq.technologies.question,
            answer: t.webApplications.faq.technologies.answer,
          },
          {
            question: t.webApplications.faq.developmentTime.question,
            answer: t.webApplications.faq.developmentTime.answer,
          },
          {
            question: t.webApplications.faq.cost.question,
            answer: t.webApplications.faq.cost.answer,
          },
          {
            question: t.webApplications.faq.technicalSupport.question,
            answer: t.webApplications.faq.technicalSupport.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.webApplications.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
