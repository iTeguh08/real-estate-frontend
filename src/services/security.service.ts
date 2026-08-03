import { apiFetch, isMockDataEnabled } from '@/services/api-client';

export const HONEYPOT_FIELD = 'website';
export const TURNSTILE_FIELD = 'cf-turnstile-response';

export interface SecurityConfig {
  turnstile: {
    enabled: boolean;
    siteKey: string | null;
    field: string;
  };
  honeypot: {
    field: string;
  };
}

const FALLBACK_CONFIG: SecurityConfig = {
  turnstile: {
    enabled: false,
    siteKey: null,
    field: TURNSTILE_FIELD,
  },
  honeypot: {
    field: HONEYPOT_FIELD,
  },
};

let cachedConfig: SecurityConfig | null = null;
let inflight: Promise<SecurityConfig> | null = null;

export async function getSecurityConfig(): Promise<SecurityConfig> {
  if (isMockDataEnabled()) {
    return FALLBACK_CONFIG;
  }

  if (cachedConfig) {
    return cachedConfig;
  }

  if (!inflight) {
    inflight = apiFetch<SecurityConfig>('/security/config')
      .then((config) => {
        cachedConfig = config;
        return config;
      })
      .catch(() => FALLBACK_CONFIG)
      .finally(() => {
        inflight = null;
      });
  }

  return inflight;
}

/**
 * Merge honeypot + optional Turnstile token into a guest form payload (S8).
 */
export async function withGuestSpamFields<T extends Record<string, unknown>>(
  data: T,
  turnstileToken = ''
): Promise<T & Record<string, string>> {
  const config = await getSecurityConfig();
  const honeypotField = config.honeypot.field || HONEYPOT_FIELD;
  const turnstileField = config.turnstile.field || TURNSTILE_FIELD;

  return {
    ...data,
    [honeypotField]: '',
    ...(config.turnstile.enabled ? { [turnstileField]: turnstileToken } : {}),
  };
}
