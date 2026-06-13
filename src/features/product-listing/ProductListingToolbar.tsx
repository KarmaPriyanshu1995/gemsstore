"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductListingFilters } from "@/features/product-listing/ProductListingFilters";
import { buildListingHref } from "@/features/product-listing/parse-listing-params";
import { productListingConfig } from "@/features/product-listing/product-listing.config";
import type {
  ProductFilterOptions,
  ProductListingParams,
  ProductSortOption,
  ProductViewMode,
} from "@/types/product-listing";

type ProductListingToolbarProps = {
  params: ProductListingParams;
  filterOptions: ProductFilterOptions;
  total: number;
};

export function ProductListingToolbar({
  params,
  filterOptions,
  total,
}: ProductListingToolbarProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const navigate = (patch: Partial<ProductListingParams>) => {
    startTransition(() => {
      router.push(buildListingHref({ ...params, ...patch, page: 1 }));
    });
  };

  const setSort = (sort: ProductSortOption) => navigate({ sort });
  const setView = (view: ProductViewMode) => navigate({ view });

  return (
    <div
      className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between"
      aria-busy={isPending}
    >
      <div>
        <p className="font-heading text-sm text-muted-foreground">
          {total} {total === 1 ? "treasure" : "treasures"} curated for you
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Refine Selection</DialogTitle>
            </DialogHeader>
            <ProductListingFilters
              params={params}
              filterOptions={filterOptions}
              className="max-h-[70vh] overflow-y-auto pr-1"
            />
          </DialogContent>
        </Dialog>

        <Select value={params.sort} onValueChange={(value) => setSort(value as ProductSortOption)}>
          <SelectTrigger className="w-[200px]" aria-label="Sort products">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {productListingConfig.sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div
          className="inline-flex rounded-md border border-border p-1"
          role="group"
          aria-label="View mode"
        >
          <Button
            variant={params.view === "grid" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            aria-label="Grid view"
            aria-pressed={params.view === "grid"}
            onClick={() => setView("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={params.view === "list" ? "default" : "ghost"}
            size="icon"
            className="h-8 w-8"
            aria-label="List view"
            aria-pressed={params.view === "list"}
            onClick={() => setView("list")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
