"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, type FormEvent } from "react";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  { href: "/", label: "HOME", prefix: "01." },
  { href: "/search", label: "BROWSE", prefix: "02." },
  { href: "/genre", label: "GENRES", prefix: "03." },
  { href: "/about", label: "SYS_INFO", prefix: "04." },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("animap-theme") ?? "dark";
    setTheme(saved as "dark" | "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("animap-theme", next);
    const root = document.documentElement;
    root.classList.toggle("light", next === "light");
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setQuery("");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[var(--bg)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <a href="/" className="flex items-center gap-1 font-mono group">
            <Image
              src="/logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="object-contain"
            />
            <span className="text-[var(--accent)] font-bold text-sm tracking-tighter neon-text group-hover:opacity-90 transition-opacity">
              ANIMAP
            </span>
            <span className="text-[var(--accent)] text-[10px]">$</span>
            <span className="w-2 h-4 bg-[var(--accent)] animate-blink ml-0.5 opacity-80" />
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 font-mono text-[10px]">
            {NAV.map(({ href, label, prefix }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`transition-colors ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-dim)] hover:text-[var(--accent)]"
                  }`}
                >
                  <span className="text-[var(--text-faint)] mr-1">
                    {prefix}
                  </span>
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop right: search + theme */}
          <div className="hidden md:flex items-center gap-3">
            <form
              onSubmit={handleSearch}
              className="flex items-center bg-[var(--surface)] border border-[var(--border)] focus-within:border-[var(--accent)] transition-colors"
            >
              <Search className="ml-3 w-3 h-3 text-[var(--text-faint)] shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="SEARCH..."
                aria-label="Search anime"
                className="bg-transparent border-none outline-none text-[10px] font-mono text-[var(--text)] placeholder:text-[var(--text-faint)] w-44 px-3 py-2"
              />
            </form>

            <motion.button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              whileTap={{ scale: 0.9, rotate: 15 }}
              className="p-2 border border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all flex items-center justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <Sun className="w-3.5 h-3.5" />
                  ) : (
                    <Moon className="w-3.5 h-3.5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              whileTap={{ scale: 0.9, rotate: 15 }}
              className="p-2 text-[var(--text-dim)] flex items-center justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              whileTap={{ scale: 0.9 }}
              className="p-2 text-[var(--text-dim)] hover:text-[var(--accent)] transition-colors flex items-center justify-center"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                  className="flex items-center justify-center"
                >
                  {menuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="md:hidden bg-[var(--surface)] border-t border-[var(--border)] overflow-hidden font-mono"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: {
                  transition: { staggerChildren: 0.04, delayChildren: 0.05 },
                },
                closed: {
                  transition: { staggerChildren: 0.03, staggerDirection: -1 },
                },
              }}
              className="p-4 space-y-2"
            >
              {NAV.map(({ href, label }) => (
                <motion.div
                  key={href}
                  variants={{
                    open: { opacity: 1, x: 0 },
                    closed: { opacity: 0, x: -10 },
                  }}
                  transition={{ duration: 0.15 }}
                >
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-[10px] text-[var(--text-dim)] hover:text-[var(--accent)] px-2 py-2 border border-transparent hover:border-[var(--border)] transition-all uppercase tracking-widest"
                  >
                    &gt; {label}
                  </Link>
                </motion.div>
              ))}
              <motion.form
                onSubmit={handleSearch}
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: 10 },
                }}
                className="pt-2 flex border border-[var(--border)] focus-within:border-[var(--accent)] transition-colors"
              >
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="SEARCH_QUERY..."
                  aria-label="Search anime"
                  className="flex-1 bg-transparent outline-none text-[10px] font-mono text-[var(--text)] placeholder:text-[var(--text-faint)] px-3 py-2"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-[var(--accent)] text-[var(--bg)] text-[9px] font-bold uppercase tracking-widest"
                >
                  GO
                </button>
              </motion.form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
