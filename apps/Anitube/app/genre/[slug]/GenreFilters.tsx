'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useState } from 'react';

const SORT_OPTS   = [{ label: "POPULARITY", val: "popularity" }, { label: "SCORE", val: "score" }, { label: "TRENDING", val: "trending" }];
const FORMAT_OPTS = [{ label: "ANY", val: "any" }, { label: "TV", val: "TV" }, { label: "MOVIE", val: "MOVIE" }, { label: "OVA", val: "OVA" }, { label: "ONA", val: "ONA" }, { label: "SPECIAL", val: "SPECIAL" }];
const STATUS_OPTS = [{ label: "ANY", val: "any" }, { label: "AIRING", val: "RELEASING" }, { label: "FINISHED", val: "FINISHED" }, { label: "UPCOMING", val: "NOT_YET_RELEASED" }];

export function GenreFilters() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const pathname     = usePathname();

  const [sort,   setSort]   = useState(searchParams.get('sort')   || 'popularity');
  const [format, setFormat] = useState(searchParams.get('format') || 'any');
  const [status, setStatus] = useState(searchParams.get('status') || 'any');

  const push = (newSort?: string, newFormat?: string, newStatus?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const s = newSort   ?? sort;
    const f = newFormat ?? format;
    const st= newStatus ?? status;
    s  !== 'popularity'    ? params.set('sort',   s)  : params.delete('sort');
    f  !== 'any'           ? params.set('format', f)  : params.delete('format');
    st !== 'any'           ? params.set('status', st) : params.delete('status');
    params.delete('page');
    router.push(`${pathname}?${params.toString()}`);
  };

  function FilterGroup({ label, opts, value, onChange }: {
    label: string;
    opts: { label: string; val: string }[];
    value: string;
    onChange: (v: string, all: string, all2: string) => void;
  }) {
    return (
      <div>
        <p className="text-[8px] font-mono text-[var(--text-faint)] uppercase tracking-[0.3em] mb-2">{label}</p>
        <div className="flex flex-wrap gap-1.5">
          {opts.map(o => (
            <button
              key={o.val}
              type="button"
              onClick={() => onChange(o.val, format, status)}
              className={`font-mono text-[9px] uppercase tracking-widest px-3 py-1.5 border transition-all ${
                value === o.val
                  ? 'bg-[var(--accent)] text-[var(--bg)] border-[var(--accent)]'
                  : 'term-surface border-[var(--border)] text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="term-surface border border-[var(--border)] p-5 mb-8 space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FilterGroup
          label="SORT_BY"
          opts={SORT_OPTS}
          value={sort}
          onChange={(v) => { setSort(v); push(v, undefined, undefined); }}
        />
        <FilterGroup
          label="FORMAT"
          opts={FORMAT_OPTS}
          value={format}
          onChange={(v) => { setFormat(v); push(undefined, v, undefined); }}
        />
        <FilterGroup
          label="STATUS"
          opts={STATUS_OPTS}
          value={status}
          onChange={(v) => { setStatus(v); push(undefined, undefined, v); }}
        />
      </div>
    </div>
  );
}
