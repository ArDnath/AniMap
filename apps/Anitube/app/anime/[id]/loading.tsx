export default function AnimeLoading() {
  return (
    <div className="min-h-screen term-bg animate-pulse">
      {/* Banner skeleton */}
      <div className="h-52 md:h-72 bg-[var(--muted)] border-b border-[var(--border)]" />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main col */}
          <div className="lg:col-span-2 space-y-5">
            {/* Cover + meta */}
            <div className="flex gap-5">
              <div className="w-[160px] aspect-[2/3] bg-[var(--muted)] border border-[var(--border)] shrink-0" />
              <div className="flex-1 space-y-3 pt-2">
                <div className="h-3 w-20 bg-[var(--muted)]" />
                <div className="h-7 w-3/4 bg-[var(--muted)]" />
                <div className="flex gap-2">
                  {[50, 60, 40, 50].map((w, i) => <div key={i} className="h-5 bg-[var(--muted)]" style={{ width: w }} />)}
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-32 bg-[var(--muted)]" />
                  <div className="h-8 w-32 bg-[var(--muted)]" />
                </div>
              </div>
            </div>

            {/* Description block */}
            <div className="term-surface border border-[var(--border)] p-5 space-y-2">
              <div className="h-2 w-24 bg-[var(--muted)]" />
              <div className="h-3 bg-[var(--muted)] w-full" />
              <div className="h-3 bg-[var(--muted)] w-full" />
              <div className="h-3 bg-[var(--muted)] w-3/4" />
            </div>

            {/* Episodes block */}
            <div className="term-surface border border-[var(--border)] p-5 space-y-2">
              <div className="h-2 w-24 bg-[var(--muted)] mb-3" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-3 border border-[var(--border)] p-3">
                  <div className="w-10 h-10 bg-[var(--muted)]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 bg-[var(--muted)] w-3/5" />
                    <div className="h-2 bg-[var(--muted)] w-2/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="term-surface border border-[var(--border)] p-5 space-y-3">
              <div className="h-2 w-20 bg-[var(--muted)]" />
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-10 bg-[var(--muted)]" />
              ))}
            </div>
            <div className="term-surface border border-[var(--border)] p-5 space-y-2">
              <div className="h-2 w-24 bg-[var(--muted)] mb-3" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-3 border border-[var(--border)] p-2">
                  <div className="w-12 h-16 bg-[var(--muted)]" />
                  <div className="flex-1 space-y-1.5 pt-1">
                    <div className="h-2 bg-[var(--muted)] w-4/5" />
                    <div className="h-2 bg-[var(--muted)] w-2/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
