import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import OurWorks from '@/components/common/our-works/our-works';
import ContactUs from '@/components/common/contact-us/contact-us';
import DiscussBlock from '@/components/layout/services/discuss-block/discuss-block';
import AiBlock from '@/components/common/ai-block/ai-block';
import { services } from '@/utils/consts';
import './_services-page.scss';

export const metadata: Metadata = {
  title:
    'Услуги Веб-Разработки | Разработка Сайтов, SEO, Дизайн | Torgomyan.Studio',
  description:
    'Полный спектр услуг веб-разработки: создание сайтов под ключ, интернет-магазинов, лендингов, корпоративных сайтов. SEO-продвижение в Яндекс и Google. Дизайн UI/UX. Техническая поддержка и хостинг. Более 100 успешных проектов.',
  keywords:
    'услуги веб-разработки, разработка сайтов под ключ, создание интернет-магазина, лендинг пейдж, корпоративный сайт, SEO продвижение сайтов, дизайн UI/UX, веб-приложения, техническая поддержка сайтов, хостинг и домены, заказать сайт, стоимость разработки сайта, веб-студия услуги',
  alternates: {
    canonical: 'https://torgomyan.studio/services',
  },
  openGraph: {
    title: 'Услуги Веб-Разработки | Разработка Сайтов, SEO, Дизайн',
    description:
      'Полный спектр услуг веб-разработки: создание сайтов под ключ, интернет-магазинов, лендингов, корпоративных сайтов. SEO-продвижение в Яндекс и Google.',
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Torgomyan.Studio',
  },
};

export default function ServicesPage() {
  // Structured data for SEO (JSON-LD) - оптимизировано для Yandex и Google
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Услуги по разработке сайтов и веб-приложений',
    description:
      'Профессиональные услуги по разработке сайтов, веб-приложений, SEO-продвижению, дизайну интерфейсов и технической поддержке',
    provider: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Armenia',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Веб-услуги',
      itemListElement: services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
        },
        position: index + 1,
      })),
    },
  };

  return (
    <MainTemplate>
      <div className="services-page">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Hero Section */}
        <section className="services-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="main-title" itemProp="name">
                Наши услуги
              </h1>
              <p className="main-subtitle" itemProp="description">
                Полный спектр веб-услуг для развития вашего бизнеса. От создания
                сайта до продвижения и технической поддержки — мы обеспечиваем
                комплексный подход к вашему цифровому присутствию.
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">Успешных проектов</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Довольных клиентов</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">7+</span>
                  <span className="stat-label">Лет опыта</span>
                </div>
              </div>
            </div>
            <div className="hero-ai-block">
              <AiBlock />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="services-benefits">
          <div className="container">
            <h2 className="section-title">Почему выбирают нас</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-user-tie" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">Индивидуальный подход</h3>
                <p className="benefit-text">
                  Каждый проект разрабатывается с учетом особенностей вашего
                  бизнеса и целевой аудитории
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-laptop-code" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">Современные технологии</h3>
                <p className="benefit-text">
                  Используем актуальные фреймворки и инструменты для создания
                  быстрых и надежных решений
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-chart-line" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">SEO-оптимизация</h3>
                <p className="benefit-text">
                  Все проекты создаются с учетом требований поисковых систем для
                  лучшей видимости в интернете
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-headset" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">Поддержка 24/7</h3>
                <p className="benefit-text">
                  Обеспечиваем техническую поддержку и сопровождение вашего
                  проекта на всех этапах
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-tag" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">Прозрачные цены</h3>
                <p className="benefit-text">
                  Четкое ценообразование без скрытых платежей. Вы знаете, за что
                  платите
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-calendar-check" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">Соблюдение сроков</h3>
                <p className="benefit-text">
                  Гарантируем выполнение работ в оговоренные сроки без
                  компромиссов в качестве
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Block */}
        <ServicesBlock />

        {/* Our Works */}
        <OurWorks />

        {/* CTA Section */}
        <DiscussBlock />

        {/* Contact Us */}
        <ContactUs />
      </div>
    </MainTemplate>
  );
}
