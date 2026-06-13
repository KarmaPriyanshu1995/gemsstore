# PRD — User Account Page

## Overview

The User Account page (`/account`) is the shopper's Maharaja Heritage portal for profile, addresses, orders, wishlist, and settings. Data loads through `account.service.ts` with local order history merged from completed purchases.

## Goals

- Deliver an elegant tabbed account experience.
- Show order history with detail drawer, reorder, and view product actions.
- Reuse wishlist context for the wishlist tab.
- Prepare profile and settings for future JWT authentication.

## User Stories

- As a **shopper**, I view and edit my profile details.
- As a **shopper**, I manage saved addresses.
- As a **shopper**, I browse order history and view order details.
- As a **shopper**, I reorder items or view products from past orders.
- As a **shopper**, I access my wishlist and notification settings from one place.

## Scope

### Included

- Route: `app/account/page.tsx`
- Tabs: Profile, Addresses, Orders, Wishlist, Settings
- URL param `?tab=` for deep linking
- Order history (mock + localStorage from payments)
- Order detail drawer with reorder / view product
- Local profile and settings edits with toast feedback
- Header account link

### Excluded

- Login / Register (JWT flow — future)
- Real API persistence
- Password change

## Acceptance Criteria

- [x] Fully responsive tabbed layout
- [x] Order history with detail and reorder actions
- [x] Wishlist tab integrated with global state
- [x] `npm run build` passes

## Status

**Implemented** — Phase 5, Feature 9 (June 2026)
