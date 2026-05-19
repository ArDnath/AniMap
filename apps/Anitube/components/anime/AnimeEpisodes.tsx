"use client";

import { useState } from "react";
import { Clock } from "lucide-react";
import type { EpisodeInfo } from "@anitube/api";

interface AnimeEpisodesProps {
  episodes: EpisodeInfo[];
  animeTitle: string;
}

export function AnimeEpisodes({ episodes, animeTitle }: AnimeEpisodesProps) {
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;
  const totalPages = Math.ceil(episodes.length / PER_PAGE);
  const visible = episodes.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const fmtDuration = (m: number | null) => {
    if (!m) return null;
    const h = Math.floor(m / 60), min = m % 60;
    return h > 0 ? `${h}h ${min}m` : `${min}m`;
  };

  const fmtDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null;

  return (
    <div className="term-surface border border-[var(--border)] p-5 font-mono">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[var(--accent-warm)] text-[9px]">//</span>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-dim)]">EPISODES</h2>
        </div>
        <span className="text-[8px] text-[var(--text-faint)] uppercase tracking-widest">
          {episodes.length} TOTAL
        </span>
      </div>

      {/* Episode list */}
      <div className="space-y-1">
        {visible.map(ep => (
          <div
            key={ep.number}
            className="group flex items-center gap-3 border border-[var(--border)] hover:border-[var(--accent)] p-3 transition-colors"
          >
            {/* Episode number */}
            <div className="shrink-0 w-10 h-10 border border-[var(--border)] group-hover:border-[var(--accent)] flex items-center justify-center text-[10px] font-bold text-[var(--accent)] transition-colors">
              {String(ep.number).padStart(2, "0")}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-[10px] font-bold text-[var(--text)] truncate">
                  {ep.title ?? `Episode ${ep.number}`}
                </p>
                {ep.filler && (
                  <span className="text-[7px] px-1 border border-[var(--accent-amber)] text-[var(--accent-amber)] uppercase tracking-widest shrink-0">
                    FILLER
                  </span>
                )}
                {ep.recap && (
                  <span className="text-[7px] px-1 border border-[var(--text-faint)] text-[var(--text-faint)] uppercase tracking-widest shrink-0">
                    RECAP
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                {fmtDuration(ep.duration) && (
                  <span className="flex items-center gap-1 text-[7px] text-[var(--text-faint)]">
                    <Clock className="w-2.5 h-2.5" />
                    {fmtDuration(ep.duration)}
                  </span>
                )}
                {fmtDate(ep.aired) && (
                  <span className="text-[7px] text-[var(--text-faint)]">{fmtDate(ep.aired)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-5">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 border border-[var(--border)] text-[9px] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            ← PREV
          </button>
          <span className="text-[8px] text-[var(--text-faint)] uppercase tracking-widest">
            {page}/{totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 border border-[var(--border)] text-[9px] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all disabled:opacity-30 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            NEXT →
          </button>
        </div>
      )}
    </div>
  );
}
