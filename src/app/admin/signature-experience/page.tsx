import { AdminSignaturePage } from "@/features/admin/signature-manager";
import { getSignatureManager } from "@/services/signature-manager.service";

export default async function AdminSignatureExperienceRoute() {
  const { data } = await getSignatureManager();

  return <AdminSignaturePage initialData={data} />;
}
