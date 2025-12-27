import './globals.scss';
import '../icons/icons.css';
import '@/components/ui/_ui-components.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './tailwind.css';

import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';

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
import CookieConsent from '@/components/common/cookie-consent/cookie-consent';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Torgomyan.Studio - Создаем сайты для вашего бизнеса',
    description: '',
    keywords:
      'создание сайтов, разработка сайтов, дизайн сайтов, SEO оптимизация, хостинг, домены, веб-разработка',
    alternates: {
      canonical: 'https://swappe.ru',
    },
    // openGraph: {
    //   title: data.data.name,
    //   description: data.data.description?.slice(0, 140),
    //   images: image?.image || "",
    // },
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
                  <CookieConsent />
                </NotificationProvider>
              </UiProviders>
            </Providers>
          </SesProviders>
        </div>
      </body>
    </html>
  );
}
