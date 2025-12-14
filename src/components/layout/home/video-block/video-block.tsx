'use client';

import { useEffect, useRef, useState } from 'react';
import './_video.scss';

interface VideoBlockProps {
  videoId?: string; // YouTube video ID
}

function VideoBlock({ videoId = 'dQw4w9WgXcQ' }: VideoBlockProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayed) {
            setIsVisible(true);
            setHasPlayed(true);
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [hasPlayed]);

  return (
    <div className="video-block" ref={videoRef}>
      <div className="container">
        <h2 className="main-title">Что ждать от нас </h2>
        <p className="main-subtitle">
          Результат, который вы увидите после того, как мы создадим сайт
        </p>
        <div className="video">
          {isVisible ? (
            <iframe
              width="100%"
              height="600"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="video-placeholder">
              <img src="/images/video.jpg" alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoBlock;
