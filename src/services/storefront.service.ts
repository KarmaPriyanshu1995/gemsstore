import { simulateDelay, createSuccessResponse } from "@/lib/service-utils";
import { mockCmsData } from "@/mock/cms";
import type { ApiResponse } from "@/types/api";

export type AboutPageContent = {
  headline: string;
  body: string;
  mission: string;
};

export type ContactPageContent = {
  email: string;
  phone: string;
  address: string;
  hours: string;
};

/**
 * Storefront static pages — mock implementation.
 *
 * Future backend:
 * GET /api/pages/about
 * GET /api/pages/contact
 */
export async function getAboutPage(): Promise<ApiResponse<AboutPageContent>> {
  await simulateDelay(100);
  return createSuccessResponse(structuredClone(mockCmsData.about));
}

export async function getContactPage(): Promise<ApiResponse<ContactPageContent>> {
  await simulateDelay(100);
  return createSuccessResponse(structuredClone(mockCmsData.contact));
}
