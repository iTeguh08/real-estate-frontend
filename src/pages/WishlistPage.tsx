import { AppLink } from '@/lib/app-link';
import { LoadingOverlay, PropertyCardSkeleton } from '@/components/skeletons';
import { useQuery } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { PropertyCard } from '@/components/cards/PropertyCard';
import { useWishlist } from '@/hooks/useWishlist';
import { queryKeys } from '@/lib/query-keys';
import { routes } from '@/lib/routes';
import { getWishlistProperties } from '@/services/wishlist.service';

export function WishlistPage() {
  const { wishlistIds } = useWishlist();

  const { data: properties = [], isLoading } = useQuery({
    queryKey: queryKeys.wishlist.properties(wishlistIds),
    queryFn: () => getWishlistProperties(wishlistIds),
    enabled: wishlistIds.length > 0,
  });

  if (wishlistIds.length === 0) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <p className="mb-2 font-poppins text-[11px] font-semibold uppercase tracking-[2px] text-hz-primary">
          Wishlist
        </p>
        <h1 className="font-poppins text-3xl font-semibold text-hz-dark">No saved properties yet</h1>
        <p className="mx-auto mt-4 max-w-md font-poppins text-sm leading-relaxed text-hz-muted">
          Tap the heart icon on any listing to save it here for later.
        </p>
        <AppLink
          to={routes.listings}
          className="mt-8 inline-flex items-center gap-2 rounded-hz bg-hz-primary px-6 py-2.5 font-poppins text-sm font-semibold text-white no-underline transition-colors hover:bg-hz-primary-hover"
        >
          <ArrowLeft size={16} />
          Browse Listings
        </AppLink>
      </main>
    );
  }

  return (
    <main id="main-content" className="bg-hz-elevated py-10 md:py-16">
      <div className="section-container">
        <AppLink
          to={routes.listings}
          className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors hover:text-hz-primary"
        >
          <ArrowLeft size={16} />
          Back to listings
        </AppLink>

        <h1 className="font-poppins text-2xl font-semibold text-hz-dark md:text-3xl">
          Saved Properties
        </h1>
        <p className="mt-1 font-poppins text-sm text-hz-muted">
          {wishlistIds.length} {wishlistIds.length === 1 ? 'property' : 'properties'} in your wishlist
        </p>

        {isLoading ? (
          <LoadingOverlay active minHeight="min-h-[320px]" className="mt-8">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: wishlistIds.length || 4 }).map((_, i) => (
                <PropertyCardSkeleton key={i} />
              ))}
            </div>
          </LoadingOverlay>
        ) : (
          <div className="mt-8 grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                variant="grid"
                size="full"
                uniformHeight
                className="rounded-hz"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
