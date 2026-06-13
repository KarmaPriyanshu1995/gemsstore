"use client";

import { CheckCircle2, Gem, Sparkles } from "lucide-react";

type OrderSuccessHeroProps = {
  orderNumber: string;
  customerName: string;
};

export function OrderSuccessHero({
  orderNumber,
  customerName,
}: OrderSuccessHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-[rgba(199,164,90,0.25)] bg-gradient-to-br from-ivory via-background to-secondary/30 px-6 py-12 text-center md:px-12 md:py-16">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(199,164,90,0.2) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-lg">
        <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10" />
          <div className="absolute inset-2 rounded-full border border-accent/30" />
          <CheckCircle2
            className="relative h-12 w-12 text-primary"
            aria-hidden
          />
          <Sparkles
            className="absolute -right-1 top-0 h-5 w-5 text-accent"
            aria-hidden
          />
          <Gem
            className="absolute -left-1 bottom-1 h-5 w-5 text-accent"
            aria-hidden
          />
        </div>

        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Order Confirmed
        </p>
        <h1 className="mt-3 font-heading text-3xl font-semibold tracking-tight md:text-4xl">
          Thank You, {customerName.split(" ")[0]}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          Your heritage treasures are being prepared with concierge care. A
          confirmation has been sent to your email.
        </p>
        <p className="mt-6 font-mono text-sm font-medium text-primary">
          {orderNumber}
        </p>
      </div>
    </div>
  );
}
