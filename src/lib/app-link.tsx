import NextLink from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { resolveAppHref, type AppTo } from '@/lib/app-router';

type AppLinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
  href?: AppTo;
  to?: AppTo;
  state?: { from?: string };
  children?: ReactNode;
};

/** Shared link for Next Pages Router. Accepts react-router-style `to` during migration. */
export function AppLink({ href, to, state, children, ...rest }: AppLinkProps) {
  let dest = resolveAppHref(href ?? to ?? '/');
  if (state?.from) {
    const joiner = dest.includes('?') ? '&' : '?';
    dest = `${dest}${joiner}from=${encodeURIComponent(state.from)}`;
  }

  return (
    <NextLink href={dest} {...rest}>
      {children}
    </NextLink>
  );
}
