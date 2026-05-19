# Animap

**A full-stack anime discovery platform built on a Turborepo monorepo, powered by dual-provider API aggregation (AniList GraphQL + Jikan REST) and a custom fuzzy search engine with synonym-aware ranking.**

---

## Overview

Animap is a modern anime discovery web application that aggregates data from two major anime databases — AniList and MyAnimeList (via Jikan) — into a single, unified browsing experience. Users can search, browse by genre, explore trending and popular titles, view detailed anime information including characters, episodes, and recommendations, and manage a personal watch history.

The project is designed for anime enthusiasts who want a fast, visually distinctive interface to discover and organize anime content. It intentionally prioritizes the discovery experience — rich metadata, intelligent search, and a curated visual design — over video streaming.

From an engineering perspective, this project demonstrates several non-trivial design decisions: a Turborepo monorepo architecture with shared packages; a custom multi-variant fuzzy search pipeline using Fuse.js that handles romanized, native, and synonym title matching across Japanese and English; a unified service layer that abstracts provider differences behind a consistent TypeScript API; server-side rendering with Next.js 16 App Router for SEO and performance; and a distinctive retro-terminal UI system built with CSS custom properties and Framer Motion microinteractions.

---

## Live Demo & Screenshots

> **Live deployment**: Coming soon — the project is configured for Vercel deployment with `next-pwa` service worker support.

Recommended screenshot locations for maximum impact:

- **Homepage hero carousel** — cinematic cross-fade poster slider with trending anime
- **Browse/Search page** — advanced filter panel with genre, format, status, and sort controls
- **Anime detail page** — header, description, episode list, characters grid, and recommendations sidebar
- **Genre index** — icon grid layout with accent cycling
- **Mobile nav** — animated drawer with staggered link transitions and hamburger morph

---

## Key Features

### User-Facing

- **Trending & Popular feeds** — curated homepage sections sourced from AniList's real-time trending and popularity rankings
- **Hero carousel** — auto-rotating featured anime showcase with poster, metadata, and description cross-fades
- **Advanced search** — full-text search with multi-genre, format, status, and sort filtering; URL-driven state for shareable searches
- **Fuzzy search with query correction** — handles misspellings, partial matches, and romanization variants; suggests corrected queries from top results
- **Genre browsing** — 22 genre categories with dedicated filtered views and per-genre pagination
- **Anime detail pages** — comprehensive information including synopsis, format/status metadata, studio credits, trailer links, episode lists (via Jikan), character grids (via AniList GraphQL), and community recommendations
- **Dark/Light theme** — persistent theme toggle with flash-prevention script and CSS variable-based design tokens
- **Watch history & favorites** — client-side state persisted via Zustand with localStorage (watch history, continue watching, favorites)
- **Progressive Web App** — service worker registration, manifest, and runtime caching strategies for images and API responses
- **Responsive design** — mobile-first layout with animated mobile navigation drawer

### Technical

- **Dual-provider API aggregation** — unified `AnimeService` routes calls to AniList (GraphQL via `graphql-request`) and Jikan (REST with rate-limiting queue) with provider-specific mappers
- **Custom fuzzy search pipeline** — multi-variant query generation → AniList candidate pool fetch → Fuse.js weighted ranking across English, romaji, native, and synonym fields → relevance scoring and pagination
- **Server-side caching** — Next.js `unstable_cache` with CDN-appropriate `Cache-Control` headers on API routes (5-minute search cache, 2-minute suggest cache)
- **Zustand state management** — two stores (`AppStore`, `PlayerStore`) with `devtools` and `persist` middleware; selective persistence to avoid bloating localStorage
- **Framer Motion microinteractions** — `AnimatePresence`-driven mobile menu drawer, staggered navigation links, icon morph transitions on theme/hamburger toggles
- **CRT terminal aesthetic** — pure CSS scanline overlays, animated scanning bar, `.geometric-box` card system with sliding corner braces and neon glow hover effects
- **Docker-ready** — multi-stage `Dockerfile` with `turbo prune`, standalone Next.js output, and non-root production runner

---

## Tech Stack

| Layer                | Technologies                                                                          |
| -------------------- | ------------------------------------------------------------------------------------- |
| **Language**         | TypeScript 5.9 (strict)                                                               |
| **Framework**        | Next.js 16.2 (App Router, React 19, Turbopack)                                        |
| **Monorepo**         | Turborepo + pnpm workspaces                                                           |
| **Styling**          | Tailwind CSS 3.4 + CSS custom properties design system                                |
| **Animations**       | Framer Motion 12                                                                      |
| **State Management** | Zustand 5 (devtools + persist middleware)                                             |
| **Data Fetching**    | TanStack React Query 5 (client), Server Components + `fetch` (server)                 |
| **API Clients**      | `graphql-request` + `graphql-tag` (AniList), native `fetch` with rate limiter (Jikan) |
| **Search**           | Fuse.js 7 (fuzzy full-text ranking)                                                   |
| **Icons**            | Lucide React                                                                          |
| **UI Primitives**    | Radix UI (Dialog, Dropdown, Select, Tabs, Toast, Slider, Switch, etc.)                |
| **PWA**              | `next-pwa` (Workbox runtime caching)                                                  |
| **E2E Testing**      | Playwright (Chromium, Firefox, WebKit)                                                |
| **Linting**          | ESLint 9 (flat config), Prettier, lint-staged + Husky pre-commit hooks                |
| **Containerization** | Docker (multi-stage), Docker Compose                                                  |
| **Deployment**       | Vercel (configured), standalone Next.js output                                        |

---

## Architecture & Design

### Monorepo Structure

The project uses Turborepo to manage a multi-package workspace. The core application lives in `apps/Anitube`, while shared logic is extracted into `packages/`:

- **`@anitube/api`** — the data access layer. Contains AniList and Jikan client classes, a unified `AnimeService` facade, typed mappers between provider-specific and canonical types, and the entire fuzzy search pipeline. This package compiles to ESM and is consumed by the Next.js app as a workspace dependency.
- **`@anitube/ui`** — a shared component library exporting reusable React primitives.
- **`@anitube/tsconfig`** and **`@anitube/eslint-config`** — shared build and lint configurations.

### Data Flow

Server Components in the Next.js App Router (`app/page.tsx`, `app/anime/[id]/page.tsx`, `app/genre/[slug]/page.tsx`) directly import `animeApi` from `@anitube/api` and call it at request time. This means anime detail and listing pages are fully server-rendered with no client-side data fetching waterfall. For interactive search, the client-side `SearchContent` component uses TanStack React Query to call the `/api/search` route handler, which in turn delegates to `AnimeService.advancedSearchAnime()` with server-side caching via `unstable_cache`.

### Search Architecture

Search is the most architecturally interesting subsystem. When a user searches, the pipeline works as follows:

1. **Query normalization** — Unicode NFKC normalization, whitespace collapsing, and punctuation stripping.
2. **Variant generation** — the original query, a punctuation-stripped variant, and a no-spaces variant are sent as separate AniList searches to widen the candidate pool.
3. **Deduplication** — results from all variants are merged and deduplicated by AniList ID.
4. **Fuzzy ranking** — Fuse.js scores each candidate against the normalized query across weighted fields (English 0.35, romaji 0.30, native 0.25, synonyms 0.20, all-titles 0.15). Results below a minimum relevance threshold (default 25/100) are filtered.
5. **Query correction** — if the top result's relevance score is ≥55 and the title doesn't substring-match the query, it's suggested as a "did you mean?" correction.

### State Management

Client-side state is split into two Zustand stores. `AppStore` manages theme, user preferences, watch history, favorites, and continue-watching lists. `PlayerStore` manages video player settings (volume, playback rate, auto-play). Both use `persist` middleware with selective `partialize` to avoid persisting ephemeral UI state.

---

## Project Highlights for Recruiters

- **Demonstrates strong TypeScript proficiency** — strict typing throughout, discriminated unions for provider types, generic utility functions for mappers and pagination, typed GraphQL operations, and a well-defined public API surface with explicit exports.
- **Implements a non-trivial search algorithm** — multi-variant query expansion, fuzzy full-text ranking with weighted fields, relevance scoring, and query correction. This is not a simple API passthrough; it's a custom search pipeline with real information retrieval concepts.
- **Shows clean architectural separation** — the `@anitube/api` package has zero coupling to React or Next.js. Provider clients, mappers, types, and search logic are independently testable. The service layer abstracts provider differences behind a unified interface.
- **Applies production patterns** — server-side caching with CDN headers, rate-limiting for the Jikan API client, error boundaries with loading/error/not-found states per route, SEO metadata generation per page, and flash-prevention for theme persistence.
- **Demonstrates monorepo competency** — Turborepo task graph with `dependsOn`, shared TypeScript and ESLint configurations, workspace protocol dependencies, and Docker integration with `turbo prune --docker`.
- **Builds a cohesive design system** — CSS custom properties for theming, Tailwind utility extensions, reusable animation primitives (`.geometric-box`, `.neon-text`, `.animate-blink`), and component-level Framer Motion patterns.
- **Includes E2E test infrastructure** — Playwright tests organized by feature domain (home, search, navigation, anime details, layout) with auto-starting dev server configuration.
- **Enforces code quality** — ESLint flat config, Prettier, Husky pre-commit hooks running lint-staged, and TypeScript strict mode across all packages.

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **pnpm** 9.x (`corepack enable` to activate)
- **Docker** (optional, for containerized builds)

### Installation

```bash
# Clone the repository
git clone https://github.com/ArDnath/anitube.git
cd anitube

# Install dependencies
pnpm install

# Copy environment variables
cp apps/Anitube/.env.example apps/Anitube/.env.local
```

### Development

```bash
# Start all workspace packages in parallel (API + Next.js app)
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
# Build all packages and the Next.js app
pnpm build
```

### Docker

```bash
# Build and run the production container
docker compose up --build
```

### Testing, Linting & Type Checking

```bash
# Run E2E tests (Playwright)
pnpm test:e2e

# Lint all packages
pnpm lint

# Type check all packages
pnpm check-types

# Format code
pnpm format
```

---

## Environment & Configuration

The application uses environment variables for API endpoint configuration. No API keys are required — both AniList and Jikan are public APIs.

| Variable                      | Description              | Default                      |
| ----------------------------- | ------------------------ | ---------------------------- |
| `NEXT_PUBLIC_APP_URL`         | Application base URL     | `http://localhost:3000`      |
| `NEXT_PUBLIC_API_URL`         | Jikan API base URL       | `https://api.jikan.moe/v4`   |
| `NEXT_PUBLIC_ANILIST_API_URL` | AniList GraphQL endpoint | `https://graphql.anilist.co` |

**Configuration files enforcing code quality:**

- `tsconfig.json` — strict TypeScript across all packages with shared base configs
- `eslint.config.mjs` — ESLint 9 flat config with Next.js and React internal presets
- `.lintstagedrc.js` — runs ESLint fix and Prettier on staged files
- `.husky/pre-commit` — gates all commits through lint-staged

---

## Project Structure

```
anitube/
├── apps/
│   └── Anitube/                    # Main Next.js 16 application
│       ├── app/                    # App Router pages and layouts
│       │   ├── api/search/         # Search and suggest API route handlers
│       │   ├── anime/[id]/         # Anime detail page (SSR)
│       │   ├── genre/              # Genre index and genre-filtered pages
│       │   ├── search/             # Advanced search page (client-side)
│       │   ├── watch/              # Watch redirect route
│       │   ├── layout.tsx          # Root layout with SEO, fonts, providers
│       │   └── globals.css         # Design system (CSS variables, scanlines)
│       ├── components/
│       │   ├── anime/              # Detail page components (Header, Episodes, Characters)
│       │   ├── home/               # Homepage components (Hero, AnimeCard, Section)
│       │   ├── layout/             # Header and Footer with Framer Motion
│       │   └── player/             # VideoPlayer with keyboard shortcuts
│       ├── lib/
│       │   ├── store/              # Zustand stores (app-store, player-store)
│       │   ├── query/              # React Query provider and client config
│       │   ├── search/             # Client-side search fetch utilities
│       │   └── constants.ts        # Application constants and route definitions
│       ├── e2e/                    # Playwright tests (home, search, layout, anime, nav)
│       └── playwright.config.ts    # E2E test configuration
├── packages/
│   ├── api/                        # @anitube/api — data access layer
│   │   └── src/
│   │       ├── providers/          # AniList (GraphQL) and Jikan (REST) clients
│   │       ├── search/             # Fuzzy search pipeline (normalize, rank, advanced)
│   │       ├── services/           # AnimeService unified facade
│   │       ├── types/              # Canonical and provider-specific type definitions
│   │       └── utils/              # Mappers and pagination helpers
│   ├── ui/                         # @anitube/ui — shared component library
│   ├── eslint-config/              # Shared ESLint configurations
│   └── typescript-config/          # Shared TSConfig base files
├── Dockerfile                      # Multi-stage production build
├── docker-compose.yml              # Container orchestration
├── turbo.json                      # Turborepo pipeline configuration
└── pnpm-workspace.yaml             # Workspace package definitions
```

---

## Implementation Details & Trade-offs

### Rate Limiting (Jikan Client)

The Jikan API enforces a rate limit of ~3 requests/second. The `JikanClient` implements a queue-based rate limiter using promise chaining (`this.chain`), ensuring requests are serialized with a minimum interval. This avoids 429 responses without requiring external rate-limiting libraries.

### Search Relevance Scoring

The fuzzy search converts Fuse.js scores (0 = perfect match, 1 = no match) into a 0–100 relevance scale. Results below 25 are filtered by default. When fewer than 5 results pass the threshold, unmatched candidates are appended with a baseline score of 10 and marked as fuzzy matches to provide fallback results.

### Theme Flash Prevention

A blocking `<script>` in the `<head>` reads the theme preference from `localStorage` before React hydrates, adding the `.light` class immediately. This prevents the visible dark-to-light flash that commonly plagues client-side theme implementations.

### Provider Abstraction

The `AnimeService` facade routes calls to the appropriate provider. AniList handles metadata-heavy queries (details, search, trending, popular, genre), while Jikan handles MAL-specific data (episodes, recommendations, top rankings). This split leverages each API's strengths — AniList's rich GraphQL schema and Jikan's episode-level granularity.

### Deliberate Simplifications

- **No authentication** — the app is a discovery platform; watch history and favorites are stored client-side only.
- **No database** — all data is sourced from external APIs. State persistence is handled entirely by Zustand + localStorage.
- **Video player is a demo** — the `VideoPlayer` component is fully functional (keyboard shortcuts, seek, volume, playback speed, fullscreen) but uses a sample video URL since this is a discovery platform, not a streaming service.

---

## Roadmap / Future Improvements

- [ ] **Unit and integration tests** — add Vitest tests for the `@anitube/api` search pipeline, mappers, and service layer
- [ ] **CI pipeline** — GitHub Actions workflow for lint, type-check, build, and Playwright E2E on push/PR
- [ ] **Accessibility audit** — ARIA landmarks, focus management, reduced-motion media queries, screen reader testing
- [ ] **Search suggestions UI** — the `/api/search/suggest` endpoint exists; wire it to a typeahead dropdown in the header search input
- [ ] **Infinite scroll** — replace pagination with intersection-observer-based infinite loading on browse/search pages
- [ ] **Image optimization** — address Next.js LCP warnings by adding `loading="eager"` and `priority` props to above-the-fold hero images
- [ ] **Error monitoring** — integrate Sentry or similar for production error tracking
- [ ] **Analytics** — environment variable placeholders exist for GA and Vercel Analytics

---

## Contributing

Contributions are welcome. To get started:

```bash
# Fork and clone
git clone https://github.com/<your-username>/anitube.git
cd anitube

# Create a feature branch
git checkout -b feat/your-feature

# Install dependencies
pnpm install

# Make changes, ensure quality gates pass
pnpm lint
pnpm check-types
pnpm build

# Commit (Husky will run lint-staged automatically)
git commit -m "feat: description of change"

# Open a Pull Request
```

---

## License

This project is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**. See the [LICENSE](./LICENSE) file for full terms.

---

## Author

**Ariyaman Debnath**

- GitHub: [https://github.com/ArDnath](https://github.com/ArDnath)
- Email: ariyamandebnath.ad@gmail.com
