import { useEffect, useRef } from 'react';
import type {
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
} from 'react-hook-form';
import { checkEmailAvailable } from '@/services/auth.service';
import { ApiError, isMockDataEnabled } from '@/services/api-client';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type EmailForm = FieldValues & { email: string };

/**
 * Debounced live email uniqueness check against the API (register only).
 * Skips when mock mode is on — uses a tiny fake rule for local demos.
 */
export function useLiveEmailAvailability<T extends EmailForm>(options: {
  email: string;
  enabled?: boolean;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
  debounceMs?: number;
}) {
  const { email, enabled = true, setError, clearErrors, debounceMs = 450 } = options;
  const reqId = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const trimmed = email.trim();
    if (!trimmed || !EMAIL_RE.test(trimmed)) return;

    const timer = window.setTimeout(() => {
      const id = ++reqId.current;

      void (async () => {
        try {
          if (isMockDataEnabled()) {
            if (trimmed.toLowerCase() === 'taken@example.com') {
              if (id !== reqId.current) return;
              setError('email' as Path<T>, {
                type: 'server',
                message: 'That email is already registered. Try signing in.',
              });
            } else if (id === reqId.current) {
              clearErrors('email' as Path<T>);
            }
            return;
          }

          const result = await checkEmailAvailable(trimmed);
          if (id !== reqId.current) return;

          if (!result.available) {
            setError('email' as Path<T>, {
              type: 'server',
              message: result.message || 'That email is already registered. Try signing in.',
            });
          } else {
            clearErrors('email' as Path<T>);
          }
        } catch (err) {
          if (id !== reqId.current) return;
          if (err instanceof ApiError && err.fieldErrors.email?.[0]) {
            setError('email' as Path<T>, {
              type: 'server',
              message: err.fieldErrors.email[0],
            });
          }
          // Network / rate-limit: don't block typing with a scary error.
        }
      })();
    }, debounceMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [email, enabled, setError, clearErrors, debounceMs]);
}
