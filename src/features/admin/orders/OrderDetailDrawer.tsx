"use client";

import Image from "next/image";
import { Printer, RefreshCw, RotateCcw, X } from "lucide-react";
import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { AdminOrder } from "@/types/admin-order";
import { formatCurrency } from "@/utils/format-currency";

type OrderDetailDrawerProps = {
  order: AdminOrder | null;
  open: boolean;
  onClose: () => void;
  onUpdateStatus: (id: string) => void;
  onPrint: (order: AdminOrder) => void;
  onRefund: (order: AdminOrder) => void;
};

const statusVariant: Record<
  AdminOrder["status"],
  "default" | "secondary" | "accent" | "outline" | "destructive"
> = {
  pending: "outline",
  processing: "secondary",
  shipped: "accent",
  delivered: "default",
  cancelled: "destructive",
};

function AddressBlock({
  title,
  address,
}: {
  title: string;
  address: AdminOrder["shipping"];
}) {
  return (
    <div>
      <h3 className="font-heading text-sm font-semibold">{title}</h3>
      <address className="mt-2 not-italic text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{address.name}</p>
        <p>{address.line1}</p>
        {address.line2 && <p>{address.line2}</p>}
        <p>
          {address.city}, {address.state} {address.postalCode}
        </p>
        <p>{address.country}</p>
        <p className="mt-1">{address.phone}</p>
      </address>
    </div>
  );
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function OrderDetailDrawer({
  order,
  open,
  onClose,
  onUpdateStatus,
  onPrint,
  onRefund,
}: OrderDetailDrawerProps) {
  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!order) return null;

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-walnut/30 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Close order details"
        />
      )}

      <aside
        id="order-detail-drawer"
        aria-label={`Order details for ${order.orderNumber}`}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[rgba(199,164,90,0.15)] bg-white shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[rgba(199,164,90,0.15)] px-6 py-4">
          <div>
            <p className="font-mono text-xs text-muted-foreground">
              {order.orderNumber}
            </p>
            <h2 className="font-heading text-xl font-semibold">
              {order.customerName}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 print:overflow-visible">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={statusVariant[order.status]}>{order.status}</Badge>
            <Badge variant="outline" className="capitalize">
              {order.paymentStatus}
            </Badge>
            <span className="text-sm text-muted-foreground">
              {formatDateTime(order.createdAt)}
            </span>
          </div>

          <p className="mt-4 font-heading text-2xl font-semibold text-primary">
            {formatCurrency(order.amount, order.currency)}
          </p>

          {order.notes && (
            <p className="mt-3 rounded-md bg-ivory/60 px-3 py-2 text-sm text-muted-foreground">
              {order.notes}
            </p>
          )}

          <Separator className="my-6" />

          <section aria-label="Order timeline">
            <h3 className="font-heading text-sm font-semibold">Timeline</h3>
            <ol className="mt-4 space-y-4">
              {order.timeline.map((event, index) => (
                <li key={event.id} className="relative pl-6">
                  {index < order.timeline.length - 1 && (
                    <span
                      className="absolute left-[7px] top-4 h-full w-px bg-border"
                      aria-hidden
                    />
                  )}
                  <span
                    className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-emerald bg-white"
                    aria-hidden
                  />
                  <p className="text-sm font-medium">{event.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {event.description}
                  </p>
                  <time
                    className="text-xs text-muted-foreground"
                    dateTime={event.timestamp}
                  >
                    {formatDateTime(event.timestamp)}
                  </time>
                </li>
              ))}
            </ol>
          </section>

          <Separator className="my-6" />

          <section aria-label="Order items">
            <h3 className="font-heading text-sm font-semibold">Products</h3>
            <ul className="mt-4 space-y-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-lg border border-[rgba(199,164,90,0.15)] p-3"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-secondary/30">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.sku} · Qty {item.quantity}
                    </p>
                  </div>
                  <p className="shrink-0 font-medium">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="my-6" />

          <div className="grid gap-6 sm:grid-cols-2">
            <AddressBlock title="Shipping" address={order.shipping} />
            <AddressBlock title="Billing" address={order.billing} />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[rgba(199,164,90,0.15)] px-6 py-4 print:hidden">
          <Button variant="heritage" onClick={() => onUpdateStatus(order.id)}>
            <RefreshCw className="h-4 w-4" />
            Update Status
          </Button>
          <Button variant="outline" onClick={() => onPrint(order)}>
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button variant="outline" onClick={() => onRefund(order)}>
            <RotateCcw className="h-4 w-4" />
            Refund
          </Button>
        </div>
      </aside>
    </>
  );
}
