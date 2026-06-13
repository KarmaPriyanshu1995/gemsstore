import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockSignatureManagerData } from "@/mock/signature-manager";
import type { ApiResponse } from "@/types/api";
import type { AdminSignatureData } from "@/types/admin-signature";

/**
 * Signature Experience Manager service — mock implementation.
 *
 * Future backend:
 * GET /api/admin/signature-experience
 * PUT /api/admin/signature-experience
 */
export async function getSignatureManager(): Promise<
  ApiResponse<AdminSignatureData>
> {
  await simulateDelay(150);
  return createSuccessResponse(structuredClone(mockSignatureManagerData));
}
