import { useState, useEffect, useLayoutEffect, useRef, RefObject } from 'react';

export function useScrollDetection(
  threshold: number = 200,
  elementRef?: RefObject<HTMLElement>
) {
  const [isScrolled, setIsScrolled] = useState(false);
  const initialPositionRef = useRef<{ top: number; height: number } | null>(
    null
  );
  const isFixedRef = useRef(false);

  // Store initial position synchronously after DOM update
  useLayoutEffect(() => {
    if (elementRef?.current && !initialPositionRef.current) {
      const element = elementRef.current;
      const rect = element.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;

      initialPositionRef.current = {
        top: elementTop,
        height: elementHeight,
      };
    }
  }, [elementRef]);

  useEffect(() => {
    if (!elementRef?.current) {
      // Fallback to threshold-based detection
      const handleScroll = () => {
        const scrollY = window.scrollY || window.pageYOffset;
        setIsScrolled(scrollY > threshold);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }

    const element = elementRef.current;

    const handleScroll = () => {
      if (initialPositionRef.current) {
        const scrollY = window.scrollY || window.pageYOffset;
        const elementBottom =
          initialPositionRef.current.top + initialPositionRef.current.height;

        // Element is considered passed only when we've completely scrolled past its bottom
        // Fixed mode activates only after the entire block has been scrolled past
        const hasPassed = scrollY > elementBottom - 400;

        setIsScrolled(hasPassed);

        // Update fixed state
        isFixedRef.current = hasPassed;
      } else {
        // Recalculate initial position if not set
        // Only if element is not currently fixed (not in floating mode)
        const rect = element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(element);
        const isCurrentlyFixed = computedStyle.position === 'fixed';

        if (!isCurrentlyFixed) {
          const scrollY = window.scrollY || window.pageYOffset;
          const elementTop = rect.top + scrollY;
          const elementHeight = rect.height;

          initialPositionRef.current = {
            top: elementTop,
            height: elementHeight,
          };
        }
      }
    };

    // Check initial scroll position
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      // Only reset if element is not fixed
      if (!isFixedRef.current && elementRef?.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const scrollY = window.scrollY || window.pageYOffset;
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;

        initialPositionRef.current = {
          top: elementTop,
          height: elementHeight,
        };
        handleScroll();
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [threshold, elementRef]);

  return isScrolled;
}
