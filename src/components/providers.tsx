"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

import { CartProvider } from "@/features/cart";
import { WishlistProvider } from "@/features/wishlist";

const Toaster = dynamic(
  () => import("@/components/ui/sonner").then((mod) => mod.Toaster),
  { ssr: false },
);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <WishlistProvider>
        {children}
        <Toaster position="top-right" closeButton />
      </WishlistProvider>
    </CartProvider>
  );
}
