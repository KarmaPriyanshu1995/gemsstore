"use client";

import Link from "next/link";
import { Gem } from "lucide-react";

import { Button } from "@/components/ui/button";

export function CartEmpty() {
  return (
    <div className="flex flex-col items-center rounded-lg border border-dashed border-[rgba(199,164,90,0.3)] bg-ivory/40 px-6 py-20 text-center">
      <div className="mb-6 rounded-full bg-secondary/60 p-5">
        <Gem className="h-10 w-10 text-accent" aria-hidden />
      </div>
      <h2 className="font-heading text-2xl font-semibold tracking-tight">
        Your Heritage Cart Awaits
      </h2>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        No treasures selected yet. Explore our Maharaja collection of certified
        emeralds, rubies, sapphires, and diamonds curated for discerning
        collectors.
      </p>
      <Button variant="heritage" size="lg" className="mt-8" asChild>
        <Link href="/products">Continue Shopping</Link>
      </Button>
    </div>
  );
}
