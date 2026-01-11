'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface EyePosition {
  x: number;
  y: number;
}

interface SmileyButtonProps {
  onClick: () => void;
  showChat: boolean;
  isScrolled?: boolean;
}

export default function SmileyButton({
  onClick,
  showChat,
  isScrolled = false,
}: SmileyButtonProps) {
  const [eyePosition, setEyePosition] = useState<EyePosition>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (buttonRef.current && !showChat) {
        const rect = buttonRef.current.getBoundingClientRect();

        // Left eye center position (relative to button)
        const leftEyeX = rect.left + rect.width * 0.35;
        const leftEyeY = rect.top + rect.height * 0.4;

        // Right eye center position (relative to button)
        const rightEyeX = rect.left + rect.width * 0.65;
        const rightEyeY = rect.top + rect.height * 0.4;

        // Calculate distance from mouse to each eye
        const leftEyeDistanceX = e.clientX - leftEyeX;
        const leftEyeDistanceY = e.clientY - leftEyeY;
        const rightEyeDistanceX = e.clientX - rightEyeX;
        const rightEyeDistanceY = e.clientY - rightEyeY;

        // Use average for both eyes to look at same point
        const avgDistanceX = (leftEyeDistanceX + rightEyeDistanceX) / 2;
        const avgDistanceY = (leftEyeDistanceY + rightEyeDistanceY) / 2;

        // Calculate eye position (limit movement to eye socket)
        const maxDistance = 7;
        const eyeDistance = Math.min(
          Math.sqrt(avgDistanceX * avgDistanceX + avgDistanceY * avgDistanceY),
          maxDistance
        );
        const angle = Math.atan2(avgDistanceY, avgDistanceX);

        setEyePosition({
          x: Math.cos(angle) * eyeDistance,
          y: Math.sin(angle) * eyeDistance,
        });
      } else {
        // Reset eyes to center when chat is open
        setEyePosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [showChat]);

  const ButtonContent = () => (
    <>
      <div className="animated-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <div className="smiley-container">
        <svg
          width="200"
          height="200"
          viewBox="0 0 154 154"
          className="smiley-svg ai-face"
        >
          <defs>
            <filter
              id="filter0_i_1_56"
              x="0"
              y="0"
              width="200"
              height="200"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="4"
                operator="erode"
                in="SourceAlpha"
                result="effect1_innerShadow_1_56"
              />
              <feOffset />
              <feGaussianBlur stdDeviation="4.5" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_1_56"
              />
            </filter>
          </defs>

          {/* Main face circle with inner shadow */}
          <g filter="url(#filter0_i_1_56)">
            <rect
              width="154"
              height="154"
              rx="77"
              fill="white"
              fillOpacity="0.47"
            />
          </g>

          {/* Left eye - vertical rectangle */}
          <g className="eye-group left-eye">
            <rect
              x={45 + eyePosition.x * 0.3}
              y={53 + eyePosition.y * 0.3}
              width="4"
              height="21"
              rx="2"
              fill="#D273FD"
              className="eye-rect"
            >
              <animate
                attributeName="height"
                values="21;10;0;8;21"
                dur="3s"
                repeatCount="indefinite"
                keyTimes="0;0.9;0.92;0.97;1"
                calcMode="spline"
                keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
              />
              <animate
                attributeName="opacity"
                values="1;0.9;0;0.8;1"
                dur="3s"
                repeatCount="indefinite"
                keyTimes="0;0.9;0.92;0.97;1"
              />
            </rect>
          </g>

          {/* Right eye - vertical rectangle */}
          <g className="eye-group right-eye">
            <rect
              x={111 + eyePosition.x * 0.3}
              y={53 + eyePosition.y * 0.3}
              width="4"
              height="21"
              rx="2"
              fill="#D273FD"
              className="eye-rect"
            >
              <animate
                attributeName="height"
                values="21;10;0;8;21"
                dur="3s"
                repeatCount="indefinite"
                keyTimes="0;0.9;0.92;0.97;1"
                calcMode="spline"
                keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
              />
              <animate
                attributeName="opacity"
                values="1;0.9;0;0.8;1"
                dur="3s"
                repeatCount="indefinite"
                keyTimes="0;0.9;0.92;0.97;1"
              />
            </rect>
          </g>

          {/* Smile path */}
          <path
            d="M49 104.208C49 103.217 50.0691 102.592 50.9411 103.062C73.3073 115.134 86.6756 116.23 109.035 103.17C109.899 102.665 111 103.28 111 104.282C111 104.728 110.761 105.148 110.38 105.379C88.4469 118.712 74.8721 118.227 49.7137 105.367C49.2804 105.145 49 104.694 49 104.208Z"
            fill="#D273FD"
            className="smile-path"
          />
        </svg>
      </div>
    </>
  );

  return (
    <motion.button
      ref={buttonRef}
      className="chat-toggle-btn"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ButtonContent />
    </motion.button>
  );
}
