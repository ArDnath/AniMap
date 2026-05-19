/**
 * Unified types used across providers
 */

export interface AnimeInfo {
  id: number;
  malId: number | null;
  title: {
    english: string | null;
    romaji: string | null;
    native: string | null;
  };
  description: string | null;
  coverImage: string;
  bannerImage: string | null;
  genres: string[];
  episodes: number | null;
  status: string;
  season: string | null;
  seasonYear: number | null;
  averageScore: number | null;
  popularity: number;
  type: string | null;
  format: string | null;
  startDate: string | null;
  endDate: string | null;
  studios: string[];
  trailer: {
    id: string | null;
    site: string | null;
    url: string | null;
  } | null;
}

export interface EpisodeInfo {
  number: number;
  title: string | null;
  aired: string | null;
  duration: number | null;
  filler: boolean;
  recap: boolean;
  synopsis: string | null;
}

export interface SearchMatchMeta {
  /** Relevance 0–100 (higher = better match) */
  score: number;
  matchedFields: string[];
  isFuzzyMatch?: boolean;
}

export interface SearchResult {
  id: number;
  malId: number | null;
  title: {
    english: string | null;
    romaji: string | null;
    native: string | null;
  };
  coverImage: string;
  type: string | null;
  episodes: number | null;
  status: string;
  averageScore: number | null;
  popularity: number;
  season: string | null;
  year: number | null;
  /** Alternative titles (romaji/english/Japanese) for fuzzy matching */
  synonyms?: string[];
  match?: SearchMatchMeta;
  description?: string | null;
}

export interface SearchMeta {
  query: string;
  correctedQuery?: string;
  fuzzyApplied: boolean;
  variantQueries: string[];
}

export interface SearchResponse extends PaginatedResponse<SearchResult> {
  meta: SearchMeta;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    hasNextPage: boolean;
    total: number;
  };
}

export interface APIConfig {
  aniListEndpoint?: string;
  jikanEndpoint?: string;
}

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public provider?: "anilist" | "jikan",
  ) {
    super(message);
    this.name = "APIError";
  }
}
