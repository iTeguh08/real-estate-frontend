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

/**
 * Next inlines only static `process.env.NEXT_PUBLIC_*` identifiers.
 * `process.env[nextKey]` is empty in the browser bundle, so mock defaulted on.
 */
function readNextPublicEnv(nextKey: string): string | undefined {
  if (typeof process === 'undefined') return undefined;
  const nextEnv: Record<string, string | undefined> = {
    NEXT_PUBLIC_USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK,
    NEXT_PUBLIC_GRAPHQL_URL: process.env.NEXT_PUBLIC_GRAPHQL_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    NEXT_PUBLIC_SENTRY_ENVIRONMENT: process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT,
    NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE: process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH,
  };
  const value = nextEnv[nextKey];
  return typeof value === 'string' && value.length > 0 ? value : undefined;
}

function readPublicEnv(nextKey: string, viteKey: string): string | undefined {
  return readNextPublicEnv(nextKey) ?? readViteEnv(viteKey);
}

/** SSR/Node cannot fetch relative URLs; prefix with internal Apache/Laravel origin. */
function resolveServerAbsolute(url: string): string {
  if (typeof window !== 'undefined' || !url.startsWith('/')) return url;
  const origin = (
    (typeof process !== 'undefined' && process.env.INTERNAL_BACKEND_ORIGIN) ||
    'http://127.0.0.1'
  ).replace(/\/$/, '');
  return `${origin}${url}`;
}

export function getGraphqlUrl(): string {
  const url =
    readPublicEnv('NEXT_PUBLIC_GRAPHQL_URL', 'VITE_GRAPHQL_URL') ??
    'http://localhost:8080/graphql';
  return resolveServerAbsolute(url);
}

export function getApiBaseUrl(): string {
  const explicit = readPublicEnv('NEXT_PUBLIC_API_URL', 'VITE_API_URL');
  if (explicit) return resolveServerAbsolute(explicit.replace(/\/$/, ''));
  // Browser: same-origin (Apache exclusions / Next rewrites). Never use
  // NEXT_PUBLIC_BACKEND_URL here — it is often 127.0.0.1 for server rewrites.
  if (typeof window !== 'undefined') return '';
  // Server: internal origin for SSR fetches when no public API URL is set.
  if (typeof process !== 'undefined') {
    const internal = process.env.INTERNAL_BACKEND_ORIGIN;
    if (typeof internal === 'string' && internal.length > 0) {
      return internal.replace(/\/$/, '');
    }
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL;
    if (typeof backend === 'string' && backend.length > 0) {
      return backend.replace(/\/$/, '');
    }
  }
  return '';
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
