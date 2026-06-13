import type { Metadata } from "next";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { CollectionsPage } from "@/features/collections";
import { getCollections } from "@/services/collections.service";

export const metadata: Metadata = {
  title: "Collections — RealGemsStore",
  description:
    "Browse curated gemstone collections inspired by Maharaja Heritage craftsmanship.",
};

export default async function CollectionsRoute() {
  const { data: collections } = await getCollections();

  return (
    <StorefrontShell activeHref="/collections">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Collections" }]}
        className="mx-auto mb-6 max-w-7xl px-6 pt-10"
      />
      <CollectionsPage collections={collections} />
    </StorefrontShell>
  );
}
