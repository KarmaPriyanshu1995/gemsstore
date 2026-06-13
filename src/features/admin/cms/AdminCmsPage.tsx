"use client";

import { RotateCcw, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CmsEditor } from "@/features/admin/cms/CmsEditor";
import { CmsLivePreview } from "@/features/admin/cms/CmsLivePreview";
import { CmsSectionPicker } from "@/features/admin/cms/CmsSectionPicker";
import { adminCmsConfig } from "@/features/admin/cms/admin-cms.config";
import { useAdminCms } from "@/features/admin/cms/useAdminCms";
import { toast } from "@/lib/toast";
import type { AdminCmsData, CmsSectionKey } from "@/types/admin-cms";

type AdminCmsPageProps = {
  initialData: AdminCmsData;
};

export function AdminCmsPage({ initialData }: AdminCmsPageProps) {
  const cms = useAdminCms({ initialData });

  const sectionLabel =
    adminCmsConfig.sections.find((s) => s.key === cms.activeSection)?.label ??
    "Content";

  const handleSave = () => {
    toast.success("CMS content saved locally");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            CMS
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage storefront content blocks and page copy
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={cms.resetSection}>
            <RotateCcw className="h-4 w-4" />
            Reset Section
          </Button>
          <Button variant="outline" size="sm" onClick={cms.resetAll}>
            Reset All
          </Button>
          <Button variant="heritage" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)_320px]">
        <aside className="hidden xl:block">
          <CmsSectionPicker
            activeSection={cms.activeSection}
            onSelect={cms.setActiveSection}
          />
        </aside>

        <div className="space-y-4">
          <div className="xl:hidden">
            <label htmlFor="cms-section-mobile" className="sr-only">
              Select section
            </label>
            <select
              id="cms-section-mobile"
              value={cms.activeSection}
              onChange={(e) =>
                cms.setActiveSection(e.target.value as CmsSectionKey)
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {adminCmsConfig.sections.map((section) => (
                <option key={section.key} value={section.key}>
                  {section.group} — {section.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <h2 className="font-heading text-lg font-semibold">{sectionLabel}</h2>
            <p className="text-xs text-muted-foreground">
              Last updated{" "}
              {new Intl.DateTimeFormat("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(cms.cms.updatedAt))}
            </p>
          </div>

          <CmsEditor
            cms={cms.cms}
            activeSection={cms.activeSection}
            onChange={cms.updateCms}
          />
        </div>

        <div>
          <CmsLivePreview cms={cms.cms} activeSection={cms.activeSection} />
        </div>
      </div>
    </div>
  );
}
