"use client";

import type { LucideIcon } from "lucide-react";
import { Calendar, CreditCard, MapPin, Package, Truck } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { deliveryOptions } from "@/features/checkout/checkout.config";
import {
  formatOrderDate,
  paymentMethodLabels,
} from "@/features/order-success/order-success.config";
import type { OrderSession } from "@/types/payment";
import { formatCurrency } from "@/utils/format-currency";

type OrderSuccessSummaryProps = {
  order: OrderSession;
};

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
      <div>
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

function SummaryLine({
  label,
  value,
  emphasis,
}: {
  label: string;
  value: string;
  emphasis?: boolean;
}) {
  return (
    <div className="flex justify-between text-sm">
      <span className={emphasis ? "font-medium" : "text-muted-foreground"}>
        {label}
      </span>
      <span className={emphasis ? "font-heading font-semibold text-primary" : ""}>
        {value}
      </span>
    </div>
  );
}

export function OrderSuccessSummary({ order }: OrderSuccessSummaryProps) {
  const { checkout } = order;
  const shipping = checkout.form.shipping;
  const deliveryLabel =
    deliveryOptions.find((o) => o.id === checkout.form.delivery.method)
      ?.label ?? checkout.form.delivery.method;

  const address = [
    shipping.line1,
    shipping.line2,
    `${shipping.city}, ${shipping.state} ${shipping.postalCode}`,
    shipping.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <Card className="border-[rgba(199,164,90,0.15)]">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <DetailRow
            icon={Calendar}
            label="Order Placed"
            value={formatOrderDate(order.paidAt)}
          />
          <DetailRow
            icon={Truck}
            label="Estimated Delivery"
            value={order.estimatedDelivery}
          />
          <DetailRow
            icon={CreditCard}
            label="Payment"
            value={paymentMethodLabels[order.paymentMethod]}
          />
          <DetailRow
            icon={Package}
            label="Items"
            value={`${order.itemCount} ${
              order.itemCount === 1 ? "treasure" : "treasures"
            }`}
          />
          <DetailRow icon={MapPin} label="Shipping To" value={address} />
          <DetailRow icon={Truck} label="Delivery Method" value={deliveryLabel} />
        </div>

        <Separator />

        <div className="space-y-2">
          <SummaryLine
            label="Subtotal"
            value={formatCurrency(checkout.subtotal)}
          />
          {checkout.discount > 0 && (
            <SummaryLine
              label="Heritage Discount"
              value={`−${formatCurrency(checkout.discount)}`}
            />
          )}
          <SummaryLine
            label="Shipping"
            value={
              checkout.shipping === 0
                ? "Complimentary"
                : formatCurrency(checkout.shipping)
            }
          />
          {checkout.deliveryFee > 0 && (
            <SummaryLine
              label="Delivery Upgrade"
              value={formatCurrency(checkout.deliveryFee)}
            />
          )}
          <Separator className="my-3" />
          <SummaryLine
            label="Total Paid"
            value={formatCurrency(order.total)}
            emphasis
          />
        </div>
      </CardContent>
    </Card>
  );
}
