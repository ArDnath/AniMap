import Link from "next/link";
import { Github, MessageCircle, Terminal, Cpu, ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border)] mt-20 font-mono">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo panel */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[var(--accent)]">
              <Terminal className="w-5 h-5" />
              <span className="font-bold text-xl uppercase tracking-tighter neon-text">
                ANIMAP_CORE
              </span>
            </div>

            <p className="text-[10px] text-[var(--text-dim)] leading-relaxed uppercase tracking-widest">
              [SYSTEM_STATE]: OPERATIONAL
              <br />
              [UPTIME]: 99.9%
              <br />
              [LOCATION]: CLOUD_EDGE
              <br />
              [DATA_SOURCE]: ANILIST_DB / JIKAN_V4
            </p>
          </div>

          {/* Directory */}
          <div>
            <h3 className="text-[var(--accent)] font-bold uppercase mb-4 text-xs tracking-[0.3em]">
              /root/directory
            </h3>

            <ul className="space-y-2 text-[10px] uppercase tracking-widest">
              <li>
                <Link
                  href="/"
                  className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; HOME
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; BROWSE
                </Link>
              </li>
              <li>
                <Link
                  href="/genre"
                  className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; GENRES
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; ABOUT_SYS
                </Link>
              </li>
            </ul>
          </div>

          {/* External resources */}
          <div>
            <h3 className="text-[var(--accent)] font-bold uppercase mb-4 text-xs tracking-[0.3em]">
              /ext/resources
            </h3>

            <ul className="space-y-2 text-[10px] uppercase tracking-widest">
              <li>
                <a
                  href="https://anilist.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; ANILIST_API
                </a>
              </li>
              <li>
                <a
                  href="https://jikan.moe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; JIKAN_API
                </a>
              </li>
              <li>
                <a
                  href="https://myanimelist.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors"
                >
                  &gt; MAL_SOURCE
                </a>
              </li>
            </ul>
          </div>

          {/* User connect */}
          <div className="space-y-6">
            <h3 className="text-[var(--accent)] font-bold uppercase text-xs tracking-[0.3em]">
              /user/connect
            </h3>

            <div className="flex gap-4">
              <a
                href="https://github.com/ArDnath/anitube"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                aria-label="GitHub repository"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="p-2 border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
                aria-label="Community link"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[var(--accent-amber)] animate-pulse">
              <ShieldCheck className="w-3 h-3" />
              <span>SECURE_CONNECTION_ESTABLISHED</span>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-16 pt-6 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] uppercase tracking-[0.2em] text-[var(--text-faint)]">
          <p>ESTABLISHED {currentYear} — ANIMAP NODE #001</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Cpu className="w-3 h-3" />
              POWERED_BY_VERCEL
            </span>
            <span>LICENSED_UNDER_AGPL_3.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
