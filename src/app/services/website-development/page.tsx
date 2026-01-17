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
import { getTranslations, getTranslation } from '@/i18n';
import { getPathnameWithoutLocale } from '@/i18n/utils';
import { locales, defaultLocale } from '@/i18n/config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname =
    headersList.get('x-pathname') || '/services/website-development';
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
    title: t.websiteDevelopment.pageTitle,
    description: t.websiteDevelopment.pageDescription,
    keywords: t.websiteDevelopment.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.websiteDevelopment.openGraphTitle,
      description: t.websiteDevelopment.openGraphDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
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
          {
            number: '100+',
            label: t.websiteDevelopment.stats.successfulProjects,
          },
          { number: '50+', label: t.websiteDevelopment.stats.satisfiedClients },
          { number: '5+', label: t.websiteDevelopment.stats.yearsExperience },
          { number: '30%', label: t.websiteDevelopment.stats.businessGrowth },
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
