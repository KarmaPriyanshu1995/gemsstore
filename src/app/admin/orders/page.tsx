import { AdminOrdersPage } from "@/features/admin/orders";
import { getAdminOrders } from "@/services/admin-orders.service";

export default async function AdminOrdersRoute() {
  const { data } = await getAdminOrders();

  return <AdminOrdersPage initialOrders={data} />;
}
