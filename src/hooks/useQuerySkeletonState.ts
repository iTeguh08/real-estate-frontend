/**
 * True when the UI should show skeleton placeholders instead of (stale) data.
 * Covers cold fetches (`isPending`) and filter transitions with `keepPreviousData`.
 */
export function useQuerySkeletonState(query: {
  isPending: boolean;
  isFetching: boolean;
  isPlaceholderData: boolean;
}): boolean {
  return query.isPending || (query.isFetching && query.isPlaceholderData);
}
