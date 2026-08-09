import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { PageLoader } from '@/components/skeletons';
import { useAuth } from '@/hooks/useAuth';
import { routes } from '@/lib/routes';

/**
 * Blocks unauthenticated access at the router level (door check),
 * instead of rendering “Sign in required” inside each page.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <PageLoader variant="route" />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={routes.login}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    );
  }

  return <Outlet />;
}
