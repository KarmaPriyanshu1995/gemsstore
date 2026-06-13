# PRD — Admin Customers

## Overview

The Admin Customers module (`/admin/customers`) provides an elegant CRM experience for managing RealGemsStore's luxury clientele. Operators browse, search, and manage customer profiles via a premium table and detail drawer. Data loads through `admin-customers.service.ts`; mutations simulate persistence via client-side local state.

## Goals

- Deliver a concierge-grade customer management workflow.
- Surface addresses, order history, wishlist, and activity timeline per customer.
- Reuse admin shell and Maharaja Heritage styling.
- Prepare data shape for future `GET/PATCH /api/admin/customers`.

## User Stories

- As an **admin**, I search and filter customers by status and tags.
- As an **admin**, I view a customer profile with addresses, orders, wishlist, and activity.
- As an **admin**, I edit customer details and manage VIP tags.
- As an **admin**, I deactivate accounts via a placeholder workflow.
- As a **developer**, I swap the service to REST without changing UI.

## Scope

### Included

- Route: `app/admin/customers/page.tsx`
- Customer table (Name, Email, Orders, Spend, Status, Actions)
- Search, status filter, sorting, pagination
- Customer profile drawer (addresses, orders, wishlist, activity timeline)
- Edit customer modal
- Tag management modal
- Deactivate placeholder (toast)
- Local state updates

### Excluded

- Real authentication / account deactivation API
- Email marketing integration
- Customer self-service portal

## Table Columns

| Column | Source |
|--------|--------|
| Customer | `name` + avatar initials |
| Email | `email` |
| Orders | `ordersCount` |
| Spend | `totalSpend` |
| Status | `status` badge |
| Tags | `tags` chips |
| Actions | View, Edit, Tag, Deactivate |

## Service

| Function | Future Endpoint |
|----------|-----------------|
| `getAdminCustomers()` | `GET /api/admin/customers` |

## Acceptance Criteria

- [x] Elegant CRM experience with profile drawer
- [x] Responsive table with mobile action menu
- [x] Edit and tag updates reflect immediately
- [x] Empty and loading states

## Status

**Implemented** — Phase 6, Module 4 (June 2026)
