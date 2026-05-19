import Link from "next/link";
import { Home, Search, Grid3x3 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen term-bg flex items-center justify-center px-4 font-mono">
      <div className="text-center max-w-md space-y-8">
        {/* ASCII 404 */}
        <div className="term-surface border border-[var(--border)] p-8">
          <pre className="neon-text text-4xl md:text-6xl font-bold leading-none tracking-tight">
{`┌──────┐
│  404 │
└──────┘`}
          </pre>
        </div>

        {/* Error copy */}
        <div className="space-y-2">
          <p className="text-[10px] text-[var(--accent-red)] uppercase tracking-widest">
            !! ENTITY_NOT_FOUND !!
          </p>
          <h1 className="text-xl font-bold text-[var(--text)] uppercase tracking-tight">
            Page not found
          </h1>
          <p className="text-xs text-[var(--text-dim)]">
            The requested resource does not exist in this sector.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { href: "/",       icon: Home,       label: "HOME"   },
            { href: "/search", icon: Search,     label: "SEARCH" },
            { href: "/genre",  icon: Grid3x3,    label: "GENRES" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="inline-flex items-center gap-2 px-4 py-2 border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] text-[9px] uppercase tracking-widest transition-all"
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
