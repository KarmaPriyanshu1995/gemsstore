export type AdminSettingsSection =
  | "store"
  | "commerce"
  | "notifications"
  | "system";

export type AdminStoreSettings = {
  storeName: string;
  tagline: string;
  supportEmail: string;
  supportPhone: string;
};

export type AdminCommerceSettings = {
  currency: string;
  currencySymbol: string;
  taxRate: number;
  orderPrefix: string;
  freeShippingMinimum: number;
};

export type AdminNotificationSettings = {
  newOrderAlerts: boolean;
  lowStockAlerts: boolean;
  dailyDigest: boolean;
};

export type AdminSystemSettings = {
  maintenanceMode: boolean;
  timezone: string;
  defaultLocale: string;
};

export type AdminSettingsData = {
  store: AdminStoreSettings;
  commerce: AdminCommerceSettings;
  notifications: AdminNotificationSettings;
  system: AdminSystemSettings;
  updatedAt: string;
};
