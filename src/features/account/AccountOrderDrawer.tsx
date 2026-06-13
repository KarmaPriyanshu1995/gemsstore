"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Eye, RotateCcw, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/features/cart";
import { cn } from "@/lib/utils";
import { toast } from "@/lib/toast";
import { getProductBySlug } from "@/services/products.service";
import type { UserOrder, UserOrderStatus } from "@/types/account";
import { formatCurrency } from "@/utils/format-currency";

type AccountOrderDrawerProps = {
  order: UserOrder | null;
  open: boolean;
  onClose: () => void;
};

const statusVariant: Record<
  UserOrderStatus,
  "default" | "secondary" | "accent" | "outline" | "destructive"
> = {
  processing: "secondary",
  shipped: "accent",
  delivered: "default",
  cancelled: "destructive",
};

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function AccountOrderDrawer({
  order,
  open,
  onClose,
}: AccountOrderDrawerProps) {
  const { addItem } = useCart();
  const [reordering, setReordering] = useState(false);

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

  const handleReorder = async () => {
    if (!order || order.items.length === 0) {
      toast.error("Item details are not available for this order");
      return;
    }

    setReordering(true);
    let added = 0;

    try {
      for (const item of order.items) {
        const { data: product } = await getProductBySlug(item.slug);
        if (!product) continue;
        if (!product.inStock) {
          toast.error(`${product.name} is currently sold out`);
          continue;
        }
        for (let i = 0; i < item.quantity; i++) {
          addItem(product);
        }
        added += item.quantity;
      }

      if (added > 0) {
        toast.success(`${added} ${added === 1 ? "item" : "items"} added to cart`);
      } else {
        toast.error("No items could be added to cart");
      }
    } finally {
      setReordering(false);
    }
  };

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
        aria-label={`Order details for ${order.orderNumber}`}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[rgba(199,164,90,0.15)] bg-background shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-[rgba(199,164,90,0.15)] px-6 py-4">
          <div>
            <p className="font-mono text-xs text-muted-foreground">
              {order.orderNumber}
            </p>
            <h2 className="font-heading text-xl font-semibold">Order Details</h2>
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

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant={statusVariant[order.status]} className="capitalize">
              {order.status}
            </Badge>
            <time
              className="text-sm text-muted-foreground"
              dateTime={order.paidAt}
            >
              {formatDateTime(order.paidAt)}
            </time>
          </div>

          <p className="mt-4 font-heading text-2xl font-semibold text-primary">
            {formatCurrency(order.total, order.currency)}
          </p>

          <dl className="mt-4 grid gap-2 text-sm">
            {order.paymentMethod && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Payment</dt>
                <dd className="font-medium">{order.paymentMethod}</dd>
              </div>
            )}
            {order.shippingSummary && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Shipped to</dt>
                <dd className="font-medium">{order.shippingSummary}</dd>
              </div>
            )}
            {order.estimatedDelivery && (
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Delivery</dt>
                <dd className="font-medium">{order.estimatedDelivery}</dd>
              </div>
            )}
          </dl>

          <Separator className="my-6" />

          <section aria-label="Order items">
            <h3 className="font-heading text-sm font-semibold">Products</h3>
            {order.items.length === 0 ? (
              <p className="mt-3 text-sm text-muted-foreground">
                Line-item details are not stored for this order. Contact
                concierge with your order number for assistance.
              </p>
            ) : (
              <ul className="mt-4 space-y-3">
                {order.items.map((item) => (
                  <li
                    key={item.slug}
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
                        Qty {item.quantity}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <p className="font-medium">
                        {formatCurrency(item.price * item.quantity, item.currency)}
                      </p>
                      <Button variant="ghost" size="sm" className="h-7 px-2" asChild>
                        <Link href={`/products/${item.slug}`}>
                          <Eye className="h-3.5 w-3.5" />
                          View
                        </Link>
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[rgba(199,164,90,0.15)] px-6 py-4">
          <Button
            variant="heritage"
            onClick={handleReorder}
            disabled={reordering || order.items.length === 0}
          >
            <RotateCcw className="h-4 w-4" />
            {reordering ? "Adding…" : "Reorder"}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </aside>
    </>
  );
}
