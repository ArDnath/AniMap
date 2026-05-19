import Image from "next/image";
import Link from "next/link";
import type { SearchResult } from "@anitube/api";

export function AnimeRecommendations({ recommendations }: { recommendations: SearchResult[] }) {
  if (!recommendations?.length) return null;
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] p-5 font-mono">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[var(--accent-amber)] text-[9px]">//</span>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-dim)]">RELATED_TITLES</h2>
      </div>
      <div className="space-y-2">
        {recommendations.slice(0, 6).map(rec => {
          const title = rec.title.english ?? rec.title.romaji ?? "UNKNOWN";
          const img = typeof rec.coverImage === "string" ? rec.coverImage : "";
          return (
            <Link key={rec.id} href={`/anime/${rec.id}`} className="group flex gap-3 border border-[var(--border)] hover:border-[var(--accent)] p-2 transition-colors">
              <div className="relative w-12 h-16 shrink-0 bg-[var(--muted)] overflow-hidden">
                {img && <Image src={img} alt={title} fill className="object-cover" unoptimized />}
              </div>
              <div className="flex-1 min-w-0 flex flex-col justify-center">
                <p className="text-[9px] font-bold text-[var(--text)] uppercase tracking-tight line-clamp-2 group-hover:text-[var(--accent)] transition-colors">{title}</p>
                {rec.averageScore != null && <p className="text-[7px] text-[var(--text-faint)] mt-1">SCORE: {rec.averageScore}%</p>}
              </div>
            </Link>
          );
        })}
      </div>
      {recommendations.length > 6 && <p className="mt-3 text-[8px] text-[var(--text-faint)] uppercase tracking-widest text-center">+{recommendations.length - 6} MORE</p>}
    </div>
  );
}
