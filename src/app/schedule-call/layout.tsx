import { Metadata } from 'next';
import { getPagePathContext } from '@/i18n/metadata-utils';
import { getTranslations } from '@/i18n';
import { buildPageMetadata } from '@/utils/seo';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathWithoutLocale } = await getPagePathContext('/schedule-call');
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.scheduleCallPage.pageTitle,
    description: t.scheduleCallPage.pageDescription,
    keywords: t.scheduleCallPage.pageKeywords,
    openGraphTitle: t.scheduleCallPage.openGraphTitle,
    openGraphDescription: t.scheduleCallPage.openGraphDescription,
  });
}

export default function ScheduleCallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
