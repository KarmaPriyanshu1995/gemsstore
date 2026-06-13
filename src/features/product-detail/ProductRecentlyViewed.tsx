"use client";

import Image from "next/image";
import Link from "next/link";

import { useRecentlyViewed } from "@/features/product-detail/useRecentlyViewed";
import type { Product } from "@/types/catalog";
import { formatCurrency } from "@/utils/format-currency";

type ProductRecentlyViewedProps = {
  product: Product;
};

export function ProductRecentlyViewed({ product }: ProductRecentlyViewedProps) {
  const { getOthers } = useRecentlyViewed(product);
  const items = getOthers();

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed-heading">
      <h2
        id="recently-viewed-heading"
        className="font-heading text-2xl font-semibold"
      >
        Recently Viewed
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <Link
            key={item.productId}
            href={`/products/${item.slug}`}
            className="group overflow-hidden rounded-lg border border-border/80 bg-background transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-square overflow-hidden bg-secondary/20">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(max-width: 640px) 50vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <p className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-primary">
                {item.name}
              </p>
              <p className="mt-1 font-heading text-sm text-primary">
                {formatCurrency(item.price, item.currency)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
