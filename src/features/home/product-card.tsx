import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Product } from "@/types/catalog";
import { formatCurrency } from "@/utils/format-currency";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.inStock && (
          <Badge
            variant="outline"
            className="absolute right-3 top-3 bg-background/90"
          >
            Sold Out
          </Badge>
        )}
      </div>
      <CardHeader className="space-y-1">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {product.gemstoneType}
        </p>
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="font-heading text-xl text-primary">
          {formatCurrency(product.price, product.currency)}
        </p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/products/${product.slug}`}
          className="text-sm font-medium text-primary underline-offset-4 transition-colors hover:underline"
        >
          View details
        </Link>
      </CardFooter>
    </Card>
  );
}
