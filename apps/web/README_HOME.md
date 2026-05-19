# AniTube Home Page

This document describes the home page implementation for AniTube.

## Features Implemented

### 1. Hero/Banner Section
- **Component**: `components/home/HeroSection.tsx`
- Features:
  - Featured anime with background image (uses first trending anime)
  - Title overlay with brutalist card design
  - Gradient overlays for readability
  - "Watch Now" and "Details" action buttons
  - Info pills showing score, type, episodes, and year
  - Responsive design with pastel pink accent
  - Loading skeleton state

### 2. Content Sections
- **Component**: `components/home/AnimeSection.tsx`
- Four main sections:
  - 🔥 **Trending Now** - Currently trending anime
  - ⭐ **Popular This Season** - Current season's popular anime
  - 🏆 **Top Rated** - Highest rated anime of all time
  - 💎 **All Time Popular** - Most popular anime overall
- Each section includes:
  - Brutalist-styled section headers
  - "View All" navigation links
  - Responsive grid layout
  - Loading skeletons

### 3. Anime Cards
- **Component**: `components/home/AnimeCard.tsx`
- Features:
  - Brutalist card design with black borders and shadows
  - Rotating pastel color backgrounds
  - Cover image with hover zoom effect
  - Score badge overlay
  - Type and episode count badges
  - Staggered animation on load
  - Loading skeleton variant

### 4. Data Fetching
- **Component**: `components/home/HomeContent.tsx`
- Uses React Query for data fetching and caching:
  - `getTrending()` - 12 trending anime
  - `getPopular()` - 12 popular anime
  - `getCurrentSeason()` - 12 current season anime
  - `getTopAnime()` - 12 top-rated anime
- Cache configuration:
  - 1-minute stale time
  - 5-minute garbage collection
  - No refetch on window focus
  - Single retry on failure

### 5. Responsive Design
- **Mobile (< 640px)**: 2 columns
- **Small Tablet (640px+)**: 3 columns
- **Medium Tablet (768px+)**: 4 columns
- **Large Tablet (1024px+)**: 5 columns
- **Desktop (1280px+)**: 6 columns

### 6. Styling & Design
- **Design System**: Brutalist with pastel colors
- **Color Palette**:
  - Pink: `#FFB3D9`
  - Purple: `#D4B3FF`
  - Blue: `#B3D9FF`
  - Mint: `#B3FFD9`
  - Yellow: `#FFFFB3`
  - Peach: `#FFD9B3`
  - Lavender: `#E6B3FF`
  - Coral: `#FFB3B3`
- **Shadows**: 
  - Brutal shadows (8px, 4px, 12px offsets)
  - Black borders (3-4px)
- **Animations**:
  - Fade-in
  - Slide-up
  - Slide-in with stagger
  - Hover transforms

## Project Structure

```
anitube/apps/web/
├── app/
│   ├── layout.tsx           # Root layout with Providers
│   ├── page.tsx             # Home page (server component)
│   ├── providers.tsx        # React Query provider
│   └── globals.css          # Global styles + Tailwind
├── components/
│   └── home/
│       ├── index.ts         # Barrel export
│       ├── HomeContent.tsx  # Main client component with data fetching
│       ├── HeroSection.tsx  # Hero banner
│       ├── AnimeSection.tsx # Section container
│       └── AnimeCard.tsx    # Anime card component
├── tailwind.config.js       # Tailwind configuration
└── postcss.config.js        # PostCSS configuration
```

## SEO & Metadata

The home page includes:
- Descriptive title and meta description
- Keywords for anime streaming
- Open Graph tags for social sharing
- Proper semantic HTML structure

## Usage

The home page is a Next.js server component that immediately renders the `HomeContent` client component. The client component uses React Query to fetch data from the `@anitube/api` package.

### Running the Development Server

```bash
cd anitube
pnpm install
pnpm dev
```

The home page will be available at `http://localhost:3000`

## Dependencies

- **Next.js 16.2.0** - React framework
- **React 19.2.0** - UI library
- **@tanstack/react-query** - Data fetching and caching
- **@anitube/api** - Anime API wrapper (workspace package)
- **lucide-react** - Icon library
- **Tailwind CSS** - Utility-first CSS framework
- **framer-motion** - Animation library (installed but not yet used)

## Future Enhancements

Potential improvements:
1. Add horizontal scroll carousel for sections
2. Implement infinite scroll or pagination
3. Add genre filters
4. Add search functionality
5. Implement view transitions between pages
6. Add more sophisticated animations with Framer Motion
7. Add user preferences for dark/light mode
8. Implement lazy loading for images
9. Add error boundaries
10. Add analytics tracking

## Notes

- The TypeScript errors you may see are due to module resolution and will be resolved once you run `pnpm install`
- All components are properly typed with TypeScript
- Images from external sources (AniList, MyAnimeList) are configured in `next.config.js`
- The design uses a brutalist aesthetic with pastel colors for a unique, eye-catching appearance
