import { apiFetch, useMockData } from '@/services/api-client';
import { withGuestSpamFields } from '@/services/security.service';

export async function subscribeNewsletter(email: string, turnstileToken = ''): Promise<void> {
  if (useMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (email.includes('fail')) {
      throw new Error('Subscription failed');
    }
    return;
  }

  const payload = await withGuestSpamFields({ email }, turnstileToken);

  await apiFetch<void>('/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}
