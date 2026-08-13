import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToggleWishlistMutation } from '@/hooks/mutations';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import { getWishlistIds } from '@/services/wishlist.service';

export function useWishlist() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: wishlistIds = [] } = useQuery({
    queryKey: queryKeys.wishlist.all(),
    queryFn: getWishlistIds,
    staleTime: Infinity,
    enabled: isAuthenticated,
  });

  const toggleMutation = useToggleWishlistMutation();

  const isWishlisted = useCallback(
    (propertyId: string) => wishlistIds.includes(String(propertyId)),
    [wishlistIds],
  );

  const toggleWishlist = useCallback(
    (propertyId: string) => {
      if (!isAuthenticated) {
        navigate(routes.login, {
          state: { from: `${location.pathname}${location.search}` },
        });
        return;
      }
      if (toggleMutation.isPending) return;
      toggleMutation.mutate(String(propertyId));
    },
    [isAuthenticated, location.pathname, location.search, navigate, toggleMutation],
  );

  const isTogglingId = toggleMutation.isPending ? toggleMutation.variables : undefined;

  return {
    wishlistIds,
    isWishlisted,
    toggleWishlist,
    isToggling: toggleMutation.isPending,
    isTogglingId,
  };
}
