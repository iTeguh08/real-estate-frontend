import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ApiError, apiFetch } from '@/services/api-client';
import { clearAuth, persistAuth } from '@/services/auth-storage';

describe('apiFetch', () => {
  beforeEach(() => {
    clearAuth();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ ok: true }),
      }),
    );
  });

  afterEach(() => {
    clearAuth();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it('attaches Bearer token from storage', async () => {
    persistAuth('secret-token', {
      id: 1,
      name: 'Member',
      email: 'm@test.com',
      role: 'member',
    });

    await apiFetch('/api/auth/user');

    expect(fetch).toHaveBeenCalledWith(
      '/api/auth/user',
      expect.objectContaining({
        credentials: 'include',
        headers: expect.any(Headers),
      }),
    );

    const init = vi.mocked(fetch).mock.calls[0]?.[1] as RequestInit;
    const headers = init.headers as Headers;
    expect(headers.get('Authorization')).toBe('Bearer secret-token');
  });

  it('throws ApiError with Laravel field errors', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 422,
      statusText: 'Unprocessable Entity',
      json: async () => ({
        message: 'The given data was invalid.',
        errors: { email: ['Email is required.'] },
      }),
    } as Response);

    await expect(apiFetch('/api/auth/login', { method: 'POST' })).rejects.toMatchObject({
      name: 'ApiError',
      status: 422,
      fieldErrors: { email: ['Email is required.'] },
    } satisfies Partial<ApiError>);
  });
});
