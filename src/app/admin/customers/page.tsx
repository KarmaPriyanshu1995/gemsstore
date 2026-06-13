import { AdminCustomersPage } from "@/features/admin/customers";
import { getAdminCustomers } from "@/services/admin-customers.service";

export default async function AdminCustomersRoute() {
  const { data } = await getAdminCustomers();

  return <AdminCustomersPage initialCustomers={data} />;
}
