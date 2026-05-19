// This page now redirects to /anime/:id — no video player.
// Loading state is minimal since the redirect is instant.
export default function WatchLoading() {
  return (
    <div className="min-h-screen term-bg flex items-center justify-center font-mono">
      <p className="text-[10px] text-[var(--accent)] uppercase tracking-widest animate-pulse">
        REDIRECTING…
      </p>
    </div>
  );
}
