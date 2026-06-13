export type ProductSortOption =
  | "price-asc"
  | "price-desc"
  | "newest"
  | "best-selling"
  | "top-rated";

export type ProductViewMode = "grid" | "list";

export type ProductAvailabilityFilter = "all" | "in-stock" | "out-of-stock";

export type ProductListingFilters = {
  gemstoneTypes: string[];
  origins: string[];
  birthMonths: string[];
  zodiacs: string[];
  certifications: string[];
  colors: string[];
  availability: ProductAvailabilityFilter;
  priceMin?: number;
  priceMax?: number;
};

export type ProductListingParams = {
  page: number;
  limit: number;
  sort: ProductSortOption;
  view: ProductViewMode;
  filters: ProductListingFilters;
};

export type ProductFilterOptions = {
  gemstoneTypes: string[];
  origins: string[];
  birthMonths: string[];
  zodiacs: string[];
  certifications: string[];
  colors: string[];
  priceRange: { min: number; max: number };
};

export type ProductListingResult = {
  items: import("@/types/catalog").Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
