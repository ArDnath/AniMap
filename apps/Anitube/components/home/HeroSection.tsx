"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Terminal, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { SearchResult } from "@anitube/api";

type HeroAnime = SearchResult & { description?: string | null };

export function HeroSection({ animeList }: { animeList: HeroAnime[] }) {
  const items = animeList.slice(0, 3);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIdx(i => (i + 1) % items.length), [items.length]);
  const prev = useCallback(() => setIdx(i => (i - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const t = setInterval(next, 7000);
    return () => clearInterval(t);
  }, [paused, next, items.length]);

  if (items.length === 0) return <HeroSkeleton />;

  const anime = items[idx]!;
  const title = anime.title.english ?? anime.title.romaji ?? anime.title.native ?? "UNKNOWN";
  const imageUrl = anime.coverImage ?? "";
  const desc = anime.description
    ? anime.description.replace(/<[^>]+>/g, "").slice(0, 260) + "…"
    : "DATABASE RECORD ACTIVE. NO ADDITIONAL SYNOPSIS LOGGED FOR THIS DIRECTORY INDEX.";

  return (
    <section
      className="relative w-full min-h-[480px] md:min-h-[560px] flex items-center overflow-hidden py-12 md:py-16 bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ─── Cinematic Ambient Backdrop cross-fade ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <AnimatePresence mode="wait">
          {imageUrl && (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.12, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={imageUrl}
                alt=""
                fill
                className="object-cover object-center filter grayscale contrast-[1.2]"
                priority
                unoptimized
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Soft terminal scanline glow on the backdrop image */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--bg)_80%)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-transparent to-[var(--bg)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[transparent_40%] to-[var(--bg)]" />
      </div>

      {/* Main layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-14">
          
          {/* Framed interactive poster with animated cross-fade */}
          <div className="w-full max-w-[210px] shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.4 }}
                className="relative aspect-[2/3] w-full bg-[var(--surface)] border border-[var(--border)] overflow-hidden shadow-2xl"
              >
                {imageUrl ? (
                  <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-700 hover:scale-105" sizes="210px" priority />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[9px] text-[var(--text-faint)] uppercase tracking-widest font-mono">NO_IMAGE</span>
                  </div>
                )}
                {/* Average Score Pill */}
                {anime.averageScore != null && (
                  <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/80 backdrop-blur-sm text-[var(--accent)] font-mono text-[8px] font-bold tracking-wider border border-white/10">
                    {anime.averageScore}%
                  </span>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Details side */}
          <div className="flex-1 flex flex-col justify-between py-2 text-center md:text-left">
            <div className="space-y-6">
              
              {/* Header tags */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-[9px] font-black tracking-[0.25em] text-[var(--accent)] uppercase animate-pulse">
                  FEATURED INDEX
                </span>
                <span className="text-[9px] font-mono text-[var(--text-faint)]">
                  [0{idx + 1}/0{items.length}]
                </span>
              </div>

              {/* Title cross-fade */}
              <AnimatePresence mode="wait">
                <motion.h1
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4 }}
                  className="font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-[var(--text)] leading-[1.1] max-w-2xl"
                >
                  {title}
                </motion.h1>
              </AnimatePresence>

              {/* Meta information tags */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {([
                  ["FORMAT", anime.type ?? "N/A"],
                  ["EPISODES", anime.episodes ?? "?"],
                  ["YEAR", anime.year ?? "?"],
                ] as [string, string | number][]).map(([label, val]) => (
                  <div key={label} className="text-[8px] px-2 py-1 bg-[var(--surface)] border border-[var(--border)] text-[var(--text-dim)] uppercase tracking-wider font-mono">
                    <span className="text-[var(--text-faint)] font-bold">{label}:</span> {val}
                  </div>
                ))}
              </div>

              {/* Description cross-fade */}
              <AnimatePresence mode="wait">
                <motion.p
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-xs md:text-sm text-[var(--text-dim)] leading-relaxed max-w-2xl text-left"
                >
                  {desc}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Actions + Sleek Slide Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 mt-6 border-t border-dashed border-[var(--border)]">
              <Link
                href={`/anime/${anime.id}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] font-extrabold text-xs uppercase tracking-[0.2em] transition-all duration-200 hover:opacity-90 active:scale-95 shadow-[0_4px_16px_rgba(0,255,65,0.2)]"
              >
                <Terminal className="w-4 h-4" />
                EXPLORE TITLE
              </Link>

              {/* Clean pagination buttons */}
              {items.length > 1 && (
                <div className="flex items-center gap-4">
                  <button onClick={prev} className="p-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-dim)] transition-colors" aria-label="Previous Slide">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <div className="flex gap-2">
                    {items.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIdx(i)}
                        className={`h-1.5 transition-all duration-300 ${i === idx ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-[var(--border)] hover:bg-[var(--text-faint)]"}`}
                        aria-label={`Go to slide ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button onClick={next} className="p-2 border border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[var(--text-dim)] transition-colors" aria-label="Next Slide">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSkeleton() {
  return (
    <section className="relative w-full bg-[var(--bg)] py-12 md:py-20 animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 md:gap-12">
        <div className="w-[210px] h-[315px] bg-[var(--muted)] border border-[var(--border)]" />
        <div className="flex-1 space-y-4 pt-2">
          <div className="h-3 w-24 bg-[var(--muted)]" />
          <div className="h-10 w-3/4 bg-[var(--muted)]" />
          <div className="flex gap-2">
            {[40, 32, 28].map((w, i) => (
              <div key={i} className="h-5 bg-[var(--muted)]" style={{ width: w }} />
            ))}
          </div>
          <div className="h-20 w-full bg-[var(--muted)]" />
          <div className="h-10 w-40 bg-[var(--muted)]" />
        </div>
      </div>
    </section>
  );
}
