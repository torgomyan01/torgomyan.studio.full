'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
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
            <motion.div
              key={work.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <Link
                href={addLocaleToPath(`/our-works/${work.slug}`, locale)}
                className="our-works-item"
              >
                <motion.div
                  className="img-wrap"
                  onClick={(e) => {
                    e.preventDefault();
                    handleImageClick(index);
                  }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={`/${work.imgUrl}`}
                    alt={`${getTranslation(locale, 'ourWorks.workExample')} - ${work.name}`}
                    width={400}
                    height={400}
                    className="work-image"
                  />
                  <div className="img-overlay">
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2.458 12C3.732 7.943 7.523 5 12 5C16.478 5 20.268 7.943 21.542 12C20.268 16.057 16.478 19 12 19C7.523 19 3.732 16.057 2.458 12Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </motion.div>
                <div className="work-content">
                  <h3 className="work-title">{work.name}</h3>
                  <div className="work-arrow">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13 7L18 12L13 17M6 7L11 12L6 17"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Link
            href={addLocaleToPath(SITE_URL.OUR_WORKS, locale)}
            className="show-all"
          >
            <span>{getTranslation(locale, 'ourWorks.viewAll')}</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 7L18 12L13 17M6 7L11 12L6 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>
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
