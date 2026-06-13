"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  netBankingOptions,
  walletOptions,
} from "@/features/payment/payment.config";
import type { PaymentFormData, PaymentMethod } from "@/types/payment";

type PaymentMethodFormProps = {
  method: PaymentMethod;
  form: PaymentFormData;
  errors: Record<string, string>;
  onChange: (patch: Partial<PaymentFormData>) => void;
};

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-destructive">{message}</p>;
}

export function PaymentMethodForm({
  method,
  form,
  errors,
  onChange,
}: PaymentMethodFormProps) {
  if (method === "upi") {
    return (
      <div className="space-y-2">
        <Label htmlFor="upi-id">UPI ID</Label>
        <Input
          id="upi-id"
          placeholder="yourname@bank"
          value={form.upiId}
          onChange={(e) => onChange({ upiId: e.target.value })}
        />
        <FieldError message={errors.upiId} />
      </div>
    );
  }

  if (method === "credit-card" || method === "debit-card") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input
            id="card-number"
            placeholder="1234 5678 9012 3456"
            value={form.cardNumber}
            onChange={(e) => onChange({ cardNumber: e.target.value })}
            autoComplete="cc-number"
          />
          <FieldError message={errors.cardNumber} />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="card-name">Name on Card</Label>
          <Input
            id="card-name"
            value={form.cardName}
            onChange={(e) => onChange({ cardName: e.target.value })}
            autoComplete="cc-name"
          />
          <FieldError message={errors.cardName} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="card-expiry">Expiry (MM/YY)</Label>
          <Input
            id="card-expiry"
            placeholder="MM/YY"
            value={form.cardExpiry}
            onChange={(e) => onChange({ cardExpiry: e.target.value })}
            autoComplete="cc-exp"
          />
          <FieldError message={errors.cardExpiry} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="card-cvv">CVV</Label>
          <Input
            id="card-cvv"
            placeholder="123"
            value={form.cardCvv}
            onChange={(e) => onChange({ cardCvv: e.target.value })}
            autoComplete="cc-csc"
          />
          <FieldError message={errors.cardCvv} />
        </div>
      </div>
    );
  }

  if (method === "net-banking") {
    return (
      <div className="space-y-2">
        <Label htmlFor="bank-select">Select Bank</Label>
        <Select value={form.bank} onValueChange={(value) => onChange({ bank: value })}>
          <SelectTrigger id="bank-select">
            <SelectValue placeholder="Choose your bank" />
          </SelectTrigger>
          <SelectContent>
            {netBankingOptions.map((bank) => (
              <SelectItem key={bank} value={bank}>
                {bank}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={errors.bank} />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="wallet-select">Select Wallet</Label>
      <Select
        value={form.wallet}
        onValueChange={(value) => onChange({ wallet: value })}
      >
        <SelectTrigger id="wallet-select">
          <SelectValue placeholder="Choose wallet provider" />
        </SelectTrigger>
        <SelectContent>
          {walletOptions.map((wallet) => (
            <SelectItem key={wallet} value={wallet}>
              {wallet}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <FieldError message={errors.wallet} />
    </div>
  );
}
