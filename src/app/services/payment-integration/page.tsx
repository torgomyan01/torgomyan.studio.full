import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import OurWorks from '@/components/common/our-works/our-works';
import ContactUs from '@/components/common/contact-us/contact-us';
import DiscussBlock from '@/components/layout/services/discuss-block/discuss-block';
import SEOMarketingBlocks from '@/components/common/seo-marketing-blocks/seo-marketing-blocks';

export const metadata: Metadata = {
  title:
    'Интеграция Платежных Систем - Подключение Оплаты на Сайт | Torgomyan.Studio',
  description:
    'Интеграция платежных систем на сайт. Подключение онлайн-оплаты через Яндекс.Кассу, Stripe, PayPal и другие системы. Заказать интеграцию платежей.',
  keywords:
    'интеграция платежных систем, подключение оплаты, онлайн оплата, платежная система, яндекс касса, stripe, paypal, интеграция оплаты цена, заказать интеграцию платежей',
  alternates: {
    canonical: '/services/payment-integration',
  },
  openGraph: {
    title: 'Интеграция Платежных Систем - Подключение Оплаты на Сайт',
    description:
      'Профессиональная интеграция платежных систем для приема онлайн-платежей на вашем сайте.',
    type: 'website',
  },
};

export default function PaymentIntegrationPage() {
  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title="Интеграция Платежных Систем"
        description="Подключаем онлайн-оплату на ваш сайт. Интеграция с Яндекс.Кассой, Stripe, PayPal и другими платежными системами для приема платежей. Возможность принимать платежи онлайн — это ключевая функция для интернет-магазинов, сервисов и других коммерческих сайтов. Мы интегрируем различные платежные системы, чтобы ваши клиенты могли легко и безопасно оплачивать товары и услуги."
      />

      <SEOMarketingBlocks
        stats={[
          { number: '50,000₽', label: 'От цены' },
          { number: '1-2', label: 'Недели интеграции' },
          { number: '10+', label: 'Платежных систем' },
          { number: '100%', label: 'Безопасность' },
        ]}
        benefits={[
          {
            title: 'Безопасность',
            description:
              'Соответствие стандартам PCI DSS и защита данных клиентов',
            icon: 'fas fa-shield-alt',
          },
          {
            title: 'Множество систем',
            description:
              'Интеграция с различными платежными системами по выбору',
            icon: 'fas fa-credit-card',
          },
          {
            title: 'Быстрое подключение',
            description: 'Настройка и запуск платежей в кратчайшие сроки',
            icon: 'fas fa-bolt',
          },
          {
            title: 'Удобство для клиентов',
            description: 'Простой и понятный процесс оплаты повышает конверсию',
            icon: 'fas fa-user-tie',
          },
          {
            title: 'Мобильная оплата',
            description: 'Поддержка оплаты с мобильных устройств',
            icon: 'fas fa-mobile-alt',
          },
          {
            title: 'Техническая поддержка',
            description: 'Помощь в решении вопросов по работе платежей',
            icon: 'fas fa-headset',
          },
        ]}
        features={[
          'Анализ требований и выбор системы',
          'Настройка платежного шлюза',
          'Интеграция API платежной системы',
          'Создание формы оплаты',
          'Настройка уведомлений',
          'Обработка успешных платежей',
          'Обработка возвратов',
          'Настройка рекуррентных платежей',
          'Интеграция с CRM',
          'Тестирование и отладка',
        ]}
        faq={[
          {
            question: 'С какими платежными системами вы работаете?',
            answer:
              'Мы работаем с Яндекс.Кассой, Stripe, PayPal, CloudPayments, PayU, Robokassa и другими популярными системами. Помогаем выбрать оптимальное решение для вашего бизнеса.',
          },
          {
            question: 'Сколько стоит интеграция платежной системы?',
            answer:
              'Стоимость зависит от выбранной системы и сложности интеграции. Базовая интеграция начинается от 50,000 рублей. Свяжитесь с нами для получения точного расчета.',
          },
          {
            question: 'Сколько времени занимает интеграция?',
            answer:
              'Стандартная интеграция занимает 1-2 недели. Сроки зависят от выбранной платежной системы и сложности проекта.',
          },
          {
            question: 'Нужно ли отдельно регистрироваться в платежной системе?',
            answer:
              'Да, вам нужно будет зарегистрироваться в выбранной платежной системе и получить необходимые ключи API. Мы поможем с процессом регистрации и настройки.',
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but="Интеграция платежных систем" />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
