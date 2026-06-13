"use client";

import {
  Eye,
  MoreHorizontal,
  Pencil,
  Tag,
  UserX,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AdminCard } from "@/features/admin/layout/admin-card";
import { cn } from "@/lib/utils";
import type { AdminCustomer } from "@/types/admin-customer";
import { formatCurrency } from "@/utils/format-currency";

type CustomerTableProps = {
  customers: AdminCustomer[];
  onView: (id: string) => void;
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

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function RowActions({
  customer,
  onView,
  onEdit,
  onTag,
  onDeactivate,
}: {
  customer: AdminCustomer;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onTag: (id: string) => void;
  onDeactivate: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden items-center gap-1 md:flex">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onView(customer.id)}
          aria-label={`View ${customer.name}`}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onEdit(customer.id)}
          aria-label={`Edit ${customer.name}`}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onTag(customer.id)}
          aria-label={`Tag ${customer.name}`}
        >
          <Tag className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={customer.status === "inactive"}
          onClick={() => onDeactivate(customer.id)}
          aria-label={`Deactivate ${customer.name}`}
        >
          <UserX className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 md:hidden"
        onClick={() => setOpen(true)}
        aria-label={`Actions for ${customer.name}`}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>{customer.name}</DialogTitle>
            <DialogDescription>{customer.email}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Button variant="outline" onClick={() => { onView(customer.id); setOpen(false); }}>
              View
            </Button>
            <Button variant="outline" onClick={() => { onEdit(customer.id); setOpen(false); }}>
              Edit
            </Button>
            <Button variant="outline" onClick={() => { onTag(customer.id); setOpen(false); }}>
              Tag
            </Button>
            <Button
              variant="outline"
              disabled={customer.status === "inactive"}
              onClick={() => { onDeactivate(customer.id); setOpen(false); }}
            >
              Deactivate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function CustomerTable({
  customers,
  onView,
  onEdit,
  onTag,
  onDeactivate,
}: CustomerTableProps) {
  return (
    <AdminCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(199,164,90,0.15)] bg-ivory/40 text-muted-foreground">
              <th className="px-4 py-3 font-medium" scope="col">
                Customer
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Email
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Orders
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Spend
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Status
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Tags
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr
                key={customer.id}
                className="border-b border-[rgba(199,164,90,0.08)] last:border-0"
              >
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onView(customer.id)}
                    className="flex items-center gap-3 text-left hover:opacity-80"
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-sm font-semibold",
                        customer.status === "vip"
                          ? "bg-accent/20 text-accent-foreground"
                          : "bg-emerald/10 text-emerald",
                      )}
                      aria-hidden
                    >
                      {getInitials(customer.name)}
                    </span>
                    <span className="font-medium hover:text-primary hover:underline">
                      {customer.name}
                    </span>
                  </button>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {customer.email}
                </td>
                <td className="px-4 py-3">{customer.ordersCount}</td>
                <td className="px-4 py-3 font-medium">
                  {formatCurrency(customer.totalSpend, customer.currency)}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[customer.status]} className="uppercase">
                    {customer.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex max-w-[180px] flex-wrap gap-1">
                    {customer.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-[10px]">
                        {tag}
                      </Badge>
                    ))}
                    {customer.tags.length > 2 && (
                      <Badge variant="outline" className="text-[10px]">
                        +{customer.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <RowActions
                    customer={customer}
                    onView={onView}
                    onEdit={onEdit}
                    onTag={onTag}
                    onDeactivate={onDeactivate}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminCard>
  );
}
