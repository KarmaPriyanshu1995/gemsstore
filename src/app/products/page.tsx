import type { Metadata } from "next";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ProductListing } from "@/features/product-listing";
import { parseListingSearchParams } from "@/features/product-listing/parse-listing-params";
import {
  getProductFilterOptions,
  getProductListing,
} from "@/services/products.service";

export const metadata: Metadata = {
  title: "Shop Gemstones — RealGemsStore",
  description:
    "Browse certified emeralds, rubies, sapphires, and diamonds. Filter by origin, birth month, zodiac, and certification.",
};

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedParams = await searchParams;
  const listingParams = parseListingSearchParams(resolvedParams);

  const [listingResponse, filterOptionsResponse] = await Promise.all([
    getProductListing(listingParams),
    getProductFilterOptions(),
  ]);

  const listing = listingResponse.data;
  const filterOptions = filterOptionsResponse.data;

  return (
    <StorefrontShell activeHref="/products">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Products" },
          ]}
          className="mb-6"
        />

        <header className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Maharaja Heritage Collection
          </p>
          <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Curated Gemstones
          </h1>
          <p className="mt-4 text-muted-foreground">
            Discover certified treasures from the world&apos;s finest mines —
            each piece selected with concierge precision for the modern maharaja.
          </p>
        </header>

        <ProductListing
          listing={listing}
          params={listingParams}
          filterOptions={filterOptions}
        />
      </div>
    </StorefrontShell>
  );
}
