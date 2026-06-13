import Link from "next/link";

import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="bg-primary py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="font-heading text-3xl font-semibold text-primary-foreground md:text-4xl">
          Begin your heritage collection
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-primary-foreground/80">
          Explore certified gemstones and heirloom-quality settings — each piece
          a testament to maharaja craftsmanship.
        </p>
        <Button
          size="lg"
          className="mt-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          asChild
        >
          <Link href="/products">Shop Now</Link>
        </Button>
      </div>
    </section>
  );
}
