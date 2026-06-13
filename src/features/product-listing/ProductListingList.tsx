import type { Product } from "@/types/catalog";

import { ProductListingCard } from "./ProductListingCard";

type ProductListingListProps = {
  products: Product[];
  onQuickView: (product: Product) => void;
};

export function ProductListingList({
  products,
  onQuickView,
}: ProductListingListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductListingCard
            product={product}
            view="list"
            onQuickView={onQuickView}
          />
        </li>
      ))}
    </ul>
  );
}
