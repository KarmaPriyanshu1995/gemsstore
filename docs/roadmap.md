# RealGemsStore — Roadmap

## Phase 0 — Foundation ✅

- [x] Next.js App Router + TypeScript + Tailwind + Shadcn UI
- [x] Feature-first folder structure
- [x] Maharaja Heritage design tokens
- [x] Design system components (buttons, inputs, cards, navigation, filters, modals, etc.)
- [x] Service abstractions + mock data conventions
- [x] Architecture, roadmap, decisions documentation

## Phase 1 — Storefront Core

- [x] Shared layout (Header, Footer, navigation)
- [x] Home page (hero, featured collections, testimonials)
- [x] Product listing page (filters, sort, grid)
- [x] Product detail page (gallery, specs, add to cart)
- [x] Search experience
- [x] Wishlist

## Phase 2 — Signature Experience

- [x] Circle of Gems (GSAP + ScrollTrigger)
- [x] Signature Experience Manager (admin UI)

## Phase 3 — Commerce Flow

- [x] Cart (local state → future API)
- [x] Checkout (multi-step)
- [x] Payment UI (Razorpay placeholder)
- [x] Order confirmation

## Phase 4 — Account

- [ ] Login / Register UI (JWT-ready)
- [x] Profile and order history
- [x] Address management

## Phase 5 — Admin Frontend

- [x] Dashboard layout and home (`/admin`)
- [x] Products CRUD
- [x] Orders management
- [x] Customers
- [ ] Reviews
- [ ] Coupons
- [x] Collections
- [x] CMS pages
- [x] SEO settings
- [x] Media library
- [ ] Settings

## Phase 6 — Backend Integration

- [ ] Swap service mocks to REST API calls
- [ ] JWT auth flow
- [ ] Cloudinary upload integration
- [ ] Razorpay payment integration
- [ ] Real-time inventory

## Principles

- One vertical slice at a time.
- PRD before implementation for major features.
- Preserve existing functionality on every change.
- Minimize dependency additions.
