'use client';

import Link from 'next/link';
import { SITE_URL } from '@/utils/consts';
import './_contact-us.scss';
import PrimaryCtaLink from '@/components/common/primary-cta-link/primary-cta-link';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

function ContactUs() {
  const locale = useLocale();

  const channels = [
    {
      href: 'tel:+37477769668',
      icon: 'fas fa-phone',
      label: getTranslation(locale, 'contact.phoneLabel'),
      value: '+374 77 76-96-68',
      external: false,
    },
    {
      href: 'https://wa.me/37477769668',
      icon: 'fab fa-whatsapp',
      label: getTranslation(locale, 'contact.whatsappLabel'),
      value: '+374 77 76-96-68',
      external: true,
    },
    {
      href: 'https://t.me/torgomyan01',
      icon: 'fab fa-telegram-plane',
      label: getTranslation(locale, 'contact.telegramLabel'),
      value: '@torgomyan01',
      external: true,
    },
    {
      href: 'https://yandex.ru/maps/?um=constructor%3Af026db7051cfc7952a3361c3d3bf24998f1427bd3b64e28673a2f5ade3b074ab',
      icon: 'fas fa-location-dot',
      label: getTranslation(locale, 'contact.addressLabel'),
      value: getTranslation(locale, 'contact.address'),
      external: true,
    },
  ];

  return (
    <section className="contact-us" id="contact">
      <div className="container">
        <div className="contact-us__hero">
          <span className="contact-us__badge">
            <i className="fas fa-bolt" aria-hidden="true" />
            {getTranslation(locale, 'contact.badge')}
          </span>
          <h2 className="contact-us__title">
            {getTranslation(locale, 'contact.title')}
          </h2>
          <p className="contact-us__subtitle">
            {getTranslation(locale, 'contact.subtitle')}
          </p>
          <p className="contact-us__hint">
            {getTranslation(locale, 'contact.responseHint')}
          </p>
        </div>

        <div className="contact-us__actions">
          <PrimaryCtaLink location="contact_section" fullWidth />
          <a
            href="tel:+37477769668"
            className="studio-btn studio-btn--ghost studio-btn--lg studio-btn--full contact-us__phone-btn"
          >
            <span className="contact-us__action-icon">
              <i className="fas fa-phone" aria-hidden="true" />
            </span>
            <span className="contact-us__action-text">
              <strong>{getTranslation(locale, 'contact.call')}</strong>
              <small>+374 77 76-96-68</small>
            </span>
            <i className="fas fa-arrow-right" aria-hidden="true" />
          </a>
        </div>

        <div className="contact-us__grid">
          <div className="contact-us__channels">
            {channels.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="contact-us__card"
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                <span className="contact-us__card-icon">
                  <i className={item.icon} aria-hidden="true" />
                </span>
                <span className="contact-us__card-body">
                  <span className="contact-us__card-label">{item.label}</span>
                  <span className="contact-us__card-value">{item.value}</span>
                </span>
              </a>
            ))}
            <Link
              href={addLocaleToPath(SITE_URL.CALCULATOR, locale)}
              className="contact-us__card contact-us__card--cta"
            >
              <span className="contact-us__card-icon">
                <i className="fas fa-calculator" aria-hidden="true" />
              </span>
              <span className="contact-us__card-body">
                <span className="contact-us__card-label">
                  {getTranslation(locale, 'common.calculator')}
                </span>
                <span className="contact-us__card-value">
                  {getTranslation(locale, 'contact.calculatorCta')}
                </span>
              </span>
            </Link>
          </div>

          <div className="contact-us__map">
            <p className="contact-us__map-label">
              <i className="fas fa-map" aria-hidden="true" />
              {getTranslation(locale, 'contact.mapLabel')}
            </p>
            <div className="contact-us__map-frame">
              <iframe
                title={getTranslation(locale, 'contact.mapLabel')}
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Af026db7051cfc7952a3361c3d3bf24998f1427bd3b64e28673a2f5ade3b074ab&amp;source=constructor"
                width="821"
                height="500"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
