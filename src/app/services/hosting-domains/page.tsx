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
    'Хостинг и Домены - Регистрация Доменов и Хостинг Сайтов | Torgomyan.Studio',
  description:
    'Хостинг сайтов и регистрация доменов. Надежный хостинг с высокой скоростью и доступностью. Регистрация доменных имен. Заказать хостинг.',
  keywords:
    'хостинг сайтов, регистрация доменов, домен, хостинг цена, купить хостинг, регистрация домена, доменное имя, виртуальный хостинг, VPS хостинг',
  alternates: {
    canonical: '/services/hosting-domains',
  },
  openGraph: {
    title: 'Хостинг и Домены - Регистрация Доменов и Хостинг Сайтов',
    description:
      'Надежный хостинг сайтов и регистрация доменных имен для вашего бизнеса.',
    type: 'website',
  },
};

export default function HostingDomainsPage() {
  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title="Хостинг и Домены"
        description="Надежный хостинг сайтов с высокой скоростью и доступностью. Регистрация доменных имен и полное сопровождение. Хостинг и домен — это основа любого сайта в интернете. Домен — это адрес вашего сайта, а хостинг — место, где хранятся файлы сайта и обеспечивается его доступность в интернете. Мы предлагаем надежные решения для хостинга сайтов с высокой скоростью загрузки, стабильностью работы и технической поддержкой."
      />

      <SEOMarketingBlocks
        stats={[
          { number: '500₽', label: 'От цены/месяц' },
          { number: '99.9%', label: 'Uptime' },
          { number: '24/7', label: 'Поддержка' },
          { number: 'SSL', label: 'Бесплатно' },
        ]}
        benefits={[
          {
            title: 'Высокая скорость',
            description: 'Оптимизированные серверы для быстрой загрузки сайтов',
            icon: 'fas fa-bolt',
          },
          {
            title: 'Стабильность',
            description: 'Гарантия доступности сайта 99.9% времени',
            icon: 'fas fa-shield-alt',
          },
          {
            title: 'Безопасность',
            description: 'Защита от DDoS-атак и других угроз',
            icon: 'fas fa-lock',
          },
          {
            title: 'Техническая поддержка',
            description:
              'Квалифицированная помощь в решении технических вопросов',
            icon: 'fas fa-headset',
          },
          {
            title: 'Резервное копирование',
            description: 'Автоматическое создание резервных копий данных',
            icon: 'fas fa-database',
          },
          {
            title: 'Масштабируемость',
            description: 'Возможность увеличения ресурсов по мере роста сайта',
            icon: 'fas fa-expand-arrows-alt',
          },
        ]}
        features={[
          'Регистрация доменных имен',
          'Виртуальный хостинг',
          'VPS серверы',
          'SSL сертификаты',
          'Резервное копирование',
          'Защита от DDoS',
          'Техническая поддержка 24/7',
          'Панель управления',
          'Перенос сайтов',
          'Настройка почты',
        ]}
        faq={[
          {
            question: 'Какие тарифы хостинга вы предлагаете?',
            answer:
              'Мы предлагаем различные тарифы: от виртуального хостинга для небольших сайтов до выделенных серверов для крупных проектов. Стоимость начинается от 500 рублей в месяц. Свяжитесь с нами для подбора оптимального решения.',
          },
          {
            question: 'Помогаете ли вы с переносом сайта?',
            answer:
              'Да, мы бесплатно помогаем с переносом сайта на наш хостинг. Наши специалисты переносят все файлы и настраивают работу сайта на новом хостинге.',
          },
          {
            question: 'Включен ли SSL сертификат?',
            answer:
              "Да, мы предоставляем бесплатный SSL сертификат Let's Encrypt для всех сайтов на нашем хостинге. Это обеспечивает безопасное соединение HTTPS.",
          },
          {
            question: 'Какая гарантия доступности?',
            answer:
              'Мы гарантируем доступность сайта 99.9% времени. В случае превышения этого показателя предоставляем компенсацию согласно SLA.',
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but="Хостинг и домены" />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
