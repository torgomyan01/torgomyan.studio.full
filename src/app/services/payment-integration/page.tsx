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
    '/services/payment-integration'
  );
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.paymentIntegration.pageTitle,
    description: t.paymentIntegration.pageDescription,
    keywords: t.paymentIntegration.pageKeywords,
    openGraphTitle: t.paymentIntegration.openGraphTitle,
    openGraphDescription: t.paymentIntegration.openGraphDescription,
  });
}

export default async function PaymentIntegrationPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.paymentIntegration.title}
        description={t.paymentIntegration.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: formatPrice(7500, locale), label: t.paymentIntegration.stats.fromPrice },
          { number: '1-2', label: t.paymentIntegration.stats.weeksIntegration },
          { number: '10+', label: t.paymentIntegration.stats.paymentSystems },
          { number: '100%', label: t.paymentIntegration.stats.security },
        ]}
        benefits={[
          {
            title: t.paymentIntegration.benefits.security.title,
            description: t.paymentIntegration.benefits.security.description,
            icon: 'fas fa-shield-alt',
          },
          {
            title: t.paymentIntegration.benefits.multipleSystems.title,
            description: t.paymentIntegration.benefits.multipleSystems.description,
            icon: 'fas fa-credit-card',
          },
          {
            title: t.paymentIntegration.benefits.quickConnection.title,
            description: t.paymentIntegration.benefits.quickConnection.description,
            icon: 'fas fa-bolt',
          },
          {
            title: t.paymentIntegration.benefits.customerConvenience.title,
            description: t.paymentIntegration.benefits.customerConvenience.description,
            icon: 'fas fa-user-tie',
          },
          {
            title: t.paymentIntegration.benefits.mobilePayment.title,
            description: t.paymentIntegration.benefits.mobilePayment.description,
            icon: 'fas fa-mobile-alt',
          },
          {
            title: t.paymentIntegration.benefits.technicalSupport.title,
            description: t.paymentIntegration.benefits.technicalSupport.description,
            icon: 'fas fa-headset',
          },
        ]}
        features={[
          t.paymentIntegration.features.requirementsAnalysis,
          t.paymentIntegration.features.gatewaySetup,
          t.paymentIntegration.features.apiIntegration,
          t.paymentIntegration.features.paymentForm,
          t.paymentIntegration.features.notificationsSetup,
          t.paymentIntegration.features.successfulPayments,
          t.paymentIntegration.features.refunds,
          t.paymentIntegration.features.recurringPayments,
          t.paymentIntegration.features.crmIntegration,
          t.paymentIntegration.features.testingDebugging,
        ]}
        faq={[
          {
            question: t.paymentIntegration.faq.paymentSystems.question,
            answer: t.paymentIntegration.faq.paymentSystems.answer,
          },
          {
            question: t.paymentIntegration.faq.cost.question,
            answer: t.paymentIntegration.faq.cost.answer,
          },
          {
            question: t.paymentIntegration.faq.integrationTime.question,
            answer: t.paymentIntegration.faq.integrationTime.answer,
          },
          {
            question: t.paymentIntegration.faq.registration.question,
            answer: t.paymentIntegration.faq.registration.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.paymentIntegration.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
