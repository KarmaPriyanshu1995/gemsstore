import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockMediaAssets } from "@/mock/media";
import type { ApiResponse } from "@/types/api";
import type { AdminMediaAsset } from "@/types/admin-media";

/**
 * Admin media service — mock implementation.
 *
 * Future backend:
 * GET /api/admin/media
 * POST /api/admin/media/upload (Cloudinary)
 * DELETE /api/admin/media/:id
 */
export async function getAdminMedia(): Promise<ApiResponse<AdminMediaAsset[]>> {
  await simulateDelay(150);
  return createSuccessResponse([...mockMediaAssets]);
}
