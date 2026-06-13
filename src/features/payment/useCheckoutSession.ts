"use client";

import { useEffect, useState } from "react";

import { checkoutSessionKey } from "@/features/checkout/checkout.config";
import type { CheckoutSession } from "@/types/checkout";

export function useCheckoutSession() {
  const [session, setSession] = useState<CheckoutSession | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(checkoutSessionKey);
      if (!raw) {
        setSession(null);
      } else {
        setSession(JSON.parse(raw) as CheckoutSession);
      }
    } catch {
      setSession(null);
    }
    setLoaded(true);
  }, []);

  return { session, loaded };
}
