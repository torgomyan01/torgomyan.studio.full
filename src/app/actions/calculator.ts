'use server';

import { prisma } from '@/lib/prisma';
import { notifyTelegramCalculatorSubmission } from '@/lib/telegram';

export type CalculatorSubmission = {
  id: number;
  website_type: string | null;
  pages_count: number | null;
  design_style: string | null;
  features: string | null;
  cms_required: boolean;
  ecommerce: boolean;
  payment_systems: string | null;
  mobile_app: boolean;
  seo_optimization: boolean;
  content_management: boolean;
  estimated_price: number | null;
  name: string;
  email: string;
  phone: string;
  contacted: boolean;
  notes: string | null;
  created_at: Date;
  updated_at: Date;
};

export async function getCalculatorSubmissionsAction(): Promise<{
  success: boolean;
  data?: CalculatorSubmission[];
  error?: string;
}> {
  try {
    const submissions = await prisma.calculator_submission.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      success: true,
      data: submissions,
    };
  } catch (error) {
    console.error('Error fetching calculator submissions:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function updateCalculatorSubmissionContactedAction(
  id: number,
  contacted: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.calculator_submission.update({
      where: { id },
      data: { contacted },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(
      'Error updating calculator submission contacted status:',
      error
    );
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function updateCalculatorSubmissionNotesAction(
  id: number,
  notes: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.calculator_submission.update({
      where: { id },
      data: { notes: notes.trim() || null },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating calculator submission notes:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

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

    // Create calculator submission in database
    const submission = await prisma.calculator_submission.create({
      data: {
        website_type: data.websiteType || null,
        pages_count: data.pagesCount || null,
        design_style: data.designStyle || null,
        features: data.features.length > 0 ? data.features.join(', ') : null,
        cms_required: data.cmsRequired || false,
        ecommerce: data.ecommerce || false,
        payment_systems: data.paymentSystems || null,
        mobile_app: data.mobileApp || false,
        seo_optimization: data.seoOptimization || false,
        content_management: data.contentManagement || false,
        estimated_price: data.estimatedPrice || null,
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
      },
    });

    await notifyTelegramCalculatorSubmission({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      websiteType: submission.website_type,
      estimatedPrice: submission.estimated_price,
      features: submission.features,
    });

    return {
      success: true,
      id: submission.id,
    };
  } catch (error) {
    console.error('Error saving calculator submission:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
