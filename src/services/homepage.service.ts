import { getCollections } from "@/services/collections.service";
import { getProducts } from "@/services/products.service";
import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockTestimonials } from "@/mock/testimonials";
import type { ApiResponse } from "@/types/api";
import type { HomePageData } from "@/types/home";

/**
 * Homepage service — aggregates mock data for the storefront home page.
 *
 * Future backend:
 * GET /api/homepage
 */
export async function getHomePageData(): Promise<ApiResponse<HomePageData>> {
  await simulateDelay();

  const [productsRes, collectionsRes] = await Promise.all([
    getProducts({ featured: true, limit: 3 }),
    getCollections({ featured: true, excludeSlugs: ["circle-of-gems"] }),
  ]);

  return createSuccessResponse({
    featuredProducts: productsRes.data,
    featuredCollections: collectionsRes.data,
    testimonials: mockTestimonials,
  });
}
