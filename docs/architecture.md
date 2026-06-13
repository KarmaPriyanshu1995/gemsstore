# RealGemsStore — Architecture

## Overview

RealGemsStore is a frontend-first luxury gemstone e-commerce platform. The backend (Node.js + MongoDB) is not built yet. All data flows through service abstractions that currently return mock data.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + Shadcn UI |
| Animation | Framer Motion, GSAP + ScrollTrigger (per feature) |
| Icons | Lucide React |

## Folder Structure

```
src/
├── app/              # Routes, layouts, global styles
├── components/
│   ├── ui/           # Shadcn primitives
│   └── layout/       # Header, Footer, Shell
├── features/         # Self-contained feature modules
├── hooks/            # Shared React hooks
├── lib/              # cn(), service utilities
├── services/         # Data access (mock → REST API)
├── mock/             # Static mock datasets
├── types/            # Shared TypeScript interfaces
├── constants/        # Design tokens, site config
└── utils/            # Pure functions (formatting, etc.)
```

## Data Flow

```
UI Component → Service → Mock Data (now) / REST API (future)
```

- UI components never import from `mock/` directly.
- Services return a consistent `ApiResponse<T>` shape.
- Future backend swap requires changes only in `services/`.

## Component Strategy

- **Server Components** by default for data fetching and static content.
- **Client Components** only when interactivity, animation, or browser APIs are required.
- Mark client components with `"use client"` at the top of the file.

## Feature Modules

Each feature lives under `src/features/<feature-name>/`:

```
features/circle-of-gems/
├── CircleOfGems.tsx
├── CirclePanel.tsx
├── CircleItem.tsx
├── useCircleAnimation.ts
└── circle.config.ts
```

Features own their components, hooks, and config. Shared primitives come from `components/ui/`.

## Design System

Maharaja Heritage palette mapped to Shadcn semantic tokens in `globals.css`:

| Token | Hex | Usage |
|-------|-----|-------|
| Ivory | `#F6F0E4` | Background |
| Emerald | `#0F7B5F` | Primary actions |
| Gold | `#C7A45A` | Accent |
| Sandstone | `#D7C6A3` | Borders, muted |
| Walnut | `#5B4636` | Text |

Typography: Cormorant Garamond (headings), Inter (body).

## Future Backend Contract

| Concern | Future Implementation |
|---------|----------------------|
| API | REST (Node.js + Express) |
| Database | MongoDB |
| Auth | JWT |
| Storage | Cloudinary |
| Payments | Razorpay |
| Admin | Role-based CMS APIs |

Service files document expected endpoints in JSDoc comments.

## Performance Guidelines

- Dynamic imports for heavy features (Circle of Gems, admin).
- `next/image` for all remote images.
- Memoize expensive client computations.
- Code-split per route via App Router conventions.

## Conventions

- Files under 300 lines; extract when exceeded.
- No hardcoded datasets in UI — use `mock/` via `services/`.
- No new dependencies without justification.
- PRD required for new pages, major features, and shared systems.
