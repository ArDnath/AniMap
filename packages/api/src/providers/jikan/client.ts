/**
 * Jikan REST client (MyAnimeList unofficial API)
 * @see https://docs.api.jikan.moe/
 */

import { JIKAN_BASE_URL } from "../../constants/endpoints.js";
import type {
  JikanAnime,
  JikanEpisode,
  JikanRecommendationEntry,
  JikanResponse,
} from "../../types/jikan.js";
import { APIError } from "../../types/common.js";

const REQUESTS_PER_SECOND = 3;
const MIN_INTERVAL_MS = Math.ceil(1000 / REQUESTS_PER_SECOND);

export class JikanClient {
  private baseUrl: string;
  private chain: Promise<unknown> = Promise.resolve();
  private lastRequestAt = 0;

  constructor(baseUrl = JIKAN_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private enqueue<T>(fn: () => Promise<T>): Promise<T> {
    const run = this.chain.then(async () => {
      const now = Date.now();
      const wait = Math.max(0, MIN_INTERVAL_MS - (now - this.lastRequestAt));
      if (wait > 0) {
        await new Promise((resolve) => setTimeout(resolve, wait));
      }
      this.lastRequestAt = Date.now();
      return fn();
    });

    this.chain = run.catch(() => undefined);
    return run;
  }

  private async fetchJson<T>(url: string): Promise<T> {
    return this.enqueue(async () => {
      const response = await fetch(url, {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new APIError(
          `Jikan API error: ${response.status} ${response.statusText}`,
          response.status,
          "jikan",
        );
      }

      return (await response.json()) as T;
    });
  }

  async getAnimeById(malId: number): Promise<JikanAnime> {
    const url = `${this.baseUrl}/anime/${malId}/full`;
    const response = await this.fetchJson<JikanResponse<JikanAnime>>(url);
    return response.data;
  }

  async searchAnime(
    query: string,
    options?: {
      page?: number;
      limit?: number;
      type?: "tv" | "movie" | "ova" | "special" | "ona" | "music";
      status?: "airing" | "complete" | "upcoming";
      rating?: "g" | "pg" | "pg13" | "r17" | "r" | "rx";
      order_by?:
        | "mal_id"
        | "title"
        | "start_date"
        | "end_date"
        | "episodes"
        | "score"
        | "scored_by"
        | "rank"
        | "popularity"
        | "members"
        | "favorites";
      sort?: "asc" | "desc";
    },
  ): Promise<JikanResponse<JikanAnime[]>> {
    const params = new URLSearchParams({
      q: query,
      page: String(options?.page ?? 1),
      limit: String(options?.limit ?? 25),
      ...(options?.type && { type: options.type }),
      ...(options?.status && { status: options.status }),
      ...(options?.rating && { rating: options.rating }),
      ...(options?.order_by && { order_by: options.order_by }),
      ...(options?.sort && { sort: options.sort }),
    });

    return this.fetchJson<JikanResponse<JikanAnime[]>>(
      `${this.baseUrl}/anime?${params}`,
    );
  }

  async getAnimeEpisodes(
    malId: number,
    page = 1,
  ): Promise<JikanResponse<JikanEpisode[]>> {
    return this.fetchJson<JikanResponse<JikanEpisode[]>>(
      `${this.baseUrl}/anime/${malId}/episodes?page=${page}`,
    );
  }

  async getAnimeEpisode(
    malId: number,
    episodeNumber: number,
  ): Promise<JikanEpisode> {
    const response = await this.fetchJson<JikanResponse<JikanEpisode>>(
      `${this.baseUrl}/anime/${malId}/episodes/${episodeNumber}`,
    );
    return response.data;
  }

  async getTopAnime(options?: {
    page?: number;
    limit?: number;
    type?: "tv" | "movie" | "ova" | "special" | "ona" | "music";
    filter?: "airing" | "upcoming" | "bypopularity" | "favorite";
  }): Promise<JikanResponse<JikanAnime[]>> {
    const params = new URLSearchParams({
      page: String(options?.page ?? 1),
      limit: String(options?.limit ?? 25),
      ...(options?.type && { type: options.type }),
      ...(options?.filter && { filter: options.filter }),
    });

    return this.fetchJson<JikanResponse<JikanAnime[]>>(
      `${this.baseUrl}/top/anime?${params}`,
    );
  }

  async getSeasonalAnime(
    year: number,
    season: "winter" | "spring" | "summer" | "fall",
    page = 1,
  ): Promise<JikanResponse<JikanAnime[]>> {
    return this.fetchJson<JikanResponse<JikanAnime[]>>(
      `${this.baseUrl}/seasons/${year}/${season}?page=${page}`,
    );
  }

  async getCurrentSeason(page = 1): Promise<JikanResponse<JikanAnime[]>> {
    return this.fetchJson<JikanResponse<JikanAnime[]>>(
      `${this.baseUrl}/seasons/now?page=${page}`,
    );
  }

  async getUpcomingSeason(page = 1): Promise<JikanResponse<JikanAnime[]>> {
    return this.fetchJson<JikanResponse<JikanAnime[]>>(
      `${this.baseUrl}/seasons/upcoming?page=${page}`,
    );
  }

  async getAnimeByGenre(
    genreId: number,
    page = 1,
  ): Promise<JikanResponse<JikanAnime[]>> {
    return this.fetchJson<JikanResponse<JikanAnime[]>>(
      `${this.baseUrl}/anime?genres=${genreId}&page=${page}`,
    );
  }

  async getAnimeRecommendations(
    malId: number,
  ): Promise<JikanResponse<JikanRecommendationEntry[]>> {
    return this.fetchJson<JikanResponse<JikanRecommendationEntry[]>>(
      `${this.baseUrl}/anime/${malId}/recommendations`,
    );
  }
}
