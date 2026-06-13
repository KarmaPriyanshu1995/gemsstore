# PRD — Checkout Page

## Overview

The Checkout Page (`/checkout`) is a multi-step luxury concierge flow for completing a heritage gemstone purchase. Shoppers provide shipping, billing, and delivery details before proceeding to payment. Cart state comes from `CartProvider`; checkout form state is local with session persistence for the payment step.

## Goals

- Deliver a guided three-step checkout with clear progress tracking.
- Validate each step before advancing.
- Reuse cart totals and coupon logic from the cart feature.
- Prepare checkout session data for the payment page (Feature 5).

## User Stories

- As a **shopper**, I enter shipping details and proceed step by step.
- As a **shopper**, I use billing same as shipping or enter separate billing info.
- As a **shopper**, I choose a delivery method and add special instructions.
- As a **shopper**, I apply promo codes and see updated totals in the summary.
- As a **developer**, I map checkout session to a future `POST /api/checkout` API.

## Scope

### Included

- Route: `app/checkout/page.tsx`
- Steps: Shipping → Billing → Delivery
- Progress indicator: Cart → Checkout → Payment → Success
- Form validation per step
- Promo codes (reused from cart)
- Order summary sidebar with cart items and totals
- Back / Continue navigation
- Empty-cart guard (redirect to cart)
- Session storage of completed checkout for payment

### Excluded

- Payment processing (Feature 5)
- Real address verification APIs
- Account address book integration

## Acceptance Criteria

- [x] Validation states on required fields
- [x] Mobile-responsive layout
- [x] Progress tracking across steps
- [x] Totals update with coupons and delivery fees
- [x] `npm run build` passes

## Status

**Implemented** — Phase 5, Feature 4 (June 2026)
