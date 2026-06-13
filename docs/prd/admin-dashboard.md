# PRD — Admin Dashboard Layout

## Overview

The RealGemsStore admin panel is a luxury command center for managing India's most prestigious gemstone house. Module 1 establishes the shared admin shell and dashboard home at `/admin`. Data flows through `admin-dashboard.service.ts`; no backend or authentication in this phase.

## Goals

- Deliver a premium SaaS admin aesthetic distinct from the storefront.
- Provide reusable layout primitives for all future admin modules.
- Fetch dashboard metrics through service abstractions only.
- Prepare sidebar routes for Modules 2–8 without implementing them yet.

## Visual Direction

| Element | Value |
|---------|-------|
| Background | `#F6F0E4` (Ivory) |
| Sidebar | `#0F7B5F` (Emerald) |
| Sidebar icons | `#C7A45A` (Gold) |
| Cards | `#FFFFFF` |
| Borders | `rgba(199,164,90,0.15)` |
| Headings | Cormorant Garamond |
| Body | Inter |

## User Stories

- As an **admin**, I land on a dashboard showing revenue, orders, customers, and product health at a glance.
- As an **admin**, I navigate modules via a collapsible sidebar with clear active states.
- As an **admin**, I use the admin panel comfortably on mobile via a drawer navigation.
- As a **developer**, I extend admin pages using the shared `AdminShell` without rebuilding layout.

## Scope

### Included

- Route: `app/admin/layout.tsx` — shared admin shell
- Route: `app/admin/page.tsx` — dashboard home
- Sidebar navigation (all modules linked; unbuilt routes are valid hrefs for future modules)
- Collapsible desktop sidebar
- Mobile drawer navigation
- Breadcrumbs in admin header
- Dashboard sections: Revenue, Orders, Customers, Products overview
- Top Selling Gemstones
- Recent Orders
- Notifications
- Quick Actions
- Mock service: `admin-dashboard.service.ts`
- Loading skeleton: `app/admin/loading.tsx`

### Excluded

- Authentication / role-based access
- Products, Orders, Customers, CMS, Media, SEO, Signature modules (Modules 2–8)
- Settings page implementation
- Real API integration

## Sidebar Navigation

| Label | Route |
|-------|-------|
| Dashboard | `/admin` |
| Products | `/admin/products` |
| Orders | `/admin/orders` |
| Customers | `/admin/customers` |
| CMS | `/admin/cms` |
| Media Library | `/admin/media` |
| SEO | `/admin/seo` |
| Signature Experience | `/admin/signature-experience` |
| Settings | Coming soon (disabled) |

## Components

| Component | Location | Purpose |
|-----------|----------|---------|
| AdminShell | `features/admin/layout/AdminShell.tsx` | Shell wrapper |
| AdminSidebar | `features/admin/layout/AdminSidebar.tsx` | Navigation sidebar |
| AdminHeader | `features/admin/layout/AdminHeader.tsx` | Top bar, menu, breadcrumbs |
| DashboardStatCards | `features/admin/dashboard/DashboardStatCards.tsx` | Overview metrics |
| TopSellingGemstones | `features/admin/dashboard/TopSellingGemstones.tsx` | Best sellers |
| RecentOrdersTable | `features/admin/dashboard/RecentOrdersTable.tsx` | Latest orders |
| NotificationsPanel | `features/admin/dashboard/NotificationsPanel.tsx` | Alerts feed |
| QuickActions | `features/admin/dashboard/QuickActions.tsx` | Shortcut links |

## Services

| Function | Future Endpoint |
|----------|-----------------|
| `getAdminDashboard()` | `GET /api/admin/dashboard` |

## Acceptance Criteria

- [x] Responsive layout (collapsible sidebar, mobile drawer)
- [x] Accessible navigation (ARIA labels, keyboard, focus trap in drawer)
- [x] Premium Maharaja Heritage admin appearance
- [x] Dashboard data via service abstraction
- [x] White cards on ivory background with gold-tinted borders

## Status

**Implemented** — Phase 6, Module 1 (June 2026)
