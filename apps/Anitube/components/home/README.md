# Home Components

This directory contains all components used on the home page.

## Components

### HeroSection.tsx
The hero/banner section at the top of the home page.

**Props:**
- `anime: SearchResult | null` - Featured anime to display

**Features:**
- Full-width background image with gradient overlays
- Brutalist card with anime title
- Info pills (score, type, episodes, year)
- "Watch Now" and "Details" buttons
- Skeleton loader when data is loading

**Styling:**
- Pastel pink title card with rotation effect
- Black borders and brutal shadows
- Gradient overlays for text readability

---

### AnimeCard.tsx
Individual anime card component used in grids.

**Props:**
- `anime: SearchResult` - Anime data to display
- `index?: number` - Card index for staggered animations

**Features:**
- Rotating pastel background colors
- Cover image with zoom on hover
- Score badge overlay
- Type and episode badges
- Staggered slide-in animation

**Styling:**
- Different rotation angles for variety
- Cycling through 6 pastel colors
- Brutal shadows and black borders
- Uppercase, bold typography

**Exports:**
- `AnimeCard` - Main component
- `AnimeCardSkeleton` - Loading state

---

### AnimeSection.tsx
Container for a section of anime cards.

**Props:**
- `title: string` - Section title
- `anime: SearchResult[]` - Array of anime to display
- `viewAllHref?: string` - Link to view all items
- `isLoading?: boolean` - Loading state

**Features:**
- Brutalist section header
- "View All" link with arrow
- Responsive grid layout
- Loading skeleton grid
- Empty state message

**Grid Breakpoints:**
- Mobile: 2 columns
- SM: 3 columns
- MD: 4 columns
- LG: 5 columns
- XL: 6 columns

---

### HomeContent.tsx
Main client component that orchestrates data fetching.

**Features:**
- Uses React Query for data management
- Fetches 4 different anime lists:
  - Trending (12 items)
  - Popular this season (12 items)
  - Top rated (12 items)
  - All-time popular (12 items)
- First trending anime becomes the hero
- Remaining trending shown in section

**Data Fetching:**
- Automatic caching with React Query
- 1-minute stale time
- 5-minute garbage collection
- No window focus refetch
- Single retry on error

---

### index.ts
Barrel export file for clean imports.

**Usage:**
```typescript
import { HeroSection, AnimeCard, AnimeSection, HomeContent } from '@/components/home';
```

## Design System

### Colors
All components use the pastel brutalist color palette:
- `pastel-pink`: #FFB3D9
- `pastel-purple`: #D4B3FF
- `pastel-blue`: #B3D9FF
- `pastel-mint`: #B3FFD9
- `pastel-yellow`: #FFFFB3
- `pastel-peach`: #FFD9B3
- `pastel-lavender`: #E6B3FF
- `pastel-coral`: #FFB3B3

### Shadows
- `shadow-brutal-sm`: 4px offset
- `shadow-brutal`: 8px offset
- `shadow-brutal-lg`: 12px offset

### Borders
All components use 3-4px solid black borders for the brutalist aesthetic.

### Typography
- Font weight: black (900) for titles
- Font weight: bold (700) for labels
- All uppercase for emphasis
- Tight tracking

### Animations
- `animate-fade-in`: Opacity transition
- `animate-slide-up`: Vertical entrance
- `animate-slide-in`: Horizontal entrance with stagger

## Usage Example

```tsx
import { HomeContent } from '@/components/home';

export default function HomePage() {
  return <HomeContent />;
}
```

The HomeContent component handles everything internally, including:
- Data fetching
- Loading states
- Error handling
- Layout and styling
