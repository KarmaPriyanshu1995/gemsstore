"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { mergeOrders, readOrderHistory } from "@/features/account/order-history";
import type {
  UserAccount,
  UserProfileForm,
  UserSettings,
} from "@/types/account";

type UseAccountOptions = {
  initialData: UserAccount;
};

export function useAccount({ initialData }: UseAccountOptions) {
  const [profile, setProfile] = useState(initialData.profile);
  const [addresses, setAddresses] = useState(initialData.addresses);
  const [settings, setSettings] = useState(initialData.settings);
  const [localOrders, setLocalOrders] = useState(initialData.orders);
  const [ordersHydrated, setOrdersHydrated] = useState(false);

  useEffect(() => {
    const sessions = readOrderHistory();
    setLocalOrders(mergeOrders(initialData.orders, sessions));
    setOrdersHydrated(true);
  }, [initialData.orders]);

  const updateProfile = useCallback((patch: Partial<UserProfileForm>) => {
    setProfile((current) => ({ ...current, ...patch }));
  }, []);

  const updateSettings = useCallback((patch: Partial<UserSettings>) => {
    setSettings((current) => ({ ...current, ...patch }));
  }, []);

  const setDefaultAddress = useCallback((addressId: string) => {
    setAddresses((current) =>
      current.map((address) => ({
        ...address,
        isDefault: address.id === addressId,
      })),
    );
  }, []);

  const orders = useMemo(() => localOrders, [localOrders]);

  return {
    profile,
    addresses,
    settings,
    orders,
    ordersHydrated,
    updateProfile,
    updateSettings,
    setDefaultAddress,
  };
}
