/**
 * Unified anime service — routes calls to AniList and Jikan providers
 */

import { AniListClient } from "../providers/anilist/client.js";
import { JikanClient } from "../providers/jikan/client.js";
import type {
  AnimeInfo,
  EpisodeInfo,
  SearchResult,
  PaginatedResponse,
  APIConfig,
} from "../types/common.js";
import {
  mapAniListToAnimeInfo,
  mapAniListToSearchResult,
  mapJikanToAnimeInfo,
  mapJikanToEpisodeInfo,
  mapJikanToSearchResult,
  mapJikanRecommendationToSearchResult,
} from "../utils/mappers.js";
import { fromAniListPage, fromJikanPage } from "../utils/pagination.js";

export class AnimeService {
  private aniListClient: AniListClient;
  private jikanClient: JikanClient;

  constructor(config?: APIConfig) {
    this.aniListClient = new AniListClient(config?.aniListEndpoint);
    this.jikanClient = new JikanClient(config?.jikanEndpoint);
  }

  async getAnimeById(
    id: number,
    provider: "anilist" | "mal" = "anilist",
  ): Promise<AnimeInfo> {
    if (provider === "anilist") {
      const media = await this.aniListClient.getAnimeById(id);
      return mapAniListToAnimeInfo(media);
    }

    const anime = await this.jikanClient.getAnimeById(id);
    return mapJikanToAnimeInfo(anime);
  }

  async searchAnime(
    query: string,
    options?: {
      page?: number;
      perPage?: number;
      genres?: string[];
      season?: "WINTER" | "SPRING" | "SUMMER" | "FALL";
      seasonYear?: number;
      format?: string;
      status?: string;
    },
  ): Promise<PaginatedResponse<SearchResult>> {
    const result = await this.aniListClient.searchAnime(query, options);
    return fromAniListPage(
      result.media.map(mapAniListToSearchResult),
      result.pageInfo,
    );
  }

  async getTrending(
    page = 1,
    perPage = 20,
  ): Promise<PaginatedResponse<SearchResult>> {
    const result = await this.aniListClient.getTrending(page, perPage);
    return fromAniListPage(
      result.media.map(mapAniListToSearchResult),
      result.pageInfo,
    );
  }

  async getPopular(
    page = 1,
    perPage = 20,
  ): Promise<PaginatedResponse<SearchResult>> {
    const result = await this.aniListClient.getPopular(page, perPage);
    return fromAniListPage(
      result.media.map(mapAniListToSearchResult),
      result.pageInfo,
    );
  }

  async getTopAnime(options?: {
    page?: number;
    limit?: number;
    type?: "tv" | "movie" | "ova" | "special" | "ona" | "music";
    filter?: "airing" | "upcoming" | "bypopularity" | "favorite";
  }): Promise<PaginatedResponse<SearchResult>> {
    const result = await this.jikanClient.getTopAnime(options);
    return fromJikanPage(
      result.data.map(mapJikanToSearchResult),
      result.pagination,
    );
  }

  async getSeasonalAnime(
    season: "WINTER" | "SPRING" | "SUMMER" | "FALL",
    year: number,
    page = 1,
    perPage = 20,
  ): Promise<PaginatedResponse<SearchResult>> {
    const result = await this.aniListClient.getSeasonalAnime(
      season,
      year,
      page,
      perPage,
    );
    return fromAniListPage(
      result.media.map(mapAniListToSearchResult),
      result.pageInfo,
    );
  }

  async getCurrentSeason(
    page = 1,
    perPage = 20,
  ): Promise<PaginatedResponse<SearchResult>> {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    let season: "WINTER" | "SPRING" | "SUMMER" | "FALL";
    if (month <= 3) {
      season = "WINTER";
    } else if (month <= 6) {
      season = "SPRING";
    } else if (month <= 9) {
      season = "SUMMER";
    } else {
      season = "FALL";
    }

    return this.getSeasonalAnime(season, year, page, perPage);
  }

  async getAnimeByGenre(
    genre: string,
    page = 1,
    perPage = 20,
  ): Promise<PaginatedResponse<SearchResult>> {
    const result = await this.aniListClient.getAnimeByGenre(
      genre,
      page,
      perPage,
    );
    return fromAniListPage(
      result.media.map(mapAniListToSearchResult),
      result.pageInfo,
    );
  }

  async getEpisodes(
    malId: number,
    page = 1,
  ): Promise<PaginatedResponse<EpisodeInfo>> {
    const result = await this.jikanClient.getAnimeEpisodes(malId, page);
    return fromJikanPage(
      result.data.map((episode) => mapJikanToEpisodeInfo(episode)),
      result.pagination,
    );
  }

  async getEpisode(
    malId: number,
    episodeNumber: number,
  ): Promise<EpisodeInfo> {
    const episode = await this.jikanClient.getAnimeEpisode(
      malId,
      episodeNumber,
    );
    return mapJikanToEpisodeInfo(episode, episodeNumber);
  }

  async getRecommendations(malId: number): Promise<SearchResult[]> {
    const result = await this.jikanClient.getAnimeRecommendations(malId);
    return result.data.map((rec) =>
      mapJikanRecommendationToSearchResult(rec.entry, rec.votes),
    );
  }
}
