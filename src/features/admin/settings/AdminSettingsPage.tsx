"use client";

import { RotateCcw, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SettingsEditor } from "@/features/admin/settings/SettingsEditor";
import { SettingsSectionPicker } from "@/features/admin/settings/SettingsSectionPicker";
import { adminSettingsConfig } from "@/features/admin/settings/admin-settings.config";
import { useAdminSettings } from "@/features/admin/settings/useAdminSettings";
import { toast } from "@/lib/toast";
import type { AdminSettingsData } from "@/types/admin-settings";

type AdminSettingsPageProps = {
  initialData: AdminSettingsData;
};

export function AdminSettingsPage({ initialData }: AdminSettingsPageProps) {
  const settings = useAdminSettings({ initialData });

  const sectionLabel =
    adminSettingsConfig.sections.find((s) => s.key === settings.activeSection)
      ?.label ?? "Settings";

  const handleSave = () => {
    toast.success("Settings saved locally");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="font-heading text-3xl font-semibold tracking-tight">
            Settings
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Store configuration, commerce defaults, and operational preferences
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={settings.resetSection}>
            <RotateCcw className="h-4 w-4" />
            Reset Section
          </Button>
          <Button variant="outline" size="sm" onClick={settings.resetAll}>
            Reset All
          </Button>
          <Button variant="heritage" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="hidden xl:block">
          <SettingsSectionPicker
            activeSection={settings.activeSection}
            onSelect={settings.setActiveSection}
          />
        </aside>

        <div className="space-y-4">
          <div className="xl:hidden">
            <label htmlFor="settings-section-mobile" className="sr-only">
              Settings section
            </label>
            <select
              id="settings-section-mobile"
              value={settings.activeSection}
              onChange={(e) =>
                settings.setActiveSection(
                  e.target.value as typeof settings.activeSection,
                )
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {adminSettingsConfig.sections.map((section) => (
                <option key={section.key} value={section.key}>
                  {section.label}
                </option>
              ))}
            </select>
          </div>

          <p className="text-sm text-muted-foreground xl:hidden">
            Editing: <span className="font-medium text-foreground">{sectionLabel}</span>
          </p>

          <SettingsEditor
            section={settings.activeSection}
            store={settings.data.store}
            commerce={settings.data.commerce}
            notifications={settings.data.notifications}
            system={settings.data.system}
            onUpdateStore={settings.updateStore}
            onUpdateCommerce={settings.updateCommerce}
            onUpdateNotifications={settings.updateNotifications}
            onUpdateSystem={settings.updateSystem}
          />
        </div>
      </div>
    </div>
  );
}
