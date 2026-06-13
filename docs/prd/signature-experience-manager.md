# PRD — Signature Experience Manager

## Overview

The Signature Experience Manager (`/admin/signature-experience`) is the luxury command center for the homepage Maharaja Gallery showcase (Circle of Gems). Marketers configure gemstones, display behavior, and preview the experience in real time. Data loads through `signature-manager.service.ts`; edits use client-side local state.

## Goals

- Manage Maharaja Gallery gemstone content without touching code.
- Control display order, visibility, and autoplay behavior.
- Preview desktop and mobile layouts instantly.
- Prepare circle-animation controls for a future scroll-driven migration.
- Keep UI unchanged when mock data swaps to REST APIs.

## User Stories

- As a **curator**, I reorder gemstones and toggle which appear on the homepage.
- As a **curator**, I edit gemstone stories, benefits, pricing, and CTA labels.
- As a **curator**, I adjust autoplay speed and pause-on-hover behavior.
- As a **developer**, I map `AdminSignatureData` to storefront services when APIs are ready.

## Scope

### Included

- Route: `app/admin/signature-experience/page.tsx`
- Gemstone table (thumbnail, name, status, order, glow color)
- Gemstone editor (name, story, description, origin, certification, benefits, price, CTA, image)
- Display controls (reorder, autoplay, rotation speed, pause on hover, mobile behavior)
- Future circle controls (path visibility, scale, glow, animation speed, scroll sensitivity)
- Live preview (desktop + mobile)
- Drag-and-drop reorder via local state
- Save / reset actions with toast feedback

### Excluded

- Runtime wiring to storefront `getGemstones()` (future API integration)
- Actual GSAP circle animation rebuild
- Gemstone delete (placeholder action only)
- Authentication

## Service

| Function | Future Endpoint |
|----------|-----------------|
| `getSignatureManager()` | `GET /api/admin/signature-experience` |
| `updateSignatureManager()` | `PUT /api/admin/signature-experience` |

## Acceptance Criteria

- [x] Gemstone table with edit, enable, disable, delete placeholder
- [x] Editor updates preview instantly
- [x] Display controls affect preview behavior
- [x] Desktop and mobile preview modes
- [x] Circle migration controls stored for future use
- [x] Responsive admin layout

## Status

**Implemented** — Phase 6, Module 8 (June 2026)
