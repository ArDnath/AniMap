# Anime Detail Page

This is the dynamic anime detail page route at `/anime/[id]`. It displays comprehensive information about a specific anime.

## Features

### 1. Header Section
- **Banner Image**: Full-width banner background from AniList
- **Cover Poster**: Large poster image with neu-brutalist styling
- **Title Display**: Shows English and alternative titles (Romaji/Native)
- **Metadata Pills**: Score, format, status, episodes, season/year
- **Genre Tags**: Interactive brutalist-styled chips
- **Action Buttons**: 
  - "Watch Now" - Primary CTA with pink gradient
  - "Add to List" - Secondary CTA (future functionality)

### 2. Content Sections

#### Description
- Clean HTML-stripped text display
- Expand/collapse functionality for long descriptions
- Brutalist card styling with pink accent

#### Episodes List
- Only shown if MAL ID is available
- Paginated display (12 episodes per page)
- Each episode shows:
  - Episode number with gradient badge
  - Title and air date
  - Duration
  - Filler/Recap indicators
  - Synopsis (if available)
  - Play button CTA

#### Characters
- Fetched directly from AniList GraphQL API
- Grid layout with character cards
- Shows character images, names (English and Native)
- "MAIN" badge for main characters
- Expand/collapse to show all characters

### 3. Sidebar (Information)

#### Anime Info
- Format, Status, Dates
- Studios with chip display
- Score and Popularity metrics
- Native title

#### Recommendations
- Top 5 similar anime (if MAL ID available)
- Fetched from Jikan/MAL
- Clickable cards with cover images
- Shows popularity/fan count

## Data Fetching

### Server Component
The page is a Next.js Server Component for optimal SEO and performance.

### Data Sources
1. **Primary Anime Data**: `animeApi.getAnimeById(id, 'anilist')`
2. **Episodes** (optional): `animeApi.getEpisodes(malId)` - Requires MAL ID
3. **Characters**: Direct AniList GraphQL query in client component
4. **Recommendations** (optional): `animeApi.getRecommendations(malId)` - Requires MAL ID

### Error Handling
- Graceful fallbacks for missing data
- Individual try-catch blocks for optional data (episodes, recommendations)
- Custom error and not-found pages

## SEO & Metadata

### Dynamic Metadata
- Title: `{Anime Title} | AniTube`
- Description: First 155 characters of anime description
- Open Graph tags with cover image
- Twitter Card meta tags

## Styling

### Design System
- **Neu-brutalism** aesthetic with bold borders and box shadows
- **Pastel color palette**: Pink, blue, purple, yellow, green accents
- **Bold typography**: Heavy font weights and high contrast
- **Interactive elements**: Shadow and transform animations on hover
- **Responsive layout**: Mobile-first with Tailwind CSS

### Color Scheme
- Pink (#FF6B9D): Primary actions, headers
- Blue (#4AB0FF): Secondary elements
- Purple (#A573FF): Characters section
- Yellow (#FFEF32): Scores, highlights
- Green (#52FF9A): Status indicators
- Black (#000): All borders and text shadows

## Component Structure

```
app/anime/[id]/
├── page.tsx           # Main server component
├── loading.tsx        # Skeleton loading state
├── error.tsx          # Error boundary
├── not-found.tsx      # 404 page
└── README.md          # This file

components/anime/
├── AnimeHeader.tsx           # Hero section (client)
├── AnimeDescription.tsx      # Description with expand (client)
├── AnimeEpisodes.tsx         # Episodes list with pagination (client)
├── AnimeCharacters.tsx       # Characters grid (client)
├── AnimeInfo.tsx             # Sidebar info (server)
└── AnimeRecommendations.tsx  # Similar anime (server)
```

## Client vs Server Components

### Server Components
- `page.tsx` - Main page layout
- `AnimeInfo.tsx` - Static information display
- `AnimeRecommendations.tsx` - Static recommendations list

### Client Components
- `AnimeHeader.tsx` - Interactive buttons
- `AnimeDescription.tsx` - Expand/collapse state
- `AnimeEpisodes.tsx` - Pagination state
- `AnimeCharacters.tsx` - Data fetching and expand/collapse

## Usage Examples

### Accessing via AniList ID
```
/anime/1           # Cowboy Bebop (AniList ID: 1)
/anime/21           # One Piece (AniList ID: 21)
```

### TypeScript Types
All types are imported from `@anitube/api`:
- `AnimeInfo` - Main anime data structure
- `EpisodeInfo` - Episode data
- `SearchResult` - Used for recommendations

## Loading States

The `loading.tsx` file provides a fully-styled skeleton UI that matches the final page structure, ensuring a smooth loading experience.

## Error Handling

- **404 Not Found**: Custom `not-found.tsx` with helpful navigation
- **Runtime Errors**: Custom `error.tsx` with retry functionality
- **Missing Data**: Graceful degradation (sections hide if no data)

## Future Enhancements

- [ ] Video player integration for "Watch Now"
- [ ] User authentication for "Add to List"
- [ ] Related anime from AniList relations
- [ ] User reviews and ratings
- [ ] Trailer embed player
- [ ] Social sharing buttons
- [ ] Breadcrumb navigation
- [ ] Similar anime from AniList (in addition to MAL recommendations)
