import Link from "next/link";
import type { SearchResult } from "@anitube/api";
import { AnimeCard, AnimeCardSkeleton } from "./AnimeCard";

interface AnimeSectionProps {
  title: string;
  anime: SearchResult[];
  viewAllHref?: string;
  isLoading?: boolean;
}

export function AnimeSection({ title, anime, viewAllHref, isLoading = false }: AnimeSectionProps) {
  return (
    <section className="py-10 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-[var(--accent)] opacity-40 font-mono text-base">[</span>
            <h2 className="font-mono font-bold uppercase tracking-widest neon-text text-sm">
              {title}
            </h2>
            <span className="text-[var(--accent)] opacity-40 font-mono text-base">]</span>
            <div className="hidden sm:block h-px w-24 bg-[var(--border)]" />
          </div>

          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)] border border-[var(--border)] px-3 py-1.5 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              VIEW_ALL →
            </Link>
          )}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => <AnimeCardSkeleton key={i} />)}
          </div>
        ) : anime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {anime.map((item, index) => <AnimeCard key={item.id} anime={item} index={index} />)}
          </div>
        ) : (
          <div className="border border-[var(--border)] p-8 text-center font-mono">
            <p className="text-[var(--text-faint)] text-[10px] uppercase tracking-widest">NO_DATA_IN_SECTOR</p>
          </div>
        )}
      </div>
    </section>
  );
}
