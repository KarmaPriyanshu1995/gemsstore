"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Crown,
  X,
} from "lucide-react";

import {
  adminNavItems,
  adminShellConfig,
} from "@/features/admin/admin.config";
import { cn } from "@/lib/utils";

type AdminSidebarProps = {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
  onToggleCollapse: () => void;
};

function NavContent({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav aria-label="Admin navigation">
      <ul className="space-y-1 px-3">
        {adminNavItems.map((item) => {
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(item.href);
          const Icon = item.icon;

          if (item.comingSoon) {
            return (
              <li key={item.href}>
                <span
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-ivory/40",
                    collapsed && "justify-center px-2",
                  )}
                  title="Coming soon"
                >
                  <Icon className="h-5 w-5 shrink-0 text-gold/40" aria-hidden />
                  {!collapsed && <span>{item.label}</span>}
                </span>
              </li>
            );
          }

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  collapsed && "justify-center px-2",
                  isActive
                    ? "bg-white/15 text-ivory"
                    : "text-ivory/80 hover:bg-white/10 hover:text-ivory",
                )}
              >
                <Icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive ? "text-gold" : "text-gold/80",
                  )}
                  aria-hidden
                />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AdminSidebar({
  collapsed,
  mobileOpen,
  onMobileClose,
  onToggleCollapse,
}: AdminSidebarProps) {
  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden shrink-0 flex-col bg-emerald text-ivory transition-[width] duration-300 lg:flex",
          collapsed ? "w-[72px]" : "w-64",
        )}
        aria-label="Admin sidebar"
      >
        <div
          className={cn(
            "flex h-16 items-center border-b border-white/10 px-4",
            collapsed && "justify-center px-2",
          )}
        >
          <Crown className="h-6 w-6 text-gold" aria-hidden />
          {!collapsed && (
            <div className="ml-3 min-w-0">
              <p className="truncate font-heading text-lg font-semibold leading-tight">
                {adminShellConfig.brandName}
              </p>
              <p className="truncate text-[10px] uppercase tracking-[0.2em] text-ivory/60">
                {adminShellConfig.brandSubtitle}
              </p>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <NavContent collapsed={collapsed} />
        </div>

        <div className="border-t border-white/10 p-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex w-full items-center justify-center gap-2 rounded-md px-3 py-2 text-sm text-ivory/70 transition-colors hover:bg-white/10 hover:text-ivory"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4 text-gold" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 text-gold" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Admin navigation menu">
          <button
            type="button"
            className="absolute inset-0 bg-walnut/40 backdrop-blur-sm"
            onClick={onMobileClose}
            aria-label="Close navigation menu"
          />
          <aside className="relative flex h-full w-72 max-w-[85vw] flex-col bg-emerald text-ivory shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <div className="flex items-center gap-3">
                <Crown className="h-6 w-6 text-gold" aria-hidden />
                <div>
                  <p className="font-heading text-lg font-semibold">
                    {adminShellConfig.brandName}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-ivory/60">
                    Admin
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onMobileClose}
                className="rounded-md p-2 text-ivory/80 hover:bg-white/10"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
              <NavContent collapsed={false} onNavigate={onMobileClose} />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
