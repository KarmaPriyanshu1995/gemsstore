import type { Metadata } from "next";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { PaymentPage } from "@/features/payment";

export const metadata: Metadata = {
  title: "Payment — RealGemsStore",
  description:
    "Complete your heritage gemstone purchase with secure mock payment options.",
};

export default function PaymentRoute() {
  return (
    <StorefrontShell activeHref="/products">
      <PaymentPage />
    </StorefrontShell>
  );
}
