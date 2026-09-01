'use server';

const TELEGRAM_API = 'https://api.telegram.org';

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.error('Telegram is not configured: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID missing');
    return false;
  }

  try {
    const url = `${TELEGRAM_API}/bot${token}/sendMessage`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId.trim(),
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Telegram sendMessage failed:', res.status, err);
      return false;
    }

    return true;
  } catch (e) {
    console.error('Telegram sendMessage error:', e);
    return false;
  }
}

function escapeHtml(s: string | null | undefined): string {
  if (s == null || s === '') return '—';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export async function notifyTelegramCalculatorSubmission(data: {
  name: string;
  email: string;
  phone: string;
  websiteType?: string | null;
  pagesCount?: number | null;
  designStyle?: string | null;
  features?: string | null;
  paymentSystems?: string | null;
  estimatedPrice?: number | null;
}): Promise<boolean> {
  const lines = [
    '🖥 <b>Նոր պատվեր — Հաշվիչ</b>',
    `Անուն: ${escapeHtml(data.name)}`,
    `Email: ${escapeHtml(data.email)}`,
    `Հեռախոս: ${escapeHtml(data.phone)}`,
    `Կայքի տեսակ: ${escapeHtml(data.websiteType)}`,
    `Էջերի քանակ: ${data.pagesCount ?? '—'}`,
    `Դիզայն: ${escapeHtml(data.designStyle)}`,
    `Գնահատված գին: ${data.estimatedPrice != null ? `${data.estimatedPrice} ₽` : '—'}`,
    `Վճարային համակարգեր: ${escapeHtml(data.paymentSystems)}`,
  ];

  if (data.features) {
    lines.push(`Ֆունկցիաներ: ${escapeHtml(data.features)}`);
  }

  return sendTelegramMessage(lines.join('\n'));
}

export async function notifyTelegramChatInquiry(data: {
  name: string | null;
  email: string | null;
  phone: string | null;
  selectedService?: string | null;
  websiteType?: string | null;
  budget?: string | null;
  timeline?: string | null;
  additionalInfo?: string | null;
  discountPercentage?: number | null;
  discountEligible?: boolean;
}): Promise<boolean> {
  const lines = [
    '💬 <b>Նոր հարցում — Չատ</b>',
    `Անուն: ${escapeHtml(data.name)}`,
    `Email: ${escapeHtml(data.email)}`,
    `Հեռախոս: ${escapeHtml(data.phone)}`,
    `Ծառայություն: ${escapeHtml(data.selectedService)}`,
    `Կայքի տեսակ: ${escapeHtml(data.websiteType)}`,
    `Բյուջե: ${escapeHtml(data.budget)}`,
    `Ժամկետ: ${escapeHtml(data.timeline)}`,
  ];

  if (data.additionalInfo) {
    lines.push(`Լրացուցիչ: ${escapeHtml(data.additionalInfo)}`);
  }

  if (data.discountEligible && data.discountPercentage != null) {
    lines.push(`Զեղչ: ${data.discountPercentage}%`);
  }

  return sendTelegramMessage(lines.join('\n'));
}

export async function notifyTelegramScheduledCall(data: {
  name: string;
  email: string;
  phone: string;
  scheduledDate: string;
  scheduledTime: string;
  discountEligible?: boolean;
  discountPercentage?: number | null;
}): Promise<boolean> {
  const lines = [
    '📞 <b>Նոր զանգ — Պլանավորված զանգ</b>',
    `Անուն: ${escapeHtml(data.name)}`,
    `Email: ${escapeHtml(data.email)}`,
    `Հեռախոս: ${escapeHtml(data.phone)}`,
    `Ամսաթիվ: ${escapeHtml(data.scheduledDate)}`,
    `Ժամ: ${escapeHtml(data.scheduledTime)}`,
  ];

  if (data.discountEligible && data.discountPercentage != null) {
    lines.push(`Զեղչ: ${data.discountPercentage}%`);
  }

  return sendTelegramMessage(lines.join('\n'));
}
