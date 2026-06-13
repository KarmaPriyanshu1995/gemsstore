"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/lib/toast";
import type { UserSettings } from "@/types/account";

type AccountSettingsTabProps = {
  settings: UserSettings;
  onUpdate: (patch: Partial<UserSettings>) => void;
};

const settingOptions: Array<{
  key: keyof UserSettings;
  label: string;
  description: string;
}> = [
  {
    key: "orderUpdates",
    label: "Order updates",
    description: "Receive email notifications about order status and delivery.",
  },
  {
    key: "marketingEmails",
    label: "Marketing emails",
    description: "Hear about new collections, exclusive offers, and events.",
  },
  {
    key: "smsAlerts",
    label: "SMS alerts",
    description: "Get text messages for delivery updates and concierge follow-ups.",
  },
];

export function AccountSettingsTab({
  settings,
  onUpdate,
}: AccountSettingsTabProps) {
  const handleToggle = (key: keyof UserSettings, checked: boolean) => {
    onUpdate({ [key]: checked });
    toast.success("Preferences saved");
  };

  return (
    <Card className="border-[rgba(199,164,90,0.15)]">
      <CardHeader>
        <CardTitle className="font-heading text-xl">Notifications</CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose how you would like to hear from RealGemsStore.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {settingOptions.map((option) => (
          <div
            key={option.key}
            className="flex items-start gap-3 rounded-lg border border-[rgba(199,164,90,0.1)] p-4"
          >
            <Checkbox
              id={`setting-${option.key}`}
              checked={settings[option.key]}
              onCheckedChange={(checked) =>
                handleToggle(option.key, checked === true)
              }
            />
            <div className="space-y-1">
              <Label
                htmlFor={`setting-${option.key}`}
                className="cursor-pointer font-medium"
              >
                {option.label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
