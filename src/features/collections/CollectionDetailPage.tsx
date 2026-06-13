"use client";

import Image from "next/image";
import { useState } from "react";
import { Gem } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { ProductListingGrid } from "@/features/product-listing/ProductListingGrid";
import { ProductQuickView } from "@/features/product-listing/ProductQuickView";
import type { CollectionDetailData, Product } from "@/types/catalog";

type CollectionDetailPageProps = {
  data: CollectionDetailData;
};

export function CollectionDetailPage({ data }: CollectionDetailPageProps) {
  const { collection, products } = data;
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="relative overflow-hidden bg-secondary/30">
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Heritage Collection
              </p>
              <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
                {collection.name}
              </h1>
              <p className="mt-4 max-w-xl text-muted-foreground">
                {collection.description}
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                {products.length}{" "}
                {products.length === 1 ? "treasure" : "treasures"} in this
                collection
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[rgba(199,164,90,0.15)]">
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {products.length === 0 ? (
          <EmptyState
            icon={Gem}
            title="Collection coming soon"
            description="Treasures for this collection are being curated by our concierge team."
          />
        ) : (
          <ProductListingGrid
            products={products}
            onQuickView={setQuickViewProduct}
          />
        )}
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
