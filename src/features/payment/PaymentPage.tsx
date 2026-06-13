"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ArrowLeft, Loader2, Lock } from "lucide-react";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/features/cart";
import { CheckoutProgress } from "@/features/checkout/CheckoutProgress";
import { PaymentMethodForm } from "@/features/payment/PaymentMethodForm";
import { PaymentMethodSelector } from "@/features/payment/PaymentMethodSelector";
import { PaymentOrderSummary } from "@/features/payment/PaymentOrderSummary";
import { PaymentSecurityBadges } from "@/features/payment/PaymentSecurityBadges";
import { useCheckoutSession } from "@/features/payment/useCheckoutSession";
import { usePayment } from "@/features/payment/usePayment";
import { formatCurrency } from "@/utils/format-currency";

export function PaymentPage() {
  const router = useRouter();
  const cart = useCart();
  const { session, loaded } = useCheckoutSession();
  const payment = usePayment(session);

  useEffect(() => {
    if (!loaded) return;
    if (!session) {
      router.replace("/checkout");
    }
  }, [loaded, session, router]);

  if (!loaded || !session || !cart.isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-8 h-4 w-56" />
        <Skeleton className="mb-8 h-10 w-48" />
        <Skeleton className="mb-10 h-8 w-full max-w-2xl" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Skeleton className="h-[520px] rounded-lg" />
          <Skeleton className="h-[320px] rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout", href: "/checkout" },
          { label: "Payment" },
        ]}
        className="mb-8"
      />

      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Maharaja Heritage
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
          Payment
        </h1>
      </header>

      <CheckoutProgress activeStep="payment" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-6">
          <Card className="border-[rgba(199,164,90,0.15)]">
            <CardContent className="space-y-6 p-6">
              <PaymentMethodSelector
                selected={payment.method}
                onSelect={payment.setMethod}
              />

              <div className="border-t border-border/80 pt-6">
                <h2 className="mb-4 font-heading text-lg font-semibold">
                  Payment Details
                </h2>
                <PaymentMethodForm
                  method={payment.method}
                  form={payment.form}
                  errors={payment.errors}
                  onChange={payment.updateForm}
                />
              </div>
            </CardContent>
          </Card>

          <PaymentSecurityBadges />

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Button variant="outline" asChild>
              <Link href="/checkout">
                <ArrowLeft className="h-4 w-4" />
                Back to Checkout
              </Link>
            </Button>

            <Button
              variant="heritage"
              size="lg"
              disabled={payment.processing}
              onClick={() => payment.payNow()}
            >
              {payment.processing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Pay {formatCurrency(session.total)}
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <PaymentOrderSummary items={cart.items} session={session} />
        </div>
      </div>
    </div>
  );
}
