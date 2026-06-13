import Link from "next/link";
import { Gem } from "lucide-react";

import { StorefrontShell } from "@/components/layout/storefront-shell";
import { Button } from "@/components/ui/button";

export default function ProductNotFound() {
  return (
    <StorefrontShell activeHref="/products">
      <div className="mx-auto flex max-w-lg flex-col items-center px-6 py-24 text-center">
        <Gem className="h-12 w-12 text-accent" aria-hidden />
        <h1 className="mt-6 font-heading text-3xl font-semibold">
          Treasure Not Found
        </h1>
        <p className="mt-3 text-muted-foreground">
          This gemstone may have been reserved or removed from our heritage
          collection.
        </p>
        <Button variant="heritage" className="mt-8" asChild>
          <Link href="/products">Browse All Gemstones</Link>
        </Button>
      </div>
    </StorefrontShell>
  );
}
