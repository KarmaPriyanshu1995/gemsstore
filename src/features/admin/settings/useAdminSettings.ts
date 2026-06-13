"use client";

import { useCallback, useState } from "react";

import type {
  AdminCommerceSettings,
  AdminNotificationSettings,
  AdminSettingsData,
  AdminSettingsSection,
  AdminStoreSettings,
  AdminSystemSettings,
} from "@/types/admin-settings";

type UseAdminSettingsOptions = {
  initialData: AdminSettingsData;
};

export function useAdminSettings({ initialData }: UseAdminSettingsOptions) {
  const [data, setData] = useState(initialData);
  const [activeSection, setActiveSection] =
    useState<AdminSettingsSection>("store");
  const [savedSnapshot] = useState(initialData);

  const updateStore = useCallback((patch: Partial<AdminStoreSettings>) => {
    setData((current) => ({
      ...current,
      store: { ...current.store, ...patch },
    }));
  }, []);

  const updateCommerce = useCallback((patch: Partial<AdminCommerceSettings>) => {
    setData((current) => ({
      ...current,
      commerce: { ...current.commerce, ...patch },
    }));
  }, []);

  const updateNotifications = useCallback(
    (patch: Partial<AdminNotificationSettings>) => {
      setData((current) => ({
        ...current,
        notifications: { ...current.notifications, ...patch },
      }));
    },
    [],
  );

  const updateSystem = useCallback((patch: Partial<AdminSystemSettings>) => {
    setData((current) => ({
      ...current,
      system: { ...current.system, ...patch },
    }));
  }, []);

  const resetSection = useCallback(() => {
    setData((current) => ({
      ...current,
      [activeSection]: { ...savedSnapshot[activeSection] },
    }));
  }, [activeSection, savedSnapshot]);

  const resetAll = useCallback(() => {
    setData({ ...savedSnapshot });
  }, [savedSnapshot]);

  return {
    data,
    activeSection,
    setActiveSection,
    updateStore,
    updateCommerce,
    updateNotifications,
    updateSystem,
    resetSection,
    resetAll,
  };
}
