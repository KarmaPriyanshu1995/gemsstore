import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockGemstones } from "@/mock/gemstones";
import type { ApiResponse } from "@/types/api";
import type { Gemstone } from "@/types/catalog";

/**
 * Gemstones service — mock implementation.
 *
 * Future backend:
 * GET /api/gemstones
 * GET /api/gemstones/:slug
 */
export async function getGemstones(): Promise<ApiResponse<Gemstone[]>> {
  await simulateDelay();
  const visible = mockGemstones
    .filter((g) => g.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  return createSuccessResponse(visible);
}

export async function getGemstoneBySlug(
  slug: string,
): Promise<ApiResponse<Gemstone | null>> {
  await simulateDelay();
  const gemstone = mockGemstones.find((g) => g.slug === slug) ?? null;
  return createSuccessResponse(gemstone);
}
