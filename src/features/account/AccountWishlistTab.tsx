"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { WishlistCard } from "@/features/wishlist/WishlistCard";
import { WishlistEmpty } from "@/features/wishlist/WishlistEmpty";
import { useWishlist } from "@/features/wishlist/wishlist-context";
import { toast } from "@/lib/toast";

export function AccountWishlistTab() {
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[3/4] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold">Wishlist</h2>
          {wishlist.items.length > 0 && (
            <p className="mt-1 text-sm text-muted-foreground">
              {wishlist.items.length}{" "}
              {wishlist.items.length === 1 ? "treasure" : "treasures"} saved
            </p>
          )}
        </div>
        {wishlist.items.length > 0 && (
          <Button variant="outline" size="sm" asChild>
            <Link href="/wishlist">Open full wishlist</Link>
          </Button>
        )}
      </div>

      {wishlist.items.length === 0 ? (
        <WishlistEmpty />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
