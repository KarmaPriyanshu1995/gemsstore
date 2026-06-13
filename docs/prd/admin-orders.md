# PRD — Admin Orders

## Overview

The Admin Orders module (`/admin/orders`) provides a luxury fulfilment workflow for managing concierge gemstone transactions. Operators browse, filter, and update orders via a premium table and detail drawer. Data loads through `admin-orders.service.ts`; status updates simulate persistence via client-side local state.

## Goals

- Deliver a premium order management experience worthy of a heritage gemstone house.
- Support status updates with timeline tracking in a detail drawer.
- Reuse admin shell and Maharaja Heritage styling.
- Prepare data shape for future `GET/PATCH /api/admin/orders`.

## User Stories

- As an **admin**, I search and filter orders by status and payment state.
- As an **admin**, I view order details including line items, shipping, billing, and timeline.
- As an **admin**, I update order status through a guided workflow.
- As an **admin**, I print order summaries and see refund placeholders.
- As a **developer**, I swap the service to REST without changing UI.

## Scope

### Included

- Route: `app/admin/orders/page.tsx`
- Orders table (Order ID, Customer, Date, Amount, Status, Payment Status, Actions)
- Search, status/payment filters, sorting, pagination
- Order detail drawer (timeline, products, shipping, billing)
- Update status modal
- Print action (browser print of order summary)
- Refund placeholder (toast notification)
- Local state status updates

### Excluded

- Real payment/refund integration
- Email notifications
- Shipping label generation
- Customer module integration (Module 4)

## Table Columns

| Column | Source |
|--------|--------|
| Order ID | `orderNumber` |
| Customer | `customerName` |
| Date | `createdAt` |
| Amount | `amount` + `currency` |
| Status | `status` badge |
| Payment | `paymentStatus` |
| Actions | View, Update Status, Print, Refund |

## Order Statuses

`pending` · `processing` · `shipped` · `delivered` · `cancelled`

## Service

| Function | Future Endpoint |
|----------|-----------------|
| `getAdminOrders()` | `GET /api/admin/orders` |

## Acceptance Criteria

- [x] Premium workflow with detail drawer
- [x] Responsive tables with mobile action menu
- [x] Status updates reflect in table and drawer
- [x] Timeline updates on status change
- [x] Empty and loading states

## Status

**Implemented** — Phase 6, Module 3 (June 2026)
