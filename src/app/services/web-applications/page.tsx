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
    'Веб-Приложения - Разработка Веб-Приложений на Заказ | Torgomyan.Studio',
  description:
    'Разработка веб-приложений любой сложности. Современные технологии, индивидуальные решения для бизнеса. Заказать веб-приложение.',
  keywords:
    'веб приложение, веб-приложение, разработка веб приложений, создание веб приложения, веб приложение на заказ, разработка веб приложений цена, заказать веб приложение, web application',
  alternates: {
    canonical: '/services/web-applications',
  },
  openGraph: {
    title: 'Веб-Приложения - Разработка Веб-Приложений на Заказ',
    description:
      'Профессиональная разработка веб-приложений любой сложности с использованием современных технологий.',
    type: 'website',
  },
};

export default function WebApplicationsPage() {
  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title="Разработка Веб-Приложений"
        description="Создаем веб-приложения любой сложности для автоматизации бизнес-процессов и решения специфических задач вашей компании. Веб-приложение — это программное обеспечение, которое работает в браузере и позволяет решать специфические бизнес-задачи. В отличие от обычных сайтов, веб-приложения имеют сложную логику, интерактивность и могут обрабатывать большие объемы данных."
      />

      <SEOMarketingBlocks
        stats={[
          { number: '500,000₽', label: 'От цены' },
          { number: '1-6', label: 'Месяцев разработки' },
          { number: '50+', label: 'Проектов' },
          { number: '99.9%', label: 'Uptime' },
        ]}
        benefits={[
          {
            title: 'Индивидуальная разработка',
            description:
              'Каждое приложение создается под ваши конкретные задачи и требования',
            icon: 'fas fa-code',
          },
          {
            title: 'Современные технологии',
            description:
              'Используем актуальные фреймворки и инструменты разработки',
            icon: 'fas fa-laptop-code',
          },
          {
            title: 'Высокая производительность',
            description:
              'Оптимизация кода для быстрой работы даже с большими объемами данных',
            icon: 'fas fa-bolt',
          },
          {
            title: 'Безопасность',
            description:
              'Внедрение современных методов защиты данных и информации',
            icon: 'fas fa-shield-alt',
          },
          {
            title: 'Масштабируемость',
            description: 'Архитектура, позволяющая легко расширять функционал',
            icon: 'fas fa-expand-arrows-alt',
          },
          {
            title: 'API интеграции',
            description:
              'Интеграция с внешними сервисами и системами через API',
            icon: 'fas fa-plug',
          },
        ]}
        features={[
          'Анализ требований и проектирование',
          'Разработка архитектуры приложения',
          'Создание пользовательского интерфейса',
          'Разработка серверной части',
          'Настройка базы данных',
          'Интеграция с внешними API',
          'Тестирование и отладка',
          'Оптимизация производительности',
          'Развертывание и настройка',
          'Техническая поддержка',
        ]}
        faq={[
          {
            question: 'Какие технологии используются для разработки?',
            answer:
              'Мы используем современный стек технологий: React, Next.js, Node.js, TypeScript, MySQL, MongoDB и другие. Выбор технологий зависит от специфики проекта и требований.',
          },
          {
            question: 'Сколько времени занимает разработка веб-приложения?',
            answer:
              'Сроки зависят от сложности проекта. Простое приложение может быть готово за 1-2 месяца, сложное — за 3-6 месяцев или более. Мы всегда согласовываем сроки на этапе планирования.',
          },
          {
            question: 'Какая стоимость разработки веб-приложения?',
            answer:
              'Стоимость зависит от сложности функционала, количества модулей и интеграций. Простое приложение начинается от 500,000 рублей. Свяжитесь с нами для получения детального расчета.',
          },
          {
            question: 'Предоставляете ли вы техническую поддержку?',
            answer:
              'Да, мы предоставляем техническую поддержку и сопровождение приложений. Также можем обучить вашу команду работе с системой.',
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but="Веб-приложения" />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
