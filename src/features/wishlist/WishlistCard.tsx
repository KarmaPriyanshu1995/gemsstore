"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Eye, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCart } from "@/features/cart";
import type { WishlistItem } from "@/features/wishlist/types";
import { toast } from "@/lib/toast";
import { getProductBySlug } from "@/services/products.service";
import { formatCurrency } from "@/utils/format-currency";

type WishlistCardProps = {
  item: WishlistItem;
  onRemove: (productId: string) => void;
};

export function WishlistCard({ item, onRemove }: WishlistCardProps) {
  const { addItem, isInCart } = useCart();
  const [moving, setMoving] = useState(false);

  const handleMoveToCart = async () => {
    setMoving(true);
    try {
      const { data: product } = await getProductBySlug(item.slug);
      if (!product) {
        toast.error("This treasure is no longer available");
        onRemove(item.productId);
        return;
      }
      if (!product.inStock) {
        toast.error(`${product.name} is currently sold out`);
        return;
      }
      addItem(product);
      toast.success(`${product.name} moved to cart`);
      onRemove(item.productId);
    } finally {
      setMoving(false);
    }
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <Link
        href={`/products/${item.slug}`}
        className="relative block aspect-square overflow-hidden"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      <CardHeader className="space-y-1 pb-2">
        <CardTitle className="text-lg leading-snug">
          <Link
            href={`/products/${item.slug}`}
            className="transition-colors hover:text-primary"
          >
            {item.name}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pt-0">
        <p className="font-heading text-xl text-primary">
          {formatCurrency(item.price, item.currency)}
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button
          variant="heritage"
          className="w-full"
          disabled={moving || isInCart(item.productId)}
          onClick={handleMoveToCart}
        >
          <ShoppingBag className="h-4 w-4" />
          {isInCart(item.productId) ? "Already in Cart" : "Move to Cart"}
        </Button>
        <div className="flex w-full gap-2">
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/products/${item.slug}`}>
              <Eye className="h-4 w-4" />
              View
            </Link>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onRemove(item.productId)}
            aria-label={`Remove ${item.name} from wishlist`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
