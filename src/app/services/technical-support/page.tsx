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
import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathWithoutLocale } = await getPagePathContext(
    '/services/technical-support'
  );
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.technicalSupport.pageTitle,
    description: t.technicalSupport.pageDescription,
    keywords: t.technicalSupport.pageKeywords,
    openGraphTitle: t.technicalSupport.openGraphTitle,
    openGraphDescription: t.technicalSupport.openGraphDescription,
  });
}

export default async function TechnicalSupportPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.technicalSupport.title}
        description={t.technicalSupport.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: '2,500₽', label: t.technicalSupport.stats.fromPricePerMonth },
          { number: '24/7', label: t.technicalSupport.stats.support },
          { number: '1-2ч', label: t.technicalSupport.stats.reactionTime },
          { number: '99.9%', label: t.technicalSupport.stats.uptime },
        ]}
        benefits={[
          {
            title: t.technicalSupport.benefits.roundTheClockSupport.title,
            description: t.technicalSupport.benefits.roundTheClockSupport.description,
            icon: 'fas fa-headset',
          },
          {
            title: t.technicalSupport.benefits.fastReaction.title,
            description: t.technicalSupport.benefits.fastReaction.description,
            icon: 'fas fa-bolt',
          },
          {
            title: t.technicalSupport.benefits.regularUpdates.title,
            description: t.technicalSupport.benefits.regularUpdates.description,
            icon: 'fas fa-sync-alt',
          },
          {
            title: t.technicalSupport.benefits.backup.title,
            description: t.technicalSupport.benefits.backup.description,
            icon: 'fas fa-database',
          },
          {
            title: t.technicalSupport.benefits.monitoring.title,
            description: t.technicalSupport.benefits.monitoring.description,
            icon: 'fas fa-chart-line',
          },
          {
            title: t.technicalSupport.benefits.security.title,
            description: t.technicalSupport.benefits.security.description,
            icon: 'fas fa-shield-alt',
          },
        ]}
        features={[
          t.technicalSupport.features.siteMonitoring,
          t.technicalSupport.features.bugFixes,
          t.technicalSupport.features.contentUpdates,
          t.technicalSupport.features.backup,
          t.technicalSupport.features.cmsUpdates,
          t.technicalSupport.features.virusProtection,
          t.technicalSupport.features.performanceOptimization,
          t.technicalSupport.features.consultations,
          t.technicalSupport.features.technicalDocumentation,
          t.technicalSupport.features.monthlyReports,
        ]}
        faq={[
          {
            question: t.technicalSupport.faq.servicesIncluded.question,
            answer: t.technicalSupport.faq.servicesIncluded.answer,
          },
          {
            question: t.technicalSupport.faq.cost.question,
            answer: t.technicalSupport.faq.cost.answer,
          },
          {
            question: t.technicalSupport.faq.reactionTime.question,
            answer: t.technicalSupport.faq.reactionTime.answer,
          },
          {
            question: t.technicalSupport.faq.differentCms.question,
            answer: t.technicalSupport.faq.differentCms.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.technicalSupport.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
