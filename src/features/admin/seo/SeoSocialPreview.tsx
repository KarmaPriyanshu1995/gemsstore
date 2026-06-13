"use client";

import Image from "next/image";

import { AdminCard } from "@/features/admin/layout/admin-card";
import { truncate } from "@/features/admin/seo/seo-validation";
import type { SeoPageConfig } from "@/types/admin-seo";

type SeoSocialPreviewProps = {
  page: SeoPageConfig;
  siteUrl: string;
};

export function SeoSocialPreview({ page, siteUrl }: SeoSocialPreviewProps) {
  const ogTitle = page.openGraph.title || page.metaTitle;
  const ogDescription = page.openGraph.description || page.metaDescription;

  return (
    <div className="space-y-4">
      <AdminCard className="overflow-hidden">
        <p className="border-b border-[rgba(199,164,90,0.15)] bg-ivory/40 px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">
          Open Graph Preview
        </p>
        <div className="bg-[#f0f2f5] p-4">
          <div className="mx-auto max-w-[500px] overflow-hidden rounded-lg border border-[#dddfe2] bg-white shadow-sm">
            <div className="relative aspect-[1.91/1] bg-secondary/30">
              <Image
                src={page.openGraph.image}
                alt=""
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>
            <div className="border-t border-[#dddfe2] bg-[#f2f3f5] px-3 py-2">
              <p className="text-[10px] uppercase text-[#65676b]">
                {siteUrl.replace(/^https?:\/\//, "")}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-[#1d2129]">
                {truncate(ogTitle, 70)}
              </p>
              <p className="mt-0.5 text-xs text-[#65676b]">
                {truncate(ogDescription, 100)}
              </p>
            </div>
          </div>
        </div>
      </AdminCard>

      <AdminCard className="overflow-hidden">
        <p className="border-b border-[rgba(199,164,90,0.15)] bg-ivory/40 px-4 py-2 text-xs uppercase tracking-wider text-muted-foreground">
          Twitter Card Preview
        </p>
        <div className="bg-[#15202b] p-4">
          <div className="mx-auto max-w-[500px] overflow-hidden rounded-2xl border border-[#38444d] bg-[#192734]">
            <div className="relative aspect-[2/1] bg-secondary/30">
              <Image
                src={page.twitter.image || page.openGraph.image}
                alt=""
                fill
                sizes="500px"
                className="object-cover"
              />
            </div>
            <div className="px-3 py-2">
              <p className="text-sm font-medium text-[#e7e9ea]">
                {truncate(page.twitter.title || ogTitle, 70)}
              </p>
              <p className="mt-0.5 text-xs text-[#8899a6]">
                {truncate(page.twitter.description || ogDescription, 100)}
              </p>
              <p className="mt-1 text-xs text-[#8899a6]">
                {siteUrl.replace(/^https?:\/\//, "")}
              </p>
            </div>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
