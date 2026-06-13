# PRD — Admin Products

## Overview

The Admin Products module (`/admin/products`) lets operators manage the luxury gemstone catalog. It provides a premium data table with search, filters, sorting, pagination, bulk actions, and a product editor modal. CRUD operations simulate persistence via client-side local state; initial data loads through `admin-products.service.ts`.

## Goals

- Deliver a concierge-grade product management table.
- Support full catalog CRUD simulation without a backend.
- Reuse admin shell and Maharaja Heritage styling.
- Prepare data shape for future `POST/PUT/DELETE /api/admin/products`.

## User Stories

- As an **admin**, I search and filter products by status and category.
- As an **admin**, I sort products by name, price, inventory, or last updated.
- As an **admin**, I create, view, edit, duplicate, archive, and delete products.
- As an **admin**, I select multiple products for bulk archive or delete.
- As a **developer**, I swap the service to REST without changing UI components.

## Scope

### Included

- Route: `app/admin/products/page.tsx`
- Products table (image, name, SKU, category, price, inventory, status, actions)
- Search, status/category filters, sorting, pagination
- Bulk selection with archive and delete
- Product editor modal (create/edit/view modes)
- Local state CRUD simulation
- Empty state when no products match filters
- Toast feedback on mutations

### Excluded

- Real API persistence
- Image upload (URL text field only)
- Variant/SKU matrix
- Import/export

## Table Columns

| Column | Source |
|--------|--------|
| Select | Checkbox |
| Image | `images[0]` |
| Name | `name` |
| SKU | `sku` |
| Category | `category` |
| Price | `price` + `currency` |
| Inventory | `inventory` |
| Status | `status` badge |
| Actions | View, Edit, Duplicate, Archive, Delete |

## Product Editor Fields

- Name, Description, Price, Inventory
- Category, Gemstone Type, Origin
- Certification, Benefits
- Visibility (storefront toggle)
- Status (active / draft / archived)

## Service

| Function | Future Endpoint |
|----------|-----------------|
| `getAdminProducts()` | `GET /api/admin/products` |

## Acceptance Criteria

- [x] Table responsive with horizontal scroll on mobile
- [x] State updates correctly on all CRUD actions
- [x] Bulk selection works
- [x] Editor modal validates required fields
- [x] Filters and pagination update visible rows

## Status

**Implemented** — Phase 6, Module 2 (June 2026)
