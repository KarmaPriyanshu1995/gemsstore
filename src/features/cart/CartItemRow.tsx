"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cartConfig } from "@/features/cart/cart.config";
import type { CartItem } from "@/features/cart/types";
import { formatCurrency } from "@/utils/format-currency";

type CartItemRowProps = {
  item: CartItem;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
};

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const lineTotal = item.price * item.quantity;

  return (
    <article className="flex flex-col gap-4 border-b border-border/80 py-6 sm:flex-row sm:items-center">
      <Link
        href={`/products/${item.slug}`}
        className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg border border-border/80 bg-secondary/20"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="112px"
          className="object-cover"
        />
      </Link>

      <div className="min-w-0 flex-1 space-y-2">
        <Link
          href={`/products/${item.slug}`}
          className="font-heading text-lg font-semibold transition-colors hover:text-primary"
        >
          {item.name}
        </Link>
        <p className="text-sm text-muted-foreground">
          {formatCurrency(item.price, item.currency)} each
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className="inline-flex items-center rounded-md border border-input"
            role="group"
            aria-label={`Quantity for ${item.name}`}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              onClick={() => onUpdateQuantity(item.productId, item.quantity - 1)}
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="min-w-[2.5rem] text-center text-sm font-medium">
              {item.quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-none"
              disabled={item.quantity >= cartConfig.maxQuantity}
              onClick={() => onUpdateQuantity(item.productId, item.quantity + 1)}
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(item.productId)}
          >
            <Trash2 className="h-4 w-4" />
            Remove
          </Button>
        </div>
      </div>

      <p className="font-heading text-xl text-primary sm:text-right">
        {formatCurrency(lineTotal, item.currency)}
      </p>
    </article>
  );
}
