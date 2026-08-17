import { useEffect, type ReactNode } from 'react';
import { PageLoader } from '@/components/skeletons';
import { useAuth } from '@/hooks/useAuth';
import { useAppLocation, useAppNavigate } from '@/lib/app-router';
import { routes } from '@/lib/routes';

/** Client-side auth gate for Next Pages Router (replaces react-router ProtectedRoute). */
export function RequireAuth({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useAppNavigate();
  const location = useAppLocation();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      navigate(routes.login, {
        replace: true,
        state: { from: `${location.pathname}${location.search}` },
      });
    }
  }, [isAuthenticated, isLoading, location.pathname, location.search, navigate]);

  if (isLoading || !isAuthenticated) {
    return <PageLoader variant="route" />;
  }

  return <>{children}</>;
}
