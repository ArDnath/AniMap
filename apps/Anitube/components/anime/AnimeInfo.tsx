import type { AnimeInfo as AnimeInfoType } from "@anitube/api";
import { Calendar, Film, TrendingUp, Building2 } from "lucide-react";

export function AnimeInfo({ anime }: { anime: AnimeInfoType }) {
  const fmtDate = (d: string | null) => {
    if (!d) return "N/A";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const rows = [
    { icon: Film,       label: "FORMAT",     value: anime.format ?? "N/A" },
    { icon: TrendingUp, label: "STATUS",     value: (anime.status ?? "N/A").replace(/_/g, " ") },
    { icon: Calendar,   label: "START_DATE", value: fmtDate(anime.startDate) },
    { icon: Calendar,   label: "END_DATE",   value: fmtDate(anime.endDate) },
  ];

  return (
    <div className="term-surface border border-[var(--border)] p-5 font-mono">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[var(--accent)] text-[9px] uppercase tracking-widest">//</span>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-dim)]">METADATA</h2>
      </div>

      <div className="space-y-3">
        {rows.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-start gap-2 border-b border-[var(--border)] pb-2 last:border-0">
            <Icon className="w-3.5 h-3.5 text-[var(--text-faint)] mt-0.5 shrink-0" />
            <div>
              <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-[0.3em]">{label}</p>
              <p className="text-[10px] text-[var(--text)] font-bold uppercase">{value}</p>
            </div>
          </div>
        ))}

        {/* Studios */}
        {anime.studios && anime.studios.length > 0 && (
          <div className="flex items-start gap-2 border-b border-[var(--border)] pb-2">
            <Building2 className="w-3.5 h-3.5 text-[var(--text-faint)] mt-0.5 shrink-0" />
            <div>
              <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-[0.3em] mb-1">STUDIOS</p>
              <div className="flex flex-wrap gap-1">
                {anime.studios.map((s, i) => (
                  <span key={i} className="text-[8px] border border-[var(--border)] px-1.5 py-0.5 text-[var(--text-dim)] uppercase tracking-widest">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Score & Popularity */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          {anime.averageScore && (
            <div>
              <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-[0.3em] mb-0.5">SCORE</p>
              <p className="text-lg font-bold neon-text">{anime.averageScore}%</p>
            </div>
          )}
          <div>
            <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-[0.3em] mb-0.5">POPULARITY</p>
            <p className="text-lg font-bold text-[var(--accent-amber)]">#{anime.popularity.toLocaleString()}</p>
          </div>
        </div>

        {/* Native Title */}
        {anime.title.native && (
          <div className="border-t border-[var(--border)] pt-3">
            <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-[0.3em] mb-0.5">NATIVE_TITLE</p>
            <p className="text-sm text-[var(--text-dim)]">{anime.title.native}</p>
          </div>
        )}
      </div>
    </div>
  );
}
