import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function AnimeNotFound() {
  return (
    <div className="min-h-screen term-bg flex items-center justify-center p-4 font-mono">
      <div className="text-center space-y-6 max-w-sm">
        <pre className="text-[var(--accent)] text-xl font-bold neon-text">
{`┌─────────┐
│  404    │
│  ANIME  │
└─────────┘`}
        </pre>
        <div>
          <p className="text-[10px] text-[var(--accent-red)] uppercase tracking-widest mb-1">!! ENTITY_NOT_FOUND !!</p>
          <h1 className="text-lg font-bold text-[var(--text)] uppercase tracking-tight">Anime not found</h1>
          <p className="text-[10px] text-[var(--text-dim)] mt-1">This title doesn't exist in the database.</p>
        </div>
        <div className="flex gap-3 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--text-dim)] text-[9px] uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
            <Home className="w-3 h-3" /> HOME
          </Link>
          <Link href="/search" className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--text-dim)] text-[9px] uppercase tracking-widest hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
            <Search className="w-3 h-3" /> SEARCH
          </Link>
        </div>
      </div>
    </div>
  );
}
