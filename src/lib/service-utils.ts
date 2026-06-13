import type { ServiceError } from "@/types/api";

export class ServiceException extends Error {
  code: string;
  status?: number;

  constructor(error: ServiceError) {
    super(error.message);
    this.name = "ServiceException";
    this.code = error.code;
    this.status = error.status;
  }
}

/**
 * Simulates network latency for mock service calls.
 * Remove or bypass when integrating with the real API.
 */
export async function simulateDelay(ms = 200): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Wraps mock data in a consistent API response shape.
 * Future backend responses should match this structure.
 */
export function createSuccessResponse<T>(data: T) {
  return { data, success: true as const };
}
