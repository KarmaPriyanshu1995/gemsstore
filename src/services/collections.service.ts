import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockCollections } from "@/mock/collections";
import { mockProducts } from "@/mock/products";
import type { ApiResponse } from "@/types/api";
import type { Collection, CollectionDetailData } from "@/types/catalog";

export type GetCollectionsOptions = {
  featured?: boolean;
  excludeSlugs?: string[];
};

/**
 * Collections service — mock implementation.
 *
 * Future backend:
 * GET /api/collections?featured=
 * GET /api/collections/:slug
 */
export async function getCollections(
  options: GetCollectionsOptions = {},
): Promise<ApiResponse<Collection[]>> {
  await simulateDelay();

  let results = [...mockCollections];

  if (options.featured !== undefined) {
    results = results.filter((c) => c.featured === options.featured);
  }

  if (options.excludeSlugs?.length) {
    results = results.filter((c) => !options.excludeSlugs!.includes(c.slug));
  }

  return createSuccessResponse(results);
}

export async function getCollectionBySlug(
  slug: string,
): Promise<ApiResponse<Collection | null>> {
  await simulateDelay(120);

  const collection =
    mockCollections.find((entry) => entry.slug === slug) ?? null;

  return createSuccessResponse(
    collection ? structuredClone(collection) : null,
  );
}

export async function getCollectionDetail(
  slug: string,
): Promise<ApiResponse<CollectionDetailData | null>> {
  await simulateDelay(150);

  const collection =
    mockCollections.find((entry) => entry.slug === slug) ?? null;

  if (!collection) {
    return createSuccessResponse(null);
  }

  const products = mockProducts.filter((product) =>
    collection.productIds.includes(product.id),
  );

  return createSuccessResponse({
    collection: structuredClone(collection),
    products: structuredClone(products),
  });
}
