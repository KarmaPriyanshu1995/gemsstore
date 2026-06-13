import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";

import type { CheckoutSession } from "@/types/checkout";
import type { PaymentFormData, PaymentMethod } from "@/types/payment";

export const orderSessionKey = "realgems-order-session";

export const paymentMethods: Array<{
  id: PaymentMethod;
  label: string;
  description: string;
  icon: LucideIcon;
}> = [
  {
    id: "upi",
    label: "UPI",
    description: "Pay instantly via Google Pay, PhonePe, or Paytm",
    icon: Smartphone,
  },
  {
    id: "credit-card",
    label: "Credit Card",
    description: "Visa, Mastercard, Amex — secure heritage checkout",
    icon: CreditCard,
  },
  {
    id: "debit-card",
    label: "Debit Card",
    description: "Domestic debit cards with insured transaction",
    icon: CreditCard,
  },
  {
    id: "net-banking",
    label: "Net Banking",
    description: "All major Indian banks supported",
    icon: Building2,
  },
  {
    id: "wallet",
    label: "Wallets",
    description: "Paytm, Amazon Pay, and Mobikwik",
    icon: Wallet,
  },
];

export const netBankingOptions = [
  "HDFC Bank",
  "ICICI Bank",
  "State Bank of India",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Punjab National Bank",
];

export const walletOptions = [
  "Paytm",
  "Amazon Pay",
  "Mobikwik",
  "PhonePe Wallet",
];

export const securityBadges = [
  { label: "256-bit SSL Encryption", icon: "lock" as const },
  { label: "PCI DSS Compliant", icon: "shield" as const },
  { label: "Insured Transactions", icon: "badge" as const },
];

export function generateOrderNumber(): string {
  const suffix = Date.now().toString(36).toUpperCase().slice(-8);
  return `RG-${suffix}`;
}

export function getEstimatedDelivery(
  method: CheckoutSession["form"]["delivery"]["method"],
): string {
  const days =
    method === "white-glove" ? 10 : method === "express" ? 5 : 7;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export const emptyPaymentForm = (): PaymentFormData => ({
  upiId: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvv: "",
  bank: "",
  wallet: "",
});
