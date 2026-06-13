# RealGemsStore

Luxury gemstone e-commerce frontend — Maharaja Heritage design system.

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Shadcn UI
- Framer Motion / GSAP (added per feature)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/           # Next.js routes and layouts
├── components/    # Shared UI (ui/, layout/)
├── features/      # Feature modules (circle-of-gems, cart, etc.)
├── hooks/         # Shared React hooks
├── lib/           # Utilities (cn, service helpers)
├── services/      # Data access layer (mock → API)
├── mock/          # Mock datasets
├── types/         # Shared TypeScript types
├── constants/     # Design tokens, site config
└── utils/         # Pure helper functions
```

## Documentation

See `docs/` for architecture, roadmap, decisions, and feature PRDs.

## Backend Integration

Services in `src/services/` currently return mock data. When the Node.js + MongoDB backend is ready, swap service implementations to `fetch()` calls — UI components should not change.
