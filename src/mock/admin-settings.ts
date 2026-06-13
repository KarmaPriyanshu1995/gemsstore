import { siteConfig } from "@/constants/design-tokens";
import type { AdminSettingsData } from "@/types/admin-settings";

export const mockAdminSettings: AdminSettingsData = {
  store: {
    storeName: siteConfig.name,
    tagline: siteConfig.tagline,
    supportEmail: "concierge@realgemsstore.com",
    supportPhone: "+91 22 4000 1947",
  },
  commerce: {
    currency: "INR",
    currencySymbol: "₹",
    taxRate: 3,
    orderPrefix: "RG",
    freeShippingMinimum: 250000,
  },
  notifications: {
    newOrderAlerts: true,
    lowStockAlerts: true,
    dailyDigest: false,
  },
  system: {
    maintenanceMode: false,
    timezone: "Asia/Kolkata",
    defaultLocale: "en-IN",
  },
  updatedAt: "2026-06-01T10:00:00Z",
};
