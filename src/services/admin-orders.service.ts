import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockAdminOrders } from "@/mock/admin-orders";
import type { ApiResponse } from "@/types/api";
import type { AdminOrder } from "@/types/admin-order";

/**
 * Admin orders service — mock implementation.
 *
 * Future backend:
 * GET /api/admin/orders
 * GET /api/admin/orders/:id
 * PATCH /api/admin/orders/:id/status
 */
export async function getAdminOrders(): Promise<ApiResponse<AdminOrder[]>> {
  await simulateDelay(150);
  return createSuccessResponse([...mockAdminOrders]);
}
