"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressFields } from "@/features/checkout/AddressFields";
import type { CheckoutAddress } from "@/types/checkout";

type CheckoutShippingFormProps = {
  shipping: CheckoutAddress;
  errors: Record<string, string>;
  onChange: (patch: Partial<CheckoutAddress>) => void;
};

export function CheckoutShippingForm({
  shipping,
  errors,
  onChange,
}: CheckoutShippingFormProps) {
  return (
    <Card className="border-[rgba(199,164,90,0.15)]">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Shipping Details</CardTitle>
        <p className="text-sm text-muted-foreground">
          Where should we deliver your heritage treasures?
        </p>
      </CardHeader>
      <CardContent>
        <AddressFields
          prefix="shipping"
          address={shipping}
          errors={errors}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
}
