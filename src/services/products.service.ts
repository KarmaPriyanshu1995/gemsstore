import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import {
  buildProductSpecifications,
  getProductGallery,
  getProductReviews,
  productDetailFaqs,
} from "@/mock/product-detail";
import { mockProducts } from "@/mock/products";
import type { ApiResponse } from "@/types/api";
import type { Product } from "@/types/catalog";
import type { ProductDetailData } from "@/types/product-detail";
import type {
  ProductFilterOptions,
  ProductListingParams,
  ProductListingResult,
  ProductSortOption,
} from "@/types/product-listing";

export type GetProductsOptions = {
  category?: string;
  featured?: boolean;
  limit?: number;
};

function sortProducts(products: Product[], sort: ProductSortOption): Product[] {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "best-selling":
      return sorted.sort((a, b) => b.salesCount - a.salesCount);
    case "top-rated":
      return sorted.sort((a, b) => b.rating - a.rating);
    default:
      return sorted;
  }
}

function applyListingFilters(
  products: Product[],
  params: ProductListingParams,
): Product[] {
  const { filters } = params;

  return products.filter((product) => {
    if (
      filters.gemstoneTypes.length > 0 &&
      !filters.gemstoneTypes.includes(product.gemstoneType)
    ) {
      return false;
    }

    if (
      filters.origins.length > 0 &&
      !filters.origins.includes(product.origin)
    ) {
      return false;
    }

    if (
      filters.birthMonths.length > 0 &&
      (!product.birthMonth ||
        !filters.birthMonths.includes(product.birthMonth))
    ) {
      return false;
    }

    if (
      filters.zodiacs.length > 0 &&
      (!product.zodiac || !filters.zodiacs.includes(product.zodiac))
    ) {
      return false;
    }

    if (
      filters.certifications.length > 0 &&
      !filters.certifications.includes(product.certification)
    ) {
      return false;
    }

    if (
      filters.colors.length > 0 &&
      !filters.colors.includes(product.color)
    ) {
      return false;
    }

    if (filters.availability === "in-stock" && !product.inStock) {
      return false;
    }

    if (filters.availability === "out-of-stock" && product.inStock) {
      return false;
    }

    if (
      filters.priceMin !== undefined &&
      product.price < filters.priceMin
    ) {
      return false;
    }

    if (
      filters.priceMax !== undefined &&
      product.price > filters.priceMax
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Products service — mock implementation.
 *
 * Future backend:
 * GET /api/products?category=&featured=&limit=
 */
export async function getProducts(
  options: GetProductsOptions = {},
): Promise<ApiResponse<Product[]>> {
  await simulateDelay();

  let results = [...mockProducts];

  if (options.category) {
    results = results.filter((p) => p.category === options.category);
  }

  if (options.featured !== undefined) {
    results = results.filter((p) => p.featured === options.featured);
  }

  if (options.limit) {
    results = results.slice(0, options.limit);
  }

  return createSuccessResponse(results);
}

export async function getProductBySlug(
  slug: string,
): Promise<ApiResponse<Product | null>> {
  await simulateDelay();
  const product = mockProducts.find((p) => p.slug === slug) ?? null;
  return createSuccessResponse(product);
}

function getRelatedProducts(product: Product, limit = 4): Product[] {
  return mockProducts
    .filter(
      (candidate) =>
        candidate.id !== product.id &&
        (candidate.gemstoneType === product.gemstoneType ||
          candidate.category === product.category),
    )
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, limit);
}

/**
 * Full product detail payload for PDP.
 *
 * Future backend:
 * GET /api/products/:slug?include=reviews,related
 */
export async function getProductDetail(
  slug: string,
): Promise<ApiResponse<ProductDetailData | null>> {
  await simulateDelay();

  const product = mockProducts.find((p) => p.slug === slug);
  if (!product) {
    return createSuccessResponse(null);
  }

  return createSuccessResponse({
    product,
    gallery: getProductGallery(product),
    specifications: buildProductSpecifications(product),
    reviews: getProductReviews(product),
    faqs: productDetailFaqs,
    relatedProducts: getRelatedProducts(product),
  });
}

/**
 * Paginated product listing with filters and sort.
 *
 * Future backend:
 * GET /api/products?page=&limit=&sort=&gemstone=&origin=...
 */
export async function getProductListing(
  params: ProductListingParams,
): Promise<ApiResponse<ProductListingResult>> {
  await simulateDelay();

  const filtered = applyListingFilters(mockProducts, params);
  const sorted = sortProducts(filtered, params.sort);
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / params.limit));
  const page = Math.min(params.page, totalPages);
  const start = (page - 1) * params.limit;
  const items = sorted.slice(start, start + params.limit);

  return createSuccessResponse({
    items,
    total,
    page,
    limit: params.limit,
    totalPages,
  });
}

/**
 * Distinct filter option values derived from catalog.
 *
 * Future backend:
 * GET /api/products/filter-options
 */
export async function getProductFilterOptions(): Promise<
  ApiResponse<ProductFilterOptions>
> {
  await simulateDelay();

  const unique = (values: (string | undefined)[]) =>
    [...new Set(values.filter(Boolean) as string[])].sort();

  const prices = mockProducts.map((p) => p.price);

  return createSuccessResponse({
    gemstoneTypes: unique(mockProducts.map((p) => p.gemstoneType)),
    origins: unique(mockProducts.map((p) => p.origin)),
    birthMonths: unique(mockProducts.map((p) => p.birthMonth)),
    zodiacs: unique(mockProducts.map((p) => p.zodiac)),
    certifications: unique(mockProducts.map((p) => p.certification)),
    colors: unique(mockProducts.map((p) => p.color)),
    priceRange: {
      min: Math.min(...prices),
      max: Math.max(...prices),
    },
  });
}

/**
 * Search products by name, description, type, origin, and category.
 *
 * Future backend:
 * GET /api/products/search?q=
 */
export async function searchProducts(
  query: string,
): Promise<ApiResponse<Product[]>> {
  await simulateDelay(120);

  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return createSuccessResponse([]);
  }

  const results = mockProducts.filter((product) => {
    const haystack = [
      product.name,
      product.description,
      product.shortDescription,
      product.gemstoneType,
      product.origin,
      product.category,
      product.color,
      product.certification,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });

  return createSuccessResponse(results);
}
