"use client";

import Image from "next/image";

import { showcaseConfig } from "@/features/circle-of-gems/showcase.config";
import type { Gemstone } from "@/types/catalog";

type GemstoneVisualProps = {
  gemstones: Gemstone[];
  activeIndex: number;
};

export function GemstoneVisual({ gemstones, activeIndex }: GemstoneVisualProps) {
  const activeGem = gemstones[activeIndex];

  return (
    <div className="relative min-h-[50vh] overflow-hidden bg-transparent md:min-h-screen">
      {/* Ambient glow from active gemstone */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
        style={{
          background: `radial-gradient(ellipse at 50% 45%, ${activeGem?.glowColor ?? "#C7A45A"}22 0%, transparent 65%)`,
        }}
        aria-hidden
      />

      <div className="relative flex h-full min-h-[50vh] items-center justify-center p-8 md:min-h-screen md:p-12">
        <div
          className="relative aspect-square w-full max-w-[min(85vw,520px)] transition-[filter] ease-in-out"
          style={{
            transitionDuration: `${showcaseConfig.fadeDurationMs}ms`,
            filter: activeGem
              ? `drop-shadow(0 0 48px ${activeGem.glowColor}88) drop-shadow(0 0 96px ${activeGem.glowColor}44)`
              : undefined,
          }}
        >
          <Image
            src={showcaseConfig.heroImage}
            alt={showcaseConfig.heroImageAlt}
            fill
            sizes="(max-width: 768px) 85vw, 520px"
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
