import { useQuery } from '@tanstack/react-query';
import { useToggleCompareMutation } from '@/hooks/mutations';
import { queryKeys } from '@/lib/query-keys';
import { MAX_COMPARE_ITEMS, getCompareIds } from '@/services/compare.service';

export function useCompare() {
  const { data: compareIds = [] } = useQuery({
    queryKey: queryKeys.compare.all(),
    queryFn: getCompareIds,
    staleTime: Infinity,
  });

  const toggleMutation = useToggleCompareMutation();

  const isCompared = (propertyId: string) => compareIds.includes(propertyId);
  const canAddMore = compareIds.length < MAX_COMPARE_ITEMS;

  const toggleCompare = (propertyId: string) => {
    toggleMutation.mutate(propertyId);
  };

  return {
    compareIds,
    compareCount: compareIds.length,
    isCompared,
    canAddMore,
    toggleCompare,
    isToggling: toggleMutation.isPending,
    lastLimited: toggleMutation.data?.limited ?? false,
  };
}
