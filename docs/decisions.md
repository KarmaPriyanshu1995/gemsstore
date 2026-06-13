# RealGemsStore — Architecture Decisions

## ADR-001: Frontend-First Development

**Status:** Accepted

Build the complete frontend with mock data before any backend work. Service abstractions isolate data access so API integration requires minimal UI changes.

## ADR-002: Feature-First Folder Structure

**Status:** Accepted

Organize code by feature (`src/features/`) rather than by type. Shared primitives live in `components/ui/` and `components/layout/`. Prevents cross-feature coupling.

## ADR-003: Service Layer Abstraction

**Status:** Accepted

All data access goes through `src/services/*.service.ts`. Services return `ApiResponse<T>` and simulate network delay. UI never imports `mock/` directly.

## ADR-004: Server Components by Default

**Status:** Accepted

Use React Server Components for pages and data-fetching. Client Components only for interactivity, animations, and browser APIs.

## ADR-005: Maharaja Heritage Design System

**Status:** Accepted

Five canonical brand colors mapped to Shadcn semantic CSS variables. Cormorant Garamond for headings, Inter for body. No additional primary colors without PRD approval.

## ADR-006: Mock Data in Dedicated Module

**Status:** Accepted

All mock datasets in `src/mock/`. Realistic IDs, INR pricing, ISO timestamps. Documented conventions in `mock/index.ts`.

## ADR-007: Manual Project Scaffold

**Status:** Accepted

`create-next-app` failed due to directory name casing (`gemsStore`). Project was manually scaffolded with package name `real-gems-store`. Functionally equivalent to CLI scaffold.

## ADR-008: Tailwind CSS v4

**Status:** Accepted

Use Tailwind v4 with `@theme inline` and CSS variable tokens in `globals.css`. Aligns with latest Next.js + Shadcn recommendations.

## ADR-009: Animation Libraries Per Feature

**Status:** Accepted

Framer Motion and GSAP are not installed at foundation level. Added only when a feature PRD requires them (e.g. Circle of Gems).

## ADR-011: GSAP for Circle of Gems

**Status:** Accepted

Use GSAP + ScrollTrigger for the Circle of Gems signature experience. Dynamically imported with `ssr: false` to code-split. Framer Motion not added. `prefers-reduced-motion` falls back to static first gemstone.
