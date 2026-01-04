import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import ServicesHeaderWithContent from '@/components/common/services-header/services-header-with-content';
import OurWorks from '@/components/common/our-works/our-works';
import ContactUs from '@/components/common/contact-us/contact-us';
import DiscussBlock from '@/components/layout/services/discuss-block/discuss-block';
import SEOMarketingBlocks from '@/components/common/seo-marketing-blocks/seo-marketing-blocks';

export const metadata: Metadata = {
  title: 'Создание Сайта-Визитки | Простой Сайт для Бизнеса | Torgomyan.Studio',
  description:
    'Создание сайта-визитки для малого бизнеса. Простой, быстрый и эффективный сайт по доступной цене. Идеально для старта бизнеса в интернете. От 80,000₽. Заказать сайт-визитку.',
  keywords:
    'сайт визитка, сайт-визитка, создание сайта визитки, простой сайт, сайт для малого бизнеса, сайт визитка цена, заказать сайт визитку, дешевый сайт, сайт под ключ, создание сайта визитки цена, сайт визитка стоимость',
  alternates: {
    canonical: 'https://torgomyan.studio/services/business-card-website',
  },
  openGraph: {
    title: 'Создание Сайта-Визитки | Простой Сайт для Бизнеса',
    description:
      'Создание сайта-визитки для малого бизнеса по доступной цене. Простой, быстрый и эффективный сайт. Идеальное решение для старта в интернете.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Torgomyan.Studio',
  },
};

export default function BusinessCardWebsitePage() {
  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title="Сайт-Визитка для Вашего Бизнеса"
        description="Простой, быстрый и эффективный сайт-визитка по доступной цене. Идеальное решение для малого бизнеса и старта в интернете. Сайт-визитка — это отличное решение для малого бизнеса, фрилансеров и начинающих предпринимателей, которые хотят быстро и недорого заявить о себе в интернете. Это компактный сайт, обычно состоящий из 3-5 страниц, который содержит основную информацию о вашем бизнесе: услуги, контакты, портфолио или каталог товаров."
      />

      <SEOMarketingBlocks
        stats={[
          { number: '80,000₽', label: 'От цены' },
          { number: '1-2', label: 'Недели до запуска' },
          { number: '3-5', label: 'Страниц включено' },
          { number: '100%', label: 'Готов к работе' },
        ]}
        benefits={[
          {
            title: 'Доступная цена',
            description:
              'Идеальное соотношение цена-качество для малого бизнеса',
            icon: 'fas fa-tag',
          },
          {
            title: 'Быстрый запуск',
            description: 'Сайт готов к запуску уже через 1-2 недели',
            icon: 'fas fa-bolt',
          },
          {
            title: 'Простота управления',
            description:
              'Легко обновлять контент самостоятельно без технических знаний',
            icon: 'fas fa-user-tie',
          },
          {
            title: 'Мобильная адаптация',
            description: 'Отлично выглядит и работает на всех устройствах',
            icon: 'fas fa-mobile-alt',
          },
          {
            title: 'SEO-оптимизация',
            description: 'Базовая оптимизация для поисковых систем включена',
            icon: 'fas fa-chart-line',
          },
          {
            title: 'Профессиональный вид',
            description: 'Современный дизайн, который вызывает доверие',
            icon: 'fas fa-palette',
          },
        ]}
        features={[
          'Разработка дизайна',
          'Создание 3-5 основных страниц',
          'Адаптивная верстка',
          'Система управления контентом',
          'Форма обратной связи',
          'Интеграция карты и контактов',
          'Базовая SEO-оптимизация',
          'Обучение работе с сайтом',
        ]}
        faq={[
          {
            question: 'Сколько страниц включает сайт-визитка?',
            answer:
              'Обычно сайт-визитка включает 3-5 страниц: главная, о компании/услугах, портфолио/каталог, контакты. Количество страниц может варьироваться в зависимости от ваших потребностей.',
          },
          {
            question: 'Какова стоимость сайта-визитки?',
            answer:
              'Стоимость сайта-визитки начинается от 50,000 рублей. Цена зависит от количества страниц, сложности дизайна и дополнительных функций. Свяжитесь с нами для получения точного расчета.',
          },
          {
            question: 'Можно ли потом расширить сайт-визитку?',
            answer:
              'Да, конечно! Сайт-визитка может быть легко расширена до корпоративного сайта или интернет-магазина по мере роста вашего бизнеса. Мы поможем с развитием проекта.',
          },
          {
            question: 'Сколько времени занимает создание?',
            answer:
              'Стандартный сайт-визитка готов к запуску за 1-2 недели. Сроки зависят от скорости предоставления контента и согласования дизайна.',
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but="Сайт-визитка" />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
