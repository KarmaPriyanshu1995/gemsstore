import type { Metadata } from "next";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { ContactPage } from "@/features/storefront";
import { getContactPage } from "@/services/storefront.service";

export const metadata: Metadata = {
  title: "Contact — RealGemsStore",
  description:
    "Reach RealGemsStore concierge for gemstone consultations, certifications, and bespoke orders.",
};

export default async function ContactRoute() {
  const { data: content } = await getContactPage();

  return (
    <StorefrontShell activeHref="/contact">
      <ContactPage content={content} />
    </StorefrontShell>
  );
}
