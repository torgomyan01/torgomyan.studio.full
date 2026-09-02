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
    '/services/hosting-domains'
  );
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.hostingDomains.pageTitle,
    description: t.hostingDomains.pageDescription,
    keywords: t.hostingDomains.pageKeywords,
    openGraphTitle: t.hostingDomains.openGraphTitle,
    openGraphDescription: t.hostingDomains.openGraphDescription,
  });
}

export default async function HostingDomainsPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.hostingDomains.title}
        description={t.hostingDomains.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: '80₽', label: t.hostingDomains.stats.fromPricePerMonth },
          { number: '99.9%', label: t.hostingDomains.stats.uptime },
          { number: '24/7', label: t.hostingDomains.stats.support },
          { number: 'SSL', label: t.hostingDomains.stats.free },
        ]}
        benefits={[
          {
            title: t.hostingDomains.benefits.highSpeed.title,
            description: t.hostingDomains.benefits.highSpeed.description,
            icon: 'fas fa-bolt',
          },
          {
            title: t.hostingDomains.benefits.stability.title,
            description: t.hostingDomains.benefits.stability.description,
            icon: 'fas fa-shield-alt',
          },
          {
            title: t.hostingDomains.benefits.security.title,
            description: t.hostingDomains.benefits.security.description,
            icon: 'fas fa-lock',
          },
          {
            title: t.hostingDomains.benefits.technicalSupport.title,
            description: t.hostingDomains.benefits.technicalSupport.description,
            icon: 'fas fa-headset',
          },
          {
            title: t.hostingDomains.benefits.backup.title,
            description: t.hostingDomains.benefits.backup.description,
            icon: 'fas fa-database',
          },
          {
            title: t.hostingDomains.benefits.scalability.title,
            description: t.hostingDomains.benefits.scalability.description,
            icon: 'fas fa-expand-arrows-alt',
          },
        ]}
        features={[
          t.hostingDomains.features.domainRegistration,
          t.hostingDomains.features.virtualHosting,
          t.hostingDomains.features.vpsServers,
          t.hostingDomains.features.sslCertificates,
          t.hostingDomains.features.backup,
          t.hostingDomains.features.ddosProtection,
          t.hostingDomains.features.support247,
          t.hostingDomains.features.controlPanel,
          t.hostingDomains.features.siteMigration,
          t.hostingDomains.features.emailSetup,
        ]}
        faq={[
          {
            question: t.hostingDomains.faq.hostingPlans.question,
            answer: t.hostingDomains.faq.hostingPlans.answer,
          },
          {
            question: t.hostingDomains.faq.siteMigration.question,
            answer: t.hostingDomains.faq.siteMigration.answer,
          },
          {
            question: t.hostingDomains.faq.sslCertificate.question,
            answer: t.hostingDomains.faq.sslCertificate.answer,
          },
          {
            question: t.hostingDomains.faq.uptimeGuarantee.question,
            answer: t.hostingDomains.faq.uptimeGuarantee.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.hostingDomains.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
