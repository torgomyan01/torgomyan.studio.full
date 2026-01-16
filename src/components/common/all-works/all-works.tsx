'use client';

import './_all-works.scss';
import { Works } from '@/utils/consts';
import Image from 'next/image';
import { useState } from 'react';
import ImageGalleryModal from '@/components/ui/image-gallery-modal';
import Link from 'next/link';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';

function AllWorks() {
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const locale = useLocale();

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % Works.length);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + Works.length) % Works.length);
  };

  return (
    <div className="all-works">
      <div className="container">
        <div className="all-works-items">
          {Works.map((work, index) => (
            <div key={work.name} className="all-works-item">
              <div
                className="work-preview"
                onClick={() =>
                  setSelectedWork(selectedWork === index ? null : index)
                }
              >
                <Link
                  href={`/our-works/${work.slug}`}
                  className="img-wrap"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <Image
                    src={`/${work.imgUrl}`}
                    alt={work.name}
                    width={400}
                    height={400}
                  />
                </Link>
                <div className="work-info">
                  <Link href={`/our-works/${work.slug}`}>
                    <h3 className="work-name">{work.name}</h3>
                  </Link>
                  <p className="work-tech">{work.created}</p>
                  {(() => {
                    const descriptionKey = `ourWorks.descriptions.${work.slug}`;
                    const translatedDescription = getTranslation(locale, descriptionKey);
                    const workDescription = translatedDescription || work.description || '';
                    return workDescription ? (
                      <p className="work-description">{workDescription}</p>
                    ) : null;
                  })()}
                  <span className="work-toggle">
                    {selectedWork === index
                      ? 'Скрыть ссылки'
                      : 'Показать ссылки'}
                    <i
                      className={`fas fa-chevron-${
                        selectedWork === index ? 'up' : 'down'
                      }`}
                    />
                  </span>
                </div>
              </div>
              {selectedWork === index && (
                <div className="work-links pt-4!">
                  <h4>Ссылки на проект:</h4>
                  <div className="links-grid">
                    {work.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work-link"
                      >
                        <span>{link.name}</span>
                        <i className="fas fa-external-link-alt" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <ImageGalleryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        works={Works}
        currentIndex={selectedImageIndex}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </div>
  );
}

export default AllWorks;
