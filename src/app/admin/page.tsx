import { AdminDashboardView } from "@/features/admin/dashboard";
import { getAdminDashboard } from "@/services/admin-dashboard.service";

export default async function AdminDashboardPage() {
  const { data } = await getAdminDashboard();

  return <AdminDashboardView data={data} />;
}
