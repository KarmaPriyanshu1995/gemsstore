# PRD — Admin Media Library

## Overview

The Admin Media Library (`/admin/media`) provides a premium asset management experience for images, certificates, banners, and videos. Operators browse, search, filter, select, and simulate uploads via drag-and-drop. Data loads through `admin-media.service.ts`; mutations use client-side local state.

## Goals

- Deliver smooth, accessible media browsing and selection.
- Simulate upload workflow with progress states (no real file storage).
- Reuse admin shell and Maharaja Heritage styling.
- Prepare asset schema for future Cloudinary integration.

## User Stories

- As an **admin**, I browse assets in a responsive grid filtered by category.
- As an **admin**, I search assets by name or filename.
- As an **admin**, I preview asset details in a modal.
- As an **admin**, I select multiple assets for bulk actions.
- As an **admin**, I drag files to simulate upload with progress feedback.
- As a **developer**, I swap the service to Cloudinary REST without changing UI.

## Scope

### Included

- Route: `app/admin/media/page.tsx`
- Asset grid with category badges
- Categories: Images, Certificates, Banners, Videos
- Search and category filter
- Pagination
- Asset preview modal
- Multi-select with bulk delete placeholder
- Drag-and-drop upload simulation with progress bars
- Empty state

### Excluded

- Real file upload / Cloudinary integration
- Image editing / cropping
- CDN URL management

## Asset Categories

| Category | Usage |
|----------|-------|
| `images` | Product and showcase photos |
| `certificates` | GIA/IGI certification scans |
| `banners` | Homepage and campaign banners |
| `videos` | Heritage story and product videos |

## Service

| Function | Future Endpoint |
|----------|-----------------|
| `getAdminMedia()` | `GET /api/admin/media` |

## Acceptance Criteria

- [x] Smooth drag-and-drop upload simulation
- [x] Accessible grid, modals, and keyboard support
- [x] Responsive asset grid
- [x] Search and filter functional
- [x] Delete placeholder with toast

## Status

**Implemented** — Phase 6, Module 6 (June 2026)
