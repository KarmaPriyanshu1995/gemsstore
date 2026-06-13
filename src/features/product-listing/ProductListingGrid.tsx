import type { Product } from "@/types/catalog";

import { ProductListingCard } from "./ProductListingCard";

type ProductListingGridProps = {
  products: Product[];
  onQuickView: (product: Product) => void;
};

export function ProductListingGrid({
  products,
  onQuickView,
}: ProductListingGridProps) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <li key={product.id}>
          <ProductListingCard
            product={product}
            view="grid"
            onQuickView={onQuickView}
          />
        </li>
      ))}
    </ul>
  );
}
