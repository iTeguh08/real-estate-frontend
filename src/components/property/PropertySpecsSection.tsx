import { Bed, Bathtub, ArrowsOut, Car } from '@phosphor-icons/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DetailSpec } from '@/components/property/DetailSpec';
import { cn } from '@/lib/utils';
import type { PropertyDetail } from '@/types';

export interface PropertySpecsSectionProps {
  property: PropertyDetail;
  /**
   * Custom Layout 1 floats a utility bar that overlaps the top of this
   * section, so it needs extra top padding to clear it (default `true`).
   * Custom Layout 2 doesn't use that floating overlap, so it passes `false`
   * for normal section spacing instead.
   */
  reserveFloatingBarSpace?: boolean;
}

export function PropertySpecsSection({
  property,
  reserveFloatingBarSpace = true,
}: PropertySpecsSectionProps) {
  const { specs, amenities, type, status, imageUrl, title } = property;

  return (
    <section
      aria-labelledby="property-specs-heading"
      className={cn(
        'bg-hz-sunken pb-20 md:pb-28',
        reserveFloatingBarSpace ? 'pt-36 md:pt-40' : 'pt-20 md:pt-24'
      )}
    >
      <div className="section-container">
        <div className="mb-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-12">
          <div>
            <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
              Property Details
            </p>
            <h2
              id="property-specs-heading"
              className="mt-3 font-poppins text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hz-dark"
            >
              Specifications &amp; Amenities
            </h2>
          </div>
          <p className="max-w-xl font-poppins text-sm leading-[1.7] text-hz-body lg:text-base">
            A complete breakdown of {title} — from room counts to included building features.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-8">
          <div className="relative hidden overflow-hidden rounded-hz lg:block">
            <img
              src={imageUrl}
              alt={`${title} — property context`}
              loading="lazy"
              className="h-full min-h-[360px] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-hz-inverse/50 to-transparent" />
            <div className="absolute right-4 bottom-4 left-4 flex flex-wrap gap-2">
              <Badge className="rounded-hz border-none bg-hz-primary font-poppins text-[10px] uppercase tracking-wider text-white hover:bg-hz-primary">
                {status}
              </Badge>
              <Badge variant="outline" className="rounded-hz border-white/40 bg-hz-elevated/10 font-poppins text-[10px] uppercase tracking-wider text-white">
                {type}
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="specs" className="gap-6">
            <TabsList
              variant="line"
              className="w-full justify-start border-b border-hz-border bg-transparent"
              aria-label="Property detail categories"
            >
              <TabsTrigger
                value="specs"
                className="font-poppins text-sm data-active:text-hz-primary data-active:after:bg-hz-primary"
              >
                Specs
              </TabsTrigger>
              <TabsTrigger
                value="amenities"
                className="font-poppins text-sm data-active:text-hz-primary data-active:after:bg-hz-primary"
              >
                Amenities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="specs">
              <Card className="border-hz-border bg-hz-elevated shadow-sm">
                <CardHeader>
                  <CardTitle className="font-poppins text-base font-semibold text-hz-dark">
                    Core Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex flex-wrap gap-2 lg:hidden">
                    <Badge variant="outline" className="rounded-hz font-poppins text-xs text-hz-body">
                      {type}
                    </Badge>
                    <Badge variant="outline" className="rounded-hz font-poppins text-xs text-hz-body">
                      {status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <DetailSpec icon={<Bed size={18} weight="fill" />} value={specs.beds} label=" Beds" />
                    <DetailSpec
                      icon={<Bathtub size={18} weight="fill" />}
                      value={specs.baths}
                      label=" Baths"
                    />
                    <DetailSpec
                      icon={<ArrowsOut size={18} weight="fill" />}
                      value={specs.sqft.toLocaleString()}
                      label=" sqft"
                    />
                    {specs.garage !== undefined ? (
                      <DetailSpec
                        icon={<Car size={18} weight="fill" />}
                        value={specs.garage}
                        label=" Garage"
                      />
                    ) : (
                      <DetailSpec icon={<ArrowsOut size={18} weight="fill" />} value={type} label=" Type" />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="amenities">
              <Card className="border-hz-border bg-hz-elevated shadow-sm">
                <CardHeader>
                  <CardTitle className="font-poppins text-base font-semibold text-hz-dark">
                    Included Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="grid gap-2 sm:grid-cols-2" role="list">
                    {amenities.map((amenity) => (
                      <li
                        key={amenity}
                        className="rounded-hz border border-hz-border bg-hz-sunken px-4 py-3 font-poppins text-sm text-hz-body"
                      >
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
