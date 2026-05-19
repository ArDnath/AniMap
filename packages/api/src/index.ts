/**
 * @anitube/api — anime data client (AniList + Jikan)
 */

export { AnimeService } from "./services/anime.js";
export { AniListClient, JikanClient } from "./providers/index.js";

export type {
  JikanAnime,
  JikanEpisode,
  JikanPagination,
  JikanResponse,
  AniListMedia,
  AnimeInfo,
  EpisodeInfo,
  SearchResult,
  PaginatedResponse,
  APIConfig,
} from "./types/index.js";

export { APIError } from "./types/index.js";

export {
  mapAniListToAnimeInfo,
  mapAniListToSearchResult,
  mapJikanToAnimeInfo,
  mapJikanToEpisodeInfo,
  mapJikanToSearchResult,
  getBestTitle,
} from "./utils/mappers.js";

export {
  PROVIDERS,
  ANILIST_BASE_URL,
  JIKAN_BASE_URL,
  ANILIST_OPERATIONS,
  JIKAN_ENDPOINTS,
  ANIME_SERVICE_METHODS,
} from "./constants/endpoints.js";

export type { ProviderName } from "./constants/endpoints.js";

import { AnimeService } from "./services/anime.js";

export const animeApi = new AnimeService();
