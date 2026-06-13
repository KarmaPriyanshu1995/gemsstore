"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartCouponForm } from "@/features/cart/CartCouponForm";
import type { CartItem } from "@/features/cart/types";
import { formatCurrency } from "@/utils/format-currency";

type CheckoutOrderSummaryProps = {
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  deliveryFee: number;
  total: number;
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

export function CheckoutOrderSummary({
  items,
  subtotal,
  discount,
  shipping,
  deliveryFee,
  total,
  couponInput,
  couponError,
  appliedCouponLabel,
  onCouponInputChange,
  onApplyCoupon,
  onRemoveCoupon,
}: CheckoutOrderSummaryProps) {
  return (
    <Card className="border-[rgba(199,164,90,0.15)]">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <ul className="max-h-48 space-y-3 overflow-y-auto">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-border/80">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm font-medium">
                {formatCurrency(item.price * item.quantity, item.currency)}
              </p>
            </li>
          ))}
        </ul>

        <Separator />

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
            label="Shipping"
            value={shipping === 0 ? "Complimentary" : formatCurrency(shipping)}
          />
          {deliveryFee > 0 && (
            <SummaryRow
              label="Delivery Upgrade"
              value={formatCurrency(deliveryFee)}
            />
          )}
        </div>

        <Separator />

        <SummaryRow
          label="Estimated Total"
          value={formatCurrency(total)}
          emphasis
        />
      </CardContent>
    </Card>
  );
}
