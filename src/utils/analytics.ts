/**
 * Marketing Analytics Utility
 * Universal event tracking for Google Analytics, Yandex Metrika, and Facebook Pixel
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    ym?: (id: number, method: string, goal: string, params?: any) => void;
    fbq?: (method: string, event: string, params?: any) => void;
    dataLayer?: any[];
  }
}

/**
 * Track a marketing event across all analytics platforms
 * @param eventName - Name of the event (e.g., 'discuss_button_click', 'calculator_submission')
 * @param params - Additional parameters for the event
 */
export const trackEvent = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  const eventParams = {
    event_category: 'engagement',
    ...params,
  };

  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Yandex Metrika
  if (window.ym && process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID) {
    const metrikaId = parseInt(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID);
    window.ym(metrikaId, 'reachGoal', eventName, eventParams);
  }

  // Facebook Pixel
  if (window.fbq) {
    window.fbq('track', eventName, eventParams);
  }

  // Console log for debugging (remove in production if needed)
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics Event:', eventName, eventParams);
  }
};

/**
 * Track conversion events
 * @param type - Type of conversion (e.g., 'calculator', 'contact_form', 'scheduled_call')
 * @param value - Optional monetary value
 */
export const trackConversion = (type: string, value?: number) => {
  trackEvent(`conversion_${type}`, value ? { value } : {});
};

/**
 * Track button clicks
 * @param buttonName - Name/identifier of the button
 * @param location - Where the button is located (e.g., 'discuss_block', 'header', 'popup')
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    button_location: location,
  });
};

/**
 * Track Google Ads conversion event
 * @param params - Event parameters for the conversion
 */
export const trackAdsConversion = (params?: Record<string, any>) => {
  if (typeof window === 'undefined') return;

  // Google Analytics conversion event
  if (window.gtag) {
    window.gtag('event', 'ads_conversion___1', params || {});
  }

  // Console log for debugging
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Ads Conversion Event:', 'ads_conversion___1', params);
  }
};
