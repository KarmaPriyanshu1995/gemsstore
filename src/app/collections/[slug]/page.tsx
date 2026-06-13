import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { CollectionDetailPage } from "@/features/collections";
import { getCollectionDetail } from "@/services/collections.service";

type CollectionDetailRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: CollectionDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getCollectionDetail(slug);

  if (!data) {
    return { title: "Collection Not Found — RealGemsStore" };
  }

  return {
    title: `${data.collection.name} — RealGemsStore`,
    description: data.collection.description,
  };
}

export default async function CollectionDetailRoute({
  params,
}: CollectionDetailRouteProps) {
  const { slug } = await params;
  const { data } = await getCollectionDetail(slug);

  if (!data) {
    notFound();
  }

  return (
    <StorefrontShell activeHref="/collections">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          { label: data.collection.name },
        ]}
        className="mx-auto mb-6 max-w-7xl px-6 pt-10"
      />
      <CollectionDetailPage data={data} />
    </StorefrontShell>
  );
}
