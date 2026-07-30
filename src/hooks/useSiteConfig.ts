import { useQuery } from '@tanstack/react-query';
import { getSiteConfig } from '@/services/site.service';

export function useSiteConfig() {
  return useQuery({
    queryKey: ['site-config'],
    queryFn: getSiteConfig,
    staleTime: 5 * 60 * 1000,
  });
}
