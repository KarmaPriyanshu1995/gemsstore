"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { searchConfig } from "@/features/search/search.config";
import { SearchNoResults } from "@/features/search/SearchNoResults";
import { SearchResultList } from "@/features/search/SearchResultList";
import { SearchSuggestions } from "@/features/search/SearchSuggestions";
import { useRecentSearches } from "@/features/search/useRecentSearches";
import { searchProducts } from "@/services/products.service";
import type { Product } from "@/types/catalog";

type SearchPageProps = {
  suggestedProducts: Product[];
};

export function SearchPage({ suggestedProducts }: SearchPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const [input, setInput] = useState(urlQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { recent, addRecent, clearRecent } = useRecentSearches();

  const updateQuery = useCallback(
    (query: string) => {
      const trimmed = query.trim();
      const params = new URLSearchParams();
      if (trimmed) params.set("q", trimmed);
      const next = params.toString();
      router.replace(next ? `/search?${next}` : "/search");
      if (trimmed) addRecent(trimmed);
    },
    [router, addRecent],
  );

  useEffect(() => {
    setInput(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    if (!urlQuery.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = window.setTimeout(() => {
      searchProducts(urlQuery)
        .then((response) => {
          setResults(response.data);
          setActiveIndex(0);
        })
        .finally(() => setLoading(false));
    }, searchConfig.debounceMs);

    return () => window.clearTimeout(timer);
  }, [urlQuery]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    updateQuery(input);
  };

  const handleClear = () => {
    setInput("");
    router.replace("/search");
    setResults([]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      handleClear();
      return;
    }

    if (results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % results.length);
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex(
        (current) => (current - 1 + results.length) % results.length,
      );
    }

    if (event.key === "Enter" && results[activeIndex]) {
      event.preventDefault();
      router.push(`/products/${results[activeIndex].slug}`);
    }
  };

  const hasQuery = urlQuery.trim().length > 0;

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Maharaja Heritage
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Search Treasures
        </h1>
      </header>

      <form onSubmit={handleSubmit} className="relative">
        <Search
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search emeralds, rubies, origins, certifications..."
          className="h-14 rounded-xl border-[rgba(199,164,90,0.25)] bg-ivory/30 pl-12 pr-12 text-base"
          autoFocus
          aria-label="Search products"
        />
        {(input || hasQuery) && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </form>

      <div className="mt-8">
        {!hasQuery && (
          <SearchSuggestions
            recentSearches={recent}
            suggestedProducts={suggestedProducts}
            onSelectQuery={(query) => {
              setInput(query);
              updateQuery(query);
            }}
            onClearRecent={clearRecent}
          />
        )}

        {hasQuery && loading && (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {hasQuery && !loading && results.length > 0 && (
          <>
            <p className="mb-4 text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? "result" : "results"} for
              &ldquo;{urlQuery}&rdquo;
            </p>
            <SearchResultList
              products={results}
              activeIndex={activeIndex}
              onActiveIndexChange={setActiveIndex}
            />
          </>
        )}

        {hasQuery && !loading && results.length === 0 && (
          <SearchNoResults query={urlQuery} onClear={handleClear} />
        )}
      </div>
    </div>
  );
}
