"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Search, X, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight, Terminal } from "lucide-react";
import type { SearchResponse } from "@anitube/api";
import { fetchAdvancedSearch } from "@/lib/search/client";
import { AnimeCard, AnimeCardSkeleton } from "@/components/home/AnimeCard";

const GENRES = ["Action","Adventure","Comedy","Drama","Fantasy","Horror","Mystery","Romance","Sci-Fi","Slice of Life","Sports","Supernatural","Thriller"] as const;
const FORMATS = ["Any","TV","Movie","OVA","ONA","Special"] as const;
const STATUSES = ["Any","Airing","Finished","Upcoming"] as const;
const SORTS = ["Popularity","Score","Title","Trending"] as const;
const PER_PAGE = 24;

const FORMAT_MAP: Record<string, string> = { TV: "TV", Movie: "MOVIE", OVA: "OVA", ONA: "ONA", Special: "SPECIAL" };
const STATUS_MAP: Record<string, string> = { Airing: "RELEASING", Finished: "FINISHED", Upcoming: "NOT_YET_RELEASED" };
const SORT_MAP: Record<string, string[]> = {
  Popularity: ["POPULARITY_DESC"],
  Score: ["SCORE_DESC"],
  Title: ["TITLE_ROMAJI"],
  Trending: ["TRENDING_DESC"],
};

function TermBtn({ active, onClick, children }: { active?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border transition-all ${
        active
          ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]"
          : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      }`}
    >
      {children}
    </button>
  );
}

function PageBtn({ page, current, onClick }: { page: number; current: number; onClick: (p: number) => void }) {
  const active = page === current;
  return (
    <button
      onClick={() => onClick(page)}
      disabled={active}
      className={`w-8 h-8 font-mono text-[9px] border transition-all ${
        active
          ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]"
          : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
      }`}
    >
      {page}
    </button>
  );
}

export default function SearchContent() {
  const router = useRouter();
  const sp = useSearchParams();

  // Read URL search params
  const urlQ = sp.get("q") ?? "";
  const urlPage = Math.max(1, parseInt(sp.get("page") ?? "1", 10));
  const urlGenres = useMemo(() => sp.get("genres") ? sp.get("genres")!.split(",").filter(Boolean) : [], [sp]);
  const urlFormat = sp.get("format") ?? "Any";
  const urlStatus = sp.get("status") ?? "Any";
  const urlSort = sp.get("sort") ?? "Popularity";

  const [input, setInput] = useState(urlQ);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input value with URL search query
  useEffect(() => {
    setInput(urlQ);
  }, [urlQ]);

  // Determine if search or browse is active
  const isSearchActive =
    urlQ.trim().length > 0 ||
    urlGenres.length > 0 ||
    urlFormat !== "Any" ||
    urlStatus !== "Any" ||
    urlSort !== "Popularity";

  // Search API fetch query
  const { data, isLoading, error, isFetching } = useQuery<SearchResponse>({
    queryKey: ["search", urlQ, urlPage, urlGenres, urlFormat, urlStatus, urlSort],
    queryFn: () =>
      fetchAdvancedSearch({
        q: urlQ || undefined,
        page: urlPage,
        perPage: PER_PAGE,
        genres: urlGenres.length > 0 ? urlGenres : undefined,
        format: urlFormat !== "Any" ? FORMAT_MAP[urlFormat] : undefined,
        status: urlStatus !== "Any" ? STATUS_MAP[urlStatus] : undefined,
        sort: SORT_MAP[urlSort],
      }),
    enabled: isSearchActive,
    staleTime: 5 * 60_000,
  });

  // Master function to push URL changes
  const updateUrl = useCallback(
    (newQ: string, newPage: number, newGenres: string[], newFormat: string, newStatus: string, newSort: string) => {
      const p = new URLSearchParams();
      if (newQ.trim()) p.set("q", newQ.trim());
      if (newPage > 1) p.set("page", String(newPage));
      if (newGenres.length > 0) p.set("genres", newGenres.join(","));
      if (newFormat !== "Any") p.set("format", newFormat);
      if (newStatus !== "Any") p.set("status", newStatus);
      if (newSort !== "Popularity") p.set("sort", newSort);

      const qs = p.toString();
      router.push(`/search${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router]
  );

  const handleSearch = useCallback(
    (q: string) => {
      updateUrl(q, 1, urlGenres, urlFormat, urlStatus, urlSort);
    },
    [updateUrl, urlGenres, urlFormat, urlStatus, urlSort]
  );

  const handlePage = useCallback(
    (p: number) => {
      updateUrl(urlQ, p, urlGenres, urlFormat, urlStatus, urlSort);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [updateUrl, urlQ, urlGenres, urlFormat, urlStatus, urlSort]
  );

  const handleGenre = useCallback(
    (g: string) => {
      const next = urlGenres.includes(g) ? urlGenres.filter((x) => x !== g) : [...urlGenres, g];
      updateUrl(urlQ, 1, next, urlFormat, urlStatus, urlSort);
    },
    [updateUrl, urlQ, urlGenres, urlFormat, urlStatus, urlSort]
  );

  const handleFormat = useCallback(
    (fmt: string) => {
      updateUrl(urlQ, 1, urlGenres, fmt, urlStatus, urlSort);
    },
    [updateUrl, urlQ, urlGenres, urlStatus, urlSort]
  );

  const handleStatus = useCallback(
    (stat: string) => {
      updateUrl(urlQ, 1, urlGenres, urlFormat, stat, urlSort);
    },
    [updateUrl, urlQ, urlGenres, urlFormat, urlSort]
  );

  const handleSort = useCallback(
    (srt: string) => {
      updateUrl(urlQ, 1, urlGenres, urlFormat, urlStatus, srt);
    },
    [updateUrl, urlQ, urlGenres, urlFormat, urlStatus]
  );

  const handleReset = useCallback(() => {
    setInput("");
    updateUrl("", 1, [], "Any", "Any", "Popularity");
  }, [updateUrl]);

  const totalPages = useMemo(() => (data ? Math.ceil(data.pagination.total / PER_PAGE) : 1), [data]);
  const pages = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    let s = Math.max(1, urlPage - 2);
    const e = Math.min(totalPages, s + 4);
    s = Math.max(1, e - 4);
    return Array.from({ length: e - s + 1 }, (_, i) => s + i);
  }, [urlPage, totalPages]);

  const activeFiltersCount = urlGenres.length + (urlFormat !== "Any" ? 1 : 0) + (urlStatus !== "Any" ? 1 : 0) + (urlSort !== "Popularity" ? 1 : 0);

  return (
    <div className="min-h-screen term-bg font-mono">
      {/* Title Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)] py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-widest mb-1">&gt; exec browse --interactive</p>
          <h1 className="text-2xl md:text-4xl font-bold neon-text uppercase tracking-tight">BROWSE</h1>
          {isSearchActive && data && (
            <p className="text-[10px] text-[var(--text-dim)] mt-1">
              {data.pagination.total.toLocaleString()} results found
              {isFetching && <span className="ml-2 text-[var(--accent)] animate-pulse">UPDATING...</span>}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-5">
        {/* Search Bar */}
        <div className="flex items-center border border-[var(--border)] bg-[var(--surface)]">
          <Search className="ml-4 w-4 h-4 text-[var(--text-dim)] shrink-0" />
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch(input);
            }}
            placeholder="SEARCH_ANIME..."
            className="flex-1 px-4 py-4 text-sm outline-none bg-transparent text-[var(--text)] placeholder:text-[var(--text-faint)]"
          />
          {input && (
            <button
              onClick={() => {
                setInput("");
                handleSearch("");
                inputRef.current?.focus();
              }}
              className="mr-2 p-1.5 text-[var(--text-dim)] hover:text-[var(--accent)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={() => handleSearch(input)}
            className="px-5 py-4 bg-[var(--accent)] text-[var(--bg)] font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity shrink-0"
          >
            EXEC
          </button>
        </div>

        {/* Filter Toggle */}
        <div>
          <button
            type="button"
            onClick={() => setFiltersOpen((o) => !o)}
            className={`flex items-center gap-2 px-4 py-2 border text-[9px] uppercase tracking-widest transition-all ${
              filtersOpen
                ? "bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]"
                : "bg-[var(--surface)] border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)]"
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" /> FILTERS
            {activeFiltersCount > 0 && (
              <span
                className={`px-1.5 py-0.5 text-[8px] font-bold ${
                  filtersOpen ? "bg-[var(--bg)] text-[var(--accent)]" : "bg-[var(--accent)] text-[var(--bg)]"
                }`}
              >
                {activeFiltersCount}
              </span>
            )}
            <ChevronDown className={`w-3 h-3 ml-1 transition-transform ${filtersOpen ? "rotate-180" : ""}`} />
          </button>

          {filtersOpen && (
            <div className="bg-[var(--surface)] border border-t-0 border-[var(--border)] p-5 space-y-5">
              <div>
                <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-[0.3em] mb-2">GENRES</p>
                <div className="flex flex-wrap gap-1.5">
                  {GENRES.map((g) => (
                    <TermBtn key={g} active={urlGenres.includes(g)} onClick={() => handleGenre(g)}>
                      {g}
                    </TermBtn>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {[
                  { label: "FORMAT", opts: FORMATS, curr: urlFormat, onSelect: handleFormat },
                  { label: "STATUS", opts: STATUSES, curr: urlStatus, onSelect: handleStatus },
                  { label: "SORT_BY", opts: SORTS, curr: urlSort, onSelect: handleSort },
                ].map(({ label, opts, curr, onSelect }) => (
                  <div key={label}>
                    <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-[0.3em] mb-2">{label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {opts.map((o) => (
                        <TermBtn key={o} active={curr === o} onClick={() => onSelect(o)}>
                          {o}
                        </TermBtn>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {isSearchActive && (
                <div className="flex justify-end border-t border-[var(--border)] pt-3">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent-red)] transition-colors"
                  >
                    <X className="w-3 h-3" /> RESET
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {Array.from({ length: PER_PAGE }).map((_, i) => (
              <AnimeCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Results Grid */}
        {!isLoading && isSearchActive && data && data.data.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {data.data.map((a, i) => (
              <AnimeCard key={a.id} anime={a} index={i} />
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && isSearchActive && data && data.data.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center space-y-3">
            <p className="text-[var(--accent-red)] text-sm uppercase tracking-widest">[NO_RESULTS]</p>
            <p className="text-xs text-[var(--text-dim)]">Try adjusting your filters or query.</p>
          </div>
        )}

        {/* Browse by Category (when idle) */}
        {!isSearchActive && (
          <div className="space-y-8">
            <div className="flex flex-col items-center py-8 text-center space-y-4">
              <Terminal className="w-10 h-10 text-[var(--text-faint)] animate-pulse" />
              <h2 className="text-lg font-bold neon-text uppercase tracking-tight">BROWSE_BY_CATEGORY</h2>
              <p className="text-[10px] text-[var(--text-dim)] uppercase tracking-widest max-w-md">
                Select a genre below to begin exploration
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {GENRES.map((g) => (
                <button
                  key={g}
                  onClick={() => {
                    setFiltersOpen(true);
                    updateUrl("", 1, [g], "Any", "Any", "Popularity");
                  }}
                  className="bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] p-4 text-center transition-all group"
                >
                  <p className="text-[9px] uppercase tracking-widest text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors">
                    {g}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && isSearchActive && data && data.data.length > 0 && totalPages > 1 && (
          <>
            <nav className="flex items-center justify-center gap-1.5 flex-wrap pt-6 pb-2">
              <button
                onClick={() => handlePage(urlPage - 1)}
                disabled={urlPage <= 1}
                className="flex items-center gap-1 px-3 py-1.5 text-[9px] uppercase border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all disabled:opacity-30"
              >
                <ChevronLeft className="w-3 h-3" /> PREV
              </button>
              {pages[0]! > 1 && (
                <>
                  <PageBtn page={1} current={urlPage} onClick={handlePage} />
                  {pages[0]! > 2 && <span className="w-8 text-center text-[var(--text-faint)] text-xs">…</span>}
                </>
              )}
              {pages.map((n) => (
                <PageBtn key={n} page={n} current={urlPage} onClick={handlePage} />
              ))}
              {pages[pages.length - 1]! < totalPages && (
                <>
                  {pages[pages.length - 1]! < totalPages - 1 && <span className="w-8 text-center text-[var(--text-faint)] text-xs">…</span>}
                  <PageBtn page={totalPages} current={urlPage} onClick={handlePage} />
                </>
              )}
              <button
                onClick={() => handlePage(urlPage + 1)}
                disabled={!data.pagination.hasNextPage}
                className="flex items-center gap-1 px-3 py-1.5 text-[9px] uppercase border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all disabled:opacity-30"
              >
                NEXT <ChevronRight className="w-3 h-3" />
              </button>
            </nav>
            <p className="text-center text-[8px] text-[var(--text-faint)] uppercase tracking-widest pb-6">
              PAGE {urlPage}/{totalPages} — {data.pagination.total.toLocaleString()} RESULTS
            </p>
          </>
        )}

        {error && (
          <div className="flex flex-col items-center py-12 text-center space-y-3">
            <p className="text-[var(--accent-red)] text-sm uppercase tracking-widest">!! SEARCH_ERROR !!</p>
            <button
              onClick={() => router.refresh()}
              className="text-[9px] uppercase tracking-widest px-4 py-2 border border-[var(--accent-red)] text-[var(--accent-red)] hover:bg-[var(--accent-red)] hover:text-[var(--bg)] transition-all"
            >
              RETRY
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
