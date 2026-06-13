"use client";

import { useCallback, useEffect, useState } from "react";

import { recentlyViewedConfig } from "@/features/product-detail/product-detail.config";
import type { RecentlyViewedItem } from "@/types/product-detail";
import type { Product } from "@/types/catalog";

function readRecentlyViewed(): RecentlyViewedItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(recentlyViewedConfig.storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RecentlyViewedItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRecentlyViewed(items: RecentlyViewedItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    recentlyViewedConfig.storageKey,
    JSON.stringify(items),
  );
}

export function useRecentlyViewed(product: Product) {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);

  useEffect(() => {
    setItems(readRecentlyViewed());
  }, []);

  useEffect(() => {
    const entry: RecentlyViewedItem = {
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      currency: product.currency,
      image: product.images[0] ?? "",
      viewedAt: new Date().toISOString(),
    };

    const next = [
      entry,
      ...readRecentlyViewed().filter((item) => item.productId !== product.id),
    ].slice(0, recentlyViewedConfig.maxItems);

    writeRecentlyViewed(next);
    setItems(next);
  }, [product]);

  const getOthers = useCallback(
    () => items.filter((item) => item.slug !== product.slug),
    [items, product.slug],
  );

  return { getOthers };
}
