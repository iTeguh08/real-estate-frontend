import { Toaster } from 'sonner';
import { useTheme } from '@/hooks/useTheme';

/** Sonner toaster wired to Homzen light / navy theme tokens. */
export function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      theme={theme === 'navy' ? 'dark' : 'light'}
      className="font-poppins"
      toastOptions={{
        classNames: {
          toast: 'bg-hz-elevated text-hz-ink border-hz-border shadow-hz-md',
          title: 'text-hz-ink',
          description: 'text-hz-body',
        },
      }}
    />
  );
}
