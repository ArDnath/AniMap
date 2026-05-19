/**
 * Registry of all external API endpoints used by @anitube/api.
 * Active providers: AniList (GraphQL) and Jikan (REST / MAL).
 */

export const PROVIDERS = ["anilist", "jikan"] as const;
export type ProviderName = (typeof PROVIDERS)[number];

export const ANILIST_BASE_URL = "https://graphql.anilist.co";
export const JIKAN_BASE_URL = "https://api.jikan.moe/v4";

/** AniList GraphQL operations (single endpoint: POST graphql.anilist.co) */
export const ANILIST_OPERATIONS = {
  getAnimeById: {
    operation: "Media",
    description: "Get anime by AniList ID",
    variables: ["id"],
  },
  searchAnime: {
    operation: "Page.media",
    description: "Search and filter anime",
    variables: [
      "search",
      "page",
      "perPage",
      "sort",
      "genres",
      "season",
      "seasonYear",
      "format",
      "status",
    ],
  },
  getTrending: {
    operation: "Page.media",
    description: "Trending anime (sort: TRENDING_DESC)",
    variables: ["page", "perPage"],
  },
  getPopular: {
    operation: "Page.media",
    description: "Popular anime (sort: POPULARITY_DESC)",
    variables: ["page", "perPage"],
  },
  getSeasonalAnime: {
    operation: "Page.media",
    description: "Seasonal anime via genre/season filters",
    variables: ["season", "seasonYear", "page", "perPage"],
  },
  getAnimeByGenre: {
    operation: "Page.media",
    description: "Anime filtered by genre",
    variables: ["genres", "page", "perPage"],
  },
} as const;

/** Jikan REST paths (base: api.jikan.moe/v4) */
export const JIKAN_ENDPOINTS = {
  getAnimeById: {
    method: "GET",
    path: "/anime/{malId}/full",
    description: "Full anime details by MAL ID",
  },
  searchAnime: {
    method: "GET",
    path: "/anime",
    query: ["q", "page", "limit", "type", "status", "rating", "order_by", "sort"],
    description: "Search anime",
  },
  getAnimeEpisodes: {
    method: "GET",
    path: "/anime/{malId}/episodes",
    query: ["page"],
    description: "Episode list for an anime",
  },
  getAnimeEpisode: {
    method: "GET",
    path: "/anime/{malId}/episodes/{episodeNumber}",
    description: "Single episode by number",
  },
  getTopAnime: {
    method: "GET",
    path: "/top/anime",
    query: ["page", "limit", "type", "filter"],
    description: "Top-ranked anime",
  },
  getSeasonalAnime: {
    method: "GET",
    path: "/seasons/{year}/{season}",
    query: ["page"],
    description: "Anime for a specific season",
  },
  getCurrentSeason: {
    method: "GET",
    path: "/seasons/now",
    query: ["page"],
    description: "Current airing season",
  },
  getUpcomingSeason: {
    method: "GET",
    path: "/seasons/upcoming",
    query: ["page"],
    description: "Upcoming season anime",
  },
  getAnimeByGenre: {
    method: "GET",
    path: "/anime",
    query: ["genres", "page"],
    description: "Anime by MAL genre ID",
  },
  getAnimeRecommendations: {
    method: "GET",
    path: "/anime/{malId}/recommendations",
    description: "User recommendations for an anime",
  },
} as const;

/** AnimeService public methods and which provider backs each */
export const ANIME_SERVICE_METHODS = {
  getAnimeById: {
    providers: ["anilist", "mal (jikan)"],
    defaultProvider: "anilist",
  },
  searchAnime: { providers: ["anilist"] },
  getTrending: { providers: ["anilist"] },
  getPopular: { providers: ["anilist"] },
  getTopAnime: { providers: ["jikan"] },
  getSeasonalAnime: { providers: ["anilist"] },
  getCurrentSeason: { providers: ["anilist"] },
  getAnimeByGenre: { providers: ["anilist"] },
  getEpisodes: { providers: ["jikan"] },
  getEpisode: { providers: ["jikan"] },
  getRecommendations: { providers: ["jikan"] },
} as const;
