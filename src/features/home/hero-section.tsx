import Link from "next/link";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/design-tokens";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <p className="font-body text-sm uppercase tracking-[0.25em] text-muted-foreground">
            {siteConfig.tagline}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
            Timeless gemstones, crafted for the modern maharaja.
          </h1>
          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-muted-foreground md:text-lg">
            Discover certified emeralds, rubies, and sapphires — each piece
            hand-selected and set with the artistry of Indian royal heritage.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="heritage" size="lg" asChild>
              <Link href="/collections">Shop Collection</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#circle-of-gems">Maharaja Gallery</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
