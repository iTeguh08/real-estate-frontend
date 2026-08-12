import { apiFetch, isMockDataEnabled } from '@/services/api-client';
import { withGuestSpamFields } from '@/services/security.service';

interface NewsletterResponse {
  success: boolean;
  message: string;
  data?: { email: string };
}

export async function subscribeNewsletter(email: string, turnstileToken = ''): Promise<string> {
  if (isMockDataEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (email.includes('fail')) {
      throw new Error('Subscription failed');
    }
    return `Thanks for subscribing! We'll send updates to ${email}.`;
  }

  const payload = await withGuestSpamFields({ email }, turnstileToken);

  const response = await apiFetch<NewsletterResponse>('/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  return response.message;
}
