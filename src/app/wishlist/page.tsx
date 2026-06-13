import type { Metadata } from "next";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { WishlistPage } from "@/features/wishlist";

export const metadata: Metadata = {
  title: "Wishlist — RealGemsStore",
  description: "View and manage your saved heritage gemstones.",
};

export default function WishlistRoute() {
  return (
    <StorefrontShell activeHref="/products">
      <WishlistPage />
    </StorefrontShell>
  );
}
