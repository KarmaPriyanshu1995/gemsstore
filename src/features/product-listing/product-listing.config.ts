import type { ProductSortOption } from "@/types/product-listing";

export const productListingConfig = {
  pageSize: 9,
  defaultSort: "newest" as ProductSortOption,
  sortOptions: [
    { value: "price-asc" as const, label: "Price: Low to High" },
    { value: "price-desc" as const, label: "Price: High to Low" },
    { value: "newest" as const, label: "Newest" },
    { value: "best-selling" as const, label: "Best Selling" },
    { value: "top-rated" as const, label: "Top Rated" },
  ],
  availabilityOptions: [
    { value: "all" as const, label: "All" },
    { value: "in-stock" as const, label: "In Stock" },
    { value: "out-of-stock" as const, label: "Sold Out" },
  ],
} as const;
