import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import Calculator from '@/components/common/calculator/calculator';
import ContactUs from '@/components/common/contact-us/contact-us';

export const metadata: Metadata = {
  title:
    'Калькулятор Стоимости Сайта | Рассчитать Цену Разработки | Torgomyan.Studio',
  description:
    'Бесплатный онлайн калькулятор стоимости разработки сайта. Рассчитайте примерную цену вашего проекта за 2 минуты. Прозрачное ценообразование. Узнайте стоимость сайта, лендинга или интернет-магазина.',
  keywords:
    'калькулятор стоимости сайта, рассчитать цену сайта, стоимость разработки сайта, цена создания сайта, калькулятор цены сайта, стоимость веб-разработки, цена лендинга, стоимость интернет-магазина, рассчитать стоимость сайта онлайн, калькулятор цены веб-сайта, стоимость сайта под ключ',
  alternates: {
    canonical: 'https://torgomyan-studio.am/calculator',
  },
  openGraph: {
    title: 'Калькулятор Стоимости Сайта | Рассчитать Цену Разработки',
    description:
      'Бесплатный онлайн калькулятор стоимости разработки сайта. Рассчитайте примерную цену вашего проекта за 2 минуты. Прозрачное ценообразование.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Torgomyan.Studio',
  },
};

export default function CalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Калькулятор стоимости сайта',
    description:
      'Бесплатный калькулятор для расчета стоимости разработки сайта. Рассчитайте примерную цену вашего проекта за несколько минут.',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'RUB',
    },
    provider: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
      url: 'https://torgomyan-studio.am',
    },
  };

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Как работает калькулятор стоимости сайта?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Калькулятор учитывает тип сайта, количество страниц, стиль дизайна и дополнительные функции. После заполнения формы вы получите примерную стоимость и персональное предложение.',
        },
      },
      {
        '@type': 'Question',
        name: 'Точна ли цена, рассчитанная калькулятором?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Калькулятор показывает примерную стоимость. Точную цену мы рассчитаем после изучения всех деталей вашего проекта и анализа рынка.',
        },
      },
      {
        '@type': 'Question',
        name: 'Сколько времени занимает разработка сайта?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Сроки зависят от сложности проекта. Простой лендинг - 1-2 недели, корпоративный сайт - 2-4 недели, интернет-магазин - 1-3 месяца.',
        },
      },
    ],
  };

  return (
    <MainTemplate>
      <div className="calculator-page-wrapper">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqStructuredData),
          }}
        />
        <Calculator />
        <ContactUs />
      </div>
    </MainTemplate>
  );
}
