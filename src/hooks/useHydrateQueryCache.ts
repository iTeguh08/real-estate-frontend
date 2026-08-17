import { useState } from 'react';

/**
 * Seeds the React Query cache with server-rendered page props.
 *
 * The seed has to run before children render — inside an effect the child
 * components would already have fired their own fetches for data we were handed
 * by `getStaticProps`/`getServerSideProps`. A `useState` initializer gives us
 * exactly that timing without touching a ref during render, and re-running it
 * (StrictMode's double invoke) is harmless because writing the same server
 * payload into the cache is idempotent.
 */
export function useHydrateQueryCache(seed: () => void): void {
  useState(seed);
}
