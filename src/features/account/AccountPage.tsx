"use client";

import { useSearchParams } from "next/navigation";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { AccountAddressesTab } from "@/features/account/AccountAddressesTab";
import { AccountNav } from "@/features/account/AccountNav";
import { AccountOrdersTab } from "@/features/account/AccountOrdersTab";
import { AccountProfileTab } from "@/features/account/AccountProfileTab";
import { AccountSettingsTab } from "@/features/account/AccountSettingsTab";
import { AccountWishlistTab } from "@/features/account/AccountWishlistTab";
import { isAccountTab } from "@/features/account/account.config";
import { useAccount } from "@/features/account/useAccount";
import type { AccountTab, UserAccount } from "@/types/account";

type AccountPageProps = {
  initialData: UserAccount;
};

function resolveTab(param: string | null): AccountTab {
  if (param && isAccountTab(param)) return param;
  return "profile";
}

export function AccountPage({ initialData }: AccountPageProps) {
  const searchParams = useSearchParams();
  const activeTab = resolveTab(searchParams.get("tab"));
  const account = useAccount({ initialData });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "My Account" }]}
        className="mb-8"
      />

      <header className="mb-10">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Maharaja Heritage
        </p>
        <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
          My Account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Welcome back, {account.profile.name}
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <AccountNav activeTab={activeTab} />

        <div role="tabpanel" aria-label={activeTab}>
          {activeTab === "profile" && (
            <AccountProfileTab
              profile={account.profile}
              onUpdate={account.updateProfile}
            />
          )}
          {activeTab === "addresses" && (
            <AccountAddressesTab
              addresses={account.addresses}
              onSetDefault={account.setDefaultAddress}
            />
          )}
          {activeTab === "orders" && (
            <AccountOrdersTab
              orders={account.orders}
              hydrated={account.ordersHydrated}
            />
          )}
          {activeTab === "wishlist" && <AccountWishlistTab />}
          {activeTab === "settings" && (
            <AccountSettingsTab
              settings={account.settings}
              onUpdate={account.updateSettings}
            />
          )}
        </div>
      </div>
    </div>
  );
}
