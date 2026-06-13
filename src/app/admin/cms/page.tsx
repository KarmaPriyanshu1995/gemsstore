import { AdminCmsPage } from "@/features/admin/cms";
import { getAdminCms } from "@/services/admin-cms.service";

export default async function AdminCmsRoute() {
  const { data } = await getAdminCms();

  return <AdminCmsPage initialData={data} />;
}
