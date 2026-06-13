"use client";

import { Archive, Plus, Search, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  adminProductsConfig,
  type AdminProductSortValue,
} from "@/features/admin/products/admin-products.config";
import type { AdminProductStatus } from "@/types/admin-product";

type ProductToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  statusFilter: AdminProductStatus | "all";
  onStatusFilterChange: (value: AdminProductStatus | "all") => void;
  categoryFilter: string;
  onCategoryFilterChange: (value: string) => void;
  sort: AdminProductSortValue;
  onSortChange: (value: AdminProductSortValue) => void;
  categories: string[];
  totalFiltered: number;
  selectedCount: number;
  onCreate: () => void;
  onBulkArchive: () => void;
  onBulkDelete: () => void;
  onClearSelection: () => void;
};

export function ProductToolbar({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sort,
  onSortChange,
  categories,
  totalFiltered,
  selectedCount,
  onCreate,
  onBulkArchive,
  onBulkDelete,
  onClearSelection,
}: ProductToolbarProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Products
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {totalFiltered} heritage pieces in catalog
          </p>
        </div>
        <Button variant="heritage" onClick={onCreate}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
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
            placeholder="Search by name, SKU, or gemstone..."
            className="pl-9"
            aria-label="Search products"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Select
            value={statusFilter}
            onValueChange={(value) =>
              onStatusFilterChange(value as AdminProductStatus | "all")
            }
          >
            <SelectTrigger className="w-[140px]" aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={onCategoryFilterChange}>
            <SelectTrigger className="w-[150px]" aria-label="Filter by category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(value) => onSortChange(value as AdminProductSortValue)}
          >
            <SelectTrigger className="w-[180px]" aria-label="Sort products">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              {adminProductsConfig.sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {selectedCount > 0 && (
        <div className="flex flex-wrap items-center gap-3 rounded-lg border border-[rgba(199,164,90,0.15)] bg-white px-4 py-3">
          <span className="text-sm font-medium">
            {selectedCount} selected
          </span>
          <Button variant="outline" size="sm" onClick={onBulkArchive}>
            <Archive className="h-4 w-4" />
            Archive
          </Button>
          <Button variant="destructive" size="sm" onClick={onBulkDelete}>
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button variant="ghost" size="sm" onClick={onClearSelection}>
            Clear selection
          </Button>
        </div>
      )}
    </div>
  );
}
