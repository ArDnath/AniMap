# AniTube Search Page

Full-featured search page for discovering anime with advanced filters, real-time results, and neu-brutalist design.

## 📁 Files Created

- **`page.tsx`** — Server component with SEO-optimized metadata (Next.js 15)
- **`SearchContent.tsx`** — Client component with all interactive features (~940 lines)
- **`loading.tsx`** — Brutalist loading skeleton with animated placeholders

## ✨ Features

### 🔍 Search
- **Debounced search** (300ms) with live URL updates
- **Auto-focused** search input
- **Recent searches** from localStorage (max 8, with clear functionality)
- Real-time **result count** display

### 🎛️ Advanced Filters (Collapsible)
- **13 Genre chips** (multi-select): Action, Adventure, Comedy, Drama, Fantasy, Horror, Mystery, Romance, Sci-Fi, Slice of Life, Sports, Supernatural, Thriller
- **Format radio**: Any, TV, Movie, OVA, ONA, Special
- **Status radio**: Any, Airing, Finished, Upcoming
- **Sort by**: Popularity *(default)*, Score, Title, Trending
- **Reset filters** button when filters are active
- **Filter badge** showing active filter count

### 📊 Results
- **Grid layout**: 2 cols mobile → 3 tablet → 4 lg → 6 xl
- **AnimeCard** components with brutalist styling
- **AnimeCardSkeleton** during loading (24 cards per page)
- **Client-side sorting** based on selected sort option

### 📄 Pagination
- Previous/Next buttons with disabled states
- Page numbers (up to 5 visible) with ellipsis
- First & last page jumps
- Smooth scroll to top on page change
- Page info: "Page X of Y · Z total results"

### 🎨 States
- **Initial state** — "Search for your favourite anime!" with genre suggestions
- **Empty state** — "No results" with anime suggestions and genre chips
- **Loading state** — 24 skeleton cards matching the brutalist design
- **Error state** — Clean error UI with retry button

### 🎯 UX Details
- **Keyboard shortcuts**: Enter to search, Escape to close dropdown
- **Click-outside** to close recent searches dropdown
- **Toast notifications** for search errors (via Sonner)
- **Recent searches**:
  - Saved to localStorage on Enter or "GO" button
  - Click to re-search
  - Hover to show delete button
  - "Clear all" button

## 🎨 Design System

### Brutalism Features
- **4px black borders** everywhere
- **Shadow-brutal variants**: `sm`, `md`, `lg`
- **Bold uppercase** text
- **Pastel backgrounds**: yellow-50, pink-50, purple-100, etc.
- **Hover transitions**: `translate-x/y` with shadow changes
- **Hard edges**, no rounded corners on main elements

### Color Palette
- Genre chips: Rotating pastel colors (pink, purple, blue, mint, yellow, peach, lavender, coral)
- Search input: White bg, black border
- Filters panel: pastel-purple-100
- Results count: pastel-yellow-300
- Active buttons: Black bg, white text

## 🔌 API Integration

- Uses `animeApi.searchAnime(query, options)` from `@anitube/api`
- **TanStack Query** for data fetching:
  - `queryKey`: `['search', query, page, genres, format, status, sort]`
  - `enabled`: Only when query or filters are active
  - `staleTime`: 5 minutes
  - `retry`: 1 attempt
- **Format mapping**: UI values → AniList values (e.g., "Movie" → "MOVIE")
- **Status mapping**: UI values → AniList values (e.g., "Airing" → "RELEASING")

## 🧭 URL Management

- **Query params**: `?q=naruto&page=2`
- Uses Next.js 15 **`useSearchParams()`** (requires Suspense)
- **Debounced** URL updates (300ms) as user types
- **`router.replace()`** for gradual changes (no history spam)
- **`router.push()`** for explicit searches (Enter key, recent search clicks)

## 📱 SEO

- **Dynamic metadata** based on search query
- `title`: "Search: {query} | AniTube" or "Search Anime | AniTube"
- `description`: Contextual based on presence of query
- `keywords`: Includes search query variants
- **OpenGraph** and **Twitter** meta tags
- **robots**: `index: false` for query pages (avoid duplicate content)
- **canonical** URL for search page

## 🚀 Performance

- **Code splitting**: Client component loads separately
- **Suspense streaming**: Server metadata streams instantly
- **Debounced API calls**: Reduces unnecessary requests
- **Cached results**: TanStack Query caching (5 min stale time)
- **Optimized re-renders**: `useCallback`, `useMemo` for handlers and derived values

## 🎯 Accessibility

- Semantic HTML: `<nav>`, `<button>`, `<input>`
- **ARIA labels**: Search input, pagination buttons, page current state
- **aria-expanded**: For collapsible filters
- **Keyboard navigation**: Tab, Enter, Escape
- Disabled states with visual feedback

## 🛠️ Tech Stack

- **Next.js 15** (App Router, Server Components)
- **React 18** (Client hooks, Suspense)
- **TypeScript** (Strict mode with `noUncheckedIndexedAccess`)
- **TanStack Query v5** (Data fetching, caching)
- **Tailwind CSS** (Custom brutalism theme)
- **Lucide React** (Icons)
- **Sonner** (Toast notifications)

## 📦 Dependencies Used

```ts
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Search, X, SlidersHorizontal, ChevronDown, Clock, ... } from "lucide-react";
import { animeApi } from "@anitube/api";
import type { SearchResult } from "@anitube/api";
import { AnimeCard, AnimeCardSkeleton } from "@/components/home/AnimeCard";
```

## 🔮 Future Enhancements

- Add more sort options (e.g., "Most Episodes", "Recently Added")
- Persist filters in URL params for shareability
- Add "Clear search" button when query exists
- Voice search integration
- Search suggestions/autocomplete
- Advanced filters: Year range, Studio filter, Rating filter
- Save favorite searches
- Export search results

---

**Created**: 2024  
**Author**: AniTube Dev Team  
**Design**: Neu-brutalism with pastel colors  
**Status**: ✅ Production Ready
