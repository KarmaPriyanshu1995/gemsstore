"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu } from "lucide-react";

import {
  adminBreadcrumbLabels,
  adminShellConfig,
} from "@/features/admin/admin.config";
import { cn } from "@/lib/utils";

type AdminHeaderProps = {
  onMenuOpen: () => void;
};

function buildBreadcrumbs(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const crumbs: { label: string; href?: string }[] = [
    { label: "Admin", href: "/admin" },
  ];

  if (segments.length <= 1) {
    crumbs.push({ label: "Dashboard" });
    return crumbs;
  }

  const section = segments[1];
  const label = adminBreadcrumbLabels[section] ?? section;

  crumbs.push({ label });

  return crumbs;
}

export function AdminHeader({ onMenuOpen }: AdminHeaderProps) {
  const pathname = usePathname();
  const breadcrumbs = buildBreadcrumbs(pathname);

  return (
    <header className="sticky top-0 z-30 border-b border-[rgba(199,164,90,0.15)] bg-ivory/95 backdrop-blur supports-[backdrop-filter]:bg-ivory/80">
      <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenuOpen}
            className="rounded-md p-2 text-foreground transition-colors hover:bg-secondary/40 lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <nav aria-label="Breadcrumb" className="min-w-0">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, index) => {
                const isLast = index === breadcrumbs.length - 1;

                return (
                  <li
                    key={`${crumb.label}-${index}`}
                    className="flex items-center gap-1.5"
                  >
                    {index > 0 && (
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden />
                    )}
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-primary"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span
                        className={cn(isLast && "font-medium text-foreground")}
                        aria-current={isLast ? "page" : undefined}
                      >
                        {crumb.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {adminShellConfig.brandSubtitle}
          </span>
        </div>
      </div>
    </header>
  );
}
