import { Metadata } from 'next';
import { headers } from 'next/headers';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import OurWorks from '@/components/common/our-works/our-works';
import ContactUs from '@/components/common/contact-us/contact-us';
import DiscussBlock from '@/components/layout/services/discuss-block/discuss-block';
import AiBlock from '@/components/common/ai-block/ai-block';
import { services } from '@/utils/consts';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslations, getTranslation } from '@/i18n';
import { getPathnameWithoutLocale } from '@/i18n/utils';
import { locales, defaultLocale } from '@/i18n/config';
import './_services-page.scss';

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/services';
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);
  const pathWithoutLocale = getPathnameWithoutLocale(pathname);

  const baseUrl = 'https://torgomyan-studio.am';

  // Generate hreflang alternates
  const alternates: Record<string, string> = {};
  locales.forEach((loc) => {
    const localePath =
      loc === defaultLocale ? pathWithoutLocale : `/${loc}${pathWithoutLocale}`;
    alternates[loc] = `${baseUrl}${localePath === '/' ? '' : localePath}`;
  });

  return {
    title: t.servicesPage.pageTitle,
    description: t.servicesPage.pageDescription,
    keywords: t.servicesPage.pageKeywords,
    alternates: {
      canonical: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
      languages: alternates,
    },
    openGraph: {
      title: t.servicesPage.openGraphTitle,
      description: t.servicesPage.openGraphDescription,
      type: 'website',
      locale: locale === 'hy' ? 'hy_AM' : locale === 'ru' ? 'ru_RU' : 'en_US',
      siteName: 'Torgomyan.Studio',
      url: `${baseUrl}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`,
    },
  };
}

export default async function ServicesPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  // Structured data for SEO (JSON-LD) - оптимизировано для Yandex и Google
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: t.servicesPage.structuredData.name,
    description: t.servicesPage.structuredData.description,
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
      name: t.servicesPage.structuredData.catalogName,
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
                {t.servicesPage.title}
              </h1>
              <p className="main-subtitle" itemProp="description">
                {t.servicesPage.subtitle}
              </p>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">100+</span>
                  <span className="stat-label">
                    {t.servicesPage.stats.successfulProjects}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">90+</span>
                  <span className="stat-label">
                    {t.servicesPage.stats.satisfiedClients}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">7+</span>
                  <span className="stat-label">
                    {t.servicesPage.stats.yearsExperience}
                  </span>
                </div>
              </div>
            </div>
            <div className="hero-ai-block">
              <AiBlock />
            </div>
          </div>
        </section>

        {/* Services Block */}
        <ServicesBlock />

        {/* Benefits Section */}
        <section className="services-benefits">
          <div className="container">
            <h2 className="section-title">{t.servicesPage.benefits.title}</h2>
            <div className="benefits-grid">
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-user-tie" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">
                  {t.servicesPage.benefits.individualApproach.title}
                </h3>
                <p className="benefit-text">
                  {t.servicesPage.benefits.individualApproach.description}
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-laptop-code" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">
                  {t.servicesPage.benefits.modernTechnologies.title}
                </h3>
                <p className="benefit-text">
                  {t.servicesPage.benefits.modernTechnologies.description}
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-chart-line" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">
                  {t.servicesPage.benefits.seoOptimization.title}
                </h3>
                <p className="benefit-text">
                  {t.servicesPage.benefits.seoOptimization.description}
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-headset" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">
                  {t.servicesPage.benefits.support247.title}
                </h3>
                <p className="benefit-text">
                  {t.servicesPage.benefits.support247.description}
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-tag" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">
                  {t.servicesPage.benefits.transparentPrices.title}
                </h3>
                <p className="benefit-text">
                  {t.servicesPage.benefits.transparentPrices.description}
                </p>
              </div>
              <div className="benefit-card">
                <div className="benefit-icon">
                  <i className="fas fa-calendar-check" aria-hidden="true"></i>
                </div>
                <h3 className="benefit-title">
                  {t.servicesPage.benefits.deadlineCompliance.title}
                </h3>
                <p className="benefit-text">
                  {t.servicesPage.benefits.deadlineCompliance.description}
                </p>
              </div>
            </div>
          </div>
        </section>

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
