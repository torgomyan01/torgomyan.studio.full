import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import OurWorks from '@/components/common/our-works/our-works';
import ContactUs from '@/components/common/contact-us/contact-us';
import DiscussBlock from '@/components/layout/services/discuss-block/discuss-block';
import AiBlock from '@/components/common/ai-block/ai-block';
import JsonLd from '@/components/common/structured-data/json-ld';
import { services } from '@/utils/consts';
import { getLocaleFromHeaders } from '@/i18n/server-utils';
import { getTranslations } from '@/i18n';
import { getPagePathContext } from '@/i18n/metadata-utils';
import TrustSignals from '@/components/common/trust-signals/trust-signals';
import { buildLocalizedUrl, buildOfferCatalogSchema, buildPageMetadata } from '@/utils/seo';
import './_services-page.scss';

export async function generateMetadata(): Promise<Metadata> {
  const { locale, pathWithoutLocale } = await getPagePathContext('/services');
  const t = getTranslations(locale);

  return buildPageMetadata({
    locale,
    pathWithoutLocale,
    title: t.servicesPage.pageTitle,
    description: t.servicesPage.pageDescription,
    keywords: t.servicesPage.pageKeywords,
    openGraphTitle: t.servicesPage.openGraphTitle,
    openGraphDescription: t.servicesPage.openGraphDescription,
  });
}

export default async function ServicesPage() {
  const locale = await getLocaleFromHeaders();
  const t = getTranslations(locale);

  const structuredData = buildOfferCatalogSchema({
    name: t.servicesPage.structuredData.catalogName,
    description: t.servicesPage.structuredData.description,
    services: services.map((service) => ({
      name: service.title,
      url: buildLocalizedUrl(service.href, locale),
    })),
  });

  return (
    <MainTemplate>
      <div className="services-page">
        <JsonLd data={structuredData} />

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
              <TrustSignals className="hero-trust-signals" />
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
