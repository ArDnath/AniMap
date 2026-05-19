/**
 * Full-text fuzzy ranking with Fuse.js over unified title fields
 */

import Fuse from "fuse.js";
import { normalizeForMatch } from "./normalize.js";
import type { SearchResult, SearchMatchMeta } from "../types/common.js";

export interface RankedSearchResult extends SearchResult {
  match: SearchMatchMeta;
}

interface SearchableDocument {
  id: number;
  english: string;
  romaji: string;
  native: string;
  synonyms: string;
  allTitles: string;
}

function toDocument(item: SearchResult): SearchableDocument {
  const synonyms = (item.synonyms ?? []).join(" ");
  const english = item.title.english ?? "";
  const romaji = item.title.romaji ?? "";
  const native = item.title.native ?? "";

  return {
    id: item.id,
    english,
    romaji,
    native,
    synonyms,
    allTitles: [english, romaji, native, synonyms].filter(Boolean).join(" "),
  };
}

const FUSE_OPTIONS = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.45,
  distance: 120,
  minMatchCharLength: 2,
  keys: [
    { name: "english", weight: 0.35 },
    { name: "romaji", weight: 0.3 },
    { name: "native", weight: 0.25 },
    { name: "synonyms", weight: 0.2 },
    { name: "allTitles", weight: 0.15 },
  ],
};

function scoreToRelevance(fuseScore: number | undefined): number {
  if (fuseScore == null) return 0;
  return Math.max(0, Math.round((1 - fuseScore) * 100));
}

function getMatchedFields(
  doc: SearchableDocument,
  query: string,
): string[] {
  const q = normalizeForMatch(query);
  const fields: Array<[string, string]> = [
    ["english", doc.english],
    ["romaji", doc.romaji],
    ["native", doc.native],
    ["synonyms", doc.synonyms],
  ];

  return fields
    .filter(([, value]) => value && normalizeForMatch(value).includes(q))
    .map(([name]) => name);
}

/**
 * Rank and filter results; empty query returns input sorted by popularity.
 */
export function rankSearchResults(
  query: string,
  results: SearchResult[],
  options?: { limit?: number; minScore?: number },
): RankedSearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) {
    return results
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, options?.limit)
      .map((item) => ({
        ...item,
        match: { score: 0, matchedFields: [], isFuzzyMatch: false },
      }));
  }

  const normalizedQuery = normalizeForMatch(trimmed);
  const documents = results.map(toDocument);
  const fuse = new Fuse(documents, FUSE_OPTIONS);
  const fuseHits = fuse.search(normalizedQuery);

  const minScore = options?.minScore ?? 25;
  const byId = new Map(results.map((r) => [r.id, r]));

  const ranked: RankedSearchResult[] = [];

  for (const hit of fuseHits) {
    const item = byId.get(hit.item.id);
    if (!item) continue;

    const relevance = scoreToRelevance(hit.score);
    if (relevance < minScore) continue;

    const matchedFields =
      getMatchedFields(hit.item, trimmed).length > 0
        ? getMatchedFields(hit.item, trimmed)
        : hit.matches?.map((m) => m.key ?? "title").filter(Boolean) ?? ["title"];

    ranked.push({
      ...item,
      match: {
        score: relevance,
        matchedFields: [...new Set(matchedFields)],
        isFuzzyMatch: relevance < 95 && !matchedFields.some((f) => f !== "synonyms"),
      },
    });
  }

  // Include unmatched items with low score at end if we have few hits
  if (ranked.length < 5) {
    for (const item of results) {
      if (ranked.some((r) => r.id === item.id)) continue;
      ranked.push({
        ...item,
        match: { score: 10, matchedFields: [], isFuzzyMatch: true },
      });
    }
  }

  const limit = options?.limit ?? ranked.length;
  return ranked.slice(0, limit);
}

/** Suggest corrected query from top match title */
export function suggestCorrectedQuery(
  query: string,
  ranked: RankedSearchResult[],
): string | undefined {
  if (!query.trim() || ranked.length === 0) return undefined;

  const top = ranked[0];
  if (!top) return undefined;

  const bestTitle =
    top.title.english || top.title.romaji || top.title.native || "";
  const q = normalizeForMatch(query);
  const t = normalizeForMatch(bestTitle);

  if (!bestTitle || q === t || t.includes(q) || q.includes(t)) {
    return undefined;
  }

  if (top.match.score >= 55) {
    return bestTitle;
  }

  return undefined;
}
