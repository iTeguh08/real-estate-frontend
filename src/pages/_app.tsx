import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ListingFiltersProvider } from '@/components/providers/ListingFiltersProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemedToaster } from '@/components/layout/ThemedToaster';
import { queryClientOptions } from '@/lib/query-client';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient(queryClientOptions));

  return (
    <QueryClientProvider client={queryClient}>
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
