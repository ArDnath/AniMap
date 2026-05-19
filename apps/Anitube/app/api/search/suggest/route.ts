import { NextResponse } from "next/server";
import { unstable_cache } from "next/cache";
import { animeApi } from "@anitube/api";
import { getBestTitle } from "@anitube/api";

export const runtime = "nodejs";

const CACHE_SECONDS = 120;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  const limit = Math.min(
    12,
    Math.max(1, parseInt(searchParams.get("limit") ?? "8", 10) || 8),
  );

  if (q.length < 2) {
    return NextResponse.json({ query: q, suggestions: [] });
  }

  try {
    const cached = unstable_cache(
      async () => {
        const result = await animeApi.advancedSearchAnime(q, {
          page: 1,
          perPage: limit,
          minScore: 35,
        });

        return {
          query: q,
          correctedQuery: result.meta.correctedQuery,
          suggestions: result.data.map((item) => ({
            id: item.id,
            title: getBestTitle(item.title),
            coverImage: item.coverImage,
            score: item.match?.score ?? 0,
          })),
        };
      },
      ["anitube-search-suggest", q, String(limit)],
      { revalidate: CACHE_SECONDS, tags: ["anime-search-suggest"] },
    );

    const payload = await cached();

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=300`,
      },
    });
  } catch {
    return NextResponse.json({ query: q, suggestions: [] }, { status: 200 });
  }
}
