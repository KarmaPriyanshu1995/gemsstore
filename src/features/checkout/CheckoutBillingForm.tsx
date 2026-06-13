"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AddressFields } from "@/features/checkout/AddressFields";
import type { CheckoutAddress } from "@/types/checkout";

type CheckoutBillingFormProps = {
  billing: CheckoutAddress;
  sameAsShipping: boolean;
  errors: Record<string, string>;
  onChange: (patch: Partial<CheckoutAddress>) => void;
  onSameAsShippingChange: (value: boolean) => void;
};

export function CheckoutBillingForm({
  billing,
  sameAsShipping,
  errors,
  onChange,
  onSameAsShippingChange,
}: CheckoutBillingFormProps) {
  return (
    <Card className="border-[rgba(199,164,90,0.15)]">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Billing Details</CardTitle>
        <p className="text-sm text-muted-foreground">
          Billing address for your invoice and payment records
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-3">
          <Checkbox
            id="same-as-shipping"
            checked={sameAsShipping}
            onCheckedChange={(checked) =>
              onSameAsShippingChange(checked === true)
            }
          />
          <Label htmlFor="same-as-shipping" className="font-normal">
            Same as shipping address
          </Label>
        </div>

        {!sameAsShipping && (
          <AddressFields
            prefix="billing"
            address={billing}
            errors={errors}
            onChange={onChange}
          />
        )}
      </CardContent>
    </Card>
  );
}
