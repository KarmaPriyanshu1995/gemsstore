import { AdminSeoPage } from "@/features/admin/seo";
import { getAdminSeo } from "@/services/admin-seo.service";

export default async function AdminSeoRoute() {
  const { data } = await getAdminSeo();

  return <AdminSeoPage initialData={data} />;
}
