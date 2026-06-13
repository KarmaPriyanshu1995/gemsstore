"use client";

import { AdminCard } from "@/features/admin/layout/admin-card";
import { truncate } from "@/features/admin/seo/seo-validation";
import type { SeoPageConfig } from "@/types/admin-seo";

type SeoGooglePreviewProps = {
  page: SeoPageConfig;
  siteUrl: string;
};

export function SeoGooglePreview({ page, siteUrl }: SeoGooglePreviewProps) {
  const displayUrl = `${siteUrl}${page.path === "/" ? "" : page.path}`;

  return (
    <AdminCard className="p-5">
      <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
        Google Snippet Preview
      </p>
      <div className="rounded-lg border border-[rgba(199,164,90,0.15)] bg-white p-4 font-body">
        <p className="text-sm text-[#202124]">
          {truncate(page.metaTitle, 60)}
        </p>
        <p className="mt-1 text-xs text-[#006621]">{displayUrl}</p>
        <p className="mt-1 text-sm leading-snug text-[#4d5156]">
          {truncate(page.metaDescription, 160)}
        </p>
        {page.noIndex && (
          <p className="mt-2 text-xs text-destructive">
            noindex — hidden from search
          </p>
        )}
      </div>
    </AdminCard>
  );
}
