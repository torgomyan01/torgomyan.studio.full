import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import Calculator from '@/components/common/calculator/calculator';
import ContactUs from '@/components/common/contact-us/contact-us';
import JsonLd from '@/components/common/structured-data/json-ld';
import { getPagePathContext } from '@/i18n/metadata-utils';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslations } from '@/i18n';
import {
  buildLocalizedUrl,
  buildPageMetadata,
  buildWebApplicationSchema,
} from '@/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathWithoutLocale } = await getPagePathContext('/calculator');
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.calculator.pageTitle,
    description: t.calculator.pageDescription,
    keywords: t.calculator.pageKeywords,
    openGraphTitle: t.calculator.openGraphTitle,
    openGraphDescription: t.calculator.openGraphDescription,
  });
}

export default async function CalculatorPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  const structuredData = buildWebApplicationSchema({
    name: t.calculator.hero.title,
    description: t.calculator.pageDescription,
    url: buildLocalizedUrl('/calculator', locale),
    locale,
  });

  return (
    <MainTemplate>
      <>
        <JsonLd data={structuredData} />
        <Calculator />
        <ContactUs />
      </>
    </MainTemplate>
  );
}
