import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockAdminCustomers } from "@/mock/admin-customers";
import type { ApiResponse } from "@/types/api";
import type { AdminCustomer } from "@/types/admin-customer";

/**
 * Admin customers service — mock implementation.
 *
 * Future backend:
 * GET /api/admin/customers
 * GET /api/admin/customers/:id
 * PATCH /api/admin/customers/:id
 */
export async function getAdminCustomers(): Promise<
  ApiResponse<AdminCustomer[]>
> {
  await simulateDelay(150);
  return createSuccessResponse([...mockAdminCustomers]);
}
