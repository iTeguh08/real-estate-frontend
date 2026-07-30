import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useToggleWishlistMutation } from '@/hooks/mutations';
import { queryKeys } from '@/lib/query-keys';
import { getWishlistIds } from '@/services/wishlist.service';

export function useWishlist() {
  const { data: wishlistIds = [] } = useQuery({
    queryKey: queryKeys.wishlist.all(),
    queryFn: getWishlistIds,
    staleTime: Infinity,
  });

  const toggleMutation = useToggleWishlistMutation();

  const isWishlisted = useCallback(
    (propertyId: string) => wishlistIds.includes(String(propertyId)),
    [wishlistIds],
  );

  const toggleWishlist = useCallback(
    (propertyId: string) => {
      if (toggleMutation.isPending) return;
      toggleMutation.mutate(String(propertyId));
    },
    [toggleMutation],
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
