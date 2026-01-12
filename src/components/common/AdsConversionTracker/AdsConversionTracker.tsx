'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { trackAdsConversion } from '@/utils/analytics';

/**
 * Component that tracks Google Ads conversion event on all pages except admin pages
 */
const AdsConversionTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Skip tracking on admin pages
    if (pathname && !pathname.startsWith('/admin')) {
      trackAdsConversion();
    }
  }, [pathname]);

  return null;
};

export default AdsConversionTracker;

