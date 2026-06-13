import type { Metadata } from "next";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { CartPage } from "@/features/cart";

export const metadata: Metadata = {
  title: "Your Cart — RealGemsStore",
  description:
    "Review your selected heritage gemstones, apply coupons, and proceed to checkout.",
};

export default function CartRoute() {
  return (
    <StorefrontShell activeHref="/products">
      <CartPage />
    </StorefrontShell>
  );
}
