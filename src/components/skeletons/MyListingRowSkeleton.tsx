import { Skeleton } from '@/components/ui/skeleton';

export function MyListingRowSkeleton() {
  return (
    <div className="flex h-28 items-center gap-4 rounded-hz border border-hz-border bg-hz-elevated p-4">
      <Skeleton className="h-full w-32 shrink-0 rounded-hz" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-2/3 rounded-hz" />
        <Skeleton className="h-3 w-1/3 rounded-hz" />
        <Skeleton className="h-3 w-1/2 rounded-hz" />
      </div>
      <Skeleton className="hidden h-9 w-20 shrink-0 rounded-hz sm:block" />
    </div>
  );
}
