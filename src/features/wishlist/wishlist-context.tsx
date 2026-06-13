"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { WishlistItem } from "@/features/wishlist/types";
import type { Product } from "@/types/catalog";

const STORAGE_KEY = "realgems-wishlist";

type WishlistContextValue = {
  items: WishlistItem[];
  isHydrated: boolean;
  toggleItem: (product: Product) => boolean;
  removeItem: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

function readStoredWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WishlistItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredWishlist(items: WishlistItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredWishlist());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStoredWishlist(items);
  }, [items, hydrated]);

  const isWishlisted = useCallback(
    (productId: string) => items.some((item) => item.productId === productId),
    [items],
  );

  const removeItem = useCallback((productId: string) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }, []);

  const toggleItem = useCallback((product: Product) => {
    let added = false;

    setItems((current) => {
      const exists = current.some((item) => item.productId === product.id);

      if (exists) {
        return current.filter((item) => item.productId !== product.id);
      }

      added = true;
      return [
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          currency: product.currency,
          image: product.images[0] ?? "",
          addedAt: new Date().toISOString(),
        },
        ...current,
      ];
    });

    return added;
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      isHydrated: hydrated,
      toggleItem,
      removeItem,
      isWishlisted,
      clearWishlist,
    }),
    [items, hydrated, toggleItem, removeItem, isWishlisted, clearWishlist],
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
}
