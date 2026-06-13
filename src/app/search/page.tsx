import type { Metadata } from "next";
import { Suspense } from "react";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchPage } from "@/features/search";
import { getProducts } from "@/services/products.service";

export const metadata: Metadata = {
  title: "Search — RealGemsStore",
  description: "Search certified emeralds, rubies, sapphires, and diamonds.",
};

function SearchFallback() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Skeleton className="mx-auto h-10 w-64" />
      <Skeleton className="mt-8 h-14 w-full rounded-xl" />
      <Skeleton className="mt-8 h-48 w-full" />
    </div>
  );
}

export default async function SearchRoute() {
  const { data: suggestedProducts } = await getProducts({
    featured: true,
    limit: 4,
  });

  return (
    <StorefrontShell activeHref="/products">
      <Suspense fallback={<SearchFallback />}>
        <SearchPage suggestedProducts={suggestedProducts} />
      </Suspense>
    </StorefrontShell>
  );
}
