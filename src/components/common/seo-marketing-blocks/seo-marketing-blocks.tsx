import './_seo-marketing-blocks.scss';

interface SEOMarketingBlocksProps {
  benefits?: Array<{ title: string; description: string; icon: string }>;
  features?: string[];
  faq?: Array<{ question: string; answer: string }>;
  stats?: Array<{ number: string; label: string }>;
}

function SEOMarketingBlocks({
  benefits,
  features,
  faq,
  stats,
}: SEOMarketingBlocksProps) {
  return (
    <>
      {/* Stats Section */}
      {stats && stats.length > 0 && (
        <section className="seo-stats-section">
          <div className="container">
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      {features && features.length > 0 && (
        <section className="seo-features-section">
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

      {/* Benefits Section */}
      {benefits && benefits.length > 0 && (
        <section className="seo-benefits-section">
          <div className="container">
            <h2 className="section-title">Почему выбирают нас</h2>
            <div className="benefits-grid">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
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

      {/* FAQ Section */}
      {faq && faq.length > 0 && (
        <section className="seo-faq-section">
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
    </>
  );
}

export default SEOMarketingBlocks;
