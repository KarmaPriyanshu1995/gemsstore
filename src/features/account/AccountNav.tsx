"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { accountTabs } from "@/features/account/account.config";
import { cn } from "@/lib/utils";
import type { AccountTab } from "@/types/account";

type AccountNavProps = {
  activeTab: AccountTab;
};

export function AccountNav({ activeTab }: AccountNavProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setTab = (tab: AccountTab) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`/account?${params.toString()}`);
  };

  return (
    <>
      <div className="mb-6 lg:hidden">
        <label htmlFor="account-tab-mobile" className="sr-only">
          Account section
        </label>
        <select
          id="account-tab-mobile"
          value={activeTab}
          onChange={(e) => setTab(e.target.value as AccountTab)}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {accountTabs.map((tab) => (
            <option key={tab.id} value={tab.id}>
              {tab.label}
            </option>
          ))}
        </select>
      </div>

      <nav
        className="hidden lg:block"
        aria-label="Account sections"
      >
        <ul className="space-y-1" role="tablist">
          {accountTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;

            return (
              <li key={tab.id} role="presentation">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden />
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <p className="mt-6 hidden text-xs text-muted-foreground lg:block">
        Need help?{" "}
        <Link href="mailto:concierge@realgemsstore.com" className="text-primary hover:underline">
          Contact concierge
        </Link>
      </p>
    </>
  );
}
