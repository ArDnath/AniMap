import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { animeApi } from '@anitube/api';
import { AnimeCard } from '@/components/home/AnimeCard';
import { GenreFilters } from './GenreFilters';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string; sort?: string; format?: string; status?: string }>;
}

function slugToGenre(slug: string): string {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const name = slugToGenre(slug);
  return {
    title: `${name} Anime | AniTube`,
    description: `Discover the best ${name.toLowerCase()} anime on AniTube.`,
  };
}

export default async function GenrePage({ params, searchParams }: Props) {
  const { slug }                   = await params;
  const { page = '1', sort, format, status } = await searchParams;
  const genreName   = slugToGenre(slug);
  const currentPage = parseInt(page);

  let animeList;
  try {
    animeList = await animeApi.getAnimeByGenre(genreName, currentPage, 24);
  } catch {
    notFound();
  }

  const total = animeList.pagination.total;

  function pageLink(p: number) {
    const q = new URLSearchParams();
    q.set('page', String(p));
    if (sort)   q.set('sort',   sort);
    if (format) q.set('format', format);
    if (status) q.set('status', status);
    return `/genre/${slug}?${q.toString()}`;
  }

  return (
    <div className="min-h-screen term-bg py-10 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 font-mono">
          <p className="text-[8px] text-[var(--text-faint)] uppercase tracking-widest mb-1">
            &gt; ls /genre/{slug}
          </p>
          <h1 className="text-2xl md:text-3xl font-bold neon-text uppercase tracking-tight">
            {genreName.toUpperCase()}
          </h1>
          <p className="text-[10px] text-[var(--text-dim)] mt-1">
            {total.toLocaleString()} titles indexed
          </p>
          <div className="h-px bg-[var(--border)] mt-4" />
        </div>

        {/* Filters */}
        <GenreFilters />

        {/* Grid */}
        {animeList.data.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-10">
              {animeList.data.map((anime, i) => (
                <AnimeCard key={anime.id} anime={anime} index={i} />
              ))}
            </div>

            {/* Pagination */}
            {total > 24 && (
              <nav className="flex justify-center items-center gap-2 flex-wrap">
                {currentPage > 1 && (
                  <Link href={pageLink(currentPage - 1)} className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                    ← PREV
                  </Link>
                )}
                {Array.from({ length: Math.min(5, Math.ceil(total / 24)) }, (_, i) => {
                  const p = i + 1;
                  return (
                    <Link
                      key={p}
                      href={pageLink(p)}
                      className={`w-8 h-8 flex items-center justify-center font-mono text-[9px] border transition-all ${
                        p === currentPage
                          ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]'
                          : 'term-surface border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                      }`}
                    >
                      {p}
                    </Link>
                  );
                })}
                {animeList.pagination.hasNextPage && (
                  <Link href={pageLink(currentPage + 1)} className="font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                    NEXT →
                  </Link>
                )}
              </nav>
            )}
          </>
        ) : (
          <div className="text-center py-20 font-mono">
            <p className="text-[var(--accent-red)] text-sm uppercase tracking-widest">!! NO_DATA_IN_SECTOR !!</p>
            <p className="text-[10px] text-[var(--text-dim)] mt-2">No anime found for this genre.</p>
          </div>
        )}
      </div>
    </div>
  );
}
