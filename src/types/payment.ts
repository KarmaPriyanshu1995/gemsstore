import type { CheckoutSession } from "@/types/checkout";

export type PaymentMethod =
  | "upi"
  | "credit-card"
  | "debit-card"
  | "net-banking"
  | "wallet";

export type PaymentFormData = {
  upiId: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  bank: string;
  wallet: string;
};

export type OrderSession = {
  orderNumber: string;
  paymentMethod: PaymentMethod;
  total: number;
  itemCount: number;
  shippingName: string;
  email: string;
  estimatedDelivery: string;
  paidAt: string;
  checkout: CheckoutSession;
};
