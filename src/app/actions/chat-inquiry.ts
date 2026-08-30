'use server';

import { ChatData } from '@/components/common/ai-block/types';
import {
  notifyTelegramChatInquiry,
  notifyTelegramScheduledCall,
} from '@/lib/telegram';

export async function saveChatInquiryAction(
  data: ChatData
): Promise<{ success: boolean; error?: string }> {
  try {
    let websiteType: string | null = null;

    if (data.websiteType) {
      websiteType = data.websiteType;
    } else if (data.productType) {
      websiteType = `Product Type: ${data.productType}`;
    } else if (data.pageCount) {
      websiteType = `Pages: ${data.pageCount}`;
    } else if (data.appFunctions) {
      websiteType = `Functions: ${data.appFunctions}`;
    } else if (data.designStyle) {
      websiteType = `Design Style: ${data.designStyle}`;
    } else if (data.paymentSystems) {
      websiteType = `Payment Systems: ${data.paymentSystems}`;
    } else if (data.automationType) {
      websiteType = `Automation Type: ${data.automationType}`;
    } else if (data.currentWebsite) {
      websiteType = `Current Website: ${data.currentWebsite}`;
    } else if (data.productCount) {
      websiteType = `Product Count: ${data.productCount}`;
    }

    const infoParts: string[] = [];
    if (data.additionalInfo) {
      infoParts.push(data.additionalInfo);
    }
    if (data.features?.length) {
      infoParts.push(`Features: ${data.features.join(', ')}`);
    }

    const sent = await notifyTelegramChatInquiry({
      name: data.name || null,
      email: data.email || null,
      phone: data.phone || null,
      selectedService: data.selectedService || null,
      websiteType,
      budget: data.budget || null,
      timeline: data.timeline || null,
      additionalInfo: infoParts.length > 0 ? infoParts.join(' | ') : null,
      discountPercentage: data.discountPercentage || null,
      discountEligible: data.discountEligible || false,
    });

    if (!sent) {
      return {
        success: false,
        error:
          'Не удалось отправить заявку. Попробуйте позже или свяжитесь с нами напрямую.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error saving chat inquiry:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function scheduleCallAction(data: {
  name: string;
  email: string;
  phone: string;
  scheduledDate: string;
  scheduledTime: string;
  discountPercentage?: number;
  discountEligible?: boolean;
}): Promise<{ success: boolean; error?: string }> {
  try {
    if (!data.name?.trim()) {
      return { success: false, error: 'Имя обязательно для заполнения' };
    }

    if (!data.email?.trim()) {
      return { success: false, error: 'Email обязателен для заполнения' };
    }

    if (!data.phone?.trim()) {
      return { success: false, error: 'Телефон обязателен для заполнения' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return { success: false, error: 'Некорректный формат email' };
    }

    const sent = await notifyTelegramScheduledCall({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      scheduledDate: data.scheduledDate,
      scheduledTime: data.scheduledTime,
      discountEligible: data.discountEligible || false,
      discountPercentage: data.discountPercentage || null,
    });

    if (!sent) {
      return {
        success: false,
        error:
          'Не удалось записать звонок. Попробуйте позже или свяжитесь с нами напрямую.',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error scheduling call:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
