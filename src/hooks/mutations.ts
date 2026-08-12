import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';
import {
  clearMyListingGallery,
  clearMyListingMedia,
  deleteMyListing,
  publishMyListing,
  unpublishMyListing,
  updateMyListing,
  uploadMyListingGallery,
  uploadMyListingMedia,
  type AgentListingUpdateInput,
} from '@/services/agent-listings.service';
import type { MediaSlotField } from '@/data/property-media-slots';
import { subscribeNewsletter } from '@/services/newsletter.service';
import { submitContactForm } from '@/services/contact.service';
import { submitPropertyListing, cancelMyPropertySubmission } from '@/services/property-submissions.service';
import { toggleCompareItem } from '@/services/compare.service';
import { toggleWishlistItem } from '@/services/wishlist.service';

export function useSubscribeNewsletterMutation() {
  return useMutation({
    mutationFn: ({ email, turnstileToken }: { email: string; turnstileToken?: string }) =>
      subscribeNewsletter(email, turnstileToken ?? ''),
  });
}

export function useSubmitContactMutation() {
  return useMutation({
    mutationFn: submitContactForm,
  });
}

export function useSubmitPropertyMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitPropertyListing,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.mySubmissions.list() });
      void queryClient.invalidateQueries({ queryKey: queryKeys.myListings.list() });
    },
  });
}

export function useCancelPropertySubmissionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => cancelMyPropertySubmission(id),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queryKeys.mySubmissions.list() });
    },
  });
}

export function useToggleWishlistMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['wishlist', 'toggle'],
    mutationFn: toggleWishlistItem,
    onMutate: async (propertyId) => {
      const id = String(propertyId);
      await queryClient.cancelQueries({ queryKey: queryKeys.wishlist.all() });
      const previous = queryClient.getQueryData<string[]>(queryKeys.wishlist.all()) ?? [];
      const optimistic = previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id];
      queryClient.setQueryData(queryKeys.wishlist.all(), optimistic);
      return { previous };
    },
    onError: (_error, _propertyId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.wishlist.all(), context.previous);
      }
    },
    onSuccess: (ids) => {
      queryClient.setQueryData(queryKeys.wishlist.all(), ids);
      void queryClient.invalidateQueries({
        queryKey: [...queryKeys.wishlist.all(), 'properties'],
      });
    },
  });
}

export function useToggleCompareMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['compare', 'toggle'],
    mutationFn: toggleCompareItem,
    onMutate: async (propertyId) => {
      const id = String(propertyId);
      await queryClient.cancelQueries({ queryKey: queryKeys.compare.all() });
      const previous = queryClient.getQueryData<string[]>(queryKeys.compare.all()) ?? [];

      if (previous.includes(id)) {
        queryClient.setQueryData(
          queryKeys.compare.all(),
          previous.filter((item) => item !== id)
        );
        return { previous };
      }

      queryClient.setQueryData(queryKeys.compare.all(), [...previous, id]);
      return { previous };
    },
    onError: (_error, _propertyId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKeys.compare.all(), context.previous);
      }
    },
    onSuccess: (result) => {
      queryClient.setQueryData(queryKeys.compare.all(), result.ids);
      if (result.limited) {
        queryClient.setQueryData(queryKeys.compare.limitNotice(), true);
      }
      void queryClient.invalidateQueries({
        queryKey: [...queryKeys.compare.all(), 'properties'],
      });
    },
  });
}

export function useUpdateMyListingMutation(id: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: AgentListingUpdateInput) => updateMyListing(id, input),
    onSuccess: (property) => {
      queryClient.setQueryData(queryKeys.myListings.detail(id), property);
      void queryClient.invalidateQueries({ queryKey: queryKeys.myListings.list() });
    },
  });
}

export function usePublishMyListingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => publishMyListing(id),
    onSuccess: (property) => {
      queryClient.setQueryData(queryKeys.myListings.detail(property.id), property);
      void queryClient.invalidateQueries({ queryKey: queryKeys.myListings.list() });
    },
  });
}

export function useUnpublishMyListingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => unpublishMyListing(id),
    onSuccess: (property) => {
      queryClient.setQueryData(queryKeys.myListings.detail(property.id), property);
      void queryClient.invalidateQueries({ queryKey: queryKeys.myListings.list() });
    },
  });
}

export function useDeleteMyListingMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | number) => deleteMyListing(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: queryKeys.myListings.detail(id) });
      void queryClient.invalidateQueries({ queryKey: queryKeys.myListings.list() });
    },
  });
}

export function useUploadMyListingMediaMutation(id: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ field, file }: { field: MediaSlotField; file: File }) =>
      uploadMyListingMedia(id, field, file),
    onSuccess: (property) => {
      queryClient.setQueryData(queryKeys.myListings.detail(id), property);
      void queryClient.invalidateQueries({ queryKey: queryKeys.myListings.list() });
    },
  });
}

export function useClearMyListingMediaMutation(id: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (field: MediaSlotField) => clearMyListingMedia(id, field),
    onSuccess: (property) => {
      queryClient.setQueryData(queryKeys.myListings.detail(id), property);
      void queryClient.invalidateQueries({ queryKey: queryKeys.myListings.list() });
    },
  });
}

export function useUploadMyListingGalleryMutation(id: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ index, file }: { index: number; file: File }) =>
      uploadMyListingGallery(id, index, file),
    onSuccess: (property) => {
      queryClient.setQueryData(queryKeys.myListings.detail(id), property);
      void queryClient.invalidateQueries({ queryKey: queryKeys.myListings.list() });
    },
  });
}

export function useClearMyListingGalleryMutation(id: string | number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (index: number) => clearMyListingGallery(id, index),
    onSuccess: (property) => {
      queryClient.setQueryData(queryKeys.myListings.detail(id), property);
      void queryClient.invalidateQueries({ queryKey: queryKeys.myListings.list() });
    },
  });
}
