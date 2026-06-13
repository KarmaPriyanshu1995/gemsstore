"use client";

import Link from "next/link";
import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

export function WishlistEmpty() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-[rgba(199,164,90,0.3)] bg-ivory/40 px-6 py-20 text-center">
      <div className="mb-6 rounded-full bg-secondary/60 p-5">
        <Heart className="h-10 w-10 text-accent" aria-hidden />
      </div>
      <h2 className="font-heading text-2xl font-semibold tracking-tight">
        Your Wishlist Awaits
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        Save heritage gemstones you love and return when you are ready to
        unveil them. Tap the heart on any product to begin your collection.
      </p>
      <Button variant="heritage" size="lg" className="mt-8" asChild>
        <Link href="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
}
