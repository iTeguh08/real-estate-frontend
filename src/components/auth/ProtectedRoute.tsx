import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import {
  RouteLoadingSpinner,
  resolveTransitionKind,
  transitionKindHasSpinner,
  TransitionBody,
} from '@/components/skeletons';
import { useAuth } from '@/hooks/useAuth';
import { handoffBootstrapLoader } from '@/lib/bootstrap-loader';
import { routes } from '@/lib/routes';

/**
 * Blocks unauthenticated access at the router level (door check),
 * instead of rendering “Sign in required” inside each page.
 */
export function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (isLoading) {
      requestAnimationFrame(() => requestAnimationFrame(() => handoffBootstrapLoader()));
    }
  }, [isLoading]);

  if (isLoading) {
    const kind = resolveTransitionKind(`${location.pathname}${location.search}`);
    return (
      <>
        {transitionKindHasSpinner(kind) ? <RouteLoadingSpinner /> : null}
        <TransitionBody kind={kind} />
      </>
    );
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
