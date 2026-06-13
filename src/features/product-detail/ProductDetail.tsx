"use client";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { ProductDetailFaqs } from "@/features/product-detail/ProductDetailFaqs";
import { ProductDetailInfo } from "@/features/product-detail/ProductDetailInfo";
import { ProductDetailReviews } from "@/features/product-detail/ProductDetailReviews";
import { ProductGallery } from "@/features/product-detail/ProductGallery";
import { ProductRecentlyViewed } from "@/features/product-detail/ProductRecentlyViewed";
import { ProductRelated } from "@/features/product-detail/ProductRelated";
import type { ProductDetailData } from "@/types/product-detail";

type ProductDetailProps = {
  data: ProductDetailData;
};

export function ProductDetail({ data }: ProductDetailProps) {
  const { product, gallery, specifications, reviews, faqs, relatedProducts } =
    data;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
        className="mb-8"
      />

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={gallery} alt={product.name} />
        <ProductDetailInfo
          product={product}
          specifications={specifications}
        />
      </div>

      <div className="mt-16 space-y-16 border-t border-border/80 pt-16">
        <ProductDetailReviews product={product} reviews={reviews} />
        <ProductDetailFaqs faqs={faqs} />
        <ProductRelated products={relatedProducts} />
        <ProductRecentlyViewed product={product} />
      </div>
    </div>
  );
}
