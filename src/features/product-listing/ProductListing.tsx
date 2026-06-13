"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Gem } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { ProductListingFilters } from "@/features/product-listing/ProductListingFilters";
import { ProductListingGrid } from "@/features/product-listing/ProductListingGrid";
import { ProductListingList } from "@/features/product-listing/ProductListingList";
import { ProductListingPagination } from "@/features/product-listing/ProductListingPagination";
import { ProductListingToolbar } from "@/features/product-listing/ProductListingToolbar";
import { ProductQuickView } from "@/features/product-listing/ProductQuickView";
import type { Product } from "@/types/catalog";
import type {
  ProductFilterOptions,
  ProductListingParams,
  ProductListingResult,
} from "@/types/product-listing";

type ProductListingProps = {
  listing: ProductListingResult;
  params: ProductListingParams;
  filterOptions: ProductFilterOptions;
};

export function ProductListing({
  listing,
  params,
  filterOptions,
}: ProductListingProps) {
  const router = useRouter();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleClearFilters = () => {
    router.push("/products");
  };

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ProductListingFilters
          params={params}
          filterOptions={filterOptions}
          className="hidden lg:block"
        />

        <div className="min-w-0 space-y-6">
          <ProductListingToolbar
            params={params}
            filterOptions={filterOptions}
            total={listing.total}
          />

          {listing.items.length === 0 ? (
            <EmptyState
              icon={Gem}
              title="No gemstones match your selection"
              description="Refine your filters or explore our full heritage collection."
              actionLabel="Clear filters"
              onAction={handleClearFilters}
            />
          ) : params.view === "list" ? (
            <ProductListingList
              products={listing.items}
              onQuickView={setQuickViewProduct}
            />
          ) : (
            <ProductListingGrid
              products={listing.items}
              onQuickView={setQuickViewProduct}
            />
          )}

          <ProductListingPagination
            params={params}
            totalPages={listing.totalPages}
            className="pt-4"
          />
        </div>
      </div>

      <ProductQuickView
        product={quickViewProduct}
        open={quickViewProduct !== null}
        onOpenChange={(open) => {
          if (!open) setQuickViewProduct(null);
        }}
      />
    </>
  );
}
