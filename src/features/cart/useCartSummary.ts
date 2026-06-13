"use client";

import { useCallback, useMemo, useState } from "react";

import {
  calculateDiscount,
  calculateShipping,
  cartConfig,
  findCartCoupon,
  type CartCoupon,
} from "@/features/cart/cart.config";

export function useCartSummary(subtotal: number) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<CartCoupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);

  const discount = useMemo(
    () => calculateDiscount(subtotal, appliedCoupon),
    [subtotal, appliedCoupon],
  );

  const shipping = useMemo(() => calculateShipping(subtotal), [subtotal]);

  const total = useMemo(
    () => Math.max(0, subtotal - discount + shipping),
    [subtotal, discount, shipping],
  );

  const applyCoupon = useCallback(() => {
    const coupon = findCartCoupon(couponInput);

    if (!coupon) {
      setCouponError("This code is not valid for your heritage collection.");
      setAppliedCoupon(null);
      return false;
    }

    setAppliedCoupon(coupon);
    setCouponError(null);
    return true;
  }, [couponInput]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponError(null);
  }, []);

  const qualifiesForFreeShipping =
    subtotal > 0 && subtotal >= cartConfig.freeShippingThreshold;

  return {
    couponInput,
    setCouponInput,
    appliedCoupon,
    couponError,
    discount,
    shipping,
    total,
    applyCoupon,
    removeCoupon,
    qualifiesForFreeShipping,
  };
}
