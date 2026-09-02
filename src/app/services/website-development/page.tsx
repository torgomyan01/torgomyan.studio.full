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
import { getTranslations, getTranslation } from '@/i18n';
import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathWithoutLocale } = await getPagePathContext(
    '/services/website-development'
  );
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.websiteDevelopment.pageTitle,
    description: t.websiteDevelopment.pageDescription,
    keywords: t.websiteDevelopment.pageKeywords,
    openGraphTitle: t.websiteDevelopment.openGraphTitle,
    openGraphDescription: t.websiteDevelopment.openGraphDescription,
  });
}

export default async function WebsiteDevelopmentPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.websiteDevelopment.title}
        description={t.websiteDevelopment.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: '2-8', label: t.websiteDevelopment.stats.weeksToLaunch },
          { number: 'Next.js', label: t.websiteDevelopment.stats.modernStack },
          { number: '3', label: t.websiteDevelopment.stats.languages },
          { number: '2h', label: t.websiteDevelopment.stats.responseTime },
        ]}
        benefits={[
          {
            title: t.websiteDevelopment.benefits.individualApproach.title,
            description:
              t.websiteDevelopment.benefits.individualApproach.description,
            icon: 'fas fa-user-tie',
          },
          {
            title: t.websiteDevelopment.benefits.modernTechnologies.title,
            description:
              t.websiteDevelopment.benefits.modernTechnologies.description,
            icon: 'fas fa-laptop-code',
          },
          {
            title: t.websiteDevelopment.benefits.seoOptimization.title,
            description:
              t.websiteDevelopment.benefits.seoOptimization.description,
            icon: 'fas fa-chart-line',
          },
          {
            title: t.websiteDevelopment.benefits.responsiveDesign.title,
            description:
              t.websiteDevelopment.benefits.responsiveDesign.description,
            icon: 'fas fa-mobile-alt',
          },
          {
            title: t.websiteDevelopment.benefits.fastLoading.title,
            description: t.websiteDevelopment.benefits.fastLoading.description,
            icon: 'fas fa-bolt',
          },
          {
            title: t.websiteDevelopment.benefits.technicalSupport.title,
            description:
              t.websiteDevelopment.benefits.technicalSupport.description,
            icon: 'fas fa-headset',
          },
        ]}
        features={[
          t.websiteDevelopment.features.businessAnalysis,
          t.websiteDevelopment.features.uniqueDesign,
          t.websiteDevelopment.features.responsiveLayout,
          t.websiteDevelopment.features.cmsIntegration,
          t.websiteDevelopment.features.seoOptimization,
          t.websiteDevelopment.features.analyticsSetup,
          t.websiteDevelopment.features.testingOptimization,
          t.websiteDevelopment.features.training,
          t.websiteDevelopment.features.postLaunchSupport,
        ]}
        faq={[
          {
            question: t.websiteDevelopment.faq.developmentTime.question,
            answer: t.websiteDevelopment.faq.developmentTime.answer,
          },
          {
            question: t.websiteDevelopment.faq.cost.question,
            answer: t.websiteDevelopment.faq.cost.answer,
          },
          {
            question: t.websiteDevelopment.faq.seoIncluded.question,
            answer: t.websiteDevelopment.faq.seoIncluded.answer,
          },
          {
            question: t.websiteDevelopment.faq.contentEditing.question,
            answer: t.websiteDevelopment.faq.contentEditing.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.websiteDevelopment.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
