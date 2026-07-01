import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import { subscribeNewsletter } from '@/services/newsletter.service';
import { toggleCompareItem } from '@/services/compare.service';
import { toggleWishlistItem } from '@/services/wishlist.service';

export function useSubscribeNewsletterMutation() {
  return useMutation({
    mutationFn: subscribeNewsletter,
  });
}

export function useToggleWishlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleWishlistItem,
    onSuccess: (ids) => {
      queryClient.setQueryData(queryKeys.wishlist.all(), ids);
    },
  });
}

export function useToggleCompareMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleCompareItem,
    onSuccess: (result) => {
      queryClient.setQueryData(queryKeys.compare.all(), result.ids);
    },
  });
}
