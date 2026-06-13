# PRD — Circle of Gems (Maharaja Gallery Showcase)

## Overview

The signature RealGemsStore experience is a **Maharaja Gallery** showcase: a single large gemstone on a cinematic black stage (right), with a storytelling panel (left) that updates automatically every few seconds. Transitions use graceful crossfades — treasures unveiled like a royal gallery.

## Goals

- Replace scroll-driven circular ring with luxurious auto-fading showcase.
- Match reference aesthetic: black background, glowing gemstone, starfield particles.
- Display name, description, origin, benefits, certification, price, and CTA.
- Pause auto-rotation on hover/focus for accessibility.
- Data-driven from `gemstones.service.ts`.

## User Stories

- As a **visitor**, I watch gemstones unveil themselves in a cinematic gallery.
- As a **shopper**, I read benefits and certification for each stone.
- As a **developer**, I configure interval and content via `showcase.config.ts` and mock data.

## Scope

### Included

- Split layout: storytelling panel (left) + large gemstone visual (right).
- Auto-rotate every 5 seconds with 1.4s crossfade.
- Glow, vignette, and starfield on black stage (reference image treatment).
- Panel fields: name, description, origin, benefits, certification, price, CTA.
- Progress indicator dots (manual select).
- Pause on hover/focus.
- `prefers-reduced-motion` disables auto-rotate.
- Reference image used for Diamond showcase asset.

### Excluded

- GSAP / ScrollTrigger circular animation (removed).
- Scroll-pinned section.
- ~~Signature Experience Manager admin UI~~ (see `docs/prd/signature-experience-manager.md`)

## User Flows

1. User scrolls to `#circle-of-gems` → first gemstone displayed.
2. Every 5s → gemstone fades out, next fades in; panel content crossfades.
3. User hovers section → rotation pauses.
4. User clicks progress dot → jumps to that gemstone.
5. User clicks **Unveil** CTA → `/products?gemstone={slug}`.

## Screens

| Location | Purpose |
|----------|---------|
| `/` section `#circle-of-gems` | Maharaja Gallery showcase |

## Components

| Component | Location | Purpose |
|-----------|----------|---------|
| CircleOfGems | `CircleOfGems.tsx` | Main showcase container |
| GemstonePanel | `GemstonePanel.tsx` | Left storytelling panel |
| GemstoneVisual | `GemstoneVisual.tsx` | Right cinematic gem stage |
| useGemstoneCarousel | `useGemstoneCarousel.ts` | Auto-rotate timer |
| showcase.config.ts | `showcase.config.ts` | Interval, fade duration |

## File Structure

```
src/features/circle-of-gems/
├── CircleOfGems.tsx
├── GemstonePanel.tsx
├── GemstoneVisual.tsx
├── useGemstoneCarousel.ts
├── showcase.config.ts
└── index.ts
public/images/showcase/maharaja-gem-reference.png
```

## Mock Data Requirements

Each gemstone requires: `name`, `description`, `origin`, `benefits`, `certification`, `glowColor`, `priceFrom`, `image`, `visible`, `sortOrder`.

## Future Backend Requirements

```
GET /api/gemstones
```

Admin may later manage benefits, certification copy, and showcase interval.

## Accessibility

- Section `aria-label`; progress dots as `role="tablist"`.
- Panel content is real text (screen-reader accessible).
- Pause on hover/focus.
- `prefers-reduced-motion` disables auto-rotate.

## Performance Considerations

- CSS transitions only (no GSAP).
- `next/image` with `object-contain` and fixed aspect ratio.
- Local reference image for Diamond; remote images at w=1200.

## Implementation Checklist

- [x] Replace circular scroll animation with auto-fade showcase
- [x] Cinematic black stage with glow and starfield
- [x] Panel with benefits and certification
- [x] Reference image for Diamond
- [x] Carousel pause on hover
- [x] Progress indicator dots

## Acceptance Criteria

- [x] Single large gemstone visible on right (not circular ring).
- [x] Auto-fade every ~5 seconds.
- [x] Panel updates with name, description, origin, benefits, certification, CTA.
- [x] Black cinematic background matching reference aesthetic.
- [x] `npm run build` passes.
