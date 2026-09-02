import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import ContactUs from '@/components/common/contact-us/contact-us';
import JsonLd from '@/components/common/structured-data/json-ld';
import { getPagePathContext } from '@/i18n/metadata-utils';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslations } from '@/i18n';
import {
  buildContactPageSchema,
  buildLocalizedUrl,
  buildPageMetadata,
} from '@/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathWithoutLocale } = await getPagePathContext('/contact');
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.contact.pageTitle,
    description: t.contact.pageDescription,
    keywords: t.contact.pageKeywords,
  });
}

export default async function ContactPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  const structuredData = buildContactPageSchema({
    name: t.contact.structuredDataName,
    description: t.contact.structuredDataDescription,
    url: buildLocalizedUrl('/contact', locale),
    locale,
    address:
      locale === 'hy' ? 'Մարտունի' : locale === 'ru' ? 'Мартуни' : 'Martuni',
    streetAddress:
      locale === 'hy'
        ? 'Մյասնիկյան 62'
        : locale === 'ru'
          ? 'Мясникян 62'
          : 'Myasnikyan 62',
  });

  return (
    <MainTemplate>
      <JsonLd data={structuredData} />
      <ServicesHeaderWithContent
        title={t.contact.headerTitle}
        description={t.contact.headerDescription}
      />

      <ContactUs />
    </MainTemplate>
  );
}
