/**
 * AniList GraphQL client
 * @see https://anilist.gitbook.io/anilist-apiv2-docs/
 */

import { GraphQLClient } from "graphql-request";
import { gql } from "graphql-tag";
import { ANILIST_BASE_URL } from "../../constants/endpoints.js";
import type { AniListMedia, AniListMediaPage } from "../../types/anilist.js";
import { APIError } from "../../types/common.js";

export class AniListClient {
  private client: GraphQLClient;

  constructor(endpoint = ANILIST_BASE_URL) {
    this.client = new GraphQLClient(endpoint, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  }

  async getAnimeById(id: number): Promise<AniListMedia> {
    const query = gql`
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          idMal
          title {
            romaji
            english
            native
          }
          coverImage {
            extraLarge
            large
            medium
            color
          }
          bannerImage
          startDate {
            year
            month
            day
          }
          endDate {
            year
            month
            day
          }
          description
          season
          seasonYear
          type
          format
          status
          episodes
          duration
          countryOfOrigin
          isLicensed
          source
          hashtag
          trailer {
            id
            site
            thumbnail
          }
          updatedAt
          genres
          synonyms
          averageScore
          meanScore
          popularity
          trending
          favourites
          tags {
            id
            name
            description
            category
            rank
            isGeneralSpoiler
            isMediaSpoiler
            isAdult
          }
          relations {
            edges {
              id
              relationType
              node {
                id
                title {
                  romaji
                  english
                }
                coverImage {
                  large
                }
                type
                format
              }
            }
          }
          characters(sort: ROLE, perPage: 10) {
            edges {
              id
              role
              node {
                id
                name {
                  full
                  native
                }
                image {
                  large
                  medium
                }
              }
            }
          }
          studios {
            edges {
              id
              isMain
              node {
                id
                name
                siteUrl
              }
            }
          }
          streamingEpisodes {
            title
            thumbnail
            url
            site
          }
        }
      }
    `;

    const data = await this.request<{ Media: AniListMedia }>(query, { id });
    return data.Media;
  }

  async searchAnime(
    search: string,
    options?: {
      page?: number;
      perPage?: number;
      sort?: string[];
      genres?: string[];
      season?: "WINTER" | "SPRING" | "SUMMER" | "FALL";
      seasonYear?: number;
      format?: string;
      status?: string;
    },
  ): Promise<AniListMediaPage> {
    const query = gql`
      query (
        $search: String
        $page: Int
        $perPage: Int
        $sort: [MediaSort]
        $genres: [String]
        $season: MediaSeason
        $seasonYear: Int
        $format: MediaFormat
        $status: MediaStatus
      ) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(
            search: $search
            type: ANIME
            sort: $sort
            genre_in: $genres
            season: $season
            seasonYear: $seasonYear
            format: $format
            status: $status
          ) {
            id
            idMal
            title {
              romaji
              english
              native
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
            bannerImage
            startDate {
              year
              month
              day
            }
            endDate {
              year
              month
              day
            }
            description
            season
            seasonYear
            type
            format
            status
            episodes
            duration
            genres
            synonyms
            averageScore
            meanScore
            popularity
            trending
            favourites
            studios(isMain: true) {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
    `;

    const variables: Record<string, unknown> = {
      page: options?.page ?? 1,
      perPage: options?.perPage ?? 20,
      sort: options?.sort ?? ["POPULARITY_DESC", "SCORE_DESC"],
      ...(search.trim() && { search: search.trim() }),
      ...(options?.genres && { genres: options.genres }),
      ...(options?.season && { season: options.season }),
      ...(options?.seasonYear && { seasonYear: options.seasonYear }),
      ...(options?.format && { format: options.format }),
      ...(options?.status && { status: options.status }),
    };

    const data = await this.request<{
      Page: AniListMediaPage;
    }>(query, variables);

    return data.Page;
  }

  async getTrending(page = 1, perPage = 20): Promise<AniListMediaPage> {
    const query = gql`
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            idMal
            title {
              romaji
              english
              native
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
            bannerImage
            startDate {
              year
              month
              day
            }
            description
            season
            seasonYear
            format
            status
            episodes
            genres
            averageScore
            popularity
            trending
          }
        }
      }
    `;

    const data = await this.request<{ Page: AniListMediaPage }>(query, {
      page,
      perPage,
    });
    return data.Page;
  }

  async getPopular(page = 1, perPage = 20): Promise<AniListMediaPage> {
    const query = gql`
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media(type: ANIME, sort: POPULARITY_DESC) {
            id
            idMal
            title {
              romaji
              english
              native
            }
            coverImage {
              extraLarge
              large
              medium
              color
            }
            bannerImage
            startDate {
              year
              month
              day
            }
            description
            season
            seasonYear
            format
            status
            episodes
            genres
            averageScore
            popularity
          }
        }
      }
    `;

    const data = await this.request<{ Page: AniListMediaPage }>(query, {
      page,
      perPage,
    });
    return data.Page;
  }

  async getSeasonalAnime(
    season: "WINTER" | "SPRING" | "SUMMER" | "FALL",
    year: number,
    page = 1,
    perPage = 20,
  ): Promise<AniListMediaPage> {
    return this.searchAnime("", {
      page,
      perPage,
      season,
      seasonYear: year,
      sort: ["POPULARITY_DESC"],
    });
  }

  async getAnimeByGenre(
    genre: string,
    page = 1,
    perPage = 20,
  ): Promise<AniListMediaPage> {
    return this.searchAnime("", {
      page,
      perPage,
      genres: [genre],
      sort: ["POPULARITY_DESC"],
    });
  }

  private async request<T>(
    query: ReturnType<typeof gql>,
    variables?: Record<string, unknown>,
  ): Promise<T> {
    try {
      return await this.client.request<T>(query, variables);
    } catch (error) {
      throw new APIError(
        `AniList API error: ${error instanceof Error ? error.message : "Unknown error"}`,
        undefined,
        "anilist",
      );
    }
  }
}
