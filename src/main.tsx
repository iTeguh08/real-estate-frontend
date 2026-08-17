import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { preloadCriticalFonts } from '@/lib/preload-fonts';
import { initSentry, Sentry } from '@/lib/sentry';
import './index.css';
import App from './App.tsx';
import { queryClient } from '@/lib/query-client';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import { ThemedToaster } from '@/components/layout/ThemedToaster';

preloadCriticalFonts();
initSentry();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sentry.ErrorBoundary fallback={<p>Something went wrong. Please refresh the page.</p>}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <AuthProvider>
            <App />
            <ThemedToaster />
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </Sentry.ErrorBoundary>
  </StrictMode>
);
