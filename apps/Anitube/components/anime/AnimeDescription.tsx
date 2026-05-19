"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export function AnimeDescription({ description }: { description: string | null }) {
  const [expanded, setExpanded] = useState(false);
  if (!description) return null;

  const clean = description.replace(/<[^>]*>/g, "");
  const isLong = clean.length > 400;
  const text = expanded || !isLong ? clean : clean.slice(0, 400) + "…";

  return (
    <div className="term-surface border border-[var(--border)] p-5 font-mono">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[var(--accent)] text-[9px] uppercase tracking-widest">//</span>
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-dim)]">SYNOPSIS</h2>
      </div>
      <p className="text-sm text-[var(--text-dim)] leading-relaxed whitespace-pre-line">{text}</p>
      {isLong && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-4 flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest text-[var(--text-faint)] hover:text-[var(--accent)] transition-colors"
        >
          {expanded
            ? <><ChevronUp className="w-3 h-3" /> SHOW_LESS</>
            : <><ChevronDown className="w-3 h-3" /> READ_MORE</>
          }
        </button>
      )}
    </div>
  );
}
