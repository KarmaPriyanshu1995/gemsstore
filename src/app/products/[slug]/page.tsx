import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { ProductDetail } from "@/features/product-detail";
import { getProductDetail } from "@/services/products.service";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await getProductDetail(slug);

  if (!data) {
    return { title: "Product Not Found — RealGemsStore" };
  }

  return {
    title: `${data.product.name} — RealGemsStore`,
    description:
      data.product.shortDescription ?? data.product.description.slice(0, 160),
  };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { slug } = await params;
  const { data } = await getProductDetail(slug);

  if (!data) {
    notFound();
  }

  return (
    <StorefrontShell activeHref="/products">
      <ProductDetail data={data} />
    </StorefrontShell>
  );
}
