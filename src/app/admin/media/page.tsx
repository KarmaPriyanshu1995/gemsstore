import { AdminMediaPage } from "@/features/admin/media";
import { getAdminMedia } from "@/services/admin-media.service";

export default async function AdminMediaRoute() {
  const { data } = await getAdminMedia();

  return <AdminMediaPage initialAssets={data} />;
}
