/**
 * Advanced search: multi-variant AniList fetch + local fuzzy full-text ranking
 */

import type { AniListClient } from "../providers/anilist/client.js";
import { mapAniListToSearchResult } from "../utils/mappers.js";
import type { SearchResult, SearchResponse } from "../types/common.js";
import { buildSearchVariants } from "./normalize.js";
import {
  rankSearchResults,
  suggestCorrectedQuery,
  type RankedSearchResult,
} from "./fuzzy-rank.js";

const CANDIDATE_POOL_SIZE = 50;

export interface AdvancedSearchOptions {
  page?: number;
  perPage?: number;
  genres?: string[];
  season?: "WINTER" | "SPRING" | "SUMMER" | "FALL";
  seasonYear?: number;
  format?: string;
  status?: string;
  /** Minimum fuzzy relevance 0–100 (default 25) */
  minScore?: number;
  sort?: string[];
}

function dedupeByAniListId(media: SearchResult[]): SearchResult[] {
  const seen = new Set<number>();
  const out: SearchResult[] = [];
  for (const item of media) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    out.push(item);
  }
  return out;
}

export async function advancedSearchAnime(
  aniListClient: AniListClient,
  query: string,
  options?: AdvancedSearchOptions,
): Promise<SearchResponse> {
  const page = options?.page ?? 1;
  const perPage = options?.perPage ?? 24;
  const trimmed = query.trim();

  const anilistOptions = {
    page: 1,
    perPage: CANDIDATE_POOL_SIZE,
    genres: options?.genres,
    season: options?.season,
    seasonYear: options?.seasonYear,
    format: options?.format,
    status: options?.status,
    sort: options?.sort,
  };

  let candidates: SearchResult[] = [];
  let variantQueries: string[] = [];

  if (trimmed) {
    variantQueries = buildSearchVariants(trimmed);
    const pages = await Promise.all(
      variantQueries.map((variant) =>
        aniListClient.searchAnime(variant, anilistOptions),
      ),
    );

    const merged = pages.flatMap((p) =>
      p.media.map(mapAniListToSearchResult),
    );
    candidates = dedupeByAniListId(merged);
  } else {
    const result = await aniListClient.searchAnime("", {
      ...anilistOptions,
      page,
      perPage,
    });
    return {
      data: result.media.map(mapAniListToSearchResult),
      pagination: {
        currentPage: result.pageInfo.currentPage,
        hasNextPage: result.pageInfo.hasNextPage,
        total: result.pageInfo.total,
      },
      meta: {
        query: "",
        fuzzyApplied: false,
        variantQueries: [],
      },
    };
  }

  const ranked: RankedSearchResult[] = rankSearchResults(trimmed, candidates, {
    minScore: options?.minScore,
  });

  const start = (page - 1) * perPage;
  const pageData = ranked.slice(start, start + perPage);
  const correctedQuery = suggestCorrectedQuery(trimmed, ranked);
  const fuzzyApplied =
    ranked.some((r) => r.match.isFuzzyMatch) ||
    variantQueries.length > 1 ||
    Boolean(correctedQuery);

  return {
    data: pageData,
    pagination: {
      currentPage: page,
      hasNextPage: start + perPage < ranked.length,
      total: ranked.length,
    },
    meta: {
      query: trimmed,
      correctedQuery,
      fuzzyApplied,
      variantQueries,
    },
  };
}
