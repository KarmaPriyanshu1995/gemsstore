"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdminCard } from "@/features/admin/layout/admin-card";
import type {
  AdminCommerceSettings,
  AdminNotificationSettings,
  AdminSettingsSection,
  AdminStoreSettings,
  AdminSystemSettings,
} from "@/types/admin-settings";

type SettingsEditorProps = {
  section: AdminSettingsSection;
  store: AdminStoreSettings;
  commerce: AdminCommerceSettings;
  notifications: AdminNotificationSettings;
  system: AdminSystemSettings;
  onUpdateStore: (patch: Partial<AdminStoreSettings>) => void;
  onUpdateCommerce: (patch: Partial<AdminCommerceSettings>) => void;
  onUpdateNotifications: (patch: Partial<AdminNotificationSettings>) => void;
  onUpdateSystem: (patch: Partial<AdminSystemSettings>) => void;
};

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

function SettingsPanel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <AdminCard className="p-6">
      <h2 className="font-heading text-xl font-semibold">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <div className="mt-6">{children}</div>
    </AdminCard>
  );
}

export function SettingsEditor({
  section,
  store,
  commerce,
  notifications,
  system,
  onUpdateStore,
  onUpdateCommerce,
  onUpdateNotifications,
  onUpdateSystem,
}: SettingsEditorProps) {
  if (section === "store") {
    return (
      <SettingsPanel
        title="Store Identity"
        description="Brand and concierge contact details."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="store-name" label="Store name">
            <Input
              id="store-name"
              value={store.storeName}
              onChange={(e) => onUpdateStore({ storeName: e.target.value })}
            />
          </Field>
          <Field id="store-tagline" label="Tagline">
            <Input
              id="store-tagline"
              value={store.tagline}
              onChange={(e) => onUpdateStore({ tagline: e.target.value })}
            />
          </Field>
          <Field id="support-email" label="Support email">
            <Input
              id="support-email"
              type="email"
              value={store.supportEmail}
              onChange={(e) => onUpdateStore({ supportEmail: e.target.value })}
            />
          </Field>
          <Field id="support-phone" label="Support phone">
            <Input
              id="support-phone"
              value={store.supportPhone}
              onChange={(e) => onUpdateStore({ supportPhone: e.target.value })}
            />
          </Field>
        </div>
      </SettingsPanel>
    );
  }

  if (section === "commerce") {
    return (
      <SettingsPanel
        title="Commerce"
        description="Currency, tax, and order defaults."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="currency" label="Currency code">
            <Input
              id="currency"
              value={commerce.currency}
              onChange={(e) => onUpdateCommerce({ currency: e.target.value })}
            />
          </Field>
          <Field id="currency-symbol" label="Currency symbol">
            <Input
              id="currency-symbol"
              value={commerce.currencySymbol}
              onChange={(e) =>
                onUpdateCommerce({ currencySymbol: e.target.value })
              }
            />
          </Field>
          <Field id="tax-rate" label="Tax rate (%)">
            <Input
              id="tax-rate"
              type="number"
              min={0}
              step={0.1}
              value={commerce.taxRate}
              onChange={(e) =>
                onUpdateCommerce({ taxRate: Number(e.target.value) || 0 })
              }
            />
          </Field>
          <Field id="order-prefix" label="Order prefix">
            <Input
              id="order-prefix"
              value={commerce.orderPrefix}
              onChange={(e) => onUpdateCommerce({ orderPrefix: e.target.value })}
            />
          </Field>
          <Field id="free-shipping" label="Free shipping minimum (INR)">
            <Input
              id="free-shipping"
              type="number"
              min={0}
              value={commerce.freeShippingMinimum}
              onChange={(e) =>
                onUpdateCommerce({
                  freeShippingMinimum: Number(e.target.value) || 0,
                })
              }
            />
          </Field>
        </div>
      </SettingsPanel>
    );
  }

  if (section === "notifications") {
    const toggles = [
      {
        key: "newOrderAlerts" as const,
        label: "New order alerts",
        description: "Email admins when a heritage order is placed.",
      },
      {
        key: "lowStockAlerts" as const,
        label: "Low stock alerts",
        description: "Notify when certified inventory falls below threshold.",
      },
      {
        key: "dailyDigest" as const,
        label: "Daily digest",
        description: "Morning summary of revenue, orders, and concierge tasks.",
      },
    ];

    return (
      <SettingsPanel
        title="Notifications"
        description="Operational alert preferences."
      >
        <div className="space-y-4">
          {toggles.map((toggle) => (
            <div
              key={toggle.key}
              className="flex items-start gap-3 rounded-lg border border-[rgba(199,164,90,0.15)] p-4"
            >
              <Checkbox
                id={`notify-${toggle.key}`}
                checked={notifications[toggle.key]}
                onCheckedChange={(checked) =>
                  onUpdateNotifications({ [toggle.key]: checked === true })
                }
              />
              <div>
                <Label htmlFor={`notify-${toggle.key}`} className="cursor-pointer">
                  {toggle.label}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {toggle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </SettingsPanel>
    );
  }

  return (
    <SettingsPanel
      title="System"
      description="Locale, timezone, and maintenance controls."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="timezone" label="Timezone">
          <Input
            id="timezone"
            value={system.timezone}
            onChange={(e) => onUpdateSystem({ timezone: e.target.value })}
          />
        </Field>
        <Field id="locale" label="Default locale">
          <Input
            id="locale"
            value={system.defaultLocale}
            onChange={(e) => onUpdateSystem({ defaultLocale: e.target.value })}
          />
        </Field>
        <div className="sm:col-span-2">
          <div className="flex items-start gap-3 rounded-lg border border-[rgba(199,164,90,0.15)] p-4">
            <Checkbox
              id="maintenance-mode"
              checked={system.maintenanceMode}
              onCheckedChange={(checked) =>
                onUpdateSystem({ maintenanceMode: checked === true })
              }
            />
            <div>
              <Label htmlFor="maintenance-mode" className="cursor-pointer">
                Maintenance mode
              </Label>
              <p className="text-sm text-muted-foreground">
                Show a concierge holding page on the storefront while updates are
                in progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SettingsPanel>
  );
}
