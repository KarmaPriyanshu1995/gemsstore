"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCart } from "@/features/cart";
import { toast } from "@/lib/toast";
import type { Product } from "@/types/catalog";
import { formatCurrency } from "@/utils/format-currency";

type ProductQuickViewProps = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProductQuickView({
  product,
  open,
  onOpenChange,
}: ProductQuickViewProps) {
  const { addItem, isInCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product);
    toast.success(`${product.name} added to your cart`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl gap-0 overflow-hidden p-0 sm:rounded-lg">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-secondary/30 md:aspect-auto md:min-h-[320px]">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 400px"
              className="object-cover"
              priority
            />
          </div>

          <div className="flex flex-col gap-4 p-6">
            <DialogHeader className="space-y-2 text-left">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                {product.gemstoneType} · {product.origin}
              </p>
              <DialogTitle className="text-2xl">{product.name}</DialogTitle>
              <DialogDescription className="line-clamp-3">
                {product.shortDescription ?? product.description}
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1 text-muted-foreground">
                <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
                {product.rating.toFixed(1)} ({product.reviewCount} reviews)
              </span>
              {!product.inStock && <Badge variant="outline">Sold Out</Badge>}
            </div>

            <p className="font-heading text-3xl text-primary">
              {formatCurrency(product.price, product.currency)}
            </p>

            <p className="text-sm text-muted-foreground">{product.certification}</p>

            <DialogFooter className="mt-auto flex-col gap-2 sm:flex-col sm:space-x-0">
              <Button
                variant="heritage"
                className="w-full"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4" />
                {isInCart(product.id) ? "In Cart" : "Add to Cart"}
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href={`/products/${product.slug}`}>View Full Details</Link>
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
