"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { checkoutSteps } from "@/features/checkout/checkout.config";
import {
  emptyCheckoutForm,
  validateCheckoutStep,
} from "@/features/checkout/checkout-validation";
import type { CheckoutStep } from "@/features/checkout/checkout.types";
import type { CheckoutFormData, CheckoutSession } from "@/types/checkout";

import { checkoutSessionKey } from "./checkout.config";

export function useCheckout() {
  const router = useRouter();
  const [step, setStep] = useState<CheckoutStep>("shipping");
  const [form, setForm] = useState<CheckoutFormData>(emptyCheckoutForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentStepIndex = checkoutSteps.findIndex((item) => item.id === step);

  const updateShipping = useCallback(
    (patch: Partial<CheckoutFormData["shipping"]>) => {
      setForm((current) => ({
        ...current,
        shipping: { ...current.shipping, ...patch },
      }));
    },
    [],
  );

  const updateBilling = useCallback(
    (patch: Partial<CheckoutFormData["billing"]>) => {
      setForm((current) => ({
        ...current,
        billing: { ...current.billing, ...patch },
      }));
    },
    [],
  );

  const setSameAsShipping = useCallback((sameAsShipping: boolean) => {
    setForm((current) => ({
      ...current,
      sameAsShipping,
      billing: sameAsShipping ? { ...current.shipping } : current.billing,
    }));
  }, []);

  const updateDelivery = useCallback(
    (patch: Partial<CheckoutFormData["delivery"]>) => {
      setForm((current) => ({
        ...current,
        delivery: { ...current.delivery, ...patch },
      }));
    },
    [],
  );

  const validateCurrentStep = useCallback(() => {
    const nextErrors = validateCheckoutStep(step, form);
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }, [step, form]);

  const goNext = useCallback(() => {
    if (!validateCurrentStep()) return false;

    if (step === "shipping" && form.sameAsShipping) {
      setForm((current) => ({
        ...current,
        billing: { ...current.shipping },
      }));
    }

    const nextStep = checkoutSteps[currentStepIndex + 1];
    if (nextStep) {
      setStep(nextStep.id);
      setErrors({});
      return true;
    }

    return true;
  }, [validateCurrentStep, step, form.sameAsShipping, currentStepIndex]);

  const goBack = useCallback(() => {
    const previousStep = checkoutSteps[currentStepIndex - 1];
    if (previousStep) {
      setStep(previousStep.id);
      setErrors({});
    }
  }, [currentStepIndex]);

  const completeCheckout = useCallback(
    (session: Omit<CheckoutSession, "form" | "completedAt">) => {
      const payload: CheckoutSession = {
        form,
        ...session,
        completedAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          checkoutSessionKey,
          JSON.stringify(payload),
        );
      }

      router.push("/payment");
    },
    [form, router],
  );

  return {
    step,
    form,
    errors,
    currentStepIndex,
    updateShipping,
    updateBilling,
    setSameAsShipping,
    updateDelivery,
    goNext,
    goBack,
    completeCheckout,
    validateCurrentStep,
    setErrors,
  };
}
