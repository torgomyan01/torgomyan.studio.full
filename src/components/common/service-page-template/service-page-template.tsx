import { Metadata } from 'next';
import MainTemplate from '@/components/common/main-template/main-template';
import ServicesBlock from '@/components/common/services-block/services-block';
import OurWorks from '@/components/common/our-works/our-works';
import ContactUs from '@/components/common/contact-us/contact-us';
import DiscussBlock from '@/components/layout/services/discuss-block/discuss-block';
import './_service-page-template.scss';

interface ServicePageTemplateProps {
  title: string;
  description: string;
  longDescription: string;
  keywords: string;
  canonical: string;
  benefits: Array<{ title: string; description: string; icon: string }>;
  features: string[];
  faq?: Array<{ question: string; answer: string }>;
  priceInfo?: string;
  serviceName: string;
}

export function ServicePageTemplate({
  title,
  description,
  longDescription,
  keywords,
  canonical,
  benefits,
  features,
  faq,
  priceInfo,
  serviceName,
}: ServicePageTemplateProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description: description,
    provider: {
      '@type': 'Organization',
      name: 'Torgomyan.Studio',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Armenia',
    },
    offers: {
      '@type': 'Offer',
      description: description,
    },
  };

  return (
    <MainTemplate>
      <div className="service-page-template">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Hero Section */}
        <section className="service-hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="main-title" itemProp="name">
                {title}
              </h1>
              <p className="main-subtitle" itemProp="description">
                {description}
              </p>
              <div className="hero-cta">
                <a href="#contact" className="cta-button primary">
                  Получить консультацию
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
                <a href="#features" className="cta-button secondary">
                  Узнать больше
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Description Section */}
        <section className="service-description">
          <div className="container">
            <div className="description-content">
              <h2 className="section-title">О {serviceName.toLowerCase()}</h2>
              <div className="description-text">
                {longDescription.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        {benefits.length > 0 && (
          <section className="service-benefits" id="benefits">
            <div className="container">
              <h2 className="section-title">Преимущества нашей услуги</h2>
              <div className="benefits-grid">
                {benefits.map((benefit, index) => (
                  <div key={index} className="benefit-item">
                    <div className="benefit-icon">
                      <i className={benefit.icon} aria-hidden="true"></i>
                    </div>
                    <h3 className="benefit-title">{benefit.title}</h3>
                    <p className="benefit-description">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {features.length > 0 && (
          <section className="service-features" id="features">
            <div className="container">
              <h2 className="section-title">Что входит в услугу</h2>
              <div className="features-list">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Price Section */}
        {priceInfo && (
          <section className="service-pricing">
            <div className="container">
              <h2 className="section-title">Стоимость</h2>
              <div className="pricing-content">
                <p className="pricing-text">{priceInfo}</p>
                <a href="#contact" className="cta-button primary">
                  Узнать точную цену
                  <i className="fas fa-arrow-right" aria-hidden="true"></i>
                </a>
              </div>
            </div>
          </section>
        )}

        {/* FAQ Section */}
        {faq && faq.length > 0 && (
          <section className="service-faq">
            <div className="container">
              <h2 className="section-title">Часто задаваемые вопросы</h2>
              <div className="faq-list">
                {faq.map((item, index) => (
                  <div key={index} className="faq-item">
                    <h3 className="faq-question">
                      <i
                        className="fas fa-question-circle"
                        aria-hidden="true"
                      ></i>
                      {item.question}
                    </h3>
                    <p className="faq-answer">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <DiscussBlock />

        {/* Services Block */}
        <ServicesBlock but={serviceName} />

        {/* Our Works */}
        <OurWorks />

        {/* Contact Us */}
        <ContactUs />
      </div>
    </MainTemplate>
  );
}
