import Link from "next/link";
import { ArrowRight, Gem, FileText, ShoppingBag, Sparkles } from "lucide-react";

import { AdminCard } from "@/features/admin/layout/admin-card";
import type { AdminQuickAction } from "@/types/admin";

type QuickActionsProps = {
  actions: AdminQuickAction[];
};

const iconMap = {
  "/admin/products": Gem,
  "/admin/orders": ShoppingBag,
  "/admin/cms": FileText,
  "/admin/signature-experience": Sparkles,
} as const;

export function QuickActions({ actions }: QuickActionsProps) {
  return (
    <AdminCard>
      <div className="border-b border-[rgba(199,164,90,0.15)] px-6 py-4">
        <h2 className="font-heading text-xl font-semibold">Quick Actions</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Concierge shortcuts for daily operations
        </p>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon =
            iconMap[action.href as keyof typeof iconMap] ?? ArrowRight;

          return (
            <Link
              key={action.id}
              href={action.href}
              className="group flex items-start gap-3 rounded-lg border border-[rgba(199,164,90,0.15)] bg-ivory/30 p-4 transition-colors hover:border-gold/30 hover:bg-white"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-emerald/10 text-emerald">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium group-hover:text-primary">
                  {action.label}
                </p>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {action.description}
                </p>
              </div>
              <ArrowRight
                className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden
              />
            </Link>
          );
        })}
      </div>
    </AdminCard>
  );
}
