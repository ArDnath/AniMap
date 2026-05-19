import type { SearchResponse } from "@anitube/api";

export interface SearchRequestParams {
  q?: string;
  page?: number;
  perPage?: number;
  genres?: string[];
  format?: string;
  status?: string;
  sort?: string[];
}

export interface SuggestResponse {
  query: string;
  suggestions: Array<{
    id: number;
    title: string;
    coverImage: string;
    score: number;
  }>;
  correctedQuery?: string;
}

export async function fetchAdvancedSearch(
  params: SearchRequestParams,
): Promise<SearchResponse> {
  const searchParams = new URLSearchParams();

  if (params.q) searchParams.set("q", params.q);
  if (params.page && params.page > 1) searchParams.set("page", String(params.page));
  if (params.perPage) searchParams.set("perPage", String(params.perPage));
  if (params.format) searchParams.set("format", params.format);
  if (params.status) searchParams.set("status", params.status);
  if (params.genres?.length) searchParams.set("genres", params.genres.join(","));
  if (params.sort?.length) searchParams.set("sort", params.sort.join(","));

  const res = await fetch(`/api/search?${searchParams.toString()}`);

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(
      (body as { error?: string }).error ?? `Search failed (${res.status})`,
    );
  }

  return res.json() as Promise<SearchResponse>;
}

export async function fetchSearchSuggestions(
  query: string,
  limit = 8,
): Promise<SuggestResponse> {
  const searchParams = new URLSearchParams({ q: query, limit: String(limit) });
  const res = await fetch(`/api/search/suggest?${searchParams.toString()}`);

  if (!res.ok) {
    return { query, suggestions: [] };
  }

  return res.json() as Promise<SuggestResponse>;
}
