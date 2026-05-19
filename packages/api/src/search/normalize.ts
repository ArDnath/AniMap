/**
 * Query normalization for cross-script anime title search
 */

/** Unicode NFKC + trim + collapse whitespace */
export function normalizeQuery(query: string): string {
  return query
    .normalize("NFKC")
    .replace(/\s+/g, " ")
    .trim();
}

/** Lowercase Latin; preserve CJK and kana */
export function normalizeForMatch(text: string): string {
  return normalizeQuery(text)
    .toLowerCase()
    .replace(/[''`]/g, "")
    .replace(/[‐‑‒–—―]/g, "-");
}

/** Strip punctuation for alternate AniList lookups */
export function stripPunctuation(query: string): string {
  return normalizeQuery(query)
    .replace(/[!?.,;:()[\]{}「」『』【】]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Build distinct query strings sent to AniList (broader candidate pool) */
export function buildSearchVariants(query: string): string[] {
  const base = normalizeQuery(query);
  if (!base) return [];

  const variants = new Set<string>([base]);

  const stripped = stripPunctuation(base);
  if (stripped && stripped !== base) variants.add(stripped);

  // Collapsed spacing (e.g. "attack on titan" vs "attackontitan" won't match AniList,
  // but helps our local fuzzy index)
  const noSpaces = base.replace(/\s+/g, "");
  if (noSpaces.length >= 3 && noSpaces !== base) {
    variants.add(noSpaces);
  }

  return [...variants];
}

/** True when query is mostly Latin — typo correction is most useful here */
export function isLatinDominant(query: string): boolean {
  const latin = (query.match(/[a-zA-Z]/g) ?? []).length;
  const cjk = (query.match(/[\u3040-\u30ff\u3400-\u9fff]/g) ?? []).length;
  return latin > 0 && latin >= cjk;
}
