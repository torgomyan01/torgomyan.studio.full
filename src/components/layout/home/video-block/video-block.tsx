'use client';

import { useEffect, useRef, useState } from 'react';
import './_video.scss';
import { useLocale } from '@/i18n/use-locale';
import { getTranslation } from '@/i18n';

interface VideoBlockProps {
  videoId?: string; // YouTube video ID (kept for backward compatibility, not used)
}

function VideoBlock({ videoId = 'dQw4w9WgXcQ' }: VideoBlockProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
            // Pause video when it goes out of view
            if (videoElementRef.current) {
              videoElementRef.current.pause();
            }
          }
        });
      },
      {
        threshold: 0.5,
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
  }, []);

  useEffect(() => {
    if (isVisible && videoElementRef.current) {
      const video = videoElementRef.current;

      const handleCanPlay = () => {
        video.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      };

      if (video.readyState >= 3) {
        // Video is already loaded enough to play
        video.play().catch((error) => {
          console.error('Error playing video:', error);
        });
      } else {
        video.addEventListener('canplay', handleCanPlay);
      }

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [isVisible]);

  return (
    <div className="video-block" ref={videoRef}>
      <div className="container">
        <h2 className="main-title">{getTranslation(locale, 'video.title')}</h2>
        <p className="main-subtitle">
          {getTranslation(locale, 'video.subtitle')}
        </p>
        <div className="video">
          {isVisible ? (
            <video
              ref={videoElementRef}
              width="100%"
              height="700"
              muted
              controls
              loop
              preload="auto"
              className="h-[300px] md:h-[700px] object-cover rounded-2xl sm:rounded-4xl"
              playsInline
            >
              <source
                src="/video/video-cover-Andranik-Torgomyan.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-[300px] md:h-[700px] bg-[linear-gradient(108deg,#C444FF_0%,#752999_100%)] flex-jc-c flex-col rounded-4xl">
              <i className="fa-solid fa-play text-[80px] text-white"></i>
              <h3 className="text-white text-[30px] mt-4">
                {getTranslation(locale, 'video.aboutUs')}
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VideoBlock;
