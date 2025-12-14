'use client';

import './_all-works.scss';
import { Works } from '@/utils/consts';
import Image from 'next/image';
import { useState } from 'react';
import ImageGalleryModal from '@/components/ui/image-gallery-modal';

function AllWorks() {
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
                <span
                  className="img-wrap"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageClick(index);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={`/${work.imgUrl}`}
                    alt={work.name}
                    width={400}
                    height={400}
                  />
                </span>
                <div className="work-info">
                  <h3 className="work-name">{work.name}</h3>
                  <p className="work-tech">{work.created}</p>
                  {work.description && (
                    <p className="work-description">{work.description}</p>
                  )}
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
                <div className="work-links">
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
