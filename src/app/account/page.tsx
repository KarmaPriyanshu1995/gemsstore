import type { Metadata } from "next";
import { Suspense } from "react";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { AccountPage } from "@/features/account";
import { getAccount } from "@/services/account.service";

export const metadata: Metadata = {
  title: "My Account — RealGemsStore",
  description:
    "Manage your profile, addresses, orders, wishlist, and notification preferences.",
};

function AccountFallback() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Skeleton className="mb-8 h-4 w-40" />
      <Skeleton className="mb-8 h-10 w-56" />
      <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
        <Skeleton className="hidden h-64 w-full rounded-lg lg:block" />
        <Skeleton className="h-96 w-full rounded-lg" />
      </div>
    </div>
  );
}

export default async function AccountRoute() {
  const { data: account } = await getAccount();

  return (
    <StorefrontShell activeHref="/account">
      <Suspense fallback={<AccountFallback />}>
        <AccountPage initialData={account} />
      </Suspense>
    </StorefrontShell>
  );
}
