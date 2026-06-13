"use client";

import { cn } from "@/lib/utils";
import { paymentMethods } from "@/features/payment/payment.config";
import type { PaymentMethod } from "@/types/payment";

type PaymentMethodSelectorProps = {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
};

export function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <fieldset className="space-y-3">
      <legend className="font-heading text-lg font-semibold">
        Payment Method
      </legend>
      {paymentMethods.map((option) => {
        const Icon = option.icon;
        return (
          <label
            key={option.id}
            className={cn(
              "flex cursor-pointer gap-4 rounded-lg border p-4 transition-colors",
              selected === option.id
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/40",
            )}
          >
            <input
              type="radio"
              name="payment-method"
              value={option.id}
              checked={selected === option.id}
              onChange={() => onSelect(option.id)}
              className="mt-1 accent-primary"
            />
            <Icon
              className="mt-0.5 h-5 w-5 shrink-0 text-accent"
              aria-hidden
            />
            <span className="flex-1">
              <span className="font-medium">{option.label}</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {option.description}
              </span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
