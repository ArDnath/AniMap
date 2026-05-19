import { Metadata } from "next";
import Link from "next/link";
import { Github, ExternalLink, Heart, Database, Zap, Code2, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "About | Animap",
  description:
    "Animap — a retro-modern terminal anime discovery platform built with Next.js.",
};

const techStack = [
  { name: "Next.js 16", icon: "▲" },
  { name: "React 19", icon: "⚛" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind CSS", icon: "TW" },
  { name: "TanStack Query", icon: "⟳" },
  { name: "AniList API", icon: "AL" },
  { name: "Jikan v4", icon: "JK" },
  { name: "Zustand", icon: "Z" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen term-bg py-10">
      <div className="container mx-auto px-4 max-w-4xl space-y-10">

        {/* Hero */}
        <div className="term-surface border border-[var(--border)] p-8 font-mono">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-[var(--text-faint)] text-xs">root@animap:~$</span>
            <span className="text-[var(--accent)] text-xs">cat /sys/about</span>
          </div>
          <div className="border-t border-[var(--border)] mt-3 pt-5">
            <h1 className="text-3xl md:text-5xl font-bold neon-text uppercase tracking-tight">ANIMAP</h1>
            <p className="text-xs text-[var(--text-dim)] mt-2 uppercase tracking-widest">
              Retro-Modern Terminal Anime Discovery Platform
            </p>
          </div>
        </div>

        {/* About */}
        <section>
          <div className="flex items-center gap-2 mb-4 font-mono">
            <Terminal className="w-4 h-4 text-[var(--accent)]" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-[var(--text-dim)]">// ABOUT</h2>
          </div>
          <div className="term-surface border border-[var(--border)] p-6">
            <p className="text-sm text-[var(--text-dim)] leading-relaxed font-mono">
              Animap is an anime discovery platform that aggregates data from AniList,
              Jikan, and MyAnimeList to provide comprehensive anime information. Browse
              thousands of titles, filter by genre, search with fuzzy matching, and
              explore detailed anime pages.
            </p>
          </div>
        </section>

        {/* Data Sources */}
        <section>
          <div className="flex items-center gap-2 mb-4 font-mono">
            <Database className="w-4 h-4 text-[var(--accent-amber)]" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-[var(--text-dim)]">// DATA_SOURCES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { name: "AniList", tag: "AL", href: "https://anilist.co", desc: "Anime metadata, genres, ratings" },
              { name: "Jikan v4", tag: "JK", href: "https://jikan.moe", desc: "Episode data & MAL integration" },
              { name: "MyAnimeList", tag: "MAL", href: "https://myanimelist.net", desc: "World's largest anime database" },
            ].map((src) => (
              <div key={src.name} className="term-surface border border-[var(--border)] p-4 font-mono hover:border-[var(--accent)] transition-colors">
                <div className="text-[var(--accent)] text-xs font-bold mb-1">[{src.tag}]</div>
                <p className="text-sm font-bold text-[var(--text)]">{src.name}</p>
                <p className="text-[9px] text-[var(--text-dim)] mt-1 mb-3">{src.desc}</p>
                <a
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[9px] text-[var(--accent)] hover:opacity-70 uppercase tracking-widest transition-opacity"
                >
                  VISIT <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack */}
        <section>
          <div className="flex items-center gap-2 mb-4 font-mono">
            <Code2 className="w-4 h-4 text-[var(--accent-warm)]" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-[var(--text-dim)]">// TECH_STACK</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {techStack.map((t) => (
              <div
                key={t.name}
                className="term-surface border border-[var(--border)] p-3 text-center font-mono hover:border-[var(--accent)] transition-colors"
              >
                <div className="text-[var(--accent)] text-sm font-bold mb-1">{t.icon}</div>
                <p className="text-[8px] text-[var(--text-dim)] uppercase tracking-widest">{t.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* License */}
        <section>
          <div className="flex items-center gap-2 mb-4 font-mono">
            <Zap className="w-4 h-4 text-[var(--accent)]" />
            <h2 className="text-xs uppercase tracking-[0.3em] text-[var(--text-dim)]">// LICENSE</h2>
          </div>
          <div className="term-surface border border-[var(--border)] p-5 font-mono text-sm text-[var(--text-dim)]">
            Licensed under{" "}
            <span className="text-[var(--accent)] font-bold">AGPL-3.0</span>. Free to use,
            modify, and distribute with source attribution.
          </div>
        </section>

        {/* Links */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="https://github.com/ArDnath/anitube"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 term-surface border border-[var(--border)] hover:border-[var(--accent)] font-mono text-xs uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent)] transition-all"
            >
              <Github className="w-4 h-4" />
              VIEW_ON_GITHUB
            </Link>
            <Link
              href="https://github.com/ArDnath/anitube/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-6 py-4 term-surface border border-[var(--border)] hover:border-[var(--accent-red)] font-mono text-xs uppercase tracking-widest text-[var(--text-dim)] hover:text-[var(--accent-red)] transition-all"
            >
              <ExternalLink className="w-4 h-4" />
              REPORT_ISSUE
            </Link>
          </div>

          <div className="text-center mt-8 font-mono text-[9px] text-[var(--text-faint)] uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <span>BUILT_WITH</span>
            <Heart className="w-3 h-3 text-[var(--accent-red)]" />
            <span>BY_ARIYAMAN_DEBNATH</span>
          </div>
        </section>
      </div>
    </main>
  );
}
