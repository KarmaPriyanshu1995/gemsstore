import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import {
  adminGemstoneTypes,
  adminProductCategories,
  mockAdminProducts,
} from "@/mock/admin-products";
import type { ApiResponse } from "@/types/api";
import type { AdminProduct } from "@/types/admin-product";

/**
 * Admin products service — mock implementation.
 *
 * Future backend:
 * GET /api/admin/products
 * POST /api/admin/products
 * PUT /api/admin/products/:id
 * DELETE /api/admin/products/:id
 */
export async function getAdminProducts(): Promise<ApiResponse<AdminProduct[]>> {
  await simulateDelay(150);
  return createSuccessResponse([...mockAdminProducts]);
}

export async function getAdminProductOptions(): Promise<
  ApiResponse<{
    categories: string[];
    gemstoneTypes: string[];
    statuses: AdminProduct["status"][];
  }>
> {
  await simulateDelay(100);
  return createSuccessResponse({
    categories: [...adminProductCategories],
    gemstoneTypes: [...adminGemstoneTypes],
    statuses: ["active", "draft", "archived"],
  });
}
