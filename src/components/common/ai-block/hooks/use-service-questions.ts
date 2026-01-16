import { useLocale } from '@/i18n/use-locale';
import { getTranslations } from '@/i18n';

// Helper function to detect service key from service name
function getServiceKey(service: string, locale: string): string {
  const serviceLower = service.toLowerCase();

  // Map service names to keys (works with translated service names)
  if (
    serviceLower.includes('интернет-магазин') ||
    serviceLower.includes('магазин') ||
    serviceLower.includes('online shop') ||
    serviceLower.includes('online-shop') ||
    serviceLower.includes('առցանց խանութ')
  ) {
    return 'onlineShop';
  }
  if (
    serviceLower.includes('корпоративный') ||
    serviceLower.includes('corporate') ||
    serviceLower.includes('կորպորատիվ')
  ) {
    return 'corporateWebsite';
  }
  if (
    serviceLower.includes('лендинг') ||
    serviceLower.includes('landing') ||
    serviceLower.includes('լենդինգ')
  ) {
    return 'landingPage';
  }
  if (
    serviceLower.includes('визитка') ||
    serviceLower.includes('business card') ||
    serviceLower.includes('վիզիտկա')
  ) {
    return 'businessCardWebsite';
  }
  if (
    serviceLower.includes('веб-приложения') ||
    serviceLower.includes('web applications') ||
    serviceLower.includes('վեբ-հավելված')
  ) {
    return 'webApplications';
  }
  if (
    serviceLower.includes('seo') ||
    serviceLower.includes('продвижение') ||
    serviceLower.includes('promotion') ||
    serviceLower.includes('առաջխաղացում')
  ) {
    return 'seo';
  }
  if (
    serviceLower.includes('ui/ux') ||
    serviceLower.includes('дизайн') ||
    serviceLower.includes('design') ||
    serviceLower.includes('դիզայն')
  ) {
    return 'uiUxDesign';
  }
  if (
    serviceLower.includes('техническая поддержка') ||
    serviceLower.includes('technical support') ||
    serviceLower.includes('տեխնիկական աջակցություն')
  ) {
    return 'technicalSupport';
  }
  if (
    serviceLower.includes('хостинг') ||
    serviceLower.includes('hosting') ||
    serviceLower.includes('հոստինգ')
  ) {
    return 'hostingDomains';
  }
  if (
    serviceLower.includes('платеж') ||
    serviceLower.includes('payment') ||
    serviceLower.includes('վճարում')
  ) {
    return 'paymentIntegration';
  }
  if (
    serviceLower.includes('автоматизация') ||
    serviceLower.includes('automation') ||
    serviceLower.includes('ավտոմատացում')
  ) {
    return 'businessAutomation';
  }
  return 'default';
}

export function useServiceQuestions() {
  const locale = useLocale();
  const getServiceQuestions = (service: string): string[] => {
    const serviceKey = getServiceKey(service, locale);

    // Get translations object
    const translations = getTranslations(locale);

    // Get questions array from translations
    const serviceQuestions = translations?.aiBlock?.serviceQuestions;
    if (!serviceQuestions) {
      return [];
    }

    // Get questions for the specific service
    const questions = (serviceQuestions as any)[serviceKey];
    if (Array.isArray(questions) && questions.length > 0) {
      return questions;
    }

    // Fallback to default questions
    const defaultQuestions = (serviceQuestions as any).default;
    if (Array.isArray(defaultQuestions) && defaultQuestions.length > 0) {
      return defaultQuestions;
    }

    return [];
  };

  return { getServiceQuestions };
}
