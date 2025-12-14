'use server';

import { prisma } from '@/lib/prisma';

export type RecentSubmission = {
  id: number;
  name: string;
  website_type: string | null;
  created_at: Date;
  type: 'calculator' | 'scheduled_call';
};

export async function getRecentSubmissionsAction(): Promise<{
  success: boolean;
  data?: RecentSubmission[];
  error?: string;
}> {
  try {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Get recent calculator submissions (last 24 hours)
    const calculatorSubmissions = await prisma.calculator_submission.findMany({
      where: {
        created_at: {
          gte: last24Hours,
        },
      },
      select: {
        id: true,
        name: true,
        website_type: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10, // Limit to prevent too many results
    });

    // Get recent scheduled calls (last 24 hours)
    const scheduledCalls = await prisma.scheduled_call.findMany({
      where: {
        created_at: {
          gte: last24Hours,
        },
      },
      select: {
        id: true,
        name: true,
        scheduled_date: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 10,
    });

    // Combine and format results
    const submissions: RecentSubmission[] = [
      ...calculatorSubmissions.map((sub) => ({
        id: sub.id,
        name: sub.name,
        website_type: sub.website_type,
        created_at: sub.created_at,
        type: 'calculator' as const,
      })),
      ...scheduledCalls.map((call) => ({
        id: call.id,
        name: call.name,
        website_type: `Запланирован звонок на ${call.scheduled_date}`,
        created_at: call.created_at,
        type: 'scheduled_call' as const,
      })),
    ].sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

    return {
      success: true,
      data: submissions,
    };
  } catch (error) {
    console.error('Error fetching recent submissions:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
