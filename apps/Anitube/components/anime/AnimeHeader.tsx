import Image from "next/image";
import Link from "next/link";
import { Activity, BookmarkPlus } from "lucide-react";
import type { AnimeInfo } from "@anitube/api";

export function AnimeHeader({ anime }: { anime: AnimeInfo }) {
  const title = anime.title.english ?? anime.title.romaji ?? "UNKNOWN_ENTITY";
  const altTitle = anime.title.romaji && anime.title.romaji !== title ? anime.title.romaji : (anime.title.native ?? null);
  const coverUrl = typeof anime.coverImage === "string" ? anime.coverImage : "";
  const bannerUrl = anime.bannerImage ? String(anime.bannerImage) : null;

  return (
    <div className="relative font-mono overflow-hidden">
      <div className="relative h-52 md:h-72 border-b border-[var(--border)]">
        {bannerUrl ? (
          <Image src={bannerUrl} alt={title} fill className="object-cover opacity-30" priority sizes="100vw" />
        ) : (
          <div className="w-full h-full bg-[var(--muted)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)]" />
        <div className="absolute top-3 left-3 w-8 h-8 border-t border-l border-[var(--accent)] opacity-40" />
        <div className="absolute bottom-3 right-3 w-8 h-8 border-b border-r border-[var(--accent)] opacity-40" />
      </div>

      <div className="container mx-auto px-4 relative -mt-24 md:-mt-36 z-10">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-end">
          <div className="shrink-0">
            <div className="border border-[var(--border)] overflow-hidden bg-[var(--muted)]" style={{ width:200, aspectRatio:"2/3" }}>
              {coverUrl ? (
                <div className="relative w-full h-full">
                  <Image src={coverUrl} alt={title} fill className="object-cover" priority sizes="200px" />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-[8px] text-[var(--text-faint)] uppercase tracking-widest">NO_IMAGE</span>
                </div>
              )}
            </div>
            <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-widest mt-1.5 flex justify-between">
              <span>ID:{anime.id}</span>
              <span className="text-[var(--accent)] animate-pulse">STABLE</span>
            </p>
          </div>

          <div className="flex-1 pb-2 text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[var(--accent-amber)] text-[9px] tracking-[0.3em]">
              <Activity className="w-3 h-3 animate-pulse" /><span>{anime.format ?? "UNKNOWN"}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold neon-text tracking-tight leading-tight uppercase">{title}</h1>
            {altTitle && <p className="text-xs text-[var(--text-dim)] tracking-widest">{altTitle}</p>}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
              <span className="bg-[var(--accent)] text-[var(--bg)] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">SCORE:{anime.averageScore ?? "??"}%</span>
              <span className="border border-[var(--border)] text-[var(--text-dim)] px-2 py-0.5 text-[9px] uppercase tracking-widest">STATUS:{(anime.status ?? "UNKNOWN").replace(/_/g," ")}</span>
              <span className="border border-[var(--border)] text-[var(--text-dim)] px-2 py-0.5 text-[9px] uppercase tracking-widest">EPS:{anime.episodes ?? "???"}</span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
              <Link href={`/search?q=${encodeURIComponent(title)}`} className="inline-flex items-center gap-2 px-5 py-2 bg-[var(--accent)] text-[var(--bg)] font-mono font-bold text-[9px] uppercase tracking-widest hover:opacity-90 transition-opacity">FIND_SIMILAR</Link>
              <button type="button" className="inline-flex items-center gap-2 px-5 py-2 border border-[var(--border)] text-[var(--text-dim)] font-mono text-[9px] uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                <BookmarkPlus className="w-3.5 h-3.5" />ADD_TO_LIST
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
