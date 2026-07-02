import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { PropertyGalleryImage } from '@/types';

export interface PropertyGalleryGridProps {
  images: PropertyGalleryImage[];
  title: string;
}

export function PropertyGalleryGrid({ images, title }: PropertyGalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? images[selectedIndex] : null;
  const [hero, ...rest] = images;

  return (
    <>
      <section aria-labelledby="property-gallery-heading" className="bg-white py-20 md:py-28">
        <div className="section-container">
          <div className="mb-10 flex flex-col gap-4 md:mb-12 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-poppins text-[11px] font-semibold uppercase tracking-[0.28em] text-hz-primary">
                Gallery
              </p>
              <h2
                id="property-gallery-heading"
                className="mt-3 font-poppins text-[clamp(1.75rem,3.5vw,2.5rem)] font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-hz-dark"
              >
                Explore every angle
              </h2>
            </div>
            <p className="max-w-sm font-poppins text-sm leading-relaxed text-hz-muted">
              {images.length} curated views of {title}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-12 md:gap-4">
            {hero && (
              <button
                type="button"
                onClick={() => setSelectedIndex(0)}
                className="group relative aspect-[16/10] overflow-hidden rounded-hz focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary focus-visible:ring-offset-2 md:col-span-7 md:aspect-auto md:min-h-[420px]"
                aria-label={`Open gallery image: ${hero.alt}`}
              >
                <Card className="h-full border-hz-border p-0 shadow-sm">
                  <img
                    src={hero.url}
                    alt={hero.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </Card>
              </button>
            )}

            <div className="grid grid-cols-2 gap-3 md:col-span-5 md:grid-cols-1 md:gap-4">
              {rest.slice(0, 2).map((image, offset) => {
                const index = offset + 1;
                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setSelectedIndex(index)}
                    className="group relative aspect-[4/3] overflow-hidden rounded-hz focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary focus-visible:ring-offset-2 md:aspect-auto md:min-h-[200px]"
                    aria-label={`Open gallery image: ${image.alt}`}
                  >
                    <Card className="h-full border-hz-border p-0 shadow-sm">
                      <img
                        src={image.url}
                        alt={image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </Card>
                  </button>
                );
              })}
            </div>

            {rest.slice(2).map((image, offset) => {
              const index = offset + 3;
              return (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-hz focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hz-primary focus-visible:ring-offset-2 md:col-span-3"
                  aria-label={`Open gallery image: ${image.alt}`}
                >
                  <Card className="h-full border-hz-border p-0 shadow-sm">
                    <img
                      src={image.url}
                      alt={image.alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </Card>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <Dialog
        open={selectedIndex !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedIndex(null);
        }}
      >
        {selected && (
          <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-4xl">
            <DialogHeader className="sr-only">
              <DialogTitle>{selected.alt}</DialogTitle>
              <DialogDescription>Expanded gallery view for {title}</DialogDescription>
            </DialogHeader>
            <img
              src={selected.url}
              alt={selected.alt}
              className="max-h-[min(80vh,720px)] w-full object-cover"
            />
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
