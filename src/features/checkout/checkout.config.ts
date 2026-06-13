import type { CheckoutStep } from "@/features/checkout/checkout.types";

export const checkoutSteps = [
  { id: "shipping" as const, label: "Shipping", number: 1 },
  { id: "billing" as const, label: "Billing", number: 2 },
  { id: "delivery" as const, label: "Delivery", number: 3 },
] satisfies Array<{ id: CheckoutStep; label: string; number: number }>;

export const checkoutProgressSteps = [
  { id: "cart", label: "Cart", href: "/cart" },
  { id: "checkout", label: "Checkout", href: "/checkout" },
  { id: "payment", label: "Payment", href: "/payment" },
  { id: "success", label: "Success", href: "/order-success" },
] as const;

export const deliveryOptions = [
  {
    id: "standard" as const,
    label: "Heritage Standard",
    description: "Insured delivery in 5–7 business days",
    extraFee: 0,
  },
  {
    id: "express" as const,
    label: "Maharaja Express",
    description: "Priority handling in 2–3 business days",
    extraFee: 1_500,
  },
  {
    id: "white-glove" as const,
    label: "White Glove Concierge",
    description: "Scheduled hand delivery with gemologist briefing",
    extraFee: 5_000,
  },
];

export const checkoutSessionKey = "realgems-checkout-session";

export function getDeliveryExtraFee(
  method: (typeof deliveryOptions)[number]["id"],
): number {
  return deliveryOptions.find((option) => option.id === method)?.extraFee ?? 0;
}
