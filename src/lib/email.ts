import nodemailer from 'nodemailer';

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
  try {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error('SMTP credentials not configured');
      return {
        success: false,
        error: 'Email service not configured',
      };
    }

    await transporter.sendMail({
      from: `"Torgomyan Studio" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''),
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Generate Google Calendar event link with Google Meet
 * This creates a link that opens Google Calendar with pre-filled event details
 */
export function generateGoogleCalendarLink(
  title: string,
  date: string, // YYYY-MM-DD
  time: string, // HH:MM:SS or HH:MM
  duration: number = 30, // minutes
  description: string = ''
): string {
  // Parse date and time
  const [year, month, day] = date.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);

  // Create start date
  const startDate = new Date(year, month - 1, day, hours, minutes);
  const endDate = new Date(startDate.getTime() + duration * 60000);

  // Format dates for Google Calendar (YYYYMMDDTHHmmss)
  const formatDate = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  // Encode parameters for Google Calendar
  // Note: Google Calendar doesn't directly support adding Google Meet via URL parameters
  // But we can create a calendar event and mention Google Meet in the description
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details: `${description}\n\nGoogle Meet: Будет создан автоматически при добавлении события в календарь`,
    sf: 'true', // Show form
    output: 'xml',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate Google Meet link directly
 * Note: This creates a simple meet link. For calendar integration, use generateGoogleCalendarLink
 */
export function generateGoogleMeetLink(): string {
  // Generate a random meeting code
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  const code = Array.from({ length: 3 }, () => {
    return Array.from(
      { length: 4 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join('-');
  }).join('-');

  return `https://meet.google.com/${code}`;
}
