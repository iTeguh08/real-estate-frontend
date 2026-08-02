import { Skeleton } from '@/components/ui/skeleton';

export function PropertyShowcaseSkeleton() {
  return (
    <div>
      <Skeleton className="min-h-[70vh] w-full rounded-none" />
      <div className="section-container space-y-4 py-24">
        <Skeleton className="mx-auto h-8 w-64 rounded-hz" />
        <Skeleton className="mx-auto h-4 w-full max-w-lg rounded-hz" />
        <Skeleton className="mx-auto h-4 w-full max-w-md rounded-hz" />
      </div>
    </div>
  );
}
