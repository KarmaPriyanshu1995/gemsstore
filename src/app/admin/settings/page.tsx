import { AdminSettingsPage } from "@/features/admin/settings";
import { getAdminSettings } from "@/services/admin-settings.service";

export default async function AdminSettingsRoute() {
  const { data } = await getAdminSettings();

  return <AdminSettingsPage initialData={data} />;
}
