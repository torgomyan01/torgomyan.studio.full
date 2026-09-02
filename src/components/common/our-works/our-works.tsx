'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper } from 'swiper';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import { SITE_URL, Works } from '@/utils/consts';
import ImageGalleryModal from '@/components/ui/image-gallery-modal';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';
import './_our-works.scss';

function getWorkDescription(
  locale: ReturnType<typeof useLocale>,
  slug: string,
  fallback?: string
) {
  const key = `ourWorks.descriptions.${slug}`;
  const translated = getTranslation(locale, key);

  return translated !== key ? translated : fallback || '';
}

function OurWorks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const displayedWorks = Works;
  const locale = useLocale();

  useEffect(() => {
    if (!swiperRef.current || !prevRef.current || !nextRef.current || !paginationRef.current) {
      return;
    }

    const slider = new Swiper(swiperRef.current, {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 24,
      speed: 700,
      loop: true,
      grabCursor: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
      navigation: {
        prevEl: prevRef.current,
        nextEl: nextRef.current,
      },
      pagination: {
        el: paginationRef.current,
        type: 'fraction',
        formatFractionCurrent: (number) => String(number).padStart(2, '0'),
        formatFractionTotal: (number) => String(number).padStart(2, '0'),
      },
      on: {
        init: () => {
          setIsLoading(false);
        },
      },
    });

    return () => {
      slider.destroy(true, true);
    };
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % displayedWorks.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + displayedWorks.length) % displayedWorks.length
    );
  };

  return (
    <section className="our-works" aria-labelledby="our-works-title">
      <div className="our-works__glow" aria-hidden="true" />

      <div className="container our-works__header">
        <span className="our-works__badge">
          {getTranslation(locale, 'ourWorks.sliderBadge')}
        </span>
        <h2 id="our-works-title" className="main-title">
          {getTranslation(locale, 'ourWorks.title')}
        </h2>
        <p className="main-subtitle">
          {getTranslation(locale, 'ourWorks.subtitle')}
        </p>
      </div>

      <div className="our-works__slider-shell">
        <div className="container our-works__slider-container">
          <div
            ref={swiperRef}
            className={`our-works-slider swiper${isLoading ? ' is-loading' : ''}`}
            role="region"
            aria-label={getTranslation(locale, 'ourWorks.title')}
          >
            <div className="swiper-wrapper">
              {displayedWorks.map((work, index) => {
                const description = getWorkDescription(
                  locale,
                  work.slug,
                  work.description
                );

                return (
                  <div key={work.slug} className="swiper-slide">
                    <article className="our-works-slide">
                      <button
                        type="button"
                        className="our-works-slide__media"
                        onClick={() => handleImageClick(index)}
                        aria-label={`${getTranslation(locale, 'ourWorks.workExample')} - ${work.name}`}
                      >
                        <Image
                          src={`/${work.imgUrl}`}
                          alt={`${getTranslation(locale, 'ourWorks.workExample')} - ${work.name}`}
                          width={720}
                          height={420}
                          className="our-works-slide__image"
                          sizes="(max-width: 767px) 100vw, 720px"
                          priority={index === 0}
                        />
                        <span className="our-works-slide__overlay" aria-hidden="true">
                          <i className="fas fa-eye" />
                          <span>{getTranslation(locale, 'ourWorks.preview')}</span>
                        </span>
                      </button>

                      <div className="our-works-slide__content">
                        <p className="our-works-slide__index">
                          {String(index + 1).padStart(2, '0')}
                        </p>
                        <h3 className="our-works-slide__title">{work.name}</h3>
                        {description ? (
                          <p className="our-works-slide__description">{description}</p>
                        ) : null}
                        {work.created ? (
                          <p className="our-works-slide__tech">{work.created}</p>
                        ) : null}
                        <Link
                          href={addLocaleToPath(`/our-works/${work.slug}`, locale)}
                          className="our-works-slide__link"
                        >
                          {getTranslation(locale, 'common.learnMore')}
                          <i className="fas fa-arrow-right" aria-hidden="true" />
                        </Link>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="our-works__controls">
            <button
              ref={prevRef}
              type="button"
              className="our-works__nav our-works__nav--prev"
              aria-label={getTranslation(locale, 'ourWorks.prevSlide')}
            >
              <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>

            <div ref={paginationRef} className="our-works__pagination" />

            <button
              ref={nextRef}
              type="button"
              className="our-works__nav our-works__nav--next"
              aria-label={getTranslation(locale, 'ourWorks.nextSlide')}
            >
              <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="container our-works__footer">
        <Link
          href={addLocaleToPath(SITE_URL.OUR_WORKS, locale)}
          className="our-works__view-all"
        >
          <span>{getTranslation(locale, 'ourWorks.viewAll')}</span>
          <i className="fas fa-arrow-right" aria-hidden="true" />
        </Link>
      </div>

      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        works={displayedWorks}
        currentIndex={selectedImageIndex}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </section>
  );
}

export default OurWorks;
