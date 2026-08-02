import { Skeleton } from '@/components/ui/skeleton';

const ROW_COUNT = 7;
const COLUMN_COUNT = 3;

export function CompareTableSkeleton() {
  return (
    <div className="overflow-hidden border border-hz-border bg-hz-elevated">
      <table className="w-max min-w-full border-collapse font-poppins text-sm table-fixed">
        <thead>
          <tr className="border-b border-hz-border">
            <th className="sticky left-0 z-20 w-36 min-w-[144px] border-r border-hz-border bg-hz-elevated p-4">
              <Skeleton className="h-3 w-16 rounded-none" />
            </th>
            {Array.from({ length: COLUMN_COUNT }).map((_, i) => (
              <th
                key={i}
                className={`min-w-[280px] w-[300px] p-4 align-top${
                  i < COLUMN_COUNT - 1 ? ' border-r border-hz-border' : ''
                }`}
              >
                <Skeleton className="mb-3 aspect-[16/10] w-full rounded-none" />
                <Skeleton className="h-4 w-3/4 rounded-none" />
                <Skeleton className="mt-2 h-3 w-1/2 rounded-none" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: ROW_COUNT }).map((_, row) => (
            <tr key={row} className="border-b border-hz-border last:border-b-0">
              <td className="sticky left-0 z-10 border-r border-hz-border bg-hz-elevated p-4">
                <Skeleton className="h-3 w-20 rounded-none" />
              </td>
              {Array.from({ length: COLUMN_COUNT }).map((_, col) => (
                <td
                  key={col}
                  className={`p-4${col < COLUMN_COUNT - 1 ? ' border-r border-hz-border' : ''}`}
                >
                  <Skeleton className="h-4 w-24 rounded-none" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
