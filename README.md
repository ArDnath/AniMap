# AniTube

**A modern, high-performance, stateless anime discovery platform.**

Discover, search, and explore anime with rich metadata, seasonal catalogs, and intuitive browsing — all built with zero backend persistence for maximum scalability and simplicity.

![Demo](link-to-screenshot-or-gif)  
[Live Demo →](https://your-deployed-url.vercel.app)

## ✨ Features

- **Advanced Search** — Instant fuzzy search with filters (genre, year, season, status, score, format, etc.)
- **Seasonal Browsing** — Clean seasonal anime grids (Winter 2026, Spring, etc.) with trending highlights
- **Rich Anime Details** — Comprehensive metadata including synopsis, characters, staff, studios, voice actors, trailers, and recommendations
- **Infinite Scroll & Pagination** — Smooth, performant browsing experience
- **Responsive & Beautiful UI** — Dark-first design optimized for anime fans
- **Stateless Architecture** — Fully server-rendered where possible, excellent SEO, and edge-ready

## 🛠️ Tech Stack

- **Monorepo**: Turborepo
- **Frontend**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Data**: AniList + Jikan API (public APIs)
- **Shared Packages**: `@repo/ui`, TypeScript config, ESLint
- **Deployment**: Vercel / Cloudflare (Edge-ready)

## Why This Architecture?

AniTube is deliberately **stateless** — no database or user accounts (yet). This showcases:
- Efficient public API integration and caching strategies
- Strong server-side rendering and data fetching patterns
- Scalable monorepo structure with shared components
- Clean separation of concerns in a Turborepo setup

Perfect demonstration of modern full-stack TypeScript development without unnecessary complexity.

## 🚀 Quick Start

```bash
git clone https://github.com/ArDnath/AniTube.git
cd AniTube
pnpm install
pnpm dev
