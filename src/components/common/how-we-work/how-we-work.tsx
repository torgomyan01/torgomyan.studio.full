'use client';

import './_how-we-work.scss';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import PrimaryCtaLink from '@/components/common/primary-cta-link/primary-cta-link';

const steps = [
  { key: 'step1', icon: 'fas fa-comments' },
  { key: 'step2', icon: 'fas fa-file-invoice-dollar' },
  { key: 'step3', icon: 'fas fa-palette' },
  { key: 'step4', icon: 'fas fa-rocket' },
] as const;

export default function HowWeWork() {
  const locale = useLocale();

  return (
    <section className="how-we-work">
      <div className="container">
        <div className="how-we-work__header">
          <span className="how-we-work__badge">
            {getTranslation(locale, 'howWeWork.badge')}
          </span>
          <h2 className="how-we-work__title">
            {getTranslation(locale, 'howWeWork.title')}
          </h2>
          <p className="how-we-work__subtitle">
            {getTranslation(locale, 'howWeWork.subtitle')}
          </p>
        </div>

        <div className="how-we-work__steps">
          {steps.map((step, index) => (
            <article key={step.key} className="how-we-work__step">
              <span className="how-we-work__step-num">{index + 1}</span>
              <span className="how-we-work__step-icon">
                <i className={step.icon} aria-hidden="true" />
              </span>
              <h3 className="how-we-work__step-title">
                {getTranslation(locale, `howWeWork.${step.key}.title`)}
              </h3>
              <p className="how-we-work__step-text">
                {getTranslation(locale, `howWeWork.${step.key}.text`)}
              </p>
            </article>
          ))}
        </div>

        <div className="how-we-work__footer">
          <p className="how-we-work__response">
            <i className="fas fa-clock" aria-hidden="true" />
            {getTranslation(locale, 'common.responseTime')}
          </p>
          <PrimaryCtaLink location="how_we_work" />
        </div>
      </div>
    </section>
  );
}
