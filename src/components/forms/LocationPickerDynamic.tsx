import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';

/** Leaflet map — never SSR. */
export const LocationPickerDynamic = dynamic(
  () =>
    import('@/components/forms/LocationPicker').then((m) => ({
      default: m.LocationPicker,
    })),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[320px] w-full rounded-hz" />,
  }
);
