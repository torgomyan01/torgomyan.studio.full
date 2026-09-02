import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import OurWorks from '@/components/common/our-works/our-works';
import ContactUs from '@/components/common/contact-us/contact-us';
import DiscussBlock from '@/components/layout/services/discuss-block/discuss-block';
import SEOMarketingBlocks from '@/components/common/seo-marketing-blocks/seo-marketing-blocks';
import { getPagePathContext } from '@/i18n/metadata-utils';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslations } from '@/i18n';
import { formatPrice } from '@/i18n/utils';
import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathWithoutLocale } = await getPagePathContext(
    '/services/web-applications'
  );
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.webApplications.pageTitle,
    description: t.webApplications.pageDescription,
    keywords: t.webApplications.pageKeywords,
    openGraphTitle: t.webApplications.openGraphTitle,
    openGraphDescription: t.webApplications.openGraphDescription,
  });
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
          { number: formatPrice(50000, locale), label: t.webApplications.stats.fromPrice },
          { number: '1-6', label: t.webApplications.stats.monthsDevelopment },
          { number: 'Next.js', label: t.webApplications.stats.modernStack },
          { number: 'API', label: t.webApplications.stats.apiIntegration },
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
