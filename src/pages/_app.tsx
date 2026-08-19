import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AppShell } from '@/components/layout/AppShell';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ListingFiltersProvider } from '@/components/providers/ListingFiltersProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemedToaster } from '@/components/layout/ThemedToaster';
import { RouteTransitionOverlay } from '@/components/layout/RouteTransitionOverlay';
import { queryClientOptions } from '@/lib/query-client';
import { cn } from '@/lib/utils';

function RouteProgressBar() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    for (const timer of timersRef.current) window.clearTimeout(timer);
    timersRef.current = [];
  };

  useEffect(() => {
    const start = () => {
      clearTimers();
      setActive(true);
      setProgress(18);
      timersRef.current = [
        window.setTimeout(() => setProgress(62), 90),
        window.setTimeout(() => setProgress(86), 220),
      ];
    };

    const stop = () => {
      clearTimers();
      setProgress(100);
      timersRef.current = [
        window.setTimeout(() => {
          setActive(false);
          setProgress(0);
        }, 180),
      ];
    };

    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', stop);
    router.events.on('routeChangeError', stop);
    return () => {
      clearTimers();
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', stop);
      router.events.off('routeChangeError', stop);
    };
  }, [router.events]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-route h-1 origin-left bg-hz-primary shadow-[0_0_16px_rgba(224,112,48,0.55)] transition-[transform,opacity] duration-200 ease-out',
        active ? 'opacity-100' : 'opacity-0',
      )}
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
}

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>
      <RouteProgressBar />
      <RouteTransitionOverlay />
      <ThemeProvider>
        <AuthProvider>
          <ListingFiltersProvider>
            <AppShell>
              <Component {...pageProps} />
            </AppShell>
            <ThemedToaster />
          </ListingFiltersProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
