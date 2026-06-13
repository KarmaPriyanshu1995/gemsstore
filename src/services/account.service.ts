import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockUserAccount } from "@/mock/account";
import type { ApiResponse } from "@/types/api";
import type { UserAccount } from "@/types/account";

/**
 * Account service — mock implementation.
 *
 * Future backend:
 * GET /api/account
 * PUT /api/account/profile
 * PUT /api/account/settings
 */
export async function getAccount(): Promise<ApiResponse<UserAccount>> {
  await simulateDelay(150);
  return createSuccessResponse(structuredClone(mockUserAccount));
}
