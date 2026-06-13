import { paymentMethodLabels } from "@/features/order-success/order-success.config";
import type { OrderSession } from "@/types/payment";
import type { UserOrder } from "@/types/account";

export const orderHistoryKey = "realgems-order-history";

function formatAddressSummary(session: OrderSession): string {
  const { shipping } = session.checkout.form;
  return `${shipping.city}, ${shipping.state}`;
}

export function orderSessionToUserOrder(session: OrderSession): UserOrder {
  return {
    id: session.orderNumber,
    orderNumber: session.orderNumber,
    total: session.total,
    currency: "INR",
    status: "processing",
    itemCount: session.itemCount,
    items: [],
    paidAt: session.paidAt,
    estimatedDelivery: session.estimatedDelivery,
    paymentMethod: paymentMethodLabels[session.paymentMethod],
    shippingSummary: formatAddressSummary(session),
  };
}

export function readOrderHistory(): OrderSession[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(orderHistoryKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as OrderSession[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function appendOrderHistory(session: OrderSession) {
  if (typeof window === "undefined") return;

  const existing = readOrderHistory().filter(
    (entry) => entry.orderNumber !== session.orderNumber,
  );

  window.localStorage.setItem(
    orderHistoryKey,
    JSON.stringify([session, ...existing]),
  );
}

export function mergeOrders(
  mockOrders: UserOrder[],
  localSessions: OrderSession[],
): UserOrder[] {
  const localOrders = localSessions.map(orderSessionToUserOrder);
  const orderNumbers = new Set(localOrders.map((order) => order.orderNumber));

  const merged = [
    ...localOrders,
    ...mockOrders.filter((order) => !orderNumbers.has(order.orderNumber)),
  ];

  return merged.sort(
    (a, b) => new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime(),
  );
}
