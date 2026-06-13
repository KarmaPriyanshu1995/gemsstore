"use client";

import Image from "next/image";
import Link from "next/link";
import { Pencil, Tag, UserX, X } from "lucide-react";
import { useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { AdminCustomer } from "@/types/admin-customer";
import { formatCurrency } from "@/utils/format-currency";

type CustomerProfileDrawerProps = {
  customer: AdminCustomer | null;
  open: boolean;
  onClose: () => void;
  onEdit: (id: string) => void;
  onTag: (id: string) => void;
  onDeactivate: (id: string) => void;
};

const statusVariant: Record<
  AdminCustomer["status"],
  "default" | "accent" | "outline"
> = {
  active: "default",
  vip: "accent",
  inactive: "outline",
};

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function formatDateTime(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function CustomerProfileDrawer({
  customer,
  open,
  onClose,
  onEdit,
  onTag,
  onDeactivate,
}: CustomerProfileDrawerProps) {
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

  if (!customer) return null;

  return (
    <>
      {open && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-walnut/30 backdrop-blur-sm"
          onClick={onClose}
          aria-label="Close customer profile"
        />
      )}

      <aside
        aria-label={`Profile for ${customer.name}`}
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-lg flex-col border-l border-[rgba(199,164,90,0.15)] bg-white shadow-2xl transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-start justify-between border-b border-[rgba(199,164,90,0.15)] px-6 py-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusVariant[customer.status]} className="uppercase">
                {customer.status}
              </Badge>
              {customer.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="mt-2 font-heading text-xl font-semibold">
              {customer.name}
            </h2>
            <p className="text-sm text-muted-foreground">{customer.email}</p>
            <p className="text-sm text-muted-foreground">{customer.phone}</p>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-lg border border-[rgba(199,164,90,0.15)] bg-ivory/30 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Total Spend
              </p>
              <p className="mt-1 font-heading text-2xl font-semibold text-primary">
                {formatCurrency(customer.totalSpend, customer.currency)}
              </p>
            </div>
            <div className="rounded-lg border border-[rgba(199,164,90,0.15)] bg-ivory/30 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Orders
              </p>
              <p className="mt-1 font-heading text-2xl font-semibold">
                {customer.ordersCount}
              </p>
            </div>
          </div>

          {customer.notes && (
            <p className="mt-4 rounded-md bg-ivory/60 px-3 py-2 text-sm text-muted-foreground">
              {customer.notes}
            </p>
          )}

          <p className="mt-3 text-xs text-muted-foreground">
            Member since {formatDate(customer.joinedAt)}
          </p>

          <Separator className="my-6" />

          <section aria-label="Addresses">
            <h3 className="font-heading text-sm font-semibold">Addresses</h3>
            <ul className="mt-3 space-y-3">
              {customer.addresses.map((address) => (
                <li
                  key={address.id}
                  className="rounded-lg border border-[rgba(199,164,90,0.15)] p-3 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{address.label}</span>
                    {address.isDefault && (
                      <Badge variant="outline" className="text-[10px]">
                        Default
                      </Badge>
                    )}
                  </div>
                  <address className="mt-1 not-italic text-muted-foreground">
                    <p>{address.line1}</p>
                    {address.line2 && <p>{address.line2}</p>}
                    <p>
                      {address.city}, {address.state} {address.postalCode}
                    </p>
                  </address>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="my-6" />

          <section aria-label="Order history">
            <h3 className="font-heading text-sm font-semibold">Orders</h3>
            <ul className="mt-3 space-y-2">
              {customer.orders.map((order) => (
                <li
                  key={order.id}
                  className="flex items-center justify-between rounded-lg border border-[rgba(199,164,90,0.15)] px-3 py-2 text-sm"
                >
                  <div>
                    <Link
                      href="/admin/orders"
                      className="font-mono text-xs font-medium text-primary hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                    <p className="text-xs capitalize text-muted-foreground">
                      {order.status} · {formatDate(order.date)}
                    </p>
                  </div>
                  <span className="font-medium">
                    {formatCurrency(order.amount)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <Separator className="my-6" />

          <section aria-label="Wishlist">
            <h3 className="font-heading text-sm font-semibold">Wishlist</h3>
            {customer.wishlist.length === 0 ? (
              <p className="mt-2 text-sm text-muted-foreground">
                No saved items
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {customer.wishlist.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-3 rounded-lg border border-[rgba(199,164,90,0.15)] p-3"
                  >
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-secondary/30">
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">
                        {item.productName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Added {formatDate(item.addedAt)}
                      </p>
                    </div>
                    <span className="text-sm font-medium">
                      {formatCurrency(item.price)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <Separator className="my-6" />

          <section aria-label="Activity timeline">
            <h3 className="font-heading text-sm font-semibold">Activity</h3>
            <ol className="mt-4 space-y-4">
              {customer.activity.map((event, index) => (
                <li key={event.id} className="relative pl-6">
                  {index < customer.activity.length - 1 && (
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
        </div>

        <div className="flex flex-wrap gap-2 border-t border-[rgba(199,164,90,0.15)] px-6 py-4">
          <Button variant="heritage" onClick={() => onEdit(customer.id)}>
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" onClick={() => onTag(customer.id)}>
            <Tag className="h-4 w-4" />
            Tags
          </Button>
          <Button
            variant="outline"
            disabled={customer.status === "inactive"}
            onClick={() => onDeactivate(customer.id)}
          >
            <UserX className="h-4 w-4" />
            Deactivate
          </Button>
        </div>
      </aside>
    </>
  );
}
