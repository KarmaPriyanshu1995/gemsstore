"use client";

import Link from "next/link";
import { Award, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { showcaseConfig } from "@/features/circle-of-gems/showcase.config";
import { cn } from "@/lib/utils";
import type { Gemstone } from "@/types/catalog";
import { formatCurrency } from "@/utils/format-currency";

type GemstonePanelProps = {
  gem: Gemstone;
  index: number;
  total: number;
  onSelect: (index: number) => void;
};

export function GemstonePanel({
  gem,
  index,
  total,
  onSelect,
}: GemstonePanelProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const timer = window.setTimeout(() => setVisible(true), 80);
    return () => window.clearTimeout(timer);
  }, [gem.id]);

  return (
    <div className="flex min-h-[50vh] flex-col justify-center bg-background px-6 py-14 md:min-h-screen lg:px-14 lg:py-0">
      <p className="font-body text-sm uppercase tracking-[0.3em] text-muted-foreground">
        Maharaja Gallery
      </p>

      <div
        className={cn(
          "transition-all ease-out",
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-4 opacity-0",
        )}
        style={{ transitionDuration: `${showcaseConfig.fadeDurationMs}ms` }}
      >
        <p className="mt-3 font-body text-xs tracking-widest text-muted-foreground">
          Treasure {String(index + 1).padStart(2, "0")} of{" "}
          {String(total).padStart(2, "0")}
        </p>

        <h2 className="mt-4 font-heading text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
          {gem.name}
        </h2>

        <div className="mt-5 flex flex-wrap gap-2">
          <Badge variant="accent">{gem.origin}</Badge>
          <Badge variant="outline" className="gap-1">
            <Award className="h-3 w-3" aria-hidden />
            Certified
          </Badge>
        </div>

        <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-muted-foreground md:text-lg">
          {gem.description}
        </p>

        <div className="mt-6 max-w-lg rounded-lg border border-border/80 bg-secondary/20 p-5">
          <p className="flex items-center gap-2 font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            <Sparkles className="h-4 w-4 text-accent" aria-hidden />
            Heritage Benefits
          </p>
          <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">
            {gem.benefits}
          </p>
        </div>

        <p className="mt-5 font-body text-xs uppercase tracking-[0.15em] text-muted-foreground">
          {gem.certification}
        </p>

        <p className="mt-4 font-heading text-2xl text-primary md:text-3xl">
          From {formatCurrency(gem.priceFrom)}
        </p>

        <Button variant="heritage" size="lg" className="mt-8 w-fit" asChild>
          <Link href={`/products?gemstone=${gem.slug}`}>
            Unveil {gem.name}
          </Link>
        </Button>
      </div>

      <div
        className="mt-10 flex gap-2"
        role="tablist"
        aria-label="Gemstone gallery"
      >
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`View gemstone ${i + 1}`}
            onClick={() => onSelect(i)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === index
                ? "w-10 bg-primary"
                : "w-3 bg-border hover:bg-accent/60",
            )}
          />
        ))}
      </div>
    </div>
  );
}
