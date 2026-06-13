import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";

import { AdminCard } from "@/features/admin/layout/admin-card";
import { cn } from "@/lib/utils";
import type { AdminOverviewStat } from "@/types/admin";

type DashboardStatCardsProps = {
  stats: {
    revenue: AdminOverviewStat;
    orders: AdminOverviewStat;
    customers: AdminOverviewStat;
    products: AdminOverviewStat;
  };
};

function StatCard({ stat }: { stat: AdminOverviewStat }) {
  const TrendIcon =
    stat.trend === "up"
      ? ArrowUpRight
      : stat.trend === "down"
        ? ArrowDownRight
        : Minus;

  return (
    <AdminCard className="p-5">
      <p className="text-sm text-muted-foreground">{stat.label}</p>
      <p className="mt-2 font-heading text-3xl font-semibold tracking-tight">
        {stat.value}
      </p>
      <div className="mt-3 flex items-center gap-1.5 text-sm">
        <TrendIcon
          className={cn(
            "h-4 w-4",
            stat.trend === "up" && "text-emerald",
            stat.trend === "down" && "text-destructive",
            stat.trend === "neutral" && "text-muted-foreground",
          )}
          aria-hidden
        />
        <span
          className={cn(
            stat.trend === "up" && "text-emerald",
            stat.trend === "down" && "text-destructive",
            stat.trend === "neutral" && "text-muted-foreground",
          )}
        >
          {stat.changePercent > 0 ? "+" : ""}
          {stat.changePercent}%
        </span>
        <span className="text-muted-foreground">{stat.changeLabel}</span>
      </div>
    </AdminCard>
  );
}

export function DashboardStatCards({ stats }: DashboardStatCardsProps) {
  return (
    <section aria-label="Overview metrics">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard stat={stats.revenue} />
        <StatCard stat={stats.orders} />
        <StatCard stat={stats.customers} />
        <StatCard stat={stats.products} />
      </div>
    </section>
  );
}
