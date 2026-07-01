import { apiFetch, useMockData } from '@/services/api-client';

export async function subscribeNewsletter(email: string): Promise<void> {
  if (useMockData()) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (email.includes('fail')) {
      throw new Error('Subscription failed');
    }
    return;
  }

  await apiFetch<void>('/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
}
