import type { Metadata } from "next";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { CheckoutPage } from "@/features/checkout";

export const metadata: Metadata = {
  title: "Checkout — RealGemsStore",
  description:
    "Complete your heritage gemstone purchase with secure shipping, billing, and delivery details.",
};

export default function CheckoutRoute() {
  return (
    <StorefrontShell activeHref="/products">
      <CheckoutPage />
    </StorefrontShell>
  );
}
