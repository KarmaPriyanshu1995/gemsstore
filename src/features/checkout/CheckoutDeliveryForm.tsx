"use client";

import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { deliveryOptions } from "@/features/checkout/checkout.config";
import { cn } from "@/lib/utils";
import type { CheckoutDelivery } from "@/types/checkout";
import { formatCurrency } from "@/utils/format-currency";

type CheckoutDeliveryFormProps = {
  delivery: CheckoutDelivery;
  onChange: (patch: Partial<CheckoutDelivery>) => void;
};

export function CheckoutDeliveryForm({
  delivery,
  onChange,
}: CheckoutDeliveryFormProps) {
  return (
    <Card className="border-[rgba(199,164,90,0.15)]">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Delivery Options</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose how your certified gemstones arrive
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <fieldset className="space-y-3">
          <legend className="sr-only">Delivery method</legend>
          {deliveryOptions.map((option) => (
            <label
              key={option.id}
              className={cn(
                "flex cursor-pointer gap-4 rounded-lg border p-4 transition-colors",
                delivery.method === option.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/40",
              )}
            >
              <input
                type="radio"
                name="delivery-method"
                value={option.id}
                checked={delivery.method === option.id}
                onChange={() => onChange({ method: option.id })}
                className="mt-1 accent-primary"
              />
              <span className="flex-1">
                <span className="font-medium">{option.label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {option.description}
                </span>
                {option.extraFee > 0 && (
                  <span className="mt-1 block text-sm text-primary">
                    +{formatCurrency(option.extraFee)}
                  </span>
                )}
              </span>
            </label>
          ))}
        </fieldset>

        <div className="space-y-2">
          <Label htmlFor="delivery-instructions">
            Special Instructions{" "}
            <span className="text-muted-foreground">(optional)</span>
          </Label>
          <textarea
            id="delivery-instructions"
            rows={3}
            value={delivery.instructions}
            onChange={(e) => onChange({ instructions: e.target.value })}
            placeholder="Gate code, preferred delivery window, or concierge notes..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          />
        </div>
      </CardContent>
    </Card>
  );
}
