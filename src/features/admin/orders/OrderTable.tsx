"use client";

import {
  Eye,
  MoreHorizontal,
  Printer,
  RefreshCw,
  RotateCcw,
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
import type { AdminOrder } from "@/types/admin-order";
import { formatCurrency } from "@/utils/format-currency";

type OrderTableProps = {
  orders: AdminOrder[];
  onView: (id: string) => void;
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

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}

function RowActions({
  order,
  onView,
  onUpdateStatus,
  onPrint,
  onRefund,
}: {
  order: AdminOrder;
  onView: (id: string) => void;
  onUpdateStatus: (id: string) => void;
  onPrint: (order: AdminOrder) => void;
  onRefund: (order: AdminOrder) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden items-center gap-1 md:flex">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onView(order.id)}
          aria-label={`View order ${order.orderNumber}`}
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onUpdateStatus(order.id)}
          aria-label={`Update status for ${order.orderNumber}`}
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onPrint(order)}
          aria-label={`Print order ${order.orderNumber}`}
        >
          <Printer className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => onRefund(order)}
          aria-label={`Refund order ${order.orderNumber}`}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 md:hidden"
        onClick={() => setOpen(true)}
        aria-label={`Actions for ${order.orderNumber}`}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>{order.orderNumber}</DialogTitle>
            <DialogDescription>{order.customerName}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Button variant="outline" onClick={() => { onView(order.id); setOpen(false); }}>
              View
            </Button>
            <Button variant="outline" onClick={() => { onUpdateStatus(order.id); setOpen(false); }}>
              Update Status
            </Button>
            <Button variant="outline" onClick={() => { onPrint(order); setOpen(false); }}>
              Print
            </Button>
            <Button variant="outline" onClick={() => { onRefund(order); setOpen(false); }}>
              Refund
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function OrderTable({
  orders,
  onView,
  onUpdateStatus,
  onPrint,
  onRefund,
}: OrderTableProps) {
  return (
    <AdminCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[880px] text-left text-sm">
          <thead>
            <tr className="border-b border-[rgba(199,164,90,0.15)] bg-ivory/40 text-muted-foreground">
              <th className="px-4 py-3 font-medium" scope="col">
                Order ID
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Customer
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Date
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Amount
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Status
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Payment
              </th>
              <th className="px-4 py-3 font-medium" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-[rgba(199,164,90,0.08)] last:border-0"
              >
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => onView(order.id)}
                    className="font-mono text-xs font-medium text-primary hover:underline"
                  >
                    {order.orderNumber}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.customerEmail}
                  </p>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {formatDate(order.createdAt)}
                </td>
                <td className="px-4 py-3 font-medium">
                  {formatCurrency(order.amount, order.currency)}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={statusVariant[order.status]}>
                    {order.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 capitalize text-muted-foreground">
                  {order.paymentStatus}
                </td>
                <td className="px-4 py-3">
                  <RowActions
                    order={order}
                    onView={onView}
                    onUpdateStatus={onUpdateStatus}
                    onPrint={onPrint}
                    onRefund={onRefund}
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
