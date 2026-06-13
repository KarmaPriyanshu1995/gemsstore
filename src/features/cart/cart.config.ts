export type CartCoupon = {
  code: string;
  label: string;
  type: "percent" | "flat";
  value: number;
};

export const cartConfig = {
  freeShippingThreshold: 200_000,
  standardShipping: 2_500,
  maxQuantity: 10,
} as const;

export const cartCoupons: CartCoupon[] = [
  {
    code: "HERITAGE10",
    label: "10% Heritage Discount",
    type: "percent",
    value: 10,
  },
  {
    code: "MAHARAJA500",
    label: "₹500 Maharaja Reward",
    type: "flat",
    value: 500,
  },
];

export function findCartCoupon(code: string): CartCoupon | undefined {
  const normalized = code.trim().toUpperCase();
  return cartCoupons.find((coupon) => coupon.code === normalized);
}

export function calculateDiscount(
  subtotal: number,
  coupon: CartCoupon | null,
): number {
  if (!coupon || subtotal <= 0) return 0;

  if (coupon.type === "percent") {
    return Math.round((subtotal * coupon.value) / 100);
  }

  return Math.min(coupon.value, subtotal);
}

export function calculateShipping(subtotal: number): number {
  if (subtotal <= 0) return 0;
  if (subtotal >= cartConfig.freeShippingThreshold) return 0;
  return cartConfig.standardShipping;
}
