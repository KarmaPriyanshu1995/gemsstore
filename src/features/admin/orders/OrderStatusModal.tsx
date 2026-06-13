"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminOrdersConfig } from "@/features/admin/orders/admin-orders.config";
import type { AdminOrder, AdminOrderStatus } from "@/types/admin-order";
import { useEffect, useState } from "react";

type OrderStatusModalProps = {
  order: AdminOrder | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (id: string, status: AdminOrderStatus) => void;
};

export function OrderStatusModal({
  order,
  open,
  onClose,
  onUpdate,
}: OrderStatusModalProps) {
  const [status, setStatus] = useState<AdminOrderStatus>("pending");

  useEffect(() => {
    if (order) setStatus(order.status);
  }, [order]);

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <p className="text-sm text-muted-foreground">
            {order.orderNumber} · {order.customerName}
          </p>
          <Label htmlFor="order-status">Status</Label>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as AdminOrderStatus)}
          >
            <SelectTrigger id="order-status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {adminOrdersConfig.statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="heritage"
            onClick={() => onUpdate(order.id, status)}
            disabled={status === order.status}
          >
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
