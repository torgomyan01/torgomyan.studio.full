import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import Calculator from '@/components/common/calculator/calculator';
import ContactUs from '@/components/common/contact-us/contact-us';

export const metadata: Metadata = {
  title:
    'Калькулятор стоимости сайта - Рассчитать цену разработки | Torgomyan.Studio',
  description:
    'Бесплатный калькулятор стоимости разработки сайта. Рассчитайте примерную цену вашего проекта за несколько минут. Прозрачное ценообразование без скрытых платежей.',
  keywords:
    'калькулятор стоимости сайта, рассчитать цену сайта, стоимость разработки сайта, цена создания сайта, калькулятор цены сайта, стоимость веб-разработки, цена лендинга, стоимость интернет-магазина, калькулятор цены веб-сайта',
  alternates: {
    canonical: '/calculator',
  },
  openGraph: {
    title: 'Калькулятор стоимости сайта - Рассчитать цену разработки',
    description:
      'Бесплатный калькулятор для расчета стоимости разработки сайта. Получите персональное предложение за несколько минут.',
    type: 'website',
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
      url: 'https://torgomyan.studio',
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
