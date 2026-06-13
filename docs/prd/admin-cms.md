# PRD — Admin CMS

## Overview

The Admin CMS module (`/admin/cms`) lets operators manage storefront content blocks — homepage sections, about page copy, and contact information. A live preview panel shows changes in real time. Content loads through `admin-cms.service.ts`; edits simulate persistence via client-side local state.

## Goals

- Provide a marketer-friendly content editing workflow.
- Support section visibility toggles for homepage blocks.
- Show live preview alongside editors.
- Prepare reusable content block types for future `GET/PUT /api/admin/cms`.

## User Stories

- As an **admin**, I edit hero, heritage, testimonials, CTA, and educational content.
- As an **admin**, I toggle homepage section visibility without deleting content.
- As an **admin**, I update about page and contact information.
- As an **admin**, I preview changes before a future publish API exists.
- As a **developer**, I map `AdminCmsData` blocks to storefront components when APIs are ready.

## Scope

### Included

- Route: `app/admin/cms/page.tsx`
- Section picker (Hero, Featured Products, Collections, Heritage, Educational, Testimonials, CTA, About, Contact, Visibility)
- Per-section editors with validation
- Live preview panel
- Local state updates with toast feedback
- Reset to defaults action

### Excluded

- Storefront runtime integration (content not yet wired to home page)
- Rich text / WYSIWYG editor
- Media upload picker (URLs/text only)
- Version history / publish workflow

## Content Blocks

| Block | Fields |
|-------|--------|
| Hero | Eyebrow, headline, subheadline, CTAs |
| Featured Products | Section title, description |
| Featured Collections | Section title, description |
| Heritage | Badge, headline, paragraphs, stats |
| Educational | Headline, body |
| Testimonials | Name, location, quote, rating (per item) |
| CTA | Headline, subheadline, button |
| About | Headline, body, mission |
| Contact | Email, phone, address, hours |
| Visibility | Toggle per homepage section |

## Service

| Function | Future Endpoint |
|----------|-----------------|
| `getAdminCms()` | `GET /api/admin/cms` |

## Acceptance Criteria

- [x] Future API-ready content block structure
- [x] Reusable editors per content block
- [x] Live preview updates on edit
- [x] Visibility toggles functional in state
- [x] Responsive split layout

## Status

**Implemented** — Phase 6, Module 5 (June 2026)
