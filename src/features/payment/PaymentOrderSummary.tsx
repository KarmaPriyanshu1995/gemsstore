"use client";

import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/features/cart/types";
import type { CheckoutSession } from "@/types/checkout";
import { formatCurrency } from "@/utils/format-currency";

type PaymentOrderSummaryProps = {
  items: CartItem[];
  session: CheckoutSession;
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

export function PaymentOrderSummary({
  items,
  session,
}: PaymentOrderSummaryProps) {
  return (
    <Card className="border-[rgba(199,164,90,0.15)]">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Order Summary</CardTitle>
        <p className="text-sm text-muted-foreground">
          Delivering to {session.form.shipping.fullName}
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <ul className="max-h-40 space-y-3 overflow-y-auto">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border/80">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  Qty {item.quantity}
                </p>
              </div>
              <p className="text-sm">
                {formatCurrency(item.price * item.quantity, item.currency)}
              </p>
            </li>
          ))}
        </ul>

        <Separator />

        <div className="space-y-3">
          <SummaryRow
            label="Subtotal"
            value={formatCurrency(session.subtotal)}
          />
          {session.discount > 0 && (
            <SummaryRow
              label="Discount"
              value={`−${formatCurrency(session.discount)}`}
            />
          )}
          <SummaryRow
            label="Shipping"
            value={
              session.shipping === 0
                ? "Complimentary"
                : formatCurrency(session.shipping)
            }
          />
          {session.deliveryFee > 0 && (
            <SummaryRow
              label="Delivery Upgrade"
              value={formatCurrency(session.deliveryFee)}
            />
          )}
        </div>

        <Separator />

        <SummaryRow
          label="Total Due"
          value={formatCurrency(session.total)}
          emphasis
        />
      </CardContent>
    </Card>
  );
}
