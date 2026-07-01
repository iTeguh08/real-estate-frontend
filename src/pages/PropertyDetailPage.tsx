import { Link, useParams } from 'react-router-dom';
import { Bed, Bathtub, ArrowsOut, Car } from '@phosphor-icons/react';
import { MapPin, ArrowLeft, Heart, ArrowLeftRight } from 'lucide-react';
import { usePropertyQuery } from '@/hooks/queries';
import { useWishlist } from '@/hooks/useWishlist';
import { useCompare } from '@/hooks/useCompare';
import { formatPropertyPrice } from '@/lib/format-property';
import { cn } from '@/lib/utils';
import { routes } from '@/lib/routes';

function DetailSpec({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-hz border border-hz-border bg-[#F8F8F8] px-3 py-2">
      <span className="text-hz-dark/80" aria-hidden="true">
        {icon}
      </span>
      <span className="font-poppins text-sm text-hz-dark">
        <span className="font-medium">{value}</span>
        <span className="text-hz-muted">{label}</span>
      </span>
    </div>
  );
}

export function PropertyDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: property, isLoading, isError } = usePropertyQuery(slug);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();

  if (isLoading) {
    return (
      <main id="main-content" className="section-container py-16">
        <div className="animate-pulse space-y-6">
          <div className="h-8 w-48 rounded-hz bg-hz-bg-soft" />
          <div className="aspect-[16/10] rounded-hz bg-hz-bg-soft" />
          <div className="h-6 w-2/3 rounded-hz bg-hz-bg-soft" />
        </div>
      </main>
    );
  }

  if (isError || !property) {
    return (
      <main id="main-content" className="section-container py-20 text-center">
        <h1 className="font-poppins text-2xl font-semibold text-hz-dark">Property not found</h1>
        <p className="mt-2 font-poppins text-sm text-hz-muted">
          This listing may have been removed or the link is incorrect.
        </p>
        <Link
          to={routes.home}
          className="mt-6 inline-flex items-center gap-2 font-poppins text-sm font-semibold text-hz-primary no-underline hover:underline"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </main>
    );
  }

  const { title, location, status, type, specs, imageUrl, id } = property;
  const saved = isWishlisted(id);
  const compared = isCompared(id);

  return (
    <main id="main-content" className="bg-white py-10 md:py-16">
      <div className="section-container max-w-4xl">
        <Link
          to={{ pathname: routes.home, hash: 'listings' }}
          className="mb-6 inline-flex items-center gap-2 font-poppins text-sm text-hz-body no-underline transition-colors hover:text-hz-primary"
        >
          <ArrowLeft size={16} />
          Back to listings
        </Link>

        <div className="overflow-hidden rounded-hz border border-hz-border bg-white shadow-sm">
          <div className="relative aspect-[16/10] w-full bg-hz-bg-soft">
            <img src={imageUrl} alt={`${title} — ${location}`} className="h-full w-full object-cover" />
            <span className="absolute top-4 left-4 rounded-hz bg-hz-primary px-2.5 py-1 font-poppins text-[10px] font-semibold uppercase tracking-wider text-white">
              {status}
            </span>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                onClick={() => toggleCompare(id)}
                aria-label={compared ? `Remove ${title} from compare` : `Add ${title} to compare`}
                aria-pressed={compared}
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-[2px] transition-colors duration-200',
                  compared
                    ? 'bg-hz-primary/90 text-white hover:bg-hz-primary'
                    : 'bg-black/45 text-white hover:bg-black/65'
                )}
              >
                <ArrowLeftRight size={18} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(id)}
                aria-label={saved ? `Remove ${title} from wishlist` : `Save ${title} to wishlist`}
                aria-pressed={saved}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-[2px] transition-colors duration-200 hover:bg-black/65"
              >
                <Heart
                  size={18}
                  strokeWidth={1.75}
                  className={cn(saved && 'fill-hz-primary text-hz-primary')}
                />
              </button>
            </div>
          </div>

          <div className="space-y-6 p-6 md:p-8">
            <div>
              <p className="font-poppins text-xs font-semibold uppercase tracking-[0.18em] text-hz-primary">
                {type}
              </p>
              <h1 className="mt-2 font-poppins text-2xl font-semibold leading-snug text-hz-dark md:text-3xl">
                {title}
              </h1>
              <p className="mt-2 flex items-start gap-1.5 font-poppins text-sm text-hz-muted">
                <MapPin size={14} className="mt-0.5 shrink-0" />
                {location}
              </p>
            </div>

            <p className="font-poppins text-3xl font-semibold text-hz-dark">
              {formatPropertyPrice(property)}
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <DetailSpec icon={<Bed size={18} weight="fill" />} value={specs.beds} label=" Beds" />
              <DetailSpec icon={<Bathtub size={18} weight="fill" />} value={specs.baths} label=" Baths" />
              <DetailSpec
                icon={<ArrowsOut size={18} weight="fill" />}
                value={specs.sqft.toLocaleString()}
                label=" sqft"
              />
              {specs.garage !== undefined && (
                <DetailSpec icon={<Car size={18} weight="fill" />} value={specs.garage} label=" Garage" />
              )}
            </div>

            <button
              type="button"
              className={cn(
                'w-full rounded-hz bg-hz-primary px-6 py-3',
                'font-poppins text-sm font-semibold text-white',
                'transition-colors duration-200 hover:bg-hz-primary-hover'
              )}
            >
              Schedule a Viewing
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
