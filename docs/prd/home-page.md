# PRD — Home Page

## Overview

The RealGemsStore home page is the primary storefront entry point. It introduces the Maharaja Heritage brand, surfaces featured collections and products, and builds trust through storytelling and testimonials. Data is fetched via service abstractions returning mock data.

## Goals

- Deliver a production-quality luxury landing experience.
- Reuse existing design system components exclusively.
- Fetch all content through services (no hardcoded data in UI).
- Prepare layout patterns for future storefront pages.
- Exclude Circle of Gems (deferred to Phase 2).

## User Stories

- As a **visitor**, I immediately understand RealGemsStore's luxury positioning.
- As a **shopper**, I can browse featured collections and products from the home page.
- As a **customer**, I read testimonials that reinforce trust and craftsmanship.
- As a **developer**, I extend home sections without touching mock data in components.

## Scope

### Included

- Storefront Header and Footer (shared layout primitives).
- Hero section with primary and secondary CTAs.
- Featured collections grid (excludes Circle of Gems collection).
- Featured products grid.
- Heritage craftsmanship / brand story section.
- Testimonials section.
- Closing CTA banner.
- Server-side data fetching via `homepage.service.ts`.

### Excluded

- Circle of Gems signature experience.
- Cart, wishlist, or search functionality (links only).
- Product listing or detail pages (links placeholder).
- Animations (Framer Motion / GSAP).
- Admin CMS integration.

## User Flows

1. Visitor lands on `/` → sees hero, scrolls through collections and products.
2. Visitor clicks **Shop Collection** → navigates to `/collections` (future PLP).
3. Visitor clicks a product card → navigates to `/products/[slug]` (future PDP).
4. Visitor clicks **Explore Heritage** → scrolls to craftsmanship section.

## Screens

| Route | Purpose |
|-------|---------|
| `/` | Home page |

## Components

| Component | Location | Purpose |
|-----------|----------|---------|
| StorefrontShell | `components/layout/storefront-shell.tsx` | Header + main + Footer wrapper |
| Header | `components/layout/header.tsx` | Logo, navigation, utility links |
| Footer | `components/layout/footer.tsx` | Brand, links, copyright |
| HeroSection | `features/home/hero-section.tsx` | Above-the-fold hero |
| FeaturedCollections | `features/home/featured-collections.tsx` | Collection cards |
| FeaturedProducts | `features/home/featured-products.tsx` | Product cards |
| HeritageSection | `features/home/heritage-section.tsx` | Brand story |
| TestimonialsSection | `features/home/testimonials-section.tsx` | Customer quotes |
| CtaBanner | `features/home/cta-banner.tsx` | Closing call-to-action |
| CollectionCard | `features/home/collection-card.tsx` | Reusable collection card |
| ProductCard | `features/home/product-card.tsx` | Reusable product card |

## File Structure

```
src/
├── app/page.tsx
├── components/layout/
│   ├── header.tsx
│   ├── footer.tsx
│   └── storefront-shell.tsx
├── features/home/
│   ├── hero-section.tsx
│   ├── featured-collections.tsx
│   ├── featured-products.tsx
│   ├── heritage-section.tsx
│   ├── testimonials-section.tsx
│   ├── cta-banner.tsx
│   ├── collection-card.tsx
│   └── product-card.tsx
├── constants/navigation.ts
├── mock/testimonials.ts
├── services/homepage.service.ts
├── services/collections.service.ts
├── types/home.ts
docs/prd/home-page.md
```

## Mock Data Requirements

- Featured products from `mock/products.ts` (`featured: true`).
- Featured collections from `mock/collections.ts` (exclude `circle-of-gems` slug).
- Testimonials in `mock/testimonials.ts` (3–4 realistic entries).

## Future Backend Requirements

```
GET /api/homepage          → hero config, section ordering
GET /api/collections?featured=true
GET /api/products?featured=true&limit=3
GET /api/testimonials
```

CMS may later control hero copy, section visibility, and testimonial content.

## Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<section>`.
- Hero heading is single `<h1>` per page.
- Product/collection images have descriptive `alt` text.
- Navigation keyboard-accessible via existing NavLink focus styles.
- Sufficient color contrast using design system tokens.

## Performance Considerations

- Server Components for all home sections (no client JS for static content).
- `next/image` for all remote images with explicit sizes.
- Parallel data fetching in `getHomePageData()` via `Promise.all`.
- No additional dependencies.

## Risks and Edge Cases

- **Placeholder routes** — `/collections`, `/products/[slug]` not yet implemented.
- **Out-of-stock products** — display badge, still link to future PDP.
- **Empty featured data** — service should return arrays; sections handle empty gracefully.

## Implementation Checklist

- [x] Create testimonials mock data and types
- [x] Add collections and homepage services
- [x] Build Header, Footer, StorefrontShell
- [x] Build home feature sections
- [x] Wire up `app/page.tsx` with service data
- [x] Update roadmap

## Acceptance Criteria

- [x] `/` renders full home page with Header and Footer.
- [x] Hero, collections, products, heritage, testimonials, and CTA sections visible.
- [x] Circle of Gems section is not present.
- [x] Circle of Gems collection excluded from featured collections.
- [x] All data fetched via services, not hardcoded in components.
- [x] Uses design system Button, Card, Badge components.
- [x] `npm run build` passes without errors.
- [x] Responsive layout on mobile and desktop.
