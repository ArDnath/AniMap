"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCcw } from "lucide-react";

export default function AnimeError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => { console.error("Anime page error:", error); }, [error]);

  return (
    <div className="min-h-screen term-bg flex items-center justify-center p-4 font-mono">
      <div className="max-w-md w-full term-surface border border-[var(--accent-red)] p-8 space-y-6 text-center">
        <pre className="text-[var(--accent-red)] text-2xl font-bold">{`[ERROR]`}</pre>
        <div>
          <h1 className="text-sm font-bold text-[var(--text)] uppercase tracking-widest mb-2">
            FAILED_TO_LOAD_ENTITY
          </h1>
          <p className="text-[9px] text-[var(--text-dim)] uppercase tracking-widest">
            {error.message || "An unexpected error occurred"}
          </p>
          {error.digest && (
            <p className="text-[8px] text-[var(--text-faint)] mt-2">
              DIGEST: {error.digest}
            </p>
          )}
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-[var(--bg)] text-[9px] uppercase tracking-widest font-bold hover:opacity-90 transition-opacity"
          >
            <RefreshCcw className="w-3 h-3" /> RETRY
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--text-dim)] text-[9px] uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            <Home className="w-3 h-3" /> HOME
          </Link>
        </div>
      </div>
    </div>
  );
}
