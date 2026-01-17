import './globals.scss';
import '../icons/icons.css';
import '@/components/ui/_ui-components.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './tailwind.css';

import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

import { Providers } from '@/app/providers';
import { SesProviders } from '@/components/common/session-provider/session-provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { UiProviders } from '@/components/common/UIProvider/ui-provider';
import FloatingCallButton from '@/components/common/floating-call-button/floating-call-button';
import ExitIntentPopup from '@/components/common/exit-intent-popup/exit-intent-popup';
import ScrollTriggeredPopup from '@/components/common/scroll-triggered-popup/scroll-triggered-popup';
import RecentNotifications from '@/components/common/recent-notifications/recent-notifications';
import { NotificationProvider } from '@/components/common/recent-notifications/notification-context';
import { ToastNotifications } from '@/components/common/recent-notifications/toast-notifications';
import YandexMetrika from '@/components/common/YandexMetrika/YandexMetrika';
import Smartsupp from '@/components/common/Smartsupp/Smartsupp';
import AdsConversionTracker from '@/components/common/AdsConversionTracker/AdsConversionTracker';
import { headers } from 'next/headers';
import { getTranslations } from '@/i18n';
import { locales, defaultLocale } from '@/i18n/config';
import { getPathnameWithoutLocale } from '@/i18n/utils';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  const locale = headersList.get('x-locale') || defaultLocale;
  const t = getTranslations(locale as any);
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
    title: t.meta.title,
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const headersList = await headers();
  const locale = headersList.get('x-locale') || defaultLocale;

  return (
    <html lang={locale} suppressHydrationWarning={true} className="light">
      <body className="text-foreground bg-background">
        <div className="overflow-hidden">
          <SesProviders session={session}>
            <NextTopLoader />
            <Providers>
              <UiProviders>
                <NotificationProvider>
                  {children}
                  <FloatingCallButton />
                  <ExitIntentPopup />
                  <ScrollTriggeredPopup />
                  <RecentNotifications />
                  <ToastNotifications />
                  {/* <CookieConsent /> */}
                </NotificationProvider>
              </UiProviders>
            </Providers>
          </SesProviders>
        </div>
        <YandexMetrika />
        <GoogleAnalytics gaId="G-NZBTEVKW5Z" />
        <Smartsupp />
        <AdsConversionTracker />
      </body>
    </html>
  );
}
