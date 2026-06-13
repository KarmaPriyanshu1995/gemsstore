"use client";

import { useMemo } from "react";
import { RotateCcw, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SeoEditor } from "@/features/admin/seo/SeoEditor";
import { SeoGooglePreview } from "@/features/admin/seo/SeoGooglePreview";
import { SeoPagePicker } from "@/features/admin/seo/SeoPagePicker";
import { SeoSocialPreview } from "@/features/admin/seo/SeoSocialPreview";
import { SeoValidation } from "@/features/admin/seo/SeoValidation";
import { adminSeoConfig } from "@/features/admin/seo/admin-seo.config";
import { validateSeoPage } from "@/features/admin/seo/seo-validation";
import { useAdminSeo } from "@/features/admin/seo/useAdminSeo";
import { toast } from "@/lib/toast";
import type { AdminSeoData, SeoPageKey } from "@/types/admin-seo";

type AdminSeoPageProps = {
  initialData: AdminSeoData;
};

export function AdminSeoPage({ initialData }: AdminSeoPageProps) {
  const seo = useAdminSeo({ initialData });

  const validation = useMemo(() => {
    if (!seo.activePage) return [];
    return validateSeoPage(seo.activePage);
  }, [seo.activePage]);

  const pageLabel =
    adminSeoConfig.pages.find((p) => p.key === seo.activePageKey)?.label ??
    "Page";

  if (!seo.activePage) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            SEO
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Meta tags, social cards, and schema for storefront pages
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={seo.resetPage}>
            <RotateCcw className="h-4 w-4" />
            Reset Page
          </Button>
          <Button variant="outline" size="sm" onClick={seo.resetAll}>
            Reset All
          </Button>
          <Button
            variant="heritage"
            size="sm"
            onClick={() => toast.success("SEO settings saved locally")}
          >
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[200px_minmax(0,1fr)_340px]">
        <aside className="hidden xl:block">
          <SeoPagePicker
            activePageKey={seo.activePageKey}
            onSelect={seo.setActivePageKey}
          />
        </aside>

        <div className="space-y-4">
          <div className="xl:hidden">
            <label htmlFor="seo-page-mobile" className="sr-only">
              Select page
            </label>
            <select
              id="seo-page-mobile"
              value={seo.activePageKey}
              onChange={(e) =>
                seo.setActivePageKey(e.target.value as SeoPageKey)
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {adminSeoConfig.pages.map((page) => (
                <option key={page.key} value={page.key}>
                  {page.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold">{pageLabel}</h2>
            <p className="text-xs text-muted-foreground">
              {seo.activePage.path} ·{" "}
              {new Intl.DateTimeFormat("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(seo.activePage.updatedAt))}
            </p>
          </div>

          <SeoEditor page={seo.activePage} onChange={seo.updatePage} />

          <div>
            <h3 className="mb-3 font-heading text-sm font-semibold">
              Validation
            </h3>
            <SeoValidation results={validation} />
          </div>
        </div>

        <div className="space-y-4">
          <SeoGooglePreview
            page={seo.activePage}
            siteUrl={seo.data.siteUrl}
          />
          <SeoSocialPreview
            page={seo.activePage}
            siteUrl={seo.data.siteUrl}
          />
        </div>
      </div>
    </div>
  );
}
