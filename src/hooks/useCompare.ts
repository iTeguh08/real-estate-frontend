import { useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAppLocation, useAppNavigate } from '@/lib/app-router';
import { useAuth } from '@/hooks/useAuth';
import { useToggleCompareMutation } from '@/hooks/mutations';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import { MAX_COMPARE_ITEMS, getCompareIds } from '@/services/compare.service';

const LIMIT_NOTICE_MS = 5000;

export function useCompare() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();
  const navigate = useAppNavigate();
  const location = useAppLocation();

  const { data: compareIds = [] } = useQuery({
    queryKey: queryKeys.compare.all(),
    queryFn: getCompareIds,
    staleTime: Infinity,
    enabled: isAuthenticated,
  });

  const { data: limitNotice = false } = useQuery({
    queryKey: queryKeys.compare.limitNotice(),
    queryFn: async () =>
      queryClient.getQueryData<boolean>(queryKeys.compare.limitNotice()) ?? false,
    staleTime: Infinity,
    initialData: false,
    enabled: isAuthenticated,
  });

  const toggleMutation = useToggleCompareMutation();

  const isCompared = useCallback(
    (propertyId: string) => compareIds.includes(String(propertyId)),
    [compareIds],
  );

  const canAddMore = compareIds.length < MAX_COMPARE_ITEMS;

  const toggleCompare = useCallback(
    (propertyId: string) => {
      if (!isAuthenticated) {
        navigate(routes.login, {
          state: { from: `${location.pathname}${location.search}` },
        });
        return;
      }

      if (toggleMutation.isPending) return;

      const id = String(propertyId);
      const current =
        queryClient.getQueryData<string[]>(queryKeys.compare.all()) ?? compareIds;

      // Already selected → allow remove via mutation
      if (current.includes(id)) {
        toggleMutation.mutate(id);
        return;
      }

      // At capacity → shared limit notice for CompareBar (no network)
      if (current.length >= MAX_COMPARE_ITEMS) {
        queryClient.setQueryData(queryKeys.compare.limitNotice(), true);
        return;
      }

      toggleMutation.mutate(id);
    },
    [
      isAuthenticated,
      location.pathname,
      location.search,
      navigate,
      toggleMutation,
      queryClient,
      compareIds,
    ],
  );

  useEffect(() => {
    if (!limitNotice) return;
    const timeout = window.setTimeout(() => {
      queryClient.setQueryData(queryKeys.compare.limitNotice(), false);
    }, LIMIT_NOTICE_MS);
    return () => window.clearTimeout(timeout);
  }, [limitNotice, queryClient]);

  const isTogglingId = toggleMutation.isPending ? toggleMutation.variables : undefined;

  return {
    compareIds,
    compareCount: compareIds.length,
    isCompared,
    canAddMore,
    toggleCompare,
    isToggling: toggleMutation.isPending,
    isTogglingId,
    limitNotice,
  };
}
