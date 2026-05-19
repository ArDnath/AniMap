"use client";

import Image from "next/image";
import Link from "next/link";
import type { SearchResult } from "@anitube/api";

interface AnimeCardProps {
  anime: SearchResult;
  index?: number;
}

const ACCENTS = [
  "var(--accent)",
  "var(--accent-amber)",
  "var(--accent-warm)",
] as const;

export function AnimeCard({ anime, index = 0 }: AnimeCardProps) {
  const title =
    anime.title.english ??
    anime.title.romaji ??
    anime.title.native ??
    "UNKNOWN";

  const accent = ACCENTS[index % ACCENTS.length]!;
  const imageUrl = anime.coverImage ?? "";

  return (
    <Link
      href={`/anime/${anime.id}`}
      className="group block focus:outline-none"
    >
      <div className="geometric-box">
        {/* Cover image container gets overflow-hidden to crop image zoom */}
        <div className="relative w-full bg-[var(--muted)] overflow-hidden" style={{ aspectRatio: "2/3" }}>
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[8px] text-[var(--text-faint)] uppercase tracking-widest">NO_IMG</span>
            </div>
          )}

          {/* Score badge */}
          {anime.averageScore != null && (
            <div
              className="absolute top-0 right-0 z-10 px-1.5 py-0.5 text-[9px] font-bold text-[var(--bg)] font-mono"
              style={{ background: accent }}
            >
              {anime.averageScore}%
            </div>
          )}

          {/* Bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[var(--surface)] to-transparent pointer-events-none" />
        </div>

        {/* Info */}
        <div className="p-2 space-y-1">
          <h3
            className="font-mono font-bold text-[9px] uppercase tracking-tight line-clamp-2 min-h-[2.4em] transition-colors duration-200"
            style={{ color: accent }}
          >
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <span
              className="text-[8px] font-mono px-1 border leading-tight"
              style={{ color: accent, borderColor: accent }}
            >
              {anime.type ?? "N/A"}
            </span>
            <span className="text-[7px] font-mono text-[var(--text-faint)]">
              EP:{anime.episodes ?? "?"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function AnimeCardSkeleton() {
  return (
    <div className="term-surface border border-[var(--border)] animate-pulse">
      <div className="aspect-[2/3] bg-[var(--muted)]" />
      <div className="p-2 space-y-2">
        <div className="h-2 bg-[var(--muted)] w-4/5" />
        <div className="h-2 bg-[var(--muted)] w-2/5" />
      </div>
    </div>
  );
}
