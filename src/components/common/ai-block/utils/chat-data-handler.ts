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
    const result = await saveChatInquiryAction(data);

    if (result.success) {
      console.log('Chat inquiry saved successfully:', result);
    } else {
      console.error('Failed to save chat inquiry:', result.error);
    }
  } catch (error) {
    console.error('Error saving chat inquiry:', error);
  }
}
