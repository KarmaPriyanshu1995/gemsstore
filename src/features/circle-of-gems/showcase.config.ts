export const showcaseConfig = {
  sectionId: "circle-of-gems",
  sectionLabel: "Maharaja Gallery — Gemstone Showcase",
  /** Hero gemstone visual served from /public. */
  heroImage: "/images/showcase/gemstone.png",
  heroImageAlt: "Maharaja heritage gemstone",
  /** Milliseconds between automatic gemstone transitions. */
  intervalMs: 5000,
  /** CSS transition duration for fade (ms). */
  fadeDurationMs: 1400,
} as const;

export function getVisibleGemstones<T extends { visible: boolean; sortOrder: number }>(
  gemstones: T[],
): T[] {
  return gemstones
    .filter((g) => g.visible)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
