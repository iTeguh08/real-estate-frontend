import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bed, Bathtub, ArrowsOut } from '@phosphor-icons/react';
import { ArrowLeft, X } from 'lucide-react';
import { useCompare } from '@/hooks/useCompare';
import { queryKeys } from '@/lib/query-keys';
import { formatPropertyPrice } from '@/lib/format-property';
import { routes } from '@/lib/routes';
import { clearCompare, getCompareProperties } from '@/services/compare.service';

const ROWS = [
  { key: 'price', label: 'Price' },
  { key: 'status', label: 'Status' },
  { key: 'type', label: 'Type' },
  { key: 'location', label: 'Location' },
  { key: 'beds', label: 'Bedrooms' },
  { key: 'baths', label: 'Bathrooms' },
  { key: 'sqft', label: 'Sq Ft' },
] as const;

export function ComparePage() {
  const { compareIds, toggleCompare } = useCompare();
  const queryClient = useQueryClient();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: queryKeys.compare.properties(compareIds),
    queryFn: () => getCompareProperties(compareIds),
    enabled: compareIds.length > 0,
  });

  const clearMutation = useMutation({
    mutationFn: clearCompare,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.compare.all(), []);
    },
  });

  if (compareIds.length === 0) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
          Compare
        </p>
        <h1 className="font-poppins text-3xl font-semibold text-hz-dark">No properties to compare</h1>
        <p className="mx-auto mt-4 max-w-md font-poppins text-sm leading-relaxed text-hz-muted">
          Use the compare icon on any listing card to add up to 3 properties side by side.
        </p>
        <Link
          to={{ pathname: routes.home, hash: 'listings' }}
          className="mt-8 inline-flex items-center gap-2 rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white no-underline transition-colors hover:bg-hz-primary-hover"
        >
          <ArrowLeft size={16} />
          Browse Listings
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="bg-white py-10 md:py-16">
      <div className="section-container">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <Link
              to={{ pathname: routes.home, hash: 'listings' }}
              className="mb-4 inline-flex items-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors hover:text-hz-primary"
            >
              <ArrowLeft size={16} />
              Back to listings
            </Link>
            <h1 className="font-poppins text-2xl font-semibold text-hz-dark md:text-3xl">
              Compare Properties
            </h1>
            <p className="mt-1 font-poppins text-sm text-hz-muted">
              Side-by-side view of your selected listings
            </p>
          </div>
          <button
            type="button"
            onClick={() => clearMutation.mutate()}
            disabled={clearMutation.isPending}
            className="rounded-hz border border-hz-border px-4 py-2 font-poppins text-sm font-medium text-hz-dark transition-colors hover:border-hz-primary hover:text-hz-primary disabled:opacity-60"
          >
            Clear All
          </button>
        </div>

        {isLoading ? (
          <div className="animate-pulse rounded-hz border border-hz-border bg-[#F8F8F8] p-8">
            <div className="h-6 w-1/3 rounded-hz bg-hz-bg-soft" />
          </div>
        ) : (
          <div className="overflow-x-auto rounded-hz border border-hz-border bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse font-poppins text-sm">
              <thead>
                <tr className="border-b border-hz-border">
                  <th className="w-36 p-4 text-left text-xs font-semibold uppercase tracking-wider text-hz-muted">
                    Detail
                  </th>
                  {properties.map((property) => (
                    <th key={property.id} className="min-w-[200px] p-4 text-left align-top">
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => toggleCompare(property.id)}
                          className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border border-hz-border bg-white text-hz-muted transition-colors hover:border-hz-primary hover:text-hz-primary"
                          aria-label={`Remove ${property.title} from compare`}
                        >
                          <X size={14} />
                        </button>
                        <div className="mb-3 aspect-[16/10] overflow-hidden rounded-hz bg-hz-bg-soft">
                          <img
                            src={property.imageUrl}
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <Link
                          to={routes.property(property.slug)}
                          className="font-semibold text-hz-dark no-underline transition-colors hover:text-hz-primary"
                        >
                          {property.title}
                        </Link>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.key} className="border-b border-hz-border last:border-b-0">
                    <td className="p-4 font-medium text-hz-muted">{row.label}</td>
                    {properties.map((property) => (
                      <td key={`${property.id}-${row.key}`} className="p-4 text-hz-dark">
                        {row.key === 'price' && formatPropertyPrice(property)}
                        {row.key === 'status' && property.status}
                        {row.key === 'type' && property.type}
                        {row.key === 'location' && property.location}
                        {row.key === 'beds' && (
                          <span className="inline-flex items-center gap-1.5">
                            <Bed size={16} weight="fill" className="text-hz-muted" />
                            {property.specs.beds}
                          </span>
                        )}
                        {row.key === 'baths' && (
                          <span className="inline-flex items-center gap-1.5">
                            <Bathtub size={16} weight="fill" className="text-hz-muted" />
                            {property.specs.baths}
                          </span>
                        )}
                        {row.key === 'sqft' && (
                          <span className="inline-flex items-center gap-1.5">
                            <ArrowsOut size={16} weight="fill" className="text-hz-muted" />
                            {property.specs.sqft.toLocaleString()}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
