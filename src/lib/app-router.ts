import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';

export type AppTo =
  | string
  | {
      pathname?: string;
      search?: string;
      hash?: string;
    };

export function resolveAppHref(to: AppTo): string {
  if (typeof to === 'string') return to || '/';
  const pathname = to.pathname || '/';
  let search = to.search ?? '';
  if (search && !search.startsWith('?')) search = `?${search}`;
  let hash = to.hash ?? '';
  if (hash && !hash.startsWith('#')) hash = `#${hash}`;
  return `${pathname}${search}${hash}`;
}

export function parseAppLocation(asPath: string): {
  pathname: string;
  search: string;
  hash: string;
} {
  const hashIndex = asPath.indexOf('#');
  const hash = hashIndex >= 0 ? asPath.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? asPath.slice(0, hashIndex) : asPath;
  const qIndex = withoutHash.indexOf('?');
  const pathname = (qIndex >= 0 ? withoutHash.slice(0, qIndex) : withoutHash) || '/';
  const search = qIndex >= 0 ? withoutHash.slice(qIndex) : '';
  return { pathname, search, hash };
}

export function useAppLocation() {
  const router = useRouter();
  return useMemo(() => parseAppLocation(router.asPath || '/'), [router.asPath]);
}

export function useAppNavigate() {
  const router = useRouter();

  return (to: AppTo, opts?: { replace?: boolean; state?: { from?: string } }) => {
    let href = resolveAppHref(to);
    if (opts?.state?.from) {
      const joiner = href.includes('?') ? '&' : '?';
      href = `${href}${joiner}from=${encodeURIComponent(opts.state.from)}`;
    }
    if (href.startsWith('/') && !href.startsWith('/#')) {
      void router.prefetch(href);
    }
    const method = opts?.replace ? router.replace : router.push;
    void method(href);
  };
}

export function useAppSearchParams(): [
  URLSearchParams,
  (next: URLSearchParams, opts?: { replace?: boolean }) => void,
] {
  const router = useRouter();
  const { pathname, search } = parseAppLocation(router.asPath || '/');
  const params = useMemo(
    () => new URLSearchParams(search.startsWith('?') ? search.slice(1) : search),
    [search]
  );

  const setSearchParams = useCallback(
    (next: URLSearchParams, opts?: { replace?: boolean }) => {
      const qs = next.toString();
      const href = qs ? `${pathname}?${qs}` : pathname;
      const method = opts?.replace ? router.replace : router.push;
      void method(href, undefined, { shallow: true, scroll: false });
    },
    [pathname, router]
  );

  return [params, setSearchParams];
}

export function useAppParams(): Record<string, string | undefined> {
  const router = useRouter();
  return useMemo(() => {
    const out: Record<string, string | undefined> = {};
    for (const [key, value] of Object.entries(router.query)) {
      out[key] = Array.isArray(value) ? value[0] : value;
    }
    return out;
  }, [router.query]);
}
