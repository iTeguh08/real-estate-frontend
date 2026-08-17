import { QueryClient } from '@tanstack/react-query';

export const queryClientOptions = {
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
};

export const queryClient = new QueryClient(queryClientOptions);
