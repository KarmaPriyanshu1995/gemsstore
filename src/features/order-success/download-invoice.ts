import type { OrderSession } from "@/types/payment";
import { formatCurrency } from "@/utils/format-currency";

import { formatOrderDate, paymentMethodLabels } from "./order-success.config";

export function buildInvoiceText(order: OrderSession): string {
  const { checkout } = order;
  const shipping = checkout.form.shipping;
  const delivery = checkout.form.delivery;

  const lines = [
    "═══════════════════════════════════════",
    "         REALGEMSSTORE — INVOICE",
    "         Maharaja Heritage Collection",
    "═══════════════════════════════════════",
    "",
    `Order Number:    ${order.orderNumber}`,
    `Date:            ${formatOrderDate(order.paidAt)}`,
    `Payment Method:  ${paymentMethodLabels[order.paymentMethod]}`,
    "",
    "── SHIPPING ────────────────────────────",
    shipping.fullName,
    shipping.line1,
    shipping.line2 || undefined,
    `${shipping.city}, ${shipping.state} ${shipping.postalCode}`,
    shipping.country,
    `Email: ${shipping.email}`,
    `Phone: ${shipping.phone}`,
    "",
    "── DELIVERY ────────────────────────────",
    `Method: ${delivery.method}`,
    delivery.instructions
      ? `Notes: ${delivery.instructions}`
      : undefined,
    `Estimated Arrival: ${order.estimatedDelivery}`,
    "",
    "── ORDER SUMMARY ───────────────────────",
    `Items:           ${order.itemCount}`,
    `Subtotal:        ${formatCurrency(checkout.subtotal)}`,
    checkout.discount > 0
      ? `Discount:        −${formatCurrency(checkout.discount)}`
      : undefined,
    `Shipping:        ${
      checkout.shipping === 0
        ? "Complimentary"
        : formatCurrency(checkout.shipping)
    }`,
    checkout.deliveryFee > 0
      ? `Delivery Upgrade: ${formatCurrency(checkout.deliveryFee)}`
      : undefined,
    `TOTAL PAID:      ${formatCurrency(order.total)}`,
    "",
    "Thank you for choosing RealGemsStore.",
    "Certified gemstones. Maharaja heritage.",
    "",
  ].filter(Boolean);

  return lines.join("\n");
}

export function downloadInvoice(order: OrderSession) {
  const content = buildInvoiceText(order);
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${order.orderNumber}-invoice.txt`;
  anchor.click();
  URL.revokeObjectURL(url);
}
