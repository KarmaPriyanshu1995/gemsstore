# PRD — Wishlist Page

## Overview

The Wishlist Page (`/wishlist`) displays saved heritage gemstones from `WishlistProvider` localStorage state. Shoppers move items to cart, remove saves, or continue browsing.

## Goals

- Dedicated wishlist grid with luxury empty state.
- Reuse global wishlist context — no duplicate state.
- Resolve full product data when moving to cart via service.

## Scope

### Included

- Route: `app/wishlist/page.tsx`
- Wishlist grid with product cards
- Actions: Move to Cart, Remove, View Product
- Empty wishlist experience
- Continue Shopping CTA
- Header wishlist link

### Excluded

- Server-side wishlist persistence
- Wishlist sharing

## Acceptance Criteria

- [x] State updates correctly on remove and move to cart
- [x] Empty state designed
- [x] `npm run build` passes

## Status

**Implemented** — Phase 5, Feature 8 (June 2026)
