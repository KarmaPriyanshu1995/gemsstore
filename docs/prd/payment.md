# PRD — Payment Page

## Overview

The Payment Page (`/payment`) is a mock luxury payment experience for completing heritage gemstone purchases. Shoppers select a payment method, enter placeholder details, and confirm payment before order success. No real payment integrations — designed for future Razorpay swap.

## Goals

- Deliver trust-building payment UI consistent with Maharaja Heritage branding.
- Require a valid checkout session before payment.
- Clear cart and persist order session on successful mock payment.
- Prepare payment method and order payload for future API integration.

## User Stories

- As a **shopper**, I choose UPI, card, net banking, or wallet payment.
- As a **shopper**, I see security badges and order total before paying.
- As a **shopper**, I return to checkout if I need to edit details.
- As a **developer**, I redirect to order success with a structured `OrderSession`.

## Scope

### Included

- Route: `app/payment/page.tsx`
- Payment methods: UPI, Credit Card, Debit Card, Net Banking, Wallets
- Method-specific mock input forms with validation
- Progress indicator (Payment step active)
- Order summary from checkout session + cart items
- Security trust badges
- Pay Now with simulated processing state
- Back to Checkout link
- Redirect to `/order-success` on success
- Guard: no checkout session → redirect to `/checkout`

### Excluded

- Razorpay or real payment gateway
- 3D Secure / OTP flows
- Order success page UI (Feature 6)
- Server-side payment APIs

## Acceptance Criteria

- [x] Elegant method selection and trust-building UI
- [x] No real payments processed
- [x] Cart cleared and order session saved on Pay Now
- [x] Mobile-responsive layout
- [x] `npm run build` passes

## Status

**Implemented** — Phase 5, Feature 5 (June 2026)
