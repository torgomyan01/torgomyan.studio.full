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
    '/services/online-shop'
  );
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.onlineShop.pageTitle,
    description: t.onlineShop.pageDescription,
    keywords: t.onlineShop.pageKeywords,
    openGraphTitle: t.onlineShop.openGraphTitle,
    openGraphDescription: t.onlineShop.openGraphDescription,
  });
}

export default async function OnlineShopPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.onlineShop.title}
        description={t.onlineShop.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: formatPrice(33000, locale), label: t.onlineShop.stats.fromPrice },
          { number: '2-3', label: t.onlineShop.stats.monthsDevelopment },
          { number: 'SSL', label: t.onlineShop.stats.securePayments },
          { number: 'Mobile', label: t.onlineShop.stats.mobileReady },
        ]}
        benefits={[
          {
            title: t.onlineShop.benefits.fullFunctionality.title,
            description: t.onlineShop.benefits.fullFunctionality.description,
            icon: 'fas fa-shopping-cart',
          },
          {
            title: t.onlineShop.benefits.paymentIntegration.title,
            description: t.onlineShop.benefits.paymentIntegration.description,
            icon: 'fas fa-credit-card',
          },
          {
            title: t.onlineShop.benefits.productManagement.title,
            description: t.onlineShop.benefits.productManagement.description,
            icon: 'fas fa-cogs',
          },
          {
            title: t.onlineShop.benefits.mobileVersion.title,
            description: t.onlineShop.benefits.mobileVersion.description,
            icon: 'fas fa-mobile-alt',
          },
          {
            title: t.onlineShop.benefits.seoOptimization.title,
            description: t.onlineShop.benefits.seoOptimization.description,
            icon: 'fas fa-chart-line',
          },
          {
            title: t.onlineShop.benefits.deliveryIntegration.title,
            description: t.onlineShop.benefits.deliveryIntegration.description,
            icon: 'fas fa-truck',
          },
        ]}
        features={[
          t.onlineShop.features.productCatalog,
          t.onlineShop.features.cartCheckout,
          t.onlineShop.features.userAccount,
          t.onlineShop.features.paymentSystems,
          t.onlineShop.features.orderManagement,
          t.onlineShop.features.discountsPromocodes,
          t.onlineShop.features.deliveryIntegration,
          t.onlineShop.features.reviewsRatings,
          t.onlineShop.features.catalogSearch,
          t.onlineShop.features.seoOptimization,
          t.onlineShop.features.analyticsReports,
        ]}
        faq={[
          {
            question: t.onlineShop.faq.cost.question,
            answer: t.onlineShop.faq.cost.answer,
          },
          {
            question: t.onlineShop.faq.developmentTime.question,
            answer: t.onlineShop.faq.developmentTime.answer,
          },
          {
            question: t.onlineShop.faq.selfManagement.question,
            answer: t.onlineShop.faq.selfManagement.answer,
          },
          {
            question: t.onlineShop.faq.paymentSystems.question,
            answer: t.onlineShop.faq.paymentSystems.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.onlineShop.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
