import type { PaymentMethod } from "@/types/payment";

export const paymentMethodLabels: Record<PaymentMethod, string> = {
  upi: "UPI",
  "credit-card": "Credit Card",
  "debit-card": "Debit Card",
  "net-banking": "Net Banking",
  wallet: "Digital Wallet",
};

export function formatOrderDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}
