'use server';

import { prisma } from '@/lib/prisma';

export type Company = {
  id: number;
  name: string;
  phone: string;
  category: string;
  email: string | null;
  notes: string | null;
  whatsapp_sent: boolean;
  last_message_date: Date | null;
  created_at: Date;
  updated_at: Date;
};

export async function getCompaniesAction(): Promise<{
  success: boolean;
  data?: Company[];
  error?: string;
}> {
  try {
    const companies = await prisma.company.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      success: true,
      data: companies,
    };
  } catch (error) {
    console.error('Error fetching companies:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка',
    };
  }
}

export async function getCompaniesByCategoryAction(category?: string): Promise<{
  success: boolean;
  data?: Company[];
  error?: string;
}> {
  try {
    const where = category ? { category } : {};
    const companies = await prisma.company.findMany({
      where,
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      success: true,
      data: companies,
    };
  } catch (error) {
    console.error('Error fetching companies by category:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка',
    };
  }
}

export async function getCategoriesAction(): Promise<{
  success: boolean;
  data?: string[];
  error?: string;
}> {
  try {
    const companies = await prisma.company.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    const categories = companies
      .map((c: { category: string }) => c.category)
      .sort();

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка',
    };
  }
}

export async function createCompanyAction(data: {
  name: string;
  phone: string;
  category: string;
  email?: string;
  notes?: string;
}): Promise<{ success: boolean; error?: string; id?: number }> {
  try {
    if (!data.name || !data.phone || !data.category) {
      return {
        success: false,
        error: 'Имя, телефон и категория обязательны',
      };
    }

    const company = await prisma.company.create({
      data: {
        name: data.name,
        phone: data.phone,
        category: data.category,
        email: data.email || null,
        notes: data.notes || null,
      },
    });

    return {
      success: true,
      id: company.id,
    };
  } catch (error) {
    console.error('Error creating company:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка',
    };
  }
}

export async function updateCompanyAction(
  id: number,
  data: {
    name?: string;
    phone?: string;
    category?: string;
    email?: string;
    notes?: string;
  }
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.company.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.phone && { phone: data.phone }),
        ...(data.category && { category: data.category }),
        ...(data.email !== undefined && { email: data.email || null }),
        ...(data.notes !== undefined && { notes: data.notes || null }),
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating company:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка',
    };
  }
}

export async function deleteCompanyAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.company.delete({
      where: { id },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting company:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка',
    };
  }
}

export async function markWhatsAppSentAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.company.update({
      where: { id },
      data: {
        whatsapp_sent: true,
        last_message_date: new Date(),
      },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error marking WhatsApp sent:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка',
    };
  }
}

export async function sendBulkWhatsAppAction(
  companyIds: number[],
  message: string
): Promise<{ success: boolean; error?: string; sent?: number }> {
  try {
    if (!message || message.trim().length === 0) {
      return {
        success: false,
        error: 'Сообщение обязательно',
      };
    }

    if (!companyIds || companyIds.length === 0) {
      return {
        success: false,
        error: 'Необходимо выбрать хотя бы одну компанию',
      };
    }

    // Get companies
    const companies = await prisma.company.findMany({
      where: {
        id: {
          in: companyIds,
        },
      },
    });

    if (companies.length === 0) {
      return {
        success: false,
        error: 'Компании не найдены',
      };
    }

    // Update all companies as WhatsApp sent
    await prisma.company.updateMany({
      where: {
        id: {
          in: companyIds,
        },
      },
      data: {
        whatsapp_sent: true,
        last_message_date: new Date(),
      },
    });

    // Return success - actual WhatsApp sending will be handled client-side
    // by opening WhatsApp Web/App with pre-filled message
    return {
      success: true,
      sent: companies.length,
    };
  } catch (error) {
    console.error('Error sending bulk WhatsApp:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Произошла неизвестная ошибка',
    };
  }
}
