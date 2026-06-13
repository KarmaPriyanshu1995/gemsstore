"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { checkoutSessionKey } from "@/features/checkout/checkout.config";
import { appendOrderHistory } from "@/features/account/order-history";
import { useCart } from "@/features/cart";
import {
  generateOrderNumber,
  getEstimatedDelivery,
  orderSessionKey,
} from "@/features/payment/payment.config";
import { validatePaymentForm } from "@/features/payment/payment-validation";
import type { CheckoutSession } from "@/types/checkout";
import type { OrderSession, PaymentFormData, PaymentMethod } from "@/types/payment";

import { emptyPaymentForm } from "./payment.config";

export function usePayment(checkoutSession: CheckoutSession | null) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [method, setMethod] = useState<PaymentMethod>("upi");
  const [form, setForm] = useState<PaymentFormData>(emptyPaymentForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);

  const updateForm = useCallback((patch: Partial<PaymentFormData>) => {
    setForm((current) => ({ ...current, ...patch }));
  }, []);

  const payNow = useCallback(async () => {
    if (!checkoutSession) return false;

    const nextErrors = validatePaymentForm(method, form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return false;

    setProcessing(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    const orderSession: OrderSession = {
      orderNumber: generateOrderNumber(),
      paymentMethod: method,
      total: checkoutSession.total,
      itemCount: checkoutSession.itemCount,
      shippingName: checkoutSession.form.shipping.fullName,
      email: checkoutSession.form.shipping.email,
      estimatedDelivery: getEstimatedDelivery(
        checkoutSession.form.delivery.method,
      ),
      paidAt: new Date().toISOString(),
      checkout: checkoutSession,
    };

    window.sessionStorage.setItem(
      orderSessionKey,
      JSON.stringify(orderSession),
    );
    window.sessionStorage.removeItem(checkoutSessionKey);

    appendOrderHistory(orderSession);

    clearCart();
    router.push("/order-success");
    return true;
  }, [checkoutSession, method, form, clearCart, router]);

  return {
    method,
    setMethod,
    form,
    updateForm,
    errors,
    processing,
    payNow,
  };
}
