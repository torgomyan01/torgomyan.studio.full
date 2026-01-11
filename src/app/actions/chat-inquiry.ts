'use server';

import { prisma } from '@/lib/prisma';
import { ChatData } from '@/components/common/ai-block/types';

export type ChatInquiry = {
  id: number;
  selected_service: string | null;
  website_type: string | null;
  budget: string | null;
  timeline: string | null;
  additional_info: string | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  called: boolean;
  discount_percentage: number | null;
  discount_eligible: boolean;
  created_at: Date;
  updated_at: Date;
};

export async function getChatInquiriesAction(): Promise<{
  success: boolean;
  data?: ChatInquiry[];
  error?: string;
}> {
  try {
    const inquiries = await prisma.chat_inquiry.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    // Map to ensure called field exists (for backward compatibility)
    const mappedInquiries: ChatInquiry[] = inquiries.map((inquiry: any) => ({
      ...inquiry,
      called: inquiry.called ?? false,
    }));

    return {
      success: true,
      data: mappedInquiries,
    };
  } catch (error) {
    console.error('Error fetching chat inquiries:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function updateChatInquiryCalledAction(
  id: number,
  called: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    // @ts-ignore - called field will be available after migration
    await prisma.chat_inquiry.update({
      where: { id },
      data: { called },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating chat inquiry called status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function saveChatInquiryAction(
  data: ChatData
): Promise<{ success: boolean; error?: string; id?: number }> {
  try {
    // Map ChatData to Prisma schema format
    // Determine website_type from various service-specific fields
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

    // Combine additionalInfo and features array
    let additionalInfo: string | null = null;
    const infoParts: string[] = [];

    if (data.additionalInfo) {
      infoParts.push(data.additionalInfo);
    }

    if (data.features && data.features.length > 0) {
      infoParts.push(`Features: ${data.features.join(', ')}`);
    }

    if (infoParts.length > 0) {
      additionalInfo = infoParts.join(' | ');
    }

    // Create chat inquiry in database
    const inquiry = await prisma.chat_inquiry.create({
      data: {
        selected_service: data.selectedService || null,
        website_type: websiteType,
        budget: data.budget || null,
        timeline: data.timeline || null,
        additional_info: additionalInfo,
        name: data.name || null,
        email: data.email || null,
        phone: data.phone || null,
        discount_percentage: data.discountPercentage || null,
        discount_eligible: data.discountEligible || false,
      },
    });

    return {
      success: true,
      id: inquiry.id,
    };
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
}): Promise<{ success: boolean; error?: string; id?: number }> {
  try {
    // Validate required fields
    if (!data.name || !data.name.trim()) {
      return {
        success: false,
        error: 'Имя обязательно для заполнения',
      };
    }

    if (!data.email || !data.email.trim()) {
      return {
        success: false,
        error: 'Email обязателен для заполнения',
      };
    }

    if (!data.phone || !data.phone.trim()) {
      return {
        success: false,
        error: 'Телефон обязателен для заполнения',
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      return {
        success: false,
        error: 'Некорректный формат email',
      };
    }

    const scheduledCall = await prisma.scheduled_call.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        scheduled_date: data.scheduledDate,
        scheduled_time: data.scheduledTime,
        discount_percentage: data.discountPercentage || null,
        discount_eligible: data.discountEligible || false,
      },
    });

    return {
      success: true,
      id: scheduledCall.id,
    };
  } catch (error: any) {
    console.error('Error scheduling call:', error);
    console.error('Error details:', {
      message: error?.message || 'Unknown error',
      code: error?.code,
      meta: error?.meta,
      stack: error?.stack,
      name: error?.name,
    });

    // Check for specific Prisma errors
    if (error?.code === 'P2002') {
      return {
        success: false,
        error: 'Запись с такими данными уже существует',
      };
    }

    if (error?.code === 'P2003') {
      return {
        success: false,
        error: 'Ошибка связи с базой данных',
      };
    }

    return {
      success: false,
      error:
        error?.message ||
        'Не удалось создать запланированный звонок. Проверьте подключение к базе данных.',
    };
  }
}
