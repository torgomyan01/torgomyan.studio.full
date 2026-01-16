'use client';

import './_reviews.scss';
import { testimonials, Works } from '@/utils/consts';
import Link from 'next/link';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

function Reviews() {
  const displayedReviews = testimonials.slice(0, 6);
  const locale = useLocale();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, index) => (
      <span key={index} className={`star ${index < rating ? 'filled' : ''}`}>
        ★
      </span>
    ));
  };

  const getProjectSlug = (projectName: string): string | null => {
    const project = Works.find((w) => w.name === projectName);
    return project?.slug || null;
  };

  return (
    <div className="reviews">
      <div className="container">
        <h2 className="main-title">
          {getTranslation(locale, 'reviews.title')}
        </h2>
        <p className="main-subtitle">
          {getTranslation(locale, 'reviews.subtitle')}
        </p>
        <div className="reviews-grid">
          {displayedReviews.map((review, index) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <div className="review-author">
                  <div className="author-avatar">
                    {review.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="author-info">
                    <h4 className="author-name">{review.author}</h4>
                    {review.company && (
                      <p className="author-company">{review.company}</p>
                    )}
                  </div>
                </div>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
              <p className="review-text">{review.text}</p>
              {review.project &&
                (() => {
                  const projectSlug = getProjectSlug(review.project);
                  return (
                    <div className="review-project">
                      <span className="project-label">
                        {getTranslation(locale, 'common.project')}:
                      </span>
                      {projectSlug ? (
                        <Link
                          href={addLocaleToPath(
                            `/our-works/${projectSlug}`,
                            locale
                          )}
                          className="project-name"
                        >
                          {review.project}
                        </Link>
                      ) : (
                        <span className="project-name">{review.project}</span>
                      )}
                    </div>
                  );
                })()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
