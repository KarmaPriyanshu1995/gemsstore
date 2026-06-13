"use client";

import { useEffect, useMemo, useState } from "react";

import { GemstonePanel } from "@/features/circle-of-gems/GemstonePanel";
import { GemstoneVisual } from "@/features/circle-of-gems/GemstoneVisual";
import {
  getVisibleGemstones,
  showcaseConfig,
} from "@/features/circle-of-gems/showcase.config";
import { useGemstoneCarousel } from "@/features/circle-of-gems/useGemstoneCarousel";
import type { Gemstone } from "@/types/catalog";

type CircleOfGemsProps = {
  gemstones: Gemstone[];
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefersReducedMotion;
}

export function CircleOfGems({ gemstones }: CircleOfGemsProps) {
  const items = useMemo(() => getVisibleGemstones(gemstones), [gemstones]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  const { activeIndex, goTo } = useGemstoneCarousel({
    itemCount: items.length,
    prefersReducedMotion,
    paused,
  });

  if (items.length === 0) return null;

  const activeGem = items[activeIndex];
  if (!activeGem) return null;

  return (
    <section
      id={showcaseConfig.sectionId}
      aria-label={showcaseConfig.sectionLabel}
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="grid min-h-0 grid-cols-1 md:grid-cols-2">
        <GemstonePanel
          gem={activeGem}
          index={activeIndex}
          total={items.length}
          onSelect={goTo}
        />
        <GemstoneVisual gemstones={items} activeIndex={activeIndex} />
      </div>
    </section>
  );
}
