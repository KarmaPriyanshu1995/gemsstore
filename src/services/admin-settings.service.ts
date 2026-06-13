import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockAdminSettings } from "@/mock/admin-settings";
import type { ApiResponse } from "@/types/api";
import type { AdminSettingsData } from "@/types/admin-settings";

/**
 * Admin settings service — mock implementation.
 *
 * Future backend:
 * GET /api/admin/settings
 * PUT /api/admin/settings
 */
export async function getAdminSettings(): Promise<ApiResponse<AdminSettingsData>> {
  await simulateDelay(120);
  return createSuccessResponse(structuredClone(mockAdminSettings));
}
