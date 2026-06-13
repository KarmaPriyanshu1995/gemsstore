import type { Metadata } from "next";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { OrderSuccessPage } from "@/features/order-success";

export const metadata: Metadata = {
  title: "Order Confirmed — RealGemsStore",
  description:
    "Your heritage gemstone order has been placed successfully.",
};

export default function OrderSuccessRoute() {
  return (
    <StorefrontShell activeHref="/products">
      <OrderSuccessPage />
    </StorefrontShell>
  );
}
