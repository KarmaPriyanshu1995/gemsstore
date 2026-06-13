# PRD — Design System

## Overview

The Maharaja Heritage design system provides reusable UI primitives and composed patterns for RealGemsStore. All components use Shadcn UI + Tailwind CSS, styled via semantic brand tokens. A live showcase at `/design-system` validates every component.

## Goals

- Consistent luxury brand identity across storefront and admin.
- Reusable, accessible components ready for feature pages.
- Shadcn primitives extended with heritage-specific variants.
- Developer-friendly barrel exports and toast utilities.
- No business-feature logic in design system layer.

## User Stories

- As a **customer**, I experience cohesive typography, color, and interaction patterns.
- As a **developer**, I import components from `@/components/ui` without re-styling.
- As a **designer**, I reference five canonical colors and documented component variants.

## Scope

### Included

- Color tokens, typography, CSS variables (Maharaja Heritage).
- Shadcn primitives: Button, Input, Label, Badge, Card, Dialog, Accordion, Checkbox, Select, Separator, Skeleton.
- Composed patterns: FilterChip, FilterGroup, EmptyState, LoadingSpinner, LoadingState.
- Navigation: NavLink, SiteNav, Breadcrumb.
- Toast: Sonner Toaster + `toast()` utility.
- Heritage Button variant (`variant="heritage"`).
- Live showcase page at `/design-system`.

### Excluded

- Dark mode theme.
- Admin-specific theme overrides.
- Business page layouts (home, PLP, PDP).
- Framer Motion / GSAP animations.

## User Flows

1. Developer visits `/design-system` → previews all components interactively.
2. Developer imports `Button` from `@/components/ui` → renders with brand styling.
3. Developer calls `toast.success()` → themed notification appears top-right.

## Screens

| Route | Purpose |
|-------|---------|
| `/` | Links to design system showcase |
| `/design-system` | Interactive component gallery |

## Components

| Component | Location | Variants / Notes |
|-----------|----------|------------------|
| Button | `ui/button.tsx` | default, heritage, secondary, outline, ghost, link, destructive |
| Input | `ui/input.tsx` | Standard text input |
| Label | `ui/label.tsx` | Radix label primitive |
| Badge | `ui/badge.tsx` | default, secondary, accent, outline, destructive |
| Card | `ui/card.tsx` | Header, Title, Description, Content, Footer |
| Dialog | `ui/dialog.tsx` | Modal with overlay, header, footer |
| Accordion | `ui/accordion.tsx` | Single / multiple collapsible sections |
| Checkbox | `ui/checkbox.tsx` | Filter / form toggle |
| Select | `ui/select.tsx` | Dropdown for sort / filter |
| Separator | `ui/separator.tsx` | Horizontal / vertical divider |
| Skeleton | `ui/skeleton.tsx` | Content placeholder pulse |
| FilterChip | `ui/filter.tsx` | Toggleable filter pill |
| FilterGroup | `ui/filter.tsx` | Labeled filter chip group |
| EmptyState | `ui/empty-state.tsx` | Icon, title, description, optional CTA |
| LoadingSpinner | `ui/loading-spinner.tsx` | sm, md, lg sizes |
| LoadingState | `ui/loading-state.tsx` | Spinner + message |
| Toaster | `ui/sonner.tsx` | Themed Sonner wrapper |
| NavLink | `navigation/site-nav.tsx` | Active-state link |
| SiteNav | `navigation/site-nav.tsx` | Horizontal nav bar |
| Breadcrumb | `navigation/breadcrumb.tsx` | Hierarchical path |

## File Structure

```
src/
├── app/globals.css
├── app/layout.tsx              # Providers + Toaster
├── app/design-system/page.tsx
├── components/
│   ├── ui/                     # Shadcn + composed primitives
│   ├── navigation/             # NavLink, SiteNav, Breadcrumb
│   ├── design-system/          # Showcase component
│   └── providers.tsx
├── constants/design-tokens.ts
├── lib/toast.ts                # Re-exports sonner toast()
docs/prd/design-system.md
```

## Mock Data Requirements

None. Showcase uses inline demo data only.

## Future Backend Requirements

None for design system. Admin CMS may later expose theme overrides — handle in admin settings PRD.

## Accessibility

- WCAG AA contrast: Walnut on Ivory (~7.5:1), Emerald buttons with Ivory text.
- Focus rings via `--ring` (Emerald) on all interactive elements.
- `aria-pressed` on FilterChip, `aria-current` on NavLink/Breadcrumb.
- Dialog traps focus; Accordion supports keyboard navigation.
- LoadingSpinner uses `role="status"` + `aria-label`.
- Toast close button enabled; screen reader announcements via Sonner.

## Performance Considerations

- Client components only where interactivity required (Dialog, Accordion, filters, toast).
- Sonner loaded once via root Providers.
- Skeleton/Spinner are lightweight — no extra dependencies.
- Showcase page is dev reference; not linked in production nav initially.

## Risks and Edge Cases

- **Accordion animations** — custom keyframes in globals.css; verify after Tailwind updates.
- **Sonner theme** — classNames may need adjustment if Sonner API changes.
- **EmptyState onAction** — requires client boundary when CTA handler is used.

## Implementation Checklist

- [x] Brand color tokens in globals.css and design-tokens.ts
- [x] Button with heritage variant
- [x] Input, Label, Badge, Card
- [x] Dialog (modal)
- [x] Accordion
- [x] Checkbox, Select (filter support)
- [x] FilterChip, FilterGroup
- [x] EmptyState, LoadingSpinner, LoadingState, Skeleton
- [x] Navigation: NavLink, SiteNav, Breadcrumb
- [x] Toast: Sonner Toaster + toast utility
- [x] Barrel export at components/ui/index.ts
- [x] Design system showcase page
- [x] Providers wrapper in root layout

## Acceptance Criteria

- [x] `/design-system` renders all component categories.
- [x] All components use Maharaja Heritage tokens (no hardcoded hex in components).
- [x] `npm run build` passes without TypeScript or lint errors.
- [x] Toast notifications display with brand styling.
- [x] Filter chips toggle with visual active state.
- [x] Modal opens, closes, and traps focus.
- [x] Components exportable from `@/components/ui`.
