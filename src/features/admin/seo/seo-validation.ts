import { adminSeoConfig } from "@/features/admin/seo/admin-seo.config";
import type { SeoPageConfig, SeoValidationResult } from "@/types/admin-seo";

export function validateSeoPage(page: SeoPageConfig): SeoValidationResult[] {
  const results: SeoValidationResult[] = [];

  const titleLen = page.metaTitle.length;
  if (titleLen < adminSeoConfig.titleMin) {
    results.push({
      field: "metaTitle",
      status: "warning",
      message: `Title is short (${titleLen} chars). Aim for ${adminSeoConfig.titleMin}–${adminSeoConfig.titleMax}.`,
    });
  } else if (titleLen > adminSeoConfig.titleMax) {
    results.push({
      field: "metaTitle",
      status: "error",
      message: `Title may be truncated (${titleLen} chars). Keep under ${adminSeoConfig.titleMax}.`,
    });
  } else {
    results.push({
      field: "metaTitle",
      status: "good",
      message: `Title length is optimal (${titleLen} chars).`,
    });
  }

  const descLen = page.metaDescription.length;
  if (descLen < adminSeoConfig.descriptionMin) {
    results.push({
      field: "metaDescription",
      status: "warning",
      message: `Description is short (${descLen} chars). Aim for ${adminSeoConfig.descriptionMin}–${adminSeoConfig.descriptionMax}.`,
    });
  } else if (descLen > adminSeoConfig.descriptionMax) {
    results.push({
      field: "metaDescription",
      status: "warning",
      message: `Description may be truncated (${descLen} chars). Keep under ${adminSeoConfig.descriptionMax}.`,
    });
  } else {
    results.push({
      field: "metaDescription",
      status: "good",
      message: `Description length is optimal (${descLen} chars).`,
    });
  }

  if (!page.openGraph.image.trim()) {
    results.push({
      field: "openGraph.image",
      status: "error",
      message: "Open Graph image is required for social sharing.",
    });
  } else {
    results.push({
      field: "openGraph.image",
      status: "good",
      message: "Open Graph image is set.",
    });
  }

  if (!page.slug.trim()) {
    results.push({
      field: "slug",
      status: "error",
      message: "Slug cannot be empty.",
    });
  } else if (!/^[a-z0-9/-]*$/.test(page.slug)) {
    results.push({
      field: "slug",
      status: "warning",
      message: "Slug should use lowercase letters, numbers, and hyphens only.",
    });
  } else {
    results.push({
      field: "slug",
      status: "good",
      message: "Slug format looks good.",
    });
  }

  if (page.noIndex) {
    results.push({
      field: "noIndex",
      status: "warning",
      message: "Page is set to noindex — it won't appear in search results.",
    });
  }

  return results;
}

export function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}
