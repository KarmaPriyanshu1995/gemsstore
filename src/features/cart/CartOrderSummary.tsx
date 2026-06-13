"use client";

import Link from "next/link";
import { ArrowRight, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartCouponForm } from "@/features/cart/CartCouponForm";
import { cartConfig } from "@/features/cart/cart.config";
import { formatCurrency } from "@/utils/format-currency";

type CartOrderSummaryProps = {
  itemCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  qualifiesForFreeShipping: boolean;
  couponInput: string;
  couponError: string | null;
  appliedCouponLabel: string | null;
  onCouponInputChange: (value: string) => void;
  onApplyCoupon: () => void;
  onRemoveCoupon: () => void;
};

function SummaryRow({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={emphasis ? "font-medium" : "text-muted-foreground"}>
        {label}
      </span>
      <span className={emphasis ? "font-heading text-lg font-semibold" : ""}>
        {value}
      </span>
    </div>
  );
}

export function CartOrderSummary({
  itemCount,
  subtotal,
  discount,
  shipping,
  total,
  qualifiesForFreeShipping,
  couponInput,
  couponError,
  appliedCouponLabel,
  onCouponInputChange,
  onApplyCoupon,
  onRemoveCoupon,
}: CartOrderSummaryProps) {
  const amountToFreeShipping = Math.max(
    0,
    cartConfig.freeShippingThreshold - subtotal,
  );

  return (
    <Card className="border-[rgba(199,164,90,0.15)]">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Order Summary</CardTitle>
        <p className="text-sm text-muted-foreground">
          {itemCount} {itemCount === 1 ? "treasure" : "treasures"} selected
        </p>
      </CardHeader>

      <CardContent className="space-y-5">
        <CartCouponForm
          couponInput={couponInput}
          couponError={couponError}
          appliedCouponLabel={appliedCouponLabel}
          onCouponInputChange={onCouponInputChange}
          onApply={onApplyCoupon}
          onRemove={onRemoveCoupon}
        />

        <Separator />

        <div className="space-y-3">
          <SummaryRow label="Subtotal" value={formatCurrency(subtotal)} />
          {discount > 0 && (
            <SummaryRow
              label="Heritage Discount"
              value={`−${formatCurrency(discount)}`}
            />
          )}
          <SummaryRow
            label="Shipping Estimate"
            value={shipping === 0 ? "Complimentary" : formatCurrency(shipping)}
          />
        </div>

        <div className="flex items-start gap-2 rounded-md bg-secondary/30 px-3 py-2 text-xs text-muted-foreground">
          <Truck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          {qualifiesForFreeShipping ? (
            <span>Complimentary insured delivery on this order.</span>
          ) : (
            <span>
              Add {formatCurrency(amountToFreeShipping)} more for complimentary
              heritage shipping.
            </span>
          )}
        </div>

        <Separator />

        <SummaryRow
          label="Estimated Total"
          value={formatCurrency(total)}
          emphasis
        />

        <Button variant="heritage" size="lg" className="w-full" asChild>
          <Link href="/checkout">
            Proceed to Checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        <Button variant="outline" className="w-full" asChild>
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
