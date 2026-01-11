import { ChatData } from '../types';
import { saveChatInquiryAction } from '@/app/actions/chat-inquiry';

export function saveAnswerToChatData(
  service: string,
  currentQuestionStep: number,
  answer: string,
  chatData: ChatData
): ChatData {
  const updatedData: ChatData = { ...chatData };

  if (service.includes('Интернет-магазин')) {
    if (currentQuestionStep === 0) updatedData.productCount = answer;
    else if (currentQuestionStep === 1) updatedData.additionalInfo = answer;
    else if (currentQuestionStep >= 2) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else if (service.includes('Корпоративный')) {
    if (currentQuestionStep === 0) updatedData.pageCount = answer;
    else if (currentQuestionStep >= 1) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else if (service.includes('Лендинг')) {
    if (currentQuestionStep === 0) updatedData.productType = answer;
    else if (currentQuestionStep === 1) updatedData.additionalInfo = answer;
    else if (currentQuestionStep >= 2) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else if (service.includes('Сайт-визитка')) {
    if (currentQuestionStep === 0) updatedData.additionalInfo = answer;
    else if (currentQuestionStep === 1) updatedData.pageCount = answer;
    else if (currentQuestionStep >= 2) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else if (service.includes('Веб-приложения')) {
    if (currentQuestionStep === 0) updatedData.appFunctions = answer;
    else if (currentQuestionStep === 1) updatedData.additionalInfo = answer;
    else if (currentQuestionStep >= 2) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else if (service.includes('SEO') || service.includes('Продвижение')) {
    if (currentQuestionStep === 0) updatedData.currentWebsite = answer;
    else if (currentQuestionStep === 1) updatedData.additionalInfo = answer;
    else if (currentQuestionStep >= 2) {
      updatedData.additionalInfo =
        (updatedData.additionalInfo || '') + ' | ' + answer;
    }
  } else if (service.includes('UI/UX') || service.includes('Дизайн')) {
    if (currentQuestionStep === 0) updatedData.additionalInfo = answer;
    else if (currentQuestionStep === 1) updatedData.designStyle = answer;
    else if (currentQuestionStep === 2) {
      updatedData.additionalInfo =
        (updatedData.additionalInfo || '') + ' | ' + answer;
    } else if (currentQuestionStep >= 3) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else if (service.includes('Техническая поддержка')) {
    if (currentQuestionStep === 0) updatedData.additionalInfo = answer;
    else if (currentQuestionStep === 1) updatedData.currentWebsite = answer;
    else if (currentQuestionStep === 2) {
      updatedData.additionalInfo =
        (updatedData.additionalInfo || '') + ' | ' + answer;
    } else if (currentQuestionStep >= 3) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else if (service.includes('Хостинг') || service.includes('домен')) {
    if (currentQuestionStep === 0) updatedData.additionalInfo = answer;
    else if (currentQuestionStep === 1) {
      updatedData.additionalInfo =
        (updatedData.additionalInfo || '') + ' | ' + answer;
    } else if (currentQuestionStep >= 2) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else if (service.includes('Интеграция платежных')) {
    if (currentQuestionStep === 0) updatedData.paymentSystems = answer;
    else if (currentQuestionStep === 1) updatedData.additionalInfo = answer;
    else if (currentQuestionStep >= 2) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else if (service.includes('Автоматизация')) {
    if (currentQuestionStep === 0) updatedData.automationType = answer;
    else if (currentQuestionStep === 1) updatedData.additionalInfo = answer;
    else if (currentQuestionStep === 2) {
      updatedData.additionalInfo =
        (updatedData.additionalInfo || '') + ' | ' + answer;
    } else if (currentQuestionStep >= 3) {
      updatedData.features = [...(updatedData.features || []), answer];
    }
  } else {
    if (currentQuestionStep === 0) updatedData.additionalInfo = answer;
    else if (currentQuestionStep >= 1) {
      updatedData.additionalInfo =
        (updatedData.additionalInfo || '') + ' | ' + answer;
    }
  }

  return updatedData;
}

export async function saveChatInquiry(data: ChatData): Promise<void> {
  try {
    // Check if promotion timer is still active
    const STORAGE_KEY = 'promotion_timer_start';
    const PROMOTION_DURATION = 10 * 60 * 1000; // 10 minutes
    let discountEligible = false;
    let discountPercentage: number | undefined = undefined;

    // Check localStorage only in browser environment
    if (typeof window !== 'undefined') {
      const timerStart = localStorage.getItem(STORAGE_KEY);

      if (timerStart) {
        const now = Date.now();
        const elapsed = now - parseInt(timerStart, 10);
        const remaining = PROMOTION_DURATION - elapsed;

        if (remaining > 0) {
          // Promotion is still active
          discountEligible = true;
          discountPercentage = 25;
          // Remove timer after use
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    }

    const dataWithDiscount: ChatData = {
      ...data,
      discountEligible,
      discountPercentage,
    };

    const result = await saveChatInquiryAction(dataWithDiscount);

    if (result.success) {
      console.log('Chat inquiry saved successfully:', result);
      if (discountEligible) {
        console.log('Discount applied: 25%');
      }
    } else {
      console.error('Failed to save chat inquiry:', result.error);
    }
  } catch (error) {
    console.error('Error saving chat inquiry:', error);
  }
}
