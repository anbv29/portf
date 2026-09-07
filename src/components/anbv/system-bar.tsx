"use client";

import { Command, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import type { ModuleId } from "@/data/portfolio";

export function SystemBar({
  activeModule,
  onOpenPalette,
  onExit,
}: {
  activeModule: ModuleId;
  onOpenPalette: () => void;
  onExit: () => void;
}) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    update();
    const timer = window.setInterval(update, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-12 border-b border-white/[0.08] bg-[#08090b]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-[1600px] items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={onExit}
          className="font-mono text-xs font-semibold tracking-[0.2em] text-white/90 transition-colors hover:text-emerald-200"
          aria-label="Return to ANBV mode selection"
        >
          ANBV
        </button>

        <div className="hidden h-4 w-px bg-white/10 sm:block" />
        <div className="hidden font-mono text-[11px] uppercase tracking-[0.14em] text-white/38 sm:block">
          system / <span className="text-white/65">{activeModule}</span>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            onClick={onOpenPalette}
            className="flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white/45 transition-colors hover:border-white/20 hover:text-white/75"
          >
            <Command size={12} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden text-white/25 md:inline">⌘K</kbd>
          </button>
          <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-200/70">
            <Radio size={12} />
            <span className="hidden sm:inline">Online</span>
          </div>
          <time className="min-w-10 text-right font-mono text-[11px] tabular-nums text-white/45">
            {time || "--:--"}
          </time>
        </div>
      </div>
    </header>
  );
}
