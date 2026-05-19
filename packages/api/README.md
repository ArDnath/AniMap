# @anitube/api

TypeScript client library for anime data. Combines **AniList** (GraphQL) and **Jikan** (REST / MyAnimeList).

Removed legacy providers: Kitsu, Gogoanime, and old GraphQL codegen stubs.

## Active providers

| Provider | Base URL | Used for |
|----------|----------|----------|
| **AniList** | `https://graphql.anilist.co` | Search, trending, popular, seasonal, genre, detail by AniList ID |
| **Jikan** | `https://api.jikan.moe/v4` | MAL detail, top anime, episodes, recommendations |

## Folder structure

```
src/
  constants/endpoints.ts   # Endpoint registry
  providers/
    anilist/client.ts
    jikan/client.ts
  services/anime.ts        # AnimeService facade
  types/
    anilist.ts
    jikan.ts
    common.ts
  utils/
    mappers.ts
    pagination.ts
  index.ts
```

## API endpoints

### AniList (GraphQL → single POST endpoint)

| Operation | AnimeService method |
|-----------|---------------------|
| `Media(id)` | `getAnimeById(id, "anilist")` |
| `Page.media` (search) | `searchAnime` |
| `Page.media` (TRENDING_DESC) | `getTrending` |
| `Page.media` (POPULARITY_DESC) | `getPopular` |
| `Page.media` (season filters) | `getSeasonalAnime`, `getCurrentSeason` |
| `Page.media` (genre_in) | `getAnimeByGenre` |

### Jikan (REST)

| Path | AnimeService method |
|------|---------------------|
| `GET /anime/{id}/full` | `getAnimeById(id, "mal")` |
| `GET /top/anime` | `getTopAnime` |
| `GET /anime/{id}/episodes` | `getEpisodes` |
| `GET /anime/{id}/episodes/{n}` | `getEpisode` |
| `GET /anime/{id}/recommendations` | `getRecommendations` |

Jikan client also exposes `searchAnime`, `getSeasonalAnime`, `getCurrentSeason`, `getUpcomingSeason`, and `getAnimeByGenre` for direct use — not wired through `AnimeService` yet.

Import `ANILIST_OPERATIONS`, `JIKAN_ENDPOINTS`, and `ANIME_SERVICE_METHODS` from the package for the full registry.

## Usage

```typescript
import { animeApi } from "@anitube/api";

const results = await animeApi.searchAnime("Naruto");
const anime = await animeApi.getAnimeById(16498);
const episodes = await animeApi.getEpisodes(16498);
```

## Scripts

```bash
pnpm build        # Compile to dist/
pnpm check-types  # Typecheck
pnpm lint         # ESLint
pnpm test         # Build + live integration tests (requires network)
```

## License

AGPL-3.0-only
