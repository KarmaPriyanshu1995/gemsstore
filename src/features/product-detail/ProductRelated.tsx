"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/catalog";
import { formatCurrency } from "@/utils/format-currency";

type ProductRelatedProps = {
  products: Product[];
};

export function ProductRelated({ products }: ProductRelatedProps) {
  if (products.length === 0) return null;

  return (
    <section aria-labelledby="related-products-heading">
      <h2
        id="related-products-heading"
        className="font-heading text-2xl font-semibold"
      >
        Related Treasures
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Curated pieces from the same heritage collection
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Link
              href={`/products/${product.slug}`}
              className="relative block aspect-square overflow-hidden"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 25vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
              {!product.inStock && (
                <Badge
                  variant="outline"
                  className="absolute left-3 top-3 bg-background/90"
                >
                  Sold Out
                </Badge>
              )}
            </Link>
            <CardHeader className="space-y-1 pb-2">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {product.gemstoneType}
              </p>
              <CardTitle className="text-base leading-snug">
                <Link
                  href={`/products/${product.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {product.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
                <span>{product.rating.toFixed(1)}</span>
              </div>
              <p className="font-heading text-lg text-primary">
                {formatCurrency(product.price, product.currency)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
