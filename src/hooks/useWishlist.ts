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

  const isWishlisted = (propertyId: string) => wishlistIds.includes(propertyId);

  const toggleWishlist = (propertyId: string) => {
    toggleMutation.mutate(propertyId);
  };

  return {
    wishlistIds,
    isWishlisted,
    toggleWishlist,
    isToggling: toggleMutation.isPending,
  };
}
