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
    '/services/business-card-website'
  );
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.businessCardWebsite.pageTitle,
    description: t.businessCardWebsite.pageDescription,
    keywords: t.businessCardWebsite.pageKeywords,
    openGraphTitle: t.businessCardWebsite.openGraphTitle,
    openGraphDescription: t.businessCardWebsite.openGraphDescription,
  });
}

export default async function BusinessCardWebsitePage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title={t.businessCardWebsite.title}
        description={t.businessCardWebsite.description}
      />

      <SEOMarketingBlocks
        stats={[
          { number: formatPrice(8000, locale), label: t.businessCardWebsite.stats.fromPrice },
          { number: '1-2', label: t.businessCardWebsite.stats.weeksToLaunch },
          { number: '3-5', label: t.businessCardWebsite.stats.pagesIncluded },
          { number: '100%', label: t.businessCardWebsite.stats.readyToWork },
        ]}
        benefits={[
          {
            title: t.businessCardWebsite.benefits.affordablePrice.title,
            description:
              t.businessCardWebsite.benefits.affordablePrice.description,
            icon: 'fas fa-tag',
          },
          {
            title: t.businessCardWebsite.benefits.fastLaunch.title,
            description: t.businessCardWebsite.benefits.fastLaunch.description,
            icon: 'fas fa-bolt',
          },
          {
            title: t.businessCardWebsite.benefits.easyManagement.title,
            description:
              t.businessCardWebsite.benefits.easyManagement.description,
            icon: 'fas fa-user-tie',
          },
          {
            title: t.businessCardWebsite.benefits.mobileAdaptation.title,
            description:
              t.businessCardWebsite.benefits.mobileAdaptation.description,
            icon: 'fas fa-mobile-alt',
          },
          {
            title: t.businessCardWebsite.benefits.seoOptimization.title,
            description:
              t.businessCardWebsite.benefits.seoOptimization.description,
            icon: 'fas fa-chart-line',
          },
          {
            title: t.businessCardWebsite.benefits.professionalLook.title,
            description:
              t.businessCardWebsite.benefits.professionalLook.description,
            icon: 'fas fa-palette',
          },
        ]}
        features={[
          t.businessCardWebsite.features.designDevelopment,
          t.businessCardWebsite.features.createPages,
          t.businessCardWebsite.features.responsiveLayout,
          t.businessCardWebsite.features.cms,
          t.businessCardWebsite.features.contactForm,
          t.businessCardWebsite.features.mapIntegration,
          t.businessCardWebsite.features.seoOptimization,
          t.businessCardWebsite.features.training,
        ]}
        faq={[
          {
            question: t.businessCardWebsite.faq.pagesCount.question,
            answer: t.businessCardWebsite.faq.pagesCount.answer,
          },
          {
            question: t.businessCardWebsite.faq.cost.question,
            answer: t.businessCardWebsite.faq.cost.answer,
          },
          {
            question: t.businessCardWebsite.faq.expandable.question,
            answer: t.businessCardWebsite.faq.expandable.answer,
          },
          {
            question: t.businessCardWebsite.faq.creationTime.question,
            answer: t.businessCardWebsite.faq.creationTime.answer,
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but={t.businessCardWebsite.serviceButton} />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
