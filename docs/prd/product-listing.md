# PRD — Product Listing Page

## Overview

The Product Listing Page (`/products`) is the luxury gemstone catalog experience. Shoppers browse, filter, sort, and paginate certified gemstones with concierge-level presentation. Data flows through `products.service.ts`; cart and wishlist actions update client state prepared for future API migration.

## Goals

- Deliver a production-quality catalog with grid and list views.
- Preserve filter and sort state in the URL for shareable, paginated results.
- Reuse Maharaja Heritage design system components exclusively.
- Keep business logic in services and feature modules — no mock imports in UI.

## User Stories

- As a **shopper**, I browse gemstones in grid or list view and sort by price, rating, or popularity.
- As a **shopper**, I filter by gemstone type, origin, birth month, zodiac, certification, color, price, and availability.
- As a **shopper**, I quick-view a product, add to cart, or save to wishlist without leaving the catalog.
- As a **shopper**, I navigate pages while filters remain applied.
- As a **developer**, I swap `products.service.ts` to REST without touching UI.

## Scope

### Included

- Route: `app/products/page.tsx`
- Product grid and list view with toggle
- Sidebar filters (desktop) and filter dialog (mobile)
- Sort dropdown
- URL-driven pagination preserving filters
- Quick View modal
- Add to Cart and Wishlist actions
- Empty and loading states
- Breadcrumb: Home → Products

### Excluded

- ~~Product detail page (Feature 2)~~ — see `docs/prd/product-detail.md`
- Search overlay (Feature 7)
- Server-side cart/wishlist persistence
- Real inventory APIs

## Filters

| Filter | Type | URL Param |
|--------|------|-----------|
| Gemstone Type | Multi-select chips | `gemstone` |
| Price Range | Min/max number inputs | `priceMin`, `priceMax` |
| Origin | Multi-select chips | `origin` |
| Birth Month | Multi-select chips | `birthMonth` |
| Zodiac | Multi-select chips | `zodiac` |
| Certification | Multi-select chips | `certification` |
| Color | Multi-select chips | `color` |
| Availability | Single select | `availability` |

## Sort Options

| Value | Label |
|-------|-------|
| `price-asc` | Price: Low to High |
| `price-desc` | Price: High to Low |
| `newest` | Newest |
| `best-selling` | Best Selling |
| `top-rated` | Top Rated |

## URL Parameters

```
/products?page=1&sort=price-asc&view=grid&gemstone=emerald,ruby&origin=Colombia&priceMin=50000&priceMax=200000&availability=in-stock
```

## Components

| Component | Location | Purpose |
|-----------|----------|---------|
| ProductListing | `features/product-listing/ProductListing.tsx` | Main orchestrator |
| ProductListingToolbar | `features/product-listing/ProductListingToolbar.tsx` | Sort, view toggle, count |
| ProductListingFilters | `features/product-listing/ProductListingFilters.tsx` | Sidebar filter panel |
| ProductListingCard | `features/product-listing/ProductListingCard.tsx` | Grid/list card with actions |
| ProductListingGrid | `features/product-listing/ProductListingGrid.tsx` | Grid layout |
| ProductListingList | `features/product-listing/ProductListingList.tsx` | List layout |
| ProductQuickView | `features/product-listing/ProductQuickView.tsx` | Quick view modal |
| ProductListingPagination | `features/product-listing/ProductListingPagination.tsx` | Page navigation |

## Services

| Function | Endpoint (future) |
|----------|-------------------|
| `getProductListing(params)` | `GET /api/products?...` |
| `getProductFilterOptions()` | `GET /api/products/filter-options` |
| `getProducts(options)` | `GET /api/products` (existing) |
| `getProductBySlug(slug)` | `GET /api/products/:slug` (existing) |

## State

| Feature | Storage | Scope |
|---------|---------|-------|
| Cart | `localStorage` via `CartProvider` | Global |
| Wishlist | `localStorage` via `WishlistProvider` | Global |
| Filters/sort/page | URL search params | Per visit |

## Acceptance Criteria

- [x] Responsive layout (mobile filter dialog, desktop sidebar)
- [x] Accessible controls (ARIA, keyboard, focus management)
- [x] Filters update results and persist across pagination
- [x] Fixed aspect-ratio images prevent layout shift
- [x] Empty state when no products match filters
- [x] Loading skeleton on route transition
- [x] Add to cart and wishlist update global state with toast feedback

## Status

**Implemented** — Phase 5, Feature 1 (June 2026)
