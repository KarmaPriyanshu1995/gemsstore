"use client";

import { cn } from "@/lib/utils";
import { adminSettingsConfig } from "@/features/admin/settings/admin-settings.config";
import type { AdminSettingsSection } from "@/types/admin-settings";

type SettingsSectionPickerProps = {
  activeSection: AdminSettingsSection;
  onSelect: (section: AdminSettingsSection) => void;
};

const groups = [
  ...new Set(adminSettingsConfig.sections.map((section) => section.group)),
];

export function SettingsSectionPicker({
  activeSection,
  onSelect,
}: SettingsSectionPickerProps) {
  return (
    <nav aria-label="Settings sections" className="space-y-6">
      {groups.map((group) => (
        <div key={group}>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {group}
          </p>
          <ul className="space-y-1">
            {adminSettingsConfig.sections
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
