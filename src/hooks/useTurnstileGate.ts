import { useCallback, useState } from 'react';
import { useSecurityConfig } from '@/hooks/useSecurityConfig';
import { isMockDataEnabled } from '@/services/api-client';

export const TURNSTILE_MISSING_MESSAGE =
  'Please complete the security check before continuing.';

/**
 * Shared Turnstile token + requirement gate for guest forms (contact, newsletter, submissions).
 */
export function useTurnstileGate() {
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileToken = useCallback((token: string) => setTurnstileToken(token), []);
  const resetTurnstileToken = useCallback(() => setTurnstileToken(''), []);

  const security = useSecurityConfig();
  const mock = isMockDataEnabled();
  const turnstileRequired =
    !mock && Boolean(security?.turnstile.enabled && security.turnstile.siteKey);

  const turnstileReady = !turnstileRequired || Boolean(turnstileToken);

  const assertTurnstileReady = useCallback((): boolean => {
    return !turnstileRequired || Boolean(turnstileToken);
  }, [turnstileRequired, turnstileToken]);

  return {
    turnstileToken,
    onTurnstileToken,
    resetTurnstileToken,
    turnstileRequired,
    turnstileReady,
    assertTurnstileReady,
  };
}
