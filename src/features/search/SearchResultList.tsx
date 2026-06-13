"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import type { Product } from "@/types/catalog";
import { formatCurrency } from "@/utils/format-currency";
import { cn } from "@/lib/utils";

type SearchResultListProps = {
  products: Product[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
};

export function SearchResultList({
  products,
  activeIndex,
  onActiveIndexChange,
}: SearchResultListProps) {
  return (
    <ul className="divide-y divide-border/80" role="listbox" aria-label="Search results">
      {products.map((product, index) => (
        <li key={product.id}>
          <Link
            href={`/products/${product.slug}`}
            role="option"
            aria-selected={index === activeIndex}
            onMouseEnter={() => onActiveIndexChange(index)}
            className={cn(
              "flex items-center gap-4 px-2 py-4 transition-colors",
              index === activeIndex && "bg-secondary/40",
            )}
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border/80">
              <Image
                src={product.images[0]}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium">{product.name}</p>
              <p className="text-sm text-muted-foreground">
                {product.gemstoneType} · {product.origin}
              </p>
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span className="font-heading text-primary">
                  {formatCurrency(product.price, product.currency)}
                </span>
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
                  {product.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
