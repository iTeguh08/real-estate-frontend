import * as Sentry from '@sentry/react';
import {
  getRuntimeMode,
  getSentryDsn,
  getSentryEnvironment,
  getSentryTracesSampleRate,
} from '@/lib/runtime-env';

/**
 * Init Sentry only when a DSN is configured.
 * Local/dev without VITE_SENTRY_DSN / NEXT_PUBLIC_SENTRY_DSN stays a no-op.
 */
export function initSentry(): void {
  const dsn = getSentryDsn();
  if (!dsn) return;

  Sentry.init({
    dsn,
    environment: getSentryEnvironment() || getRuntimeMode() || 'development',
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: getSentryTracesSampleRate(),
    sendDefaultPii: false,
  });
}

export { Sentry };
