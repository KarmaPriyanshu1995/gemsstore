"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/features/cart";
import { useWishlist } from "@/features/wishlist";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/catalog";
import { formatCurrency } from "@/utils/format-currency";

type ProductListingCardProps = {
  product: Product;
  view: "grid" | "list";
  onQuickView: (product: Product) => void;
};

export function ProductListingCard({
  product,
  view,
  onQuickView,
}: ProductListingCardProps) {
  const { addItem, isInCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product);
    toast.success(`${product.name} added to your cart`);
  };

  const handleWishlist = () => {
    const added = toggleItem(product);
    toast.success(
      added
        ? `${product.name} saved to wishlist`
        : `${product.name} removed from wishlist`,
    );
  };

  if (view === "list") {
    return (
      <Card className="overflow-hidden">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
          <Link
            href={`/products/${product.slug}`}
            className="relative aspect-square w-full shrink-0 overflow-hidden rounded-md sm:w-40"
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="160px"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            {!product.inStock && (
              <Badge
                variant="outline"
                className="absolute right-2 top-2 bg-background/90"
              >
                Sold Out
              </Badge>
            )}
          </Link>

          <div className="flex min-w-0 flex-1 flex-col gap-3">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {product.gemstoneType} · {product.origin}
              </p>
              <CardTitle className="mt-1 text-xl">
                <Link
                  href={`/products/${product.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {product.name}
                </Link>
              </CardTitle>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                {product.shortDescription ?? product.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
                {product.rating.toFixed(1)} ({product.reviewCount})
              </span>
              <span>{product.certification}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-heading text-2xl text-primary">
                {formatCurrency(product.price, product.currency)}
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuickView(product)}
                  aria-label={`Quick view ${product.name}`}
                >
                  <Eye className="h-4 w-4" />
                  Quick View
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWishlist}
                  aria-label={
                    wishlisted
                      ? `Remove ${product.name} from wishlist`
                      : `Add ${product.name} to wishlist`
                  }
                  aria-pressed={wishlisted}
                >
                  <Heart
                    className={cn("h-4 w-4", wishlisted && "fill-primary text-primary")}
                  />
                </Button>
                <Button
                  variant="heritage"
                  size="sm"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-4 w-4" />
                  {isInCart(product.id) ? "In Cart" : "Add to Cart"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.slug}`} className="block h-full w-full">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {!product.inStock && (
          <Badge
            variant="outline"
            className="absolute left-3 top-3 bg-background/90"
          >
            Sold Out
          </Badge>
        )}
        <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 bg-background/90 shadow-sm"
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="h-9 w-9 bg-background/90 shadow-sm"
            onClick={handleWishlist}
            aria-label={
              wishlisted
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
            aria-pressed={wishlisted}
          >
            <Heart
              className={cn("h-4 w-4", wishlisted && "fill-primary text-primary")}
            />
          </Button>
        </div>
      </div>

      <CardHeader className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {product.gemstoneType}
        </p>
        <CardTitle className="text-lg leading-snug">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors hover:text-primary"
          >
            {product.name}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 pt-0">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" aria-hidden />
          <span>
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
        <p className="font-heading text-xl text-primary">
          {formatCurrency(product.price, product.currency)}
        </p>
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          variant="heritage"
          className="w-full"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="h-4 w-4" />
          {isInCart(product.id) ? "In Cart" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
