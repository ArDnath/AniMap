export default function SearchLoading() {
  return (
    <div className="min-h-screen term-bg animate-pulse">
      {/* Header */}
      <div className="term-surface border-b border-[var(--border)] py-8 px-4">
        <div className="max-w-7xl mx-auto space-y-3">
          <div className="h-3 w-20 bg-[var(--muted)]" />
          <div className="h-8 w-48 bg-[var(--muted)]" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Search input */}
        <div className="flex items-center border border-[var(--border)] h-12 gap-3 px-4">
          <div className="w-4 h-4 bg-[var(--muted)]" />
          <div className="flex-1 h-3 bg-[var(--muted)]" />
          <div className="w-16 h-full bg-[var(--muted)]" />
        </div>

        {/* Filter row */}
        <div className="flex gap-2">
          <div className="h-8 w-24 bg-[var(--muted)] border border-[var(--border)]" />
          <div className="h-8 w-32 bg-[var(--muted)] border border-[var(--border)]" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="term-surface border border-[var(--border)]">
              <div className="aspect-[2/3] bg-[var(--muted)]" />
              <div className="p-2 space-y-2">
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
