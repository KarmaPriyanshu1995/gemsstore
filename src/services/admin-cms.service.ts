import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockCmsData } from "@/mock/cms";
import type { ApiResponse } from "@/types/api";
import type { AdminCmsData } from "@/types/admin-cms";

/**
 * Admin CMS service — mock implementation.
 *
 * Future backend:
 * GET /api/admin/cms
 * PUT /api/admin/cms
 */
export async function getAdminCms(): Promise<ApiResponse<AdminCmsData>> {
  await simulateDelay(150);
  return createSuccessResponse(structuredClone(mockCmsData));
}
