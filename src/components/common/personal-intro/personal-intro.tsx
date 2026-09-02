'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';
import { trackButtonClick } from '@/utils/analytics';
import './_personal-intro.scss';

const POINTS = ['point1', 'point2', 'point3'] as const;

export default function PersonalIntro() {
  const locale = useLocale();

  return (
    <section className="personal-intro" aria-labelledby="personal-intro-title">
      <div className="container">
        <div className="personal-intro__card">
          <div className="personal-intro__media">
            <div className="personal-intro__image-wrap">
              <Image
                src="/images/founder.jpg"
                alt={getTranslation(locale, 'personalIntro.imageAlt')}
                width={480}
                height={600}
                className="personal-intro__image"
                sizes="(max-width: 767px) 280px, 360px"
                priority={false}
              />
            </div>
            <div className="personal-intro__identity">
              <p className="personal-intro__name">
                {getTranslation(locale, 'personalIntro.name')}
              </p>
              <p className="personal-intro__role">
                {getTranslation(locale, 'personalIntro.role')}
              </p>
            </div>
          </div>

          <div className="personal-intro__content">
            <span className="personal-intro__badge">
              {getTranslation(locale, 'personalIntro.badge')}
            </span>
            <h2 id="personal-intro-title" className="personal-intro__title">
              {getTranslation(locale, 'personalIntro.title')}
            </h2>
            <p className="personal-intro__description">
              {getTranslation(locale, 'personalIntro.description')}
            </p>

            <ul className="personal-intro__points">
              {POINTS.map((pointKey) => (
                <li key={pointKey} className="personal-intro__point">
                  <span className="personal-intro__point-icon" aria-hidden="true">
                    <i className="fas fa-check" />
                  </span>
                  {getTranslation(locale, `personalIntro.${pointKey}`)}
                </li>
              ))}
            </ul>

            <div className="personal-intro__actions">
              <Link
                href={addLocaleToPath('/schedule-call', locale)}
                className="studio-btn studio-btn--primary studio-btn--lg"
                onClick={() => trackButtonClick('personal_intro_cta', 'personal_intro')}
              >
                <i className="fas fa-phone" aria-hidden="true" />
                {getTranslation(locale, 'personalIntro.cta')}
              </Link>
              <p className="personal-intro__hint">
                <i className="fas fa-clock" aria-hidden="true" />
                {getTranslation(locale, 'common.responseTime')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
