import { useEffect, type ReactNode } from 'react';
import { DashboardSkeleton, EditListingSkeleton, LoadingOverlay } from '@/components/skeletons';
import { useAuth } from '@/hooks/useAuth';
import { useAppLocation, useAppNavigate } from '@/lib/app-router';
import { routes } from '@/lib/routes';

function defaultAuthFallback(pathname: string) {
  if (pathname === routes.submitProperty) {
    return (
      <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
        <EditListingSkeleton />
      </LoadingOverlay>
    );
  }

  return (
    <LoadingOverlay active minHeight="min-h-[calc(100dvh-var(--header-height,76px))]">
      <DashboardSkeleton />
    </LoadingOverlay>
  );
}

/** Client-side auth gate for Next Pages Router (replaces react-router ProtectedRoute). */
export function RequireAuth({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
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
    return <>{fallback ?? defaultAuthFallback(location.pathname)}</>;
  }

  return <>{children}</>;
}
