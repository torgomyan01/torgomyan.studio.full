'use server';

import { prisma } from '@/lib/prisma';
import { sendEmail, generateGoogleCalendarLink } from '@/lib/email';

export type ScheduledCall = {
  id: number;
  name: string;
  email: string;
  phone: string;
  scheduled_date: string;
  scheduled_time: string;
  called: boolean;
  email_sent: boolean;
  notes: string | null;
  discount_percentage: number | null;
  discount_eligible: boolean;
  created_at: Date;
  updated_at: Date;
};

export async function getScheduledCallsAction(): Promise<{
  success: boolean;
  data?: ScheduledCall[];
  error?: string;
}> {
  try {
    const calls = await prisma.scheduled_call.findMany({
      orderBy: {
        created_at: 'desc',
      },
    });

    return {
      success: true,
      data: calls,
    };
  } catch (error) {
    console.error('Error fetching scheduled calls:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function updateScheduledCallCalledAction(
  id: number,
  called: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.scheduled_call.update({
      where: { id },
      data: { called },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating scheduled call called status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function updateScheduledCallNotesAction(
  id: number,
  notes: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.scheduled_call.update({
      where: { id },
      data: { notes },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating scheduled call notes:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function updateScheduledCallEmailSentAction(
  id: number,
  email_sent: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.scheduled_call.update({
      where: { id },
      data: { email_sent },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error updating scheduled call email sent status:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function deleteScheduledCallAction(
  id: number
): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.scheduled_call.delete({
      where: { id },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error deleting scheduled call:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function sendGoogleMeetEmailAction(
  callId: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const call = await prisma.scheduled_call.findUnique({
      where: { id: callId },
    });

    if (!call) {
      return {
        success: false,
        error: 'Запланированный звонок не найден',
      };
    }

    // Generate Google Calendar link and Google Meet link
    const calendarLink = generateGoogleCalendarLink(
      `Звонок с ${call.name}`,
      call.scheduled_date,
      call.scheduled_time,
      30, // 30 minutes duration
      `Запланированный звонок с ${call.name}\nТелефон: ${call.phone}\nEmail: ${call.email}`
    );

    // Generate a Google Meet link
    const { generateGoogleMeetLink } = await import('@/lib/email');
    const meetLink = generateGoogleMeetLink();

    // Create email HTML
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(97deg, #c444ff 0.62%, #562999 110%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .button {
              display: inline-block;
              padding: 15px 30px;
              background: linear-gradient(97deg, #c444ff 0.62%, #562999 110%);
              color: white;
              text-decoration: none;
              border-radius: 5px;
              margin: 20px 0;
              font-weight: bold;
            }
            .info {
              background: white;
              padding: 20px;
              border-radius: 5px;
              margin: 20px 0;
            }
            .info-item {
              margin: 10px 0;
            }
            .info-label {
              font-weight: bold;
              color: #562999;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Запланированный звонок</h1>
          </div>
          <div class="content">
            <p>Здравствуйте, ${call.name}!</p>
            <p>Мы запланировали звонок на указанное вами время. Пожалуйста, добавьте встречу в ваш календарь и присоединитесь к Google Meet.</p>
            
            <div class="info">
              <div class="info-item">
                <span class="info-label">Дата:</span> ${call.scheduled_date}
              </div>
              <div class="info-item">
                <span class="info-label">Время:</span> ${call.scheduled_time}
              </div>
              <div class="info-item">
                <span class="info-label">Телефон:</span> ${call.phone}
              </div>
            </div>

            <div style="text-align: center;">
              <a href="${calendarLink}" class="button" style="margin-right: 10px;">
                Добавить в Google Calendar
              </a>
              <a href="${meetLink}" class="button" style="background: #00832d;">
                Присоединиться к Google Meet
              </a>
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: #e8f0fe; border-radius: 5px;">
              <p style="margin: 0; font-size: 14px;">
                <strong>Google Meet ссылка:</strong><br>
                <a href="${meetLink}" style="color: #1967d2; word-break: break-all;">${meetLink}</a>
              </p>
            </div>

            <p style="margin-top: 30px; font-size: 14px; color: #666;">
              Если у вас возникли вопросы или вы хотите изменить время звонка, пожалуйста, свяжитесь с нами.
            </p>
          </div>
        </body>
      </html>
    `;

    // Send email
    const emailResult = await sendEmail({
      to: call.email,
      subject: `Запланированный звонок - ${call.scheduled_date} в ${call.scheduled_time}`,
      html: emailHtml,
    });

    if (!emailResult.success) {
      return {
        success: false,
        error: emailResult.error || 'Не удалось отправить email',
      };
    }

    // Mark email as sent
    await prisma.scheduled_call.update({
      where: { id: callId },
      data: { email_sent: true },
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error sending Google Meet email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
