"use client";

import { QueryProvider } from "@/lib/query/provider";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          classNames: {
            toast:
              "!font-mono !text-[10px] !uppercase !tracking-widest !border !border-[var(--border)] !bg-[var(--surface)] !text-[var(--text)] !rounded-none !shadow-none",
            title:       "!text-[var(--accent)] !font-bold",
            description: "!text-[var(--text-dim)]",
            success:     "!border-[var(--accent)]",
            error:       "!border-[var(--accent-red)] !text-red-400",
          },
        }}
      />
    </QueryProvider>
  );
}
