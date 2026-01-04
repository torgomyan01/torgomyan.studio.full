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
    'Техническая Поддержка Сайтов | Обслуживание и Поддержка | Torgomyan.Studio',
  description:
    'Техническая поддержка и обслуживание сайтов 24/7. Обновление контента, исправление ошибок, резервное копирование. Гарантия uptime 99.9%. От 15,000₽/месяц. Заказать техническую поддержку сайта.',
  keywords:
    'техническая поддержка сайта, обслуживание сайта, поддержка сайтов, техническая поддержка цена, обслуживание сайтов, поддержка веб сайта, администрирование сайта, техническая поддержка сайтов 24/7, обслуживание сайтов цена',
  alternates: {
    canonical: 'https://torgomyan.studio/services/technical-support',
  },
  openGraph: {
    title: 'Техническая Поддержка Сайтов | Обслуживание и Поддержка',
    description:
      'Профессиональная техническая поддержка и обслуживание сайтов 24/7 для стабильной работы вашего бизнеса. Гарантия uptime 99.9%.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Torgomyan.Studio',
  },
};

export default function TechnicalSupportPage() {
  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title="Техническая Поддержка Сайтов"
        description="Обеспечиваем стабильную работу вашего сайта 24/7. Обновление контента, исправление ошибок, резервное копирование и полное техническое сопровождение. После запуска сайта важно обеспечить его стабильную работу, регулярное обновление и техническую поддержку. Мы предлагаем комплексное обслуживание сайтов, которое включает все необходимые услуги для бесперебойной работы вашего онлайн-присутствия."
      />

      <SEOMarketingBlocks
        stats={[
          { number: '15,000₽', label: 'От цены/месяц' },
          { number: '24/7', label: 'Поддержка' },
          { number: '1-2ч', label: 'Время реакции' },
          { number: '99.9%', label: 'Uptime' },
        ]}
        benefits={[
          {
            title: 'Круглосуточная поддержка',
            description:
              'Доступность специалистов 24/7 для решения срочных вопросов',
            icon: 'fas fa-headset',
          },
          {
            title: 'Быстрое реагирование',
            description: 'Оперативное устранение проблем и ошибок на сайте',
            icon: 'fas fa-bolt',
          },
          {
            title: 'Регулярные обновления',
            description: 'Своевременное обновление контента и функционала',
            icon: 'fas fa-sync-alt',
          },
          {
            title: 'Резервное копирование',
            description:
              'Регулярное создание резервных копий для безопасности данных',
            icon: 'fas fa-database',
          },
          {
            title: 'Мониторинг',
            description:
              'Постоянный контроль работоспособности и производительности',
            icon: 'fas fa-chart-line',
          },
          {
            title: 'Безопасность',
            description: 'Защита от вирусов, хакерских атак и других угроз',
            icon: 'fas fa-shield-alt',
          },
        ]}
        features={[
          'Мониторинг работоспособности сайта',
          'Исправление ошибок и багов',
          'Обновление контента',
          'Резервное копирование',
          'Обновление CMS и плагинов',
          'Защита от вирусов и атак',
          'Оптимизация производительности',
          'Консультации по работе с сайтом',
          'Техническая документация',
          'Ежемесячные отчеты',
        ]}
        faq={[
          {
            question: 'Какие услуги входят в техническую поддержку?',
            answer:
              'В базовый пакет входит мониторинг сайта, исправление ошибок, обновление контента, резервное копирование и консультации. Расширенные пакеты могут включать разработку нового функционала, SEO-оптимизацию и другие услуги.',
          },
          {
            question: 'Сколько стоит техническая поддержка?',
            answer:
              'Стоимость зависит от объема работ и сложности сайта. Базовый пакет начинается от 15,000 рублей в месяц. Свяжитесь с нами для получения индивидуального предложения.',
          },
          {
            question: 'Как быстро вы реагируете на проблемы?',
            answer:
              'Критические проблемы решаем в течение 1-2 часов, обычные задачи — в течение рабочего дня. Для клиентов с расширенной поддержкой доступна круглосуточная поддержка.',
          },
          {
            question: 'Работаете ли вы с сайтами на разных CMS?',
            answer:
              'Да, мы работаем с различными системами управления контентом: WordPress, Bitrix, MODX, Laravel и другими. Опыт работы с большинством популярных платформ.',
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but="Техническая поддержка" />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
