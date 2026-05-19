import Link from "next/link";
import type { Metadata } from "next";
import {
  Film, Sparkles, Heart, Swords, Zap, Ghost, Search,
  Music, Laugh, Drama, Rocket, Cpu, Brain, Scroll,
  MapPin, Shield, Users, Palette,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Browse by Genre | AniTube",
  description:
    "Explore anime by genre: Action, Adventure, Comedy, Drama, Fantasy, Horror, Mystery, Romance, Sci-Fi, and more.",
};

const genres = [
  { name: "Action",        slug: "action",        icon: Swords },
  { name: "Adventure",     slug: "adventure",      icon: MapPin },
  { name: "Comedy",        slug: "comedy",         icon: Laugh },
  { name: "Drama",         slug: "drama",          icon: Drama },
  { name: "Fantasy",       slug: "fantasy",        icon: Sparkles },
  { name: "Horror",        slug: "horror",         icon: Ghost },
  { name: "Mystery",       slug: "mystery",        icon: Search },
  { name: "Romance",       slug: "romance",        icon: Heart },
  { name: "Sci-Fi",        slug: "sci-fi",         icon: Rocket },
  { name: "Slice of Life", slug: "slice-of-life",  icon: Film },
  { name: "Sports",        slug: "sports",         icon: Zap },
  { name: "Supernatural",  slug: "supernatural",   icon: Ghost },
  { name: "Thriller",      slug: "thriller",       icon: Swords },
  { name: "Mecha",         slug: "mecha",          icon: Cpu },
  { name: "Psychological", slug: "psychological",  icon: Brain },
  { name: "Historical",    slug: "historical",     icon: Scroll },
  { name: "Music",         slug: "music",          icon: Music },
  { name: "Isekai",        slug: "isekai",         icon: MapPin },
  { name: "Shounen",       slug: "shounen",        icon: Shield },
  { name: "Shoujo",        slug: "shoujo",         icon: Heart },
  { name: "Seinen",        slug: "seinen",         icon: Users },
  { name: "Josei",         slug: "josei",          icon: Palette },
] as const;

// Cycle through the 3 neon accent vars
const ACCENT_CYCLE = [
  "var(--accent)",
  "var(--accent-amber)",
  "var(--accent-warm)",
] as const;

export default function GenresPage() {
  return (
    <div className="min-h-screen term-bg py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 space-y-1 font-mono">
          <p className="text-[9px] text-[var(--text-faint)] uppercase tracking-widest">
            &gt; ls /genres
          </p>
          <h1 className="text-2xl md:text-3xl font-bold neon-text uppercase tracking-tight">
            BROWSE_GENRES
          </h1>
          <p className="text-xs text-[var(--text-dim)]">
            Select a category to filter your search.
          </p>
          <div className="h-px bg-[var(--border)] mt-4" />
        </div>

        {/* Genre grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {genres.map((genre, i) => {
            const Icon = genre.icon;
            const accent = ACCENT_CYCLE[i % ACCENT_CYCLE.length]!;
            return (
              <Link
                key={genre.slug}
                href={`/genre/${genre.slug}`}
                className="group block term-surface border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-200 p-4 text-center"
              >
                <Icon
                  className="mx-auto mb-2 w-6 h-6 transition-colors duration-200"
                  style={{ color: "var(--text-dim)" }}
                />
                <p
                  className="font-mono text-[9px] uppercase tracking-widest text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors duration-200"
                >
                  {genre.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
