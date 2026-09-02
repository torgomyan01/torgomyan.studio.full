import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import ContactUs from '@/components/common/contact-us/contact-us';
import AllWorks from '@/components/common/all-works/all-works';
import JsonLd from '@/components/common/structured-data/json-ld';
import { getPagePathContext } from '@/i18n/metadata-utils';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslations } from '@/i18n';
import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathWithoutLocale } = await getPagePathContext('/our-works');
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.ourWorks.pageTitle,
    description: t.ourWorks.pageDescription,
    keywords: t.ourWorks.pageKeywords,
    openGraphTitle: t.ourWorks.openGraphTitle,
    openGraphDescription: t.ourWorks.openGraphDescription,
  });
}

export default async function OurWorksPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t.ourWorks.structuredData.name,
    description: t.ourWorks.structuredData.description,
    mainEntity: {
      '@type': 'ItemList',
      name: t.ourWorks.structuredData.portfolioName,
    },
  };

  return (
    <MainTemplate>
      <JsonLd data={structuredData} />
      <ServicesHeaderWithContent
        title={t.ourWorks.pageHeaderTitle}
        description={t.ourWorks.pageHeaderDescription}
      />

      <AllWorks />

      <ContactUs />
    </MainTemplate>
  );
}
