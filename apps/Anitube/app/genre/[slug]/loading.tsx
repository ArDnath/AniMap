export default function GenreLoading() {
  return (
    <div className="min-h-screen term-bg py-10 px-4 animate-pulse">
      <div className="container mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="mb-8 space-y-2">
          <div className="h-2 w-32 bg-[var(--muted)]" />
          <div className="h-7 w-48 bg-[var(--muted)]" />
          <div className="h-2 w-24 bg-[var(--muted)]" />
          <div className="h-px bg-[var(--border)] mt-4" />
        </div>

        {/* Filters skeleton */}
        <div className="term-surface border border-[var(--border)] p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[0, 1, 2].map(i => (
              <div key={i} className="space-y-2">
                <div className="h-2 w-20 bg-[var(--muted)]" />
                <div className="flex gap-1.5">
                  {[24, 20, 28, 20].map((w, j) => <div key={j} className="h-7 bg-[var(--muted)]" style={{ width: w + "px" }} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="term-surface border border-[var(--border)]">
              <div className="aspect-[2/3] bg-[var(--muted)]" />
              <div className="p-2 space-y-1.5">
                <div className="h-2 bg-[var(--muted)] w-4/5" />
                <div className="h-2 bg-[var(--muted)] w-2/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
