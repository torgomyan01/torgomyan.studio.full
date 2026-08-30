'use server';

import { notifyTelegramCalculatorSubmission } from '@/lib/telegram';

export async function saveCalculatorSubmissionAction(data: {
  websiteType: string;
  pagesCount: number;
  designStyle: string;
  features: string[];
  cmsRequired: boolean;
  ecommerce: boolean;
  paymentSystems: string;
  mobileApp: boolean;
  seoOptimization: boolean;
  contentManagement: boolean;
  estimatedPrice: number;
  name: string;
  email: string;
  phone: string;
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

    const sent = await notifyTelegramCalculatorSubmission({
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      websiteType: data.websiteType || null,
      pagesCount: data.pagesCount || null,
      designStyle: data.designStyle || null,
      features:
        data.features.length > 0 ? data.features.join(', ') : null,
      cmsRequired: data.cmsRequired,
      ecommerce: data.ecommerce,
      paymentSystems: data.paymentSystems || null,
      mobileApp: data.mobileApp,
      seoOptimization: data.seoOptimization,
      contentManagement: data.contentManagement,
      estimatedPrice: data.estimatedPrice || null,
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
    console.error('Error saving calculator submission:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
