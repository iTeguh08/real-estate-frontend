import { apiFetch, isMockDataEnabled } from '@/services/api-client';
import { withGuestSpamFields } from '@/services/security.service';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  inquiry_type: string;
  message: string;
  /** Optional Turnstile token collected by the form widget. */
  turnstileToken?: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(data: ContactFormData): Promise<string> {
  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return `Thank you, ${data.name || 'there'}! Your message has been received. Our team will get back to you within 1–2 business days.`;
  }

  const { turnstileToken, ...fields } = data;
  const payload = await withGuestSpamFields(fields, turnstileToken ?? '');

  const response = await apiFetch<ContactResponse>('/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return response.message;
}
