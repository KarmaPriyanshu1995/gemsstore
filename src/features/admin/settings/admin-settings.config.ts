import type { AdminSettingsSection } from "@/types/admin-settings";

export const adminSettingsConfig = {
  sections: [
    { key: "store" as const, label: "Store Identity", group: "General" },
    { key: "commerce" as const, label: "Commerce", group: "General" },
    {
      key: "notifications" as const,
      label: "Notifications",
      group: "Operations",
    },
    { key: "system" as const, label: "System", group: "Operations" },
  ] satisfies Array<{
    key: AdminSettingsSection;
    label: string;
    group: string;
  }>,
};
