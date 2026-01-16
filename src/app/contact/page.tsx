import { Metadata } from 'next';
import { headers } from 'next/headers';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import ContactUs from '@/components/common/contact-us/contact-us';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslations } from '@/i18n';
import { getPathnameWithoutLocale } from '@/i18n/utils';
import { locales, defaultLocale } from '@/i18n/config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/contact';
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

  const baseUrl = 'https://torgomyan.studio';

  // Generate hreflang alternates
  const alternates: Record<string, string> = {};
  locales.forEach((loc) => {
    const localePath =
      loc === defaultLocale ? pathWithoutLocale : `/${loc}${pathWithoutLocale}`;
    alternates[loc] = `${baseUrl}${localePath === '/' ? '' : localePath}`;
  });

  return {
    title: t.contact.pageTitle,
    description: t.contact.pageDescription,
    keywords: t.contact.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.contact.pageTitle,
      description: t.contact.pageDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function ContactPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t.contact.structuredDataName,
    description: t.contact.structuredDataDescription,
    mainEntity: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AM',
        addressLocality:
          locale === 'hy'
            ? 'Մարտունի'
            : locale === 'ru'
              ? 'Мартуни'
              : 'Martuni',
        streetAddress:
          locale === 'hy'
            ? 'Մյասնիկյան 62'
            : locale === 'ru'
              ? 'Мясникян 62'
              : 'Myasnikyan 62',
      },
      telephone: '+37477769668',
      url: 'https://torgomyan.studio',
    },
  };

  return (
    <MainTemplate>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ServicesHeaderWithContent
        title={t.contact.headerTitle}
        description={t.contact.headerDescription}
      />

      <ContactUs />
    </MainTemplate>
  );
}
