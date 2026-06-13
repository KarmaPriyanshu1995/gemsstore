# PRD — Admin SEO

## Overview

The Admin SEO module (`/admin/seo`) provides a marketer-friendly workflow for managing meta tags, slugs, Open Graph, Twitter Cards, and schema markup per storefront page. Live Google and social previews update as editors type. Data loads through `admin-seo.service.ts`; edits use client-side local state.

## Goals

- Centralize SEO configuration for key storefront routes.
- Provide real-time validation indicators for title and description length.
- Show Google snippet and social card previews.
- Prepare schema for future API-driven metadata injection.

## User Stories

- As a **marketer**, I edit meta titles and descriptions per page with length guidance.
- As a **marketer**, I configure Open Graph and Twitter Card tags for social sharing.
- As a **marketer**, I preview how pages appear in Google and on social platforms.
- As a **marketer**, I enable schema markup for organization and product pages.
- As a **developer**, I map `AdminSeoData` to Next.js metadata when APIs are ready.

## Scope

### Included

- Route: `app/admin/seo/page.tsx`
- Page picker (Home, Products, Collections, About, Contact)
- Meta title, description, slug, canonical URL
- Open Graph fields (title, description, image, type)
- Twitter Card fields (card type, title, description, image)
- Schema markup toggle and organization fields
- Google snippet preview
- Social preview panel
- Validation indicators (title/description length, missing OG image)
- Local state with save/reset

### Excluded

- Runtime metadata injection into Next.js routes
- Sitemap generation
- robots.txt management
- Per-product PDP SEO (future)

## Service

| Function | Future Endpoint |
|----------|-----------------|
| `getAdminSeo()` | `GET /api/admin/seo` |

## Acceptance Criteria

- [x] Marketer-friendly workflow with clear validation
- [x] Google and social previews update live
- [x] Per-page SEO configuration
- [x] Responsive editor + preview layout

## Status

**Implemented** — Phase 6, Module 7 (June 2026)
