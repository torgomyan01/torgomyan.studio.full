import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import ContactUs from '@/components/common/contact-us/contact-us';

export const metadata: Metadata = {
  title: 'Связь - Контакты Torgomyan.Studio | Связаться с нами',
  description:
    'Свяжитесь с нами для обсуждения вашего проекта. Мы всегда готовы ответить на ваши вопросы и помочь реализовать ваши идеи. Телефон, email, WhatsApp, Telegram.',
  keywords:
    'контакты, связаться, связь, torgomyan studio контакты, связаться с веб-студией, контакты разработчика, связь с нами',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Связь - Контакты Torgomyan.Studio',
    description:
      'Свяжитесь с нами для обсуждения вашего проекта. Мы всегда готовы ответить на ваши вопросы.',
    type: 'website',
  },
};

export default function ContactPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Связь - Контакты Torgomyan.Studio',
    description: 'Страница контактов веб-студии Torgomyan.Studio',
    mainEntity: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'AM',
        addressLocality: 'Мартуни',
        streetAddress: 'Мясникян 62',
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
        title="Связь с нами"
        description="Мы всегда готовы ответить на ваши вопросы и обсудить ваш проект. Свяжитесь с нами удобным для вас способом: по телефону, через WhatsApp, Telegram или заполните форму обратной связи. Наша команда работает для того, чтобы помочь вам реализовать ваши идеи и достичь ваших бизнес-целей."
      />

      <ContactUs />
    </MainTemplate>
  );
}
