export default function Loading() {
  return (
    <div className="min-h-screen term-bg animate-pulse">
      {/* Hero skeleton */}
      <div className="term-surface border-b border-[var(--border)] py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-10">
          <div className="w-[220px] h-[330px] bg-[var(--muted)] border border-[var(--border)] shrink-0" />
          <div className="flex-1 space-y-4 pt-2">
            <div className="h-3 w-16 bg-[var(--muted)]" />
            <div className="h-8 w-2/3 bg-[var(--muted)]" />
            <div className="flex gap-2">
              {[40, 48, 32, 40].map((w, i) => <div key={i} className="h-5 bg-[var(--muted)]" style={{ width: w }} />)}
            </div>
            <div className="h-16 w-full max-w-xl bg-[var(--muted)]" />
            <div className="h-9 w-36 bg-[var(--muted)]" />
          </div>
        </div>
      </div>

      {/* Sections skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="py-10 border-b border-[var(--border)]">
            <div className="flex items-center justify-between mb-6">
              <div className="h-4 w-36 bg-[var(--muted)]" />
              <div className="h-4 w-20 bg-[var(--muted)]" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="term-surface border border-[var(--border)]">
                  <div className="aspect-[2/3] bg-[var(--muted)]" />
                  <div className="p-2 space-y-1.5">
                    <div className="h-2 bg-[var(--muted)] w-4/5" />
                    <div className="h-2 bg-[var(--muted)] w-2/5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
