import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { formatPropertyPrice } from '@/lib/format-property';
import { routes } from '@/lib/routes';
import type { Property } from '@/types';

export interface PropertyRelatedSectionProps {
  properties: Property[];
  currentPropertyId: string;
}

export function PropertyRelatedSection({
  properties,
  currentPropertyId,
}: PropertyRelatedSectionProps) {
  const related = properties.filter((p) => p.id !== currentPropertyId).slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-properties-heading" className="bg-white py-20 md:py-28">
      <div className="section-container">
        <div className="mb-12 text-center">
          <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
            You may also like
          </p>
          <h2
            id="related-properties-heading"
            className="mt-3 font-poppins text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hz-dark"
          >
            Related Properties
          </h2>
        </div>

        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          role="list"
          aria-label="Related property listings"
        >
          {related.map((property) => (
            <article key={property.id} role="listitem">
              <Card className="h-full overflow-hidden border-hz-border bg-white p-0 shadow-sm transition-shadow duration-300 hover:shadow-md">
                <Link
                  to={routes.propertyById(property.id)}
                  className="group flex h-full flex-col no-underline"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-hz-bg-soft">
                    <img
                      src={property.imageUrl}
                      alt={`${property.title} — ${property.location}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="flex flex-1 flex-col gap-2 p-5">
                    <p className="font-poppins text-xs font-semibold uppercase tracking-[0.14em] text-hz-primary">
                      {property.type}
                    </p>
                    <h3 className="font-poppins text-lg font-semibold leading-snug text-hz-dark group-hover:text-hz-primary">
                      {property.title}
                    </h3>
                    <p className="line-clamp-2 font-poppins text-sm leading-relaxed text-hz-muted">
                      {property.location}
                    </p>
                    <p className="mt-auto pt-2 font-poppins text-base font-semibold text-hz-dark">
                      {formatPropertyPrice(property)}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-poppins text-[13px] font-medium text-hz-body group-hover:text-hz-primary">
                      Learn More
                      <ArrowRight size={14} strokeWidth={1.6} aria-hidden="true" />
                    </span>
                  </CardContent>
                </Link>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
