# AniTube Web App

Modern anime streaming platform built with Next.js 16 featuring a beautiful neu-brutalism design with pastel colors.

## 🎨 Design System

This app uses a custom neu-brutalism design system with:

- **Pastel color palette** (pinks, purples, blues, greens, yellows)
- **Thick borders** and **geometric shadows**
- **Bold typography** with custom font scales
- **Brutalist UI components** with hard edges and strong contrast

## 🚀 Tech Stack

### Core
- **Next.js 16.2** - React framework with App Router
- **React 19.2** - UI library
- **TypeScript 5.9** - Type safety

### Styling
- **Tailwind CSS 3.4** - Utility-first CSS
- **clsx & tailwind-merge** - Class name utilities
- **Custom brutalist theme** - Pastel colors with geometric shadows

### State Management
- **Zustand 5.0** - Lightweight state management
  - Player state
  - App state (theme, favorites, watch history)
  - Persistent storage with localStorage

### Data Fetching
- **TanStack Query 5.62** - Server state management
  - Automatic caching and revalidation
  - Optimistic updates
  - DevTools for debugging

### UI Components
- **Radix UI** - Accessible component primitives
  - Avatar, Dialog, Dropdown, Popover
  - Select, Slider, Switch, Tabs, Toast
- **Framer Motion 12** - Animation library
- **Lucide React** - Icon library

### Video Player
- **Vime 5.4** - Modern video player
  - HLS support
  - Customizable controls
  - Keyboard shortcuts

### Features
- **next-pwa 5.6** - Progressive Web App support
- **Sonner** - Toast notifications

### API Integration
- **@anitube/api** - Internal API wrapper
  - Jikan API integration
  - AniList GraphQL integration

## 📁 Project Structure

```
apps/web/
├── app/                    # Next.js app directory
│   ├── anime/             # Anime pages
│   ├── fonts/             # Custom fonts
│   ├── globals.css        # Global styles with brutalist theme
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── lib/                   # Shared utilities
│   ├── constants.ts       # App constants
│   ├── query/             # TanStack Query setup
│   │   ├── query-client.ts
│   │   └── provider.tsx
│   ├── store/             # Zustand stores
│   │   ├── app-store.ts   # App-wide state
│   │   ├── player-store.ts # Video player state
│   │   └── index.ts
│   └── utils/             # Utility functions
│       └── cn.ts          # Class name merger
├── public/                # Static assets
│   └── manifest.json      # PWA manifest
├── .env.example           # Environment variables template
├── next.config.js         # Next.js config with PWA
├── postcss.config.mjs     # PostCSS config
├── tailwind.config.ts     # Tailwind theme config
└── package.json           # Dependencies

```

## 🎨 Theme Configuration

### Colors

The brutalist theme uses pastel colors with strong black borders:

- **Primary**: `#A573FF` (Pastel Purple)
- **Secondary**: `#FF6B9D` (Pastel Pink)
- **Accent**: `#4AB0FF` (Pastel Blue)

Additional pastel colors available:
- Green: `#52FF9A`
- Yellow: `#FFEF32`
- Orange: `#FFA932`

### Shadows

Custom brutalist shadows:
```css
shadow-brutal-sm  /* 4px 4px 0px black */
shadow-brutal-md  /* 6px 6px 0px black */
shadow-brutal-lg  /* 8px 8px 0px black */

/* Colored shadows */
shadow-brutal-pink
shadow-brutal-purple
shadow-brutal-blue
```

### Borders

Thick borders for the brutalist aesthetic:
```css
border-3  /* 3px */
border-5  /* 5px */
border-6  /* 6px */
```

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- pnpm 8+

### Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Run the development server:
```bash
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm check-types` - Type check with TypeScript

## 🗃️ State Management

### App Store (Zustand)

Global app state including:
- Theme (light/dark/system)
- Language preferences
- UI state (sidebar, search)
- Watch history
- Favorites
- Continue watching

```typescript
import { useAppStore } from '@/lib/store';

function Component() {
  const { theme, setTheme, favorites, toggleFavorite } = useAppStore();
  
  // Use state...
}
```

### Player Store (Zustand)

Video player state:
- Playback state (playing, muted, volume)
- Player settings (quality, playback rate)
- UI state (fullscreen, controls)

```typescript
import { usePlayerStore } from '@/lib/store';

function VideoPlayer() {
  const { isPlaying, setIsPlaying, volume, setVolume } = usePlayerStore();
  
  // Control player...
}
```

## 🌐 Data Fetching

Using TanStack Query for server state:

```typescript
import { useQuery } from '@tanstack/react-query';

function AnimeList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['anime', 'trending'],
    queryFn: fetchTrendingAnime,
  });
  
  // Render data...
}
```

## 📱 PWA Support

The app is configured as a Progressive Web App:

- **Offline support** - Service worker caching
- **Install prompt** - Add to home screen
- **App manifest** - Custom icons and theme
- **Disabled in development** - Only active in production

## 🎯 Utility Functions

### Class Name Merger

```typescript
import { cn } from '@/lib/utils/cn';

<div className={cn(
  'border-3 shadow-brutal-md',
  isActive && 'bg-pastel-purple-500'
)} />
```

## 🔧 Configuration Files

### Tailwind Config
- Custom pastel color palette
- Brutalist shadows and borders
- Animation keyframes
- Typography scale

### Next.js Config
- PWA configuration
- Image optimization for anime CDNs
- React strict mode

### PostCSS Config
- Tailwind CSS processing
- Autoprefixer for browser compatibility

## 📦 Dependencies

All major dependencies are documented in `package.json`. Key packages:

**UI & Styling:**
- tailwindcss, clsx, tailwind-merge
- @radix-ui/* (accessible components)
- framer-motion (animations)
- lucide-react (icons)

**State & Data:**
- zustand (state management)
- @tanstack/react-query (data fetching)

**Video:**
- @vime/react, @vime/core (video player)

**Features:**
- next-pwa (PWA support)
- sonner (notifications)

## 🚧 Next Steps

This is the infrastructure setup. The next phase will include:

1. Building reusable UI components
2. Creating page layouts
3. Implementing API integration
4. Adding video player component
5. Building anime browsing/search features

## 📝 License

AGPL-3.0-only
