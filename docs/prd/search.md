# PRD — Search Experience

## Overview

The Search experience (`/search`) is a focused overlay-style page for discovering heritage gemstones. Shoppers search by name, type, or origin with recent and popular suggestions when idle.

## Goals

- Fast, mobile-optimized product discovery.
- Persist recent searches in localStorage.
- Search via `searchProducts()` service abstraction.
- Keyboard-friendly input and result navigation.

## Scope

### Included

- Route: `app/search/page.tsx`
- Search input with clear action
- Recent searches (localStorage)
- Popular search chips
- Suggested featured products (idle state)
- Live search results
- No results state
- URL query param `?q=` for shareable searches

### Excluded

- Global search overlay from every page (header links to `/search`)
- Search analytics API
- Autocomplete server indexing

## Acceptance Criteria

- [x] Fast client-side search with debounce
- [x] Mobile-optimized layout
- [x] Recent and popular suggestions
- [x] `npm run build` passes

## Status

**Implemented** — Phase 5, Feature 7 (June 2026)
