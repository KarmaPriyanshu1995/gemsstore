import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockAdminDashboard } from "@/mock/admin-dashboard";
import type { ApiResponse } from "@/types/api";
import type { AdminDashboardData } from "@/types/admin";

/**
 * Admin dashboard service — mock implementation.
 *
 * Future backend:
 * GET /api/admin/dashboard
 */
export async function getAdminDashboard(): Promise<
  ApiResponse<AdminDashboardData>
> {
  await simulateDelay(150);
  return createSuccessResponse(mockAdminDashboard);
}
