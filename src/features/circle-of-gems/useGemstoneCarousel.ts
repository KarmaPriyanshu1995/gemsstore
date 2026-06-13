"use client";

import { useCallback, useEffect, useState } from "react";

import { showcaseConfig } from "@/features/circle-of-gems/showcase.config";

type UseGemstoneCarouselOptions = {
  itemCount: number;
  prefersReducedMotion: boolean;
  paused?: boolean;
};

export function useGemstoneCarousel({
  itemCount,
  prefersReducedMotion,
  paused = false,
}: UseGemstoneCarouselOptions) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (itemCount === 0) return;
      setActiveIndex(((index % itemCount) + itemCount) % itemCount);
    },
    [itemCount],
  );

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  useEffect(() => {
    if (itemCount <= 1 || prefersReducedMotion || paused) return;

    const timer = window.setInterval(goNext, showcaseConfig.intervalMs);
    return () => window.clearInterval(timer);
  }, [itemCount, prefersReducedMotion, paused, goNext]);

  return { activeIndex, goTo, goNext };
}
