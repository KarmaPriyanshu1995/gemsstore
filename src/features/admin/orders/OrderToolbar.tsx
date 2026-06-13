"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { adminOrdersConfig } from "@/features/admin/orders/admin-orders.config";
import type {
  AdminOrderSortValue,
  AdminOrderStatus,
  AdminPaymentStatus,
} from "@/types/admin-order";

type OrderToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  statusFilter: AdminOrderStatus | "all";
  onStatusFilterChange: (value: AdminOrderStatus | "all") => void;
  paymentFilter: AdminPaymentStatus | "all";
  onPaymentFilterChange: (value: AdminPaymentStatus | "all") => void;
  sort: AdminOrderSortValue;
  onSortChange: (value: AdminOrderSortValue) => void;
  totalFiltered: number;
};

export function OrderToolbar({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  paymentFilter,
  onPaymentFilterChange,
  sort,
  onSortChange,
  totalFiltered,
}: OrderToolbarProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Orders
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalFiltered} concierge transactions
        </p>
      </div>

      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <div className="relative min-w-0 flex-1">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search by order ID, customer, or email..."
            className="pl-9"
            aria-label="Search orders"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              onStatusFilterChange(value as AdminOrderStatus | "all")
            }
          >
            <SelectTrigger className="w-[150px]" aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {adminOrdersConfig.statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={paymentFilter}
            onValueChange={(value) =>
              onPaymentFilterChange(value as AdminPaymentStatus | "all")
            }
          >
            <SelectTrigger className="w-[150px]" aria-label="Filter by payment">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(value) => onSortChange(value as AdminOrderSortValue)}
          >
            <SelectTrigger className="w-[170px]" aria-label="Sort orders">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {adminOrdersConfig.sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
