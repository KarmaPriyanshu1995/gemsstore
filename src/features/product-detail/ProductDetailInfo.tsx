"use client";

import { useRouter } from "next/navigation";
import {
  Heart,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import { useState } from "react";

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
import { useWishlist } from "@/features/wishlist";
import { toast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/catalog";
import type { ProductSpecification } from "@/types/product-detail";
import { formatCurrency } from "@/utils/format-currency";

type ProductDetailInfoProps = {
  product: Product;
  specifications: ProductSpecification[];
};

export function ProductDetailInfo({
  product,
  specifications,
}: ProductDetailInfoProps) {
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const [consultOpen, setConsultOpen] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!product.inStock) return;
    addItem(product);
    toast.success(`${product.name} added to your cart`);
  };

  const handleBuyNow = () => {
    if (!product.inStock) return;
    addItem(product);
    toast.success("Proceeding to checkout");
    router.push("/checkout");
  };

  const handleWishlist = () => {
    const added = toggleItem(product);
    toast.success(
      added
        ? `${product.name} saved to wishlist`
        : `${product.name} removed from wishlist`,
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {product.gemstoneType} · {product.origin}
        </p>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          {product.name}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {product.shortDescription ?? product.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-accent text-accent" aria-hidden />
          {product.rating.toFixed(1)} ({product.reviewCount} reviews)
        </span>
        <Badge variant="accent">{product.certification}</Badge>
        <Badge variant={product.inStock ? "default" : "outline"}>
          {product.inStock ? "In Stock" : "Sold Out"}
        </Badge>
      </div>

      <p className="font-heading text-4xl text-primary">
        {formatCurrency(product.price, product.currency)}
      </p>

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Button
          variant="heritage"
          size="lg"
          className="flex-1 sm:flex-none"
          disabled={!product.inStock}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="h-4 w-4" />
          {isInCart(product.id) ? "In Cart" : "Add to Cart"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="flex-1 sm:flex-none"
          disabled={!product.inStock}
          onClick={handleBuyNow}
        >
          <Zap className="h-4 w-4" />
          Buy Now
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={handleWishlist}
          aria-pressed={wishlisted}
        >
          <Heart
            className={cn("h-4 w-4", wishlisted && "fill-primary text-primary")}
          />
          {wishlisted ? "Saved" : "Wishlist"}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => setConsultOpen(true)}
        >
          <MessageCircle className="h-4 w-4" />
          Consult Expert
        </Button>
      </div>

      <div className="rounded-lg border border-border/80 bg-secondary/20 p-5">
        <p className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider">
          <Sparkles className="h-4 w-4 text-accent" aria-hidden />
          Heritage Story
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        {product.benefits && (
          <>
            <p className="mt-4 font-heading text-sm font-semibold uppercase tracking-wider">
              Benefits
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {product.benefits}
            </p>
          </>
        )}
      </div>

      <div>
        <h2 className="font-heading text-lg font-semibold">Specifications</h2>
        <dl className="mt-4 divide-y divide-border/80 rounded-lg border border-border/80">
          {specifications.map((spec) => (
            <div
              key={spec.label}
              className="flex justify-between gap-4 px-4 py-3 text-sm"
            >
              <dt className="text-muted-foreground">{spec.label}</dt>
              <dd className="font-medium capitalize">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-heading">
              Consult a Gemstone Expert
            </DialogTitle>
            <DialogDescription>
              Our Maharaja concierge team will reach out within one business day
              to discuss {product.name}, custom settings, and heritage
              provenance.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            Email{" "}
            <a
              href="mailto:concierge@realgemsstore.com"
              className="font-medium text-primary hover:underline"
            >
              concierge@realgemsstore.com
            </a>{" "}
            or call +91 80 4000 0000 with reference{" "}
            <span className="font-mono text-foreground">{product.id}</span>.
          </p>
          <DialogFooter>
            <Button variant="heritage" onClick={() => setConsultOpen(false)}>
              Understood
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
