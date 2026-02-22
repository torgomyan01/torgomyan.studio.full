'use server';

const TELEGRAM_API = 'https://api.telegram.org';

/**
 * Sends a text message to the configured Telegram chat via Bot API.
 * No-op if TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID are not set.
 */
export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return;
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
    }
  } catch (e) {
    console.error('Telegram sendMessage error:', e);
  }
}

function escapeHtml(s: string | null | undefined): string {
  if (s == null || s === '') return '—';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Notify Telegram about a new calculator submission (order). */
export async function notifyTelegramCalculatorSubmission(data: {
  id: number;
  name: string;
  email: string;
  phone: string;
  websiteType?: string | null;
  estimatedPrice?: number | null;
  features?: string | null;
}): Promise<void> {
  const lines = [
    '🖥 <b>Նոր պատվեր — Հաշվիչ</b>',
    `ID: ${data.id}`,
    `Անուն: ${escapeHtml(data.name)}`,
    `Email: ${escapeHtml(data.email)}`,
    `Հեռախոս: ${escapeHtml(data.phone)}`,
    `Կայքի տեսակ: ${escapeHtml(data.websiteType)}`,
    `Գնահատված գին: ${data.estimatedPrice != null ? `${data.estimatedPrice} ₽` : '—'}`,
  ];
  if (data.features) {
    lines.push(`Ֆունկցիաներ: ${escapeHtml(data.features)}`);
  }
  await sendTelegramMessage(lines.join('\n'));
}

/** Notify Telegram about a new chat inquiry (order). */
export async function notifyTelegramChatInquiry(data: {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  selectedService?: string | null;
  websiteType?: string | null;
  budget?: string | null;
  timeline?: string | null;
  additionalInfo?: string | null;
}): Promise<void> {
  const lines = [
    '💬 <b>Նոր հարցում — Չատ</b>',
    `ID: ${data.id}`,
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
  await sendTelegramMessage(lines.join('\n'));
}

/** Notify Telegram about a new scheduled call (order). */
export async function notifyTelegramScheduledCall(data: {
  id: number;
  name: string;
  email: string;
  phone: string;
  scheduledDate: string;
  scheduledTime: string;
  discountEligible?: boolean;
  discountPercentage?: number | null;
}): Promise<void> {
  const lines = [
    '📞 <b>Նոր զանգ — Պլանավորված զանգ</b>',
    `ID: ${data.id}`,
    `Անուն: ${escapeHtml(data.name)}`,
    `Email: ${escapeHtml(data.email)}`,
    `Հեռախոս: ${escapeHtml(data.phone)}`,
    `Ամսաթիվ: ${escapeHtml(data.scheduledDate)}`,
    `Ժամ: ${escapeHtml(data.scheduledTime)}`,
  ];
  if (data.discountEligible && data.discountPercentage != null) {
    lines.push(`Զեղչ: ${data.discountPercentage}%`);
  }
  await sendTelegramMessage(lines.join('\n'));
}
