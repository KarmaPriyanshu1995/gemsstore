import Link from "next/link";

import { ProductCard } from "@/features/home/product-card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/catalog";

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <section className="border-y border-border bg-secondary/20 py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Handpicked excellence
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold text-foreground md:text-4xl">
              Featured Pieces
            </h2>
          </div>
          <Button variant="ghost" asChild>
            <Link href="/products">Shop all</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
