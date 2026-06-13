"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/features/cart";
import { useCartSummary } from "@/features/cart/useCartSummary";
import { checkoutSteps, getDeliveryExtraFee } from "@/features/checkout/checkout.config";
import { CheckoutBillingForm } from "@/features/checkout/CheckoutBillingForm";
import { CheckoutDeliveryForm } from "@/features/checkout/CheckoutDeliveryForm";
import { CheckoutOrderSummary } from "@/features/checkout/CheckoutOrderSummary";
import { CheckoutProgress } from "@/features/checkout/CheckoutProgress";
import { CheckoutShippingForm } from "@/features/checkout/CheckoutShippingForm";
import { useCheckout } from "@/features/checkout/useCheckout";
import { toast } from "@/lib/toast";

export function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const summary = useCartSummary(cart.subtotal);
  const checkout = useCheckout();

  const deliveryFee = useMemo(
    () => getDeliveryExtraFee(checkout.form.delivery.method),
    [checkout.form.delivery.method],
  );

  const total = useMemo(
    () => Math.max(0, cart.subtotal - summary.discount + summary.shipping + deliveryFee),
    [cart.subtotal, summary.discount, summary.shipping, deliveryFee],
  );

  useEffect(() => {
    if (cart.isHydrated && cart.items.length === 0) {
      router.replace("/cart");
    }
  }, [cart.isHydrated, cart.items.length, router]);

  const handleApplyCoupon = () => {
    if (summary.applyCoupon()) {
      toast.success("Heritage coupon applied");
    }
  };

  const handleContinue = () => {
    if (checkout.step === "delivery") {
      if (!checkout.validateCurrentStep()) return;

      checkout.completeCheckout({
        subtotal: cart.subtotal,
        discount: summary.discount,
        shipping: summary.shipping,
        deliveryFee,
        total,
        couponCode: summary.appliedCoupon?.code ?? null,
        itemCount: cart.itemCount,
      });
      return;
    }

    checkout.goNext();
  };

  if (!cart.isHydrated || cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-8 h-4 w-48" />
        <Skeleton className="mb-8 h-10 w-64" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]">
          <Skeleton className="h-[480px] rounded-lg" />
          <Skeleton className="h-[360px] rounded-lg" />
        </div>
      </div>
    );
  }

  const stepMeta = checkoutSteps[checkout.currentStepIndex];

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Cart", href: "/cart" },
          { label: "Checkout" },
        ]}
        className="mb-8"
      />

      <header className="mb-6">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Maharaja Heritage
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
          Checkout
        </h1>
      </header>

      <CheckoutProgress activeStep="checkout" />

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
        <div className="space-y-6">
          <p className="text-sm text-muted-foreground">
            Step {stepMeta.number} of {checkoutSteps.length}:{" "}
            <span className="font-medium text-foreground">{stepMeta.label}</span>
          </p>

          {checkout.step === "shipping" && (
            <CheckoutShippingForm
              shipping={checkout.form.shipping}
              errors={checkout.errors}
              onChange={checkout.updateShipping}
            />
          )}

          {checkout.step === "billing" && (
            <CheckoutBillingForm
              billing={checkout.form.billing}
              sameAsShipping={checkout.form.sameAsShipping}
              errors={checkout.errors}
              onChange={checkout.updateBilling}
              onSameAsShippingChange={checkout.setSameAsShipping}
            />
          )}

          {checkout.step === "delivery" && (
            <CheckoutDeliveryForm
              delivery={checkout.form.delivery}
              onChange={checkout.updateDelivery}
            />
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            {checkout.currentStepIndex > 0 ? (
              <Button variant="outline" onClick={checkout.goBack}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link href="/cart">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Cart
                </Link>
              </Button>
            )}

            <Button variant="heritage" onClick={handleContinue}>
              {checkout.step === "delivery" ? "Continue to Payment" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <CheckoutOrderSummary
            items={cart.items}
            subtotal={cart.subtotal}
            discount={summary.discount}
            shipping={summary.shipping}
            deliveryFee={deliveryFee}
            total={total}
            couponInput={summary.couponInput}
            couponError={summary.couponError}
            appliedCouponLabel={summary.appliedCoupon?.label ?? null}
            onCouponInputChange={summary.setCouponInput}
            onApplyCoupon={handleApplyCoupon}
            onRemoveCoupon={summary.removeCoupon}
          />
        </div>
      </div>
    </div>
  );
}
