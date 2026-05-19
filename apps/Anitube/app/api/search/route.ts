import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { animeApi } from "@anitube/api";
import type { SearchResponse } from "@anitube/api";

export const runtime = "nodejs";

const CACHE_SECONDS = 300;

function parseSearchParams(searchParams: URLSearchParams) {
  const q = searchParams.get("q") ?? "";
  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1", 10) || 1);
  const perPage = Math.min(
    50,
    Math.max(1, parseInt(searchParams.get("perPage") ?? "24", 10) || 24),
  );
  const genres = searchParams
    .get("genres")
    ?.split(",")
    .map((g) => g.trim())
    .filter(Boolean);
  const format = searchParams.get("format") ?? undefined;
  const status = searchParams.get("status") ?? undefined;
  const sort = searchParams.get("sort") ? searchParams.get("sort")!.split(",") : undefined;

  return { q, page, perPage, genres, format, status, sort };
}

async function runSearch(
  q: string,
  page: number,
  perPage: number,
  genres?: string[],
  format?: string,
  status?: string,
  sort?: string[],
): Promise<SearchResponse> {
  return animeApi.advancedSearchAnime(q, {
    page,
    perPage,
    genres,
    format,
    status,
    sort,
  });
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const { q, page, perPage, genres, format, status, sort } =
      parseSearchParams(searchParams);

    const cacheKey = JSON.stringify({ q, page, perPage, genres, format, status, sort });

    const cachedSearch = unstable_cache(
      () => runSearch(q, page, perPage, genres, format, status, sort),
      ["anitube-advanced-search", cacheKey],
      { revalidate: CACHE_SECONDS, tags: ["anime-search"] },
    );

    const result = await cachedSearch();

    return NextResponse.json(result, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=600`,
        "CDN-Cache-Control": `public, s-maxage=${CACHE_SECONDS}`,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Search request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
