/**
 * Dual-runtime public env: Vite (`VITE_*` / `import.meta.env`) and Next (`NEXT_PUBLIC_*`).
 * Next inlines `process.env.NEXT_PUBLIC_*` at build time; Vite keeps `import.meta.env`.
 */
function readViteEnv(key: string): string | undefined {
  try {
    const env = import.meta.env as Record<string, string | undefined> | undefined;
    const value = env?.[key];
    return typeof value === 'string' && value.length > 0 ? value : undefined;
  } catch {
    return undefined;
  }
}

function readPublicEnv(nextKey: string, viteKey: string): string | undefined {
  if (typeof process !== 'undefined') {
    const fromNext = process.env[nextKey];
    if (typeof fromNext === 'string' && fromNext.length > 0) return fromNext;
  }
  return readViteEnv(viteKey);
}

export function getGraphqlUrl(): string {
  return readPublicEnv('NEXT_PUBLIC_GRAPHQL_URL', 'VITE_GRAPHQL_URL') ?? 'http://localhost:8080/graphql';
}

export function getApiBaseUrl(): string {
  return readPublicEnv('NEXT_PUBLIC_API_URL', 'VITE_API_URL') ?? '';
}

/** Same contract as Vite: mock is on unless the flag is the string `"false"`. */
export function isMockDataEnabled(): boolean {
  return readPublicEnv('NEXT_PUBLIC_USE_MOCK', 'VITE_USE_MOCK') !== 'false';
}

export function getPublicBasePath(): string {
  const fromNext =
    typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_BASE_PATH : undefined;
  if (fromNext) return fromNext.endsWith('/') ? fromNext : `${fromNext}/`;
  return readViteEnv('BASE_URL') ?? '/';
}

export function getSentryDsn(): string | undefined {
  return readPublicEnv('NEXT_PUBLIC_SENTRY_DSN', 'VITE_SENTRY_DSN')?.trim();
}

export function getSentryEnvironment(): string | undefined {
  return readPublicEnv('NEXT_PUBLIC_SENTRY_ENVIRONMENT', 'VITE_SENTRY_ENVIRONMENT')?.trim();
}

export function getSentryTracesSampleRate(): number {
  const raw = readPublicEnv(
    'NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE',
    'VITE_SENTRY_TRACES_SAMPLE_RATE',
  );
  return Number(raw ?? 0.1);
}

export function getRuntimeMode(): string {
  if (typeof process !== 'undefined' && process.env.NODE_ENV) return process.env.NODE_ENV;
  return readViteEnv('MODE') ?? 'development';
}

export function getSiteOrigin(): string {
  return (readPublicEnv('NEXT_PUBLIC_SITE_URL', 'VITE_SITE_URL') ?? '').replace(/\/$/, '');
}

export function absoluteUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const origin = getSiteOrigin();
  if (!origin) return pathOrUrl;
  return `${origin}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}
