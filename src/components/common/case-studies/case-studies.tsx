'use client';

import Image from 'next/image';
import Link from 'next/link';
import './_case-studies.scss';
import { caseStudies } from '@/utils/consts';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

export default function CaseStudies() {
  const locale = useLocale();

  return (
    <section className="case-studies">
      <div className="container">
        <div className="case-studies__header">
          <span className="case-studies__badge">
            {getTranslation(locale, 'caseStudies.badge')}
          </span>
          <h2 className="case-studies__title">
            {getTranslation(locale, 'caseStudies.title')}
          </h2>
          <p className="case-studies__subtitle">
            {getTranslation(locale, 'caseStudies.subtitle')}
          </p>
        </div>

        <div className="case-studies__grid">
          {caseStudies.map((item) => (
            <article key={item.slug} className="case-studies__card">
              <Link
                href={addLocaleToPath(`/our-works/${item.slug}`, locale)}
                className="case-studies__image-link"
              >
                <Image
                  src={`/${item.imgUrl}`}
                  alt={getTranslation(locale, `caseStudies.items.${item.key}.title`)}
                  width={600}
                  height={340}
                  className="case-studies__image"
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <span className="case-studies__metric">
                  {getTranslation(locale, `caseStudies.items.${item.key}.metric`)}
                  <small>
                    {getTranslation(
                      locale,
                      `caseStudies.items.${item.key}.metricLabel`
                    )}
                  </small>
                </span>
              </Link>
              <div className="case-studies__body">
                <h3 className="case-studies__card-title">
                  {getTranslation(locale, `caseStudies.items.${item.key}.title`)}
                </h3>
                <p className="case-studies__problem">
                  <strong>
                    {getTranslation(locale, 'caseStudies.problemLabel')}:
                  </strong>{' '}
                  {getTranslation(locale, `caseStudies.items.${item.key}.problem`)}
                </p>
                <p className="case-studies__solution">
                  <strong>
                    {getTranslation(locale, 'caseStudies.solutionLabel')}:
                  </strong>{' '}
                  {getTranslation(locale, `caseStudies.items.${item.key}.solution`)}
                </p>
                <p className="case-studies__result">
                  {getTranslation(locale, `caseStudies.items.${item.key}.result`)}
                </p>
                <Link
                  href={addLocaleToPath(`/our-works/${item.slug}`, locale)}
                  className="case-studies__link"
                >
                  {getTranslation(locale, 'caseStudies.viewProject')}
                  <i className="fas fa-arrow-right" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
