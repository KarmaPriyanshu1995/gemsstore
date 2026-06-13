# PRD — Cart Page

## Overview

The Cart Page (`/cart`) is the luxury holding room before checkout. Shoppers review selected gemstones, adjust quantities, apply heritage coupon codes, and see shipping estimates before proceeding. Cart state lives in `CartProvider` with `localStorage` persistence.

## Goals

- Deliver a concierge-grade cart experience consistent with Maharaja Heritage branding.
- Recalculate totals instantly on quantity, coupon, or item changes.
- Reuse existing `CartProvider` — no duplicate cart state.
- Prepare order summary shape for future checkout API integration.

## User Stories

- As a **shopper**, I review cart items with images, prices, and quantities.
- As a **shopper**, I update quantities or remove items with immediate total updates.
- As a **shopper**, I apply coupon codes for heritage discounts.
- As a **shopper**, I see subtotal, discount, shipping estimate, and order total.
- As a **shopper**, I continue shopping or proceed to checkout.

## Scope

### Included

- Route: `app/cart/page.tsx`
- Cart item list with quantity controls and remove
- Coupon code input with mock validation
- Order summary (subtotal, discount, shipping, total)
- Shipping estimate (free above threshold)
- Empty cart luxury experience
- Continue Shopping → `/products`
- Checkout → `/checkout`
- Breadcrumb: Home → Cart
- Loading skeleton (hydration-aware)

### Excluded

- Checkout page (Feature 4)
- Server-side cart persistence
- Real coupon API validation
- Tax calculation

## Mock Coupons

| Code | Discount |
|------|----------|
| `HERITAGE10` | 10% off subtotal |
| `MAHARAJA500` | ₹500 flat off |

## Acceptance Criteria

- [x] Totals update correctly on quantity/coupon changes
- [x] Empty state with continue shopping CTA
- [x] Mobile-responsive layout
- [x] `npm run build` passes

## Status

**Implemented** — Phase 5, Feature 3 (June 2026)
