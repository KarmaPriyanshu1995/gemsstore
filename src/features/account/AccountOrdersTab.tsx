"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Package } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountOrderDrawer } from "@/features/account/AccountOrderDrawer";
import type { UserOrder, UserOrderStatus } from "@/types/account";
import { formatCurrency } from "@/utils/format-currency";

type AccountOrdersTabProps = {
  orders: UserOrder[];
  hydrated: boolean;
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

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

export function AccountOrdersTab({ orders, hydrated }: AccountOrdersTabProps) {
  const [selectedOrder, setSelectedOrder] = useState<UserOrder | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openOrder = (order: UserOrder) => {
    setSelectedOrder(order);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  if (!hydrated) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div>
        <h2 className="font-heading text-xl font-semibold">Order History</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          View details, reorder items, or track your heritage purchases.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-lg border border-dashed border-[rgba(199,164,90,0.3)] px-6 py-12 text-center">
          <Package
            className="mx-auto h-10 w-10 text-muted-foreground/60"
            aria-hidden
          />
          <p className="mt-4 font-heading text-lg font-medium">No orders yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Your completed purchases will appear here.
          </p>
          <Button variant="heritage" className="mt-6" asChild>
            <Link href="/products">Browse Collection</Link>
          </Button>
        </div>
      ) : (
        <ul className="space-y-3" aria-label="Order history">
          {orders.map((order) => (
            <li key={order.id}>
              <button
                type="button"
                onClick={() => openOrder(order)}
                className="flex w-full items-center gap-4 rounded-lg border border-[rgba(199,164,90,0.15)] bg-card p-4 text-left transition-colors hover:border-primary/30 hover:bg-secondary/20"
              >
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary/50 sm:flex">
                  <Package className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-sm font-medium">
                      {order.orderNumber}
                    </span>
                    <Badge variant={statusVariant[order.status]} className="capitalize">
                      {order.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatDate(order.paidAt)}
                    {order.shippingSummary && ` · ${order.shippingSummary}`}
                    {order.itemCount > 0 &&
                      ` · ${order.itemCount} ${order.itemCount === 1 ? "item" : "items"}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="font-heading font-semibold text-primary">
                    {formatCurrency(order.total, order.currency)}
                  </span>
                  <ChevronRight
                    className="h-4 w-4 text-muted-foreground"
                    aria-hidden
                  />
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      <AccountOrderDrawer
        order={selectedOrder}
        open={drawerOpen}
        onClose={closeDrawer}
      />
    </>
  );
}
