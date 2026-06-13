import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockSeoData } from "@/mock/seo";
import type { ApiResponse } from "@/types/api";
import type { AdminSeoData } from "@/types/admin-seo";

/**
 * Admin SEO service — mock implementation.
 *
 * Future backend:
 * GET /api/admin/seo
 * PUT /api/admin/seo
 */
export async function getAdminSeo(): Promise<ApiResponse<AdminSeoData>> {
  await simulateDelay(150);
  return createSuccessResponse(structuredClone(mockSeoData));
}
