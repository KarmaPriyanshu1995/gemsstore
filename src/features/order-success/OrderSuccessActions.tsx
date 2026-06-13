"use client";

import Link from "next/link";
import {
  Download,
  PackageSearch,
  ShoppingBag,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { downloadInvoice } from "@/features/order-success/download-invoice";
import { toast } from "@/lib/toast";
import type { OrderSession } from "@/types/payment";

type OrderSuccessActionsProps = {
  order: OrderSession;
};

export function OrderSuccessActions({ order }: OrderSuccessActionsProps) {
  const handleTrackOrder = () => {
    toast.info(
      `Tracking for ${order.orderNumber} will be available in your account soon.`,
    );
  };

  const handleDownloadInvoice = () => {
    downloadInvoice(order);
    toast.success("Invoice downloaded");
  };

  const handleViewOrders = () => {
    toast.info("Order history will be available in your account soon.");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
      <Button variant="heritage" onClick={handleTrackOrder}>
        <PackageSearch className="h-4 w-4" />
        Track Order
      </Button>
      <Button variant="outline" onClick={handleDownloadInvoice}>
        <Download className="h-4 w-4" />
        Download Invoice
      </Button>
      <Button variant="outline" asChild>
        <Link href="/products">
          <ShoppingBag className="h-4 w-4" />
          Continue Shopping
        </Link>
      </Button>
      <Button variant="outline" onClick={handleViewOrders}>
        <User className="h-4 w-4" />
        View Orders
      </Button>
    </div>
  );
}
