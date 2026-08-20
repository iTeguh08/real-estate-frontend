import type { ComponentProps } from 'react';
import WishlistRouteImpl from '../src/pages/wishlist';

export default function WishlistRoute(props: ComponentProps<typeof WishlistRouteImpl>) {
  return <WishlistRouteImpl {...props} />;
}
