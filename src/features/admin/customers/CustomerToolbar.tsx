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
import { adminCustomersConfig } from "@/features/admin/customers/admin-customers.config";
import type {
  AdminCustomerSortValue,
  AdminCustomerStatus,
} from "@/types/admin-customer";

type CustomerToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  statusFilter: AdminCustomerStatus | "all";
  onStatusFilterChange: (value: AdminCustomerStatus | "all") => void;
  sort: AdminCustomerSortValue;
  onSortChange: (value: AdminCustomerSortValue) => void;
  totalFiltered: number;
};

export function CustomerToolbar({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  sort,
  onSortChange,
  totalFiltered,
}: CustomerToolbarProps) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-heading text-3xl font-semibold tracking-tight">
          Customers
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {totalFiltered} heritage clientele profiles
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
            placeholder="Search by name, email, or tag..."
            className="pl-9"
            aria-label="Search customers"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              onStatusFilterChange(value as AdminCustomerStatus | "all")
            }
          >
            <SelectTrigger className="w-[140px]" aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(value) =>
              onSortChange(value as AdminCustomerSortValue)
            }
          >
            <SelectTrigger className="w-[170px]" aria-label="Sort customers">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {adminCustomersConfig.sortOptions.map((option) => (
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
