import { Metadata } from 'next';
import { headers } from 'next/headers';
import MainTemplate from '@/components/common/main-template/main-template';
import Calculator from '@/components/common/calculator/calculator';
import ContactUs from '@/components/common/contact-us/contact-us';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslations } from '@/i18n';
import { getPathnameWithoutLocale } from '@/i18n/utils';
import { locales, defaultLocale } from '@/i18n/config';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/calculator';
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);
  const baseUrl = 'https://torgomyan-studio.am';

  const alternates: Record<string, string> = {};
  locales.forEach((loc) => {
    const localePath =
      loc === defaultLocale ? pathWithoutLocale : `/${loc}${pathWithoutLocale}`;
    alternates[loc] = `${baseUrl}${localePath === '/' ? '' : localePath}`;
  });

  return {
    title: t.calculator.pageTitle,
    description: t.calculator.pageDescription,
    keywords: t.calculator.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.calculator.openGraphTitle,
      description: t.calculator.openGraphDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function CalculatorPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: t.calculator.hero.title,
    description: t.calculator.pageDescription,
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: locale === 'hy' ? 'AMD' : locale === 'en' ? 'USD' : 'RUB',
    },
    provider: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
      url: 'https://torgomyan-studio.am',
    },
  };

  return (
    <MainTemplate>
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Calculator />
        <ContactUs />
      </>
    </MainTemplate>
  );
}
