"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckoutProgress } from "@/features/checkout/CheckoutProgress";
import { OrderSuccessActions } from "@/features/order-success/OrderSuccessActions";
import { OrderSuccessHero } from "@/features/order-success/OrderSuccessHero";
import { OrderSuccessSummary } from "@/features/order-success/OrderSuccessSummary";
import { useOrderSession } from "@/features/order-success/useOrderSession";

export function OrderSuccessPage() {
  const router = useRouter();
  const { order, loaded } = useOrderSession();

  useEffect(() => {
    if (!loaded) return;
    if (!order) {
      router.replace("/products");
    }
  }, [loaded, order, router]);

  if (!loaded || !order) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Skeleton className="mb-8 h-4 w-48" />
        <Skeleton className="h-64 w-full rounded-xl" />
        <Skeleton className="mt-8 h-48 w-full rounded-lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Order Confirmed" },
        ]}
        className="mb-8"
      />

      <CheckoutProgress activeStep="success" />

      <div className="space-y-8">
        <OrderSuccessHero
          orderNumber={order.orderNumber}
          customerName={order.shippingName}
        />

        <OrderSuccessSummary order={order} />

        <OrderSuccessActions order={order} />

        <p className="text-center text-sm text-muted-foreground">
          Questions? Contact{" "}
          <a
            href="mailto:concierge@realgemsstore.com"
            className="font-medium text-primary hover:underline"
          >
            concierge@realgemsstore.com
          </a>{" "}
          with order reference{" "}
          <span className="font-mono">{order.orderNumber}</span>.
        </p>

        <div className="text-center">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
