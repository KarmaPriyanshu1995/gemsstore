"use client";

import { cn } from "@/lib/utils";
import { adminCmsConfig } from "@/features/admin/cms/admin-cms.config";
import type { CmsSectionKey } from "@/types/admin-cms";

type CmsSectionPickerProps = {
  activeSection: CmsSectionKey;
  onSelect: (section: CmsSectionKey) => void;
};

const groups = [...new Set(adminCmsConfig.sections.map((s) => s.group))];

export function CmsSectionPicker({
  activeSection,
  onSelect,
}: CmsSectionPickerProps) {
  return (
    <nav aria-label="CMS sections" className="space-y-6">
      {groups.map((group) => (
        <div key={group}>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {group}
          </p>
          <ul className="space-y-1">
            {adminCmsConfig.sections
              .filter((section) => section.group === group)
              .map((section) => (
                <li key={section.key}>
                  <button
                    type="button"
                    onClick={() => onSelect(section.key)}
                    aria-current={
                      activeSection === section.key ? "page" : undefined
                    }
                    className={cn(
                      "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                      activeSection === section.key
                        ? "bg-emerald text-ivory"
                        : "text-foreground hover:bg-secondary/40",
                    )}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
