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
    'SEO Продвижение Сайтов в Яндекс и Google | Продвижение Сайта | Torgomyan.Studio',
  description:
    'Профессиональное SEO продвижение сайтов в Яндекс и Google. Увеличение органического трафика и позиций в топ-10. Техническая SEO-оптимизация, работа с контентом, ссылочное продвижение. От 50,000₽/месяц. Заказать SEO.',
  keywords:
    'SEO продвижение сайтов, продвижение сайта в яндекс, продвижение сайта в google, SEO оптимизация сайта, SEO услуги, заказать SEO продвижение, SEO цена, поисковая оптимизация, техническая SEO, продвижение сайта цена, SEO продвижение стоимость, увеличение трафика сайта, поднятие позиций сайта, SEO аудит сайта',
  alternates: {
    canonical: 'https://torgomyan.studio/services/seo',
  },
  openGraph: {
    title: 'SEO Продвижение Сайтов в Яндекс и Google | Продвижение Сайта',
    description:
      'Профессиональное SEO продвижение сайтов в Яндекс и Google. Увеличение органического трафика и позиций в топ-10. Техническая SEO-оптимизация.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Torgomyan.Studio',
  },
};

export default function SEOPage() {
  return (
    <MainTemplate>
      <ServicesHeaderWithContent
        title="SEO Продвижение Сайтов"
        description="Профессиональное продвижение сайтов в Яндекс и Google. Увеличиваем трафик и позиции в поисковой выдаче для роста вашего бизнеса. SEO (Search Engine Optimization) — это комплекс мер по оптимизации сайта для поисковых систем с целью повышения его позиций в результатах поиска по целевым запросам. Хорошо оптимизированный сайт получает органический трафик из поисковых систем, что является одним из самых эффективных и долгосрочных способов привлечения клиентов."
      />

      <SEOMarketingBlocks
        stats={[
          { number: '50,000₽', label: 'От цены/месяц' },
          { number: '2-3', label: 'Месяца до результатов' },
          { number: '100+', label: 'Продвинутых сайтов' },
          { number: '30%', label: 'Рост трафика' },
        ]}
        benefits={[
          {
            title: 'Органический трафик',
            description:
              'Привлечение целевых посетителей из поисковых систем без оплаты за клики',
            icon: 'fas fa-chart-line',
          },
          {
            title: 'Долгосрочный результат',
            description:
              'Позиции в поиске работают постоянно, в отличие от рекламы',
            icon: 'fas fa-calendar-check',
          },
          {
            title: 'Рост конверсии',
            description:
              'Поисковый трафик имеет высокую конверсию в заявки и продажи',
            icon: 'fas fa-bullseye',
          },
          {
            title: 'Техническая оптимизация',
            description:
              'Улучшение технических параметров сайта для лучшей индексации',
            icon: 'fas fa-cog',
          },
          {
            title: 'Работа с контентом',
            description:
              'Создание и оптимизация контента под поисковые запросы',
            icon: 'fas fa-pencil',
          },
          {
            title: 'Регулярная отчетность',
            description:
              'Ежемесячные отчеты о проделанной работе и результатах',
            icon: 'fas fa-chart-bar',
          },
        ]}
        features={[
          'Аудит сайта и конкурентов',
          'Подбор ключевых слов',
          'Техническая оптимизация',
          'Оптимизация контента',
          'Создание нового контента',
          'Внутренняя перелинковка',
          'Работа с внешними ссылками',
          'Настройка аналитики',
          'Мониторинг позиций',
          'Ежемесячная отчетность',
        ]}
        faq={[
          {
            question: 'Сколько времени нужно для появления результатов?',
            answer:
              'Первые результаты обычно видны через 2-3 месяца. Значительный рост трафика и позиций происходит через 4-6 месяцев регулярной работы. SEO — это долгосрочная стратегия.',
          },
          {
            question: 'Какая стоимость SEO продвижения?',
            answer:
              'Стоимость зависит от конкурентности ниши, текущего состояния сайта и объема работ. Месячная стоимость начинается от 40,000 рублей. Свяжитесь с нами для получения индивидуального предложения.',
          },
          {
            question: 'Работаете ли вы с Яндекс и Google?',
            answer:
              'Да, мы продвигаем сайты в обеих поисковых системах. Учитываем особенности алгоритмов каждой системы для максимальной эффективности.',
          },
          {
            question: 'Нужно ли платить за рекламу параллельно с SEO?',
            answer:
              'Не обязательно, но комбинация SEO и контекстной рекламы дает лучшие результаты. SEO обеспечивает долгосрочный трафик, а реклама — быстрый результат.',
          },
        ]}
      />

      <DiscussBlock />

      <ServicesBlock but="Продвижение сайтов (SEO)" />

      <OurWorks />

      <ContactUs />
    </MainTemplate>
  );
}
