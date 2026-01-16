'use client';

import { useState } from 'react';
import './_our-works.scss';
import { SITE_URL, Works } from '@/utils/consts';
import Image from 'next/image';
import Link from 'next/link';
import ImageGalleryModal from '@/components/ui/image-gallery-modal';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';
import { addLocaleToPath } from '@/i18n/utils';

function OurWorks() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const displayedWorks = Works.slice(0, 6);
  const locale = useLocale();

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
    <div className="our-works">
      <div className="container">
        <h2 className="main-title">
          {getTranslation(locale, 'ourWorks.title')}
        </h2>
        <p className="main-subtitle">
          {getTranslation(locale, 'ourWorks.subtitle')}
        </p>
        <div className="our-works-items">
          {displayedWorks.map((work, index) => (
            <Link
              key={work.name}
              href={addLocaleToPath(`/our-works/${work.slug}`, locale)}
              className="our-works-item"
            >
              <span
                className="img-wrap"
                onClick={(e) => {
                  e.preventDefault();
                  handleImageClick(index);
                }}
                style={{ cursor: 'pointer' }}
              >
                <Image
                  src={`/${work.imgUrl}`}
                  alt={`${getTranslation(locale, 'ourWorks.workExample')} - ${work.name}`}
                  width={200}
                  height={200}
                />
              </span>
              <div className="work-content">
                <span className="text">{work.name}</span>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href={addLocaleToPath(SITE_URL.OUR_WORKS, locale)}
          className="show-all"
        >
          <span>{getTranslation(locale, 'ourWorks.viewAll')}</span>
          <img src="/images/link-arrow.svg" alt="" />
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
    </div>
  );
}

export default OurWorks;
