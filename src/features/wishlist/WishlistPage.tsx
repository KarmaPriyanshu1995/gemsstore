"use client";

import Link from "next/link";

import { Breadcrumb } from "@/components/navigation/breadcrumb";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WishlistCard } from "@/features/wishlist/WishlistCard";
import { WishlistEmpty } from "@/features/wishlist/WishlistEmpty";
import { useWishlist } from "@/features/wishlist/wishlist-context";
import { toast } from "@/lib/toast";

export function WishlistPage() {
  const wishlist = useWishlist();

  const handleRemove = (productId: string) => {
    const item = wishlist.items.find((entry) => entry.productId === productId);
    wishlist.removeItem(productId);
    if (item) {
      toast.success(`${item.name} removed from wishlist`);
    }
  };

  if (!wishlist.isHydrated) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-10">
        <Skeleton className="mb-8 h-4 w-40" />
        <Skeleton className="mb-8 h-10 w-48" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="aspect-[3/4] w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]}
        className="mb-8"
      />

      <header className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Maharaja Heritage
          </p>
          <h1 className="mt-2 font-heading text-4xl font-semibold tracking-tight md:text-5xl">
            Your Wishlist
          </h1>
          {wishlist.items.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {wishlist.items.length}{" "}
              {wishlist.items.length === 1 ? "treasure" : "treasures"} saved
            </p>
          )}
        </div>
        {wishlist.items.length > 0 && (
          <Button variant="outline" asChild>
            <Link href="/products">Continue Shopping</Link>
          </Button>
        )}
      </header>

      {wishlist.items.length === 0 ? (
        <WishlistEmpty />
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.items.map((item) => (
            <WishlistCard
              key={item.productId}
              item={item}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
