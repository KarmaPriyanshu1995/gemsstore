"use client";

import { useEffect, useState } from "react";

import { orderSessionKey } from "@/features/payment/payment.config";
import type { OrderSession } from "@/types/payment";

export function useOrderSession() {
  const [order, setOrder] = useState<OrderSession | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(orderSessionKey);
      if (!raw) {
        setOrder(null);
      } else {
        setOrder(JSON.parse(raw) as OrderSession);
      }
    } catch {
      setOrder(null);
    }
    setLoaded(true);
  }, []);

  return { order, loaded };
}
