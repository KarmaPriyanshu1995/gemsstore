import type {
  ProductAvailabilityFilter,
  ProductListingFilters,
  ProductListingParams,
  ProductSortOption,
  ProductViewMode,
} from "@/types/product-listing";

import { productListingConfig } from "./product-listing.config";

function parseListParam(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const raw = Array.isArray(value) ? value.join(",") : value;
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseNumberParam(
  value: string | string[] | undefined,
): number | undefined {
  if (!value || Array.isArray(value)) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function parseAvailability(
  value: string | string[] | undefined,
): ProductAvailabilityFilter {
  const raw = Array.isArray(value) ? value[0] : value;
  if (raw === "in-stock" || raw === "out-of-stock") return raw;
  return "all";
}

function parseSort(value: string | string[] | undefined): ProductSortOption {
  const raw = Array.isArray(value) ? value[0] : value;
  const valid: ProductSortOption[] = [
    "price-asc",
    "price-desc",
    "newest",
    "best-selling",
    "top-rated",
  ];
  return valid.includes(raw as ProductSortOption)
    ? (raw as ProductSortOption)
    : productListingConfig.defaultSort;
}

function parseView(value: string | string[] | undefined): ProductViewMode {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "list" ? "list" : "grid";
}

function parsePage(value: string | string[] | undefined): number {
  const parsed = parseNumberParam(value);
  return parsed && parsed > 0 ? Math.floor(parsed) : 1;
}

export function parseListingSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): ProductListingParams {
  const filters: ProductListingFilters = {
    gemstoneTypes: parseListParam(searchParams.gemstone),
    origins: parseListParam(searchParams.origin),
    birthMonths: parseListParam(searchParams.birthMonth),
    zodiacs: parseListParam(searchParams.zodiac),
    certifications: parseListParam(searchParams.certification),
    colors: parseListParam(searchParams.color),
    availability: parseAvailability(searchParams.availability),
    priceMin: parseNumberParam(searchParams.priceMin),
    priceMax: parseNumberParam(searchParams.priceMax),
  };

  return {
    page: parsePage(searchParams.page),
    limit: productListingConfig.pageSize,
    sort: parseSort(searchParams.sort),
    view: parseView(searchParams.view),
    filters,
  };
}

export function buildListingSearchParams(
  params: ProductListingParams,
): URLSearchParams {
  const search = new URLSearchParams();

  if (params.page > 1) search.set("page", String(params.page));
  if (params.sort !== productListingConfig.defaultSort) {
    search.set("sort", params.sort);
  }
  if (params.view !== "grid") search.set("view", params.view);

  const { filters } = params;

  if (filters.gemstoneTypes.length > 0) {
    search.set("gemstone", filters.gemstoneTypes.join(","));
  }
  if (filters.origins.length > 0) {
    search.set("origin", filters.origins.join(","));
  }
  if (filters.birthMonths.length > 0) {
    search.set("birthMonth", filters.birthMonths.join(","));
  }
  if (filters.zodiacs.length > 0) {
    search.set("zodiac", filters.zodiacs.join(","));
  }
  if (filters.certifications.length > 0) {
    search.set("certification", filters.certifications.join(","));
  }
  if (filters.colors.length > 0) {
    search.set("color", filters.colors.join(","));
  }
  if (filters.availability !== "all") {
    search.set("availability", filters.availability);
  }
  if (filters.priceMin !== undefined) {
    search.set("priceMin", String(filters.priceMin));
  }
  if (filters.priceMax !== undefined) {
    search.set("priceMax", String(filters.priceMax));
  }

  return search;
}

export function buildListingHref(params: ProductListingParams): string {
  const search = buildListingSearchParams(params);
  const query = search.toString();
  return query ? `/products?${query}` : "/products";
}
