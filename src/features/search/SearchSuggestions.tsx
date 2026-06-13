"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, Sparkles, TrendingUp, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { popularSearches } from "@/features/search/search.config";
import type { Product } from "@/types/catalog";
import { formatCurrency } from "@/utils/format-currency";

type SearchSuggestionsProps = {
  recentSearches: string[];
  suggestedProducts: Product[];
  onSelectQuery: (query: string) => void;
  onClearRecent: () => void;
};

export function SearchSuggestions({
  recentSearches,
  suggestedProducts,
  onSelectQuery,
  onClearRecent,
}: SearchSuggestionsProps) {
  return (
    <div className="space-y-8">
      {recentSearches.length > 0 && (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
              <Clock className="h-4 w-4" aria-hidden />
              Recent Searches
            </h2>
            <Button variant="ghost" size="sm" onClick={onClearRecent}>
              <X className="h-3.5 w-3.5" />
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => onSelectQuery(term)}
                className="rounded-full border border-border px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
              >
                {term}
              </button>
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-3 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
          <TrendingUp className="h-4 w-4" aria-hidden />
          Popular Searches
        </h2>
        <div className="flex flex-wrap gap-2">
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => onSelectQuery(term)}
              className="rounded-full border border-[rgba(199,164,90,0.25)] bg-ivory/40 px-3 py-1.5 text-sm transition-colors hover:border-primary hover:text-primary"
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      {suggestedProducts.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-4 w-4" aria-hidden />
            Suggested Treasures
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {suggestedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="flex items-center gap-3 rounded-lg border border-border/80 p-3 transition-colors hover:border-primary/40"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src={product.images[0]}
                    alt=""
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{product.name}</p>
                  <p className="text-sm text-primary">
                    {formatCurrency(product.price, product.currency)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
