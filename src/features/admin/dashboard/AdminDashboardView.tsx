import { DashboardStatCards } from "@/features/admin/dashboard/DashboardStatCards";
import { NotificationsPanel } from "@/features/admin/dashboard/NotificationsPanel";
import { QuickActions } from "@/features/admin/dashboard/QuickActions";
import { RecentOrdersTable } from "@/features/admin/dashboard/RecentOrdersTable";
import { TopSellingGemstones } from "@/features/admin/dashboard/TopSellingGemstones";
import type { AdminDashboardData } from "@/types/admin";

type AdminDashboardViewProps = {
  data: AdminDashboardData;
};

export function AdminDashboardView({ data }: AdminDashboardViewProps) {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Command Center
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Dashboard
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Your luxury gemstone empire at a glance — revenue, orders, and
          heritage inventory health.
        </p>
      </header>

      <DashboardStatCards stats={data.overview} />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <RecentOrdersTable orders={data.recentOrders} />
          <TopSellingGemstones gemstones={data.topGemstones} />
        </div>

        <div className="space-y-6">
          <QuickActions actions={data.quickActions} />
          <NotificationsPanel notifications={data.notifications} />
        </div>
      </div>
    </div>
  );
}
