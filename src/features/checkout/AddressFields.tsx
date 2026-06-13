"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CheckoutAddress } from "@/types/checkout";

type AddressFieldsProps = {
  prefix: string;
  address: CheckoutAddress;
  errors: Record<string, string>;
  onChange: (patch: Partial<CheckoutAddress>) => void;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-destructive">{message}</p>;
}

export function AddressFields({
  prefix,
  address,
  errors,
  onChange,
}: AddressFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor={`${prefix}-fullName`}>Full Name</Label>
        <Input
          id={`${prefix}-fullName`}
          value={address.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          autoComplete="name"
        />
        <FieldError message={errors[`${prefix}.fullName`]} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${prefix}-email`}>Email</Label>
        <Input
          id={`${prefix}-email`}
          type="email"
          value={address.email}
          onChange={(e) => onChange({ email: e.target.value })}
          autoComplete="email"
        />
        <FieldError message={errors[`${prefix}.email`]} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${prefix}-phone`}>Phone</Label>
        <Input
          id={`${prefix}-phone`}
          type="tel"
          value={address.phone}
          onChange={(e) => onChange({ phone: e.target.value })}
          autoComplete="tel"
        />
        <FieldError message={errors[`${prefix}.phone`]} />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor={`${prefix}-line1`}>Address Line 1</Label>
        <Input
          id={`${prefix}-line1`}
          value={address.line1}
          onChange={(e) => onChange({ line1: e.target.value })}
          autoComplete="address-line1"
        />
        <FieldError message={errors[`${prefix}.line1`]} />
      </div>

      <div className="space-y-2 sm:col-span-2">
        <Label htmlFor={`${prefix}-line2`}>
          Address Line 2 <span className="text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id={`${prefix}-line2`}
          value={address.line2}
          onChange={(e) => onChange({ line2: e.target.value })}
          autoComplete="address-line2"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${prefix}-city`}>City</Label>
        <Input
          id={`${prefix}-city`}
          value={address.city}
          onChange={(e) => onChange({ city: e.target.value })}
          autoComplete="address-level2"
        />
        <FieldError message={errors[`${prefix}.city`]} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${prefix}-state`}>State</Label>
        <Input
          id={`${prefix}-state`}
          value={address.state}
          onChange={(e) => onChange({ state: e.target.value })}
          autoComplete="address-level1"
        />
        <FieldError message={errors[`${prefix}.state`]} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${prefix}-postalCode`}>Postal Code</Label>
        <Input
          id={`${prefix}-postalCode`}
          value={address.postalCode}
          onChange={(e) => onChange({ postalCode: e.target.value })}
          autoComplete="postal-code"
        />
        <FieldError message={errors[`${prefix}.postalCode`]} />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`${prefix}-country`}>Country</Label>
        <Input
          id={`${prefix}-country`}
          value={address.country}
          onChange={(e) => onChange({ country: e.target.value })}
          autoComplete="country-name"
        />
        <FieldError message={errors[`${prefix}.country`]} />
      </div>
    </div>
  );
}
