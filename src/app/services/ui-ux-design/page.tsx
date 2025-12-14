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
    'UI/UX Дизайн - Дизайн Интерфейсов и Пользовательского Опыта | Torgomyan.Studio',
  description:
    'Профессиональный UI/UX дизайн интерфейсов. Создание удобных и красивых интерфейсов для сайтов и приложений. Заказать дизайн интерфейса.',
  keywords:
    'UI UX дизайн, дизайн интерфейсов, UI дизайн, UX дизайн, дизайн сайта, дизайн приложения, пользовательский интерфейс, дизайн интерфейса цена, заказать UI дизайн',
  alternates: {
    canonical: '/services/ui-ux-design',
  },
  openGraph: {
    title: 'UI/UX Дизайн - Дизайн Интерфейсов и Пользовательского Опыта',
    description:
      'Профессиональный UI/UX дизайн для создания удобных и красивых интерфейсов.',
    type: 'website',
  },
};

export default function UIUXDesignPage() {
  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title="UI/UX Дизайн Интерфейсов"
        description="Создаем удобные и красивые интерфейсы, которые нравятся пользователям и повышают конверсию. Профессиональный дизайн для сайтов и приложений. UI/UX дизайн — это создание интерфейсов, которые не только красивы, но и удобны в использовании. UI (User Interface) отвечает за визуальную часть, а UX (User Experience) — за пользовательский опыт и удобство использования."
      />

      <SEOMarketingBlocks
        stats={[
          { number: '150,000₽', label: 'От цены' },
          { number: '20-40%', label: 'Рост конверсии' },
          { number: '2-3', label: 'Недели разработки' },
          { number: '100+', label: 'Дизайн проектов' },
        ]}
        benefits={[
          {
            title: 'Повышение конверсии',
            description:
              'Правильно спроектированный интерфейс увеличивает конверсию на 20-40%',
            icon: 'fas fa-chart-line',
          },
          {
            title: 'Удобство использования',
            description:
              'Интуитивно понятный интерфейс снижает отказы и повышает вовлеченность',
            icon: 'fas fa-user-tie',
          },
          {
            title: 'Современный дизайн',
            description:
              'Актуальные тренды и лучшие практики дизайна интерфейсов',
            icon: 'fas fa-palette',
          },
          {
            title: 'Адаптивность',
            description: 'Дизайн, который отлично работает на всех устройствах',
            icon: 'fas fa-mobile-alt',
          },
          {
            title: 'Исследования пользователей',
            description:
              'Дизайн основан на анализе поведения и потребностей пользователей',
            icon: 'fas fa-search',
          },
          {
            title: 'Прототипирование',
            description:
              'Создание интерактивных прототипов для тестирования перед разработкой',
            icon: 'fas fa-drafting-compass',
          },
        ]}
        features={[
          'Анализ целевой аудитории',
          'Исследование конкурентов',
          'Создание пользовательских сценариев',
          'Разработка wireframes',
          'Создание визуального дизайна',
          'Разработка дизайн-системы',
          'Создание интерактивных прототипов',
          'Адаптивный дизайн',
          'Подготовка макетов для разработки',
          'Тестирование и итерации',
        ]}
        faq={[
          {
            question: 'В чем разница между UI и UX дизайном?',
            answer:
              'UI (User Interface) — это визуальный дизайн интерфейса: цвета, шрифты, кнопки, иконки. UX (User Experience) — это проектирование пользовательского опыта: удобство использования, логика взаимодействия, пользовательские сценарии. Оба аспекта важны для создания качественного интерфейса.',
          },
          {
            question: 'Какая стоимость дизайна интерфейса?',
            answer:
              'Стоимость зависит от сложности проекта и количества экранов. Дизайн простого сайта начинается от 150,000 рублей, сложного приложения — от 500,000 рублей. Свяжитесь с нами для получения точного расчета.',
          },
          {
            question: 'Сколько времени занимает разработка дизайна?',
            answer:
              'Сроки зависят от объема работы. Дизайн простого сайта — 2-3 недели, сложного приложения — 1-2 месяца. Мы всегда согласовываем сроки на этапе планирования.',
          },
          {
            question: 'Предоставляете ли вы дизайн-систему?',
            answer:
              'Да, мы создаем дизайн-систему с компонентами, стилями и гайдлайнами, что упрощает дальнейшую разработку и поддержку проекта.',
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but="Дизайн интерфейсов (UI/UX)" />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
