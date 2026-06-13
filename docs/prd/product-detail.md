# PRD — Product Detail Page

## Overview

The Product Detail Page (`/products/[slug]`) is the luxury concierge experience for a single certified gemstone. Shoppers explore imagery, heritage storytelling, specifications, reviews, and related treasures — with cart and wishlist actions wired to global client state.

## Goals

- Deliver a premium PDP worthy of high-value gemstone purchases.
- Reuse Maharaja Heritage design system and existing cart/wishlist providers.
- Fetch all content through `products.service.ts` — no mock imports in UI.
- Prepare recently-viewed tracking for future personalization APIs.

## User Stories

- As a **shopper**, I view multiple gallery images with zoom and fullscreen preview.
- As a **shopper**, I read gemstone story, benefits, origin, certification, and specs.
- As a **shopper**, I add to cart, buy now, save to wishlist, or consult an expert.
- As a **shopper**, I browse FAQs, reviews, related products, and recently viewed items.
- As a **developer**, I swap `getProductDetail()` to REST without touching UI.

## Scope

### Included

- Route: `app/products/[slug]/page.tsx`
- Image gallery (thumbnails, main image, hover zoom, fullscreen)
- Product details (story, benefits, origin, certification, specs, price, stock)
- Actions: Add to Cart, Buy Now, Wishlist, Consult Expert
- FAQs accordion
- Reviews section
- Related products grid
- Recently viewed (localStorage)
- Breadcrumb: Home → Products → Product
- `not-found` for invalid slugs
- Loading skeleton

### Excluded

- Cart page (Feature 3)
- Checkout flow (Feature 4)
- Real payment or inventory APIs
- Product reviews submission

## Service

| Function | Future Endpoint |
|----------|-----------------|
| `getProductDetail(slug)` | `GET /api/products/:slug` |
| `getProductBySlug(slug)` | `GET /api/products/:slug` (existing) |

## State

| Feature | Storage | Scope |
|---------|---------|-------|
| Cart | `localStorage` via `CartProvider` | Global |
| Wishlist | `localStorage` via `WishlistProvider` | Global |
| Recently viewed | `localStorage` | Per browser |

## Acceptance Criteria

- [x] Gallery with thumbnail switching, zoom, and fullscreen
- [x] Mobile-optimized layout
- [x] Add to cart and wishlist update global state
- [x] Related products link to valid PDP routes
- [x] Recently viewed persists across visits
- [x] `npm run build` passes

## Status

**Implemented** — Phase 5, Feature 2 (June 2026)
