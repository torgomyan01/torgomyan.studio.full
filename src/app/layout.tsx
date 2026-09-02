import './globals.scss';
import '../icons/icons.css';
import '@/components/ui/_ui-components.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './tailwind.css';

import { Roboto } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import { Providers } from '@/app/providers';
import { UiProviders } from '@/components/common/UIProvider/ui-provider';
import FloatingCallButton from '@/components/common/floating-call-button/floating-call-button';
import ScrollTriggeredPopup from '@/components/common/scroll-triggered-popup/scroll-triggered-popup';
import { NotificationProvider } from '@/components/common/recent-notifications/notification-context';
import { ToastNotifications } from '@/components/common/recent-notifications/toast-notifications';
import YandexMetrika from '@/components/common/YandexMetrika/YandexMetrika';
import AdsConversionTracker from '@/components/common/AdsConversionTracker/AdsConversionTracker';
import LocalBusinessSchema from '@/components/common/local-business-schema/local-business-schema';
import { getPagePathContext } from '@/i18n/metadata-utils';
import { getTranslations } from '@/i18n';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { buildPageMetadata } from '@/utils/seo';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathWithoutLocale } = await getPagePathContext('/');
  const t = getTranslations(locale);

  return {
    ...buildPageMetadata({
      locale,
      pathWithoutLocale,
      title: t.meta.title,
      description: t.meta.description,
      keywords: t.meta.keywords,
      openGraphTitle: t.meta.openGraphTitle,
      openGraphDescription: t.meta.openGraphDescription,
    }),
    verification: {
      google: 'D-62YNPieIsCe6DP3I8cq_cwieN_lqKEBabjQcgEwyw',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocaleFromHeaders();

  return (
    <html lang={locale} suppressHydrationWarning={true} className="light">
      <body className={`${roboto.className} text-foreground bg-background`}>
        <LocalBusinessSchema locale={locale} />
        <div className="overflow-x-clip">
          <NextTopLoader />
          <Providers>
            <UiProviders>
              <NotificationProvider>
                {children}
                <FloatingCallButton />
                <ScrollTriggeredPopup />
                <ToastNotifications />
              </NotificationProvider>
            </UiProviders>
          </Providers>
        </div>
        <YandexMetrika />
        <GoogleAnalytics gaId="G-NZBTEVKW5Z" />
        <AdsConversionTracker />
      </body>
    </html>
  );
}
