"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Users } from "lucide-react";

interface Character { id:number; role:string; name:{full:string;native:string|null}; image:{large:string;medium:string}; }

export function AnimeCharacters({ animeId }: { animeId: number }) {
  const [chars, setChars] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("https://graphql.anilist.co", { method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ query:`query($id:Int){Media(id:$id,type:ANIME){characters(sort:[ROLE,RELEVANCE],page:1,perPage:12){edges{role node{id name{full native}image{large medium}}}}}}`, variables:{id:animeId} })
        });
        const j = await r.json();
        setChars((j.data?.Media?.characters?.edges??[]).map((e:any)=>({id:e.node.id,role:e.role,name:e.node.name,image:e.node.image})));
      } catch {}
      finally { setLoading(false); }
    })();
  }, [animeId]);

  if (loading) return (
    <div className="bg-[var(--surface)] border border-[var(--border)] p-5 font-mono">
      <div className="flex items-center gap-2 mb-4"><span className="text-[var(--accent)] text-[9px]">//</span><h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-dim)]">CHARACTERS</h2></div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 animate-pulse">{Array.from({length:6}).map((_,i)=>(<div key={i}><div className="aspect-[2/3] bg-[var(--muted)] mb-1"/><div className="h-2 bg-[var(--muted)] w-4/5"/></div>))}</div>
    </div>
  );
  if (!chars.length) return null;
  const shown = showAll ? chars : chars.slice(0, 6);

  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] p-5 font-mono">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2"><span className="text-[var(--accent)] text-[9px]">//</span><h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-dim)]">CHARACTERS</h2></div>
        <span className="text-[8px] text-[var(--text-faint)] uppercase tracking-widest">{chars.length} indexed</span>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {shown.map(c => (
          <div key={c.id} className="group border border-[var(--border)] hover:border-[var(--accent)] transition-colors overflow-hidden">
            <div className="relative aspect-[2/3] bg-[var(--muted)]">
              <Image src={c.image.large} alt={c.name.full} fill className="object-cover" unoptimized />
              {c.role === "MAIN" && <div className="absolute top-0 left-0 bg-[var(--accent)] text-[var(--bg)] text-[7px] font-bold px-1.5 py-0.5 uppercase tracking-widest">MAIN</div>}
            </div>
            <div className="p-2">
              <p className="text-[8px] font-bold text-[var(--text)] uppercase tracking-tight line-clamp-1">{c.name.full}</p>
              {c.name.native && <p className="text-[7px] text-[var(--text-faint)] line-clamp-1 mt-0.5">{c.name.native}</p>}
            </div>
          </div>
        ))}
      </div>
      {chars.length > 6 && (
        <button onClick={() => setShowAll(v=>!v)} className="mt-4 w-full flex items-center justify-center gap-2 py-2 border border-[var(--border)] text-[9px] font-mono uppercase tracking-widest text-[var(--text-dim)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
          <Users className="w-3 h-3"/>{showAll ? "SHOW_LESS" : `LOAD_ALL (${chars.length})`}
        </button>
      )}
    </div>
  );
}
