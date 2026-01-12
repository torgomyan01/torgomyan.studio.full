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
// import CookieConsent from '@/components/common/cookie-consent/cookie-consent';
import YandexMetrika from '@/components/common/YandexMetrika/YandexMetrika';
import Smartsupp from '@/components/common/Smartsupp/Smartsupp';
import AdsConversionTracker from '@/components/common/AdsConversionTracker/AdsConversionTracker';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Разработка Сайтов под Ключ | Torgomyan.Studio - Веб-Студия',
    description:
      'Профессиональная разработка сайтов под ключ. Создание сайтов, интернет-магазинов, лендингов и веб-приложений. SEO-продвижение, дизайн UI/UX. Более 100 успешных проектов. Заказать сайт.',
    keywords:
      'разработка сайтов под ключ, создание сайтов Армения, веб-студия Ереван, разработка сайтов, создание интернет-магазина, лендинг пейдж, корпоративный сайт, SEO продвижение, веб-дизайн, разработка веб-приложений, заказать сайт, стоимость разработки сайта, профессиональная разработка сайтов',
    alternates: {
      canonical: 'https://torgomyan.studio',
    },
    openGraph: {
      title: 'Разработка Сайтов под Ключ | Torgomyan.Studio - Веб-Студия',
      description:
        'Профессиональная разработка сайтов под ключ. Создание сайтов, интернет-магазинов, лендингов и веб-приложений. SEO-продвижение, дизайн UI/UX. Более 100 успешных проектов.',
      type: 'website',
      locale: 'ru_RU',
      siteName: 'Torgomyan.Studio',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="ru" suppressHydrationWarning={true} className="light">
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
