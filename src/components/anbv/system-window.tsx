"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Maximize2, Minimize2, Minus, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { ModuleId } from "@/data/portfolio";

export function SystemWindow({
  module,
  minimized,
  maximized,
  onMinimize,
  onMaximize,
  onClose,
  children,
}: {
  module: ModuleId;
  minimized: boolean;
  maximized: boolean;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  if (minimized) {
    return (
      <button
        type="button"
        onClick={onMinimize}
        className="mx-auto mt-24 flex min-h-56 w-full max-w-lg flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-white/15 bg-white/[0.015] font-mono text-xs uppercase tracking-[0.15em] text-white/35 transition-colors hover:border-white/25 hover:text-white/65"
      >
        <Minimize2 size={20} strokeWidth={1.4} />
        {module} minimized · restore
      </button>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={module}
        initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.992 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -6, scale: 0.996 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        aria-labelledby="active-module-title"
        className={cn(
          "anbv-window overflow-hidden border border-white/10 bg-[#0b0d10]/92 shadow-[0_30px_100px_rgba(0,0,0,0.4)] backdrop-blur-xl",
          maximized
            ? "fixed inset-x-2 bottom-16 top-14 z-30 rounded-lg lg:inset-x-20 lg:bottom-4"
            : "relative min-h-[calc(100svh-7.5rem)] rounded-xl lg:min-h-[calc(100svh-7rem)]"
        )}
      >
        <div className="flex h-11 items-center border-b border-white/[0.08] bg-white/[0.018] px-3 sm:px-4">
          <div className="flex items-center gap-2" aria-label="Window controls">
            <button
              type="button"
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center rounded text-white/25 transition-colors hover:bg-red-400/10 hover:text-red-300"
              aria-label="Close ANBV workspace"
            >
              <X size={13} />
            </button>
            <button
              type="button"
              onClick={onMinimize}
              className="flex h-6 w-6 items-center justify-center rounded text-white/25 transition-colors hover:bg-amber-300/10 hover:text-amber-200"
              aria-label={`Minimize ${module}`}
            >
              <Minus size={13} />
            </button>
            <button
              type="button"
              onClick={onMaximize}
              className="flex h-6 w-6 items-center justify-center rounded text-white/25 transition-colors hover:bg-emerald-300/10 hover:text-emerald-200"
              aria-label={maximized ? "Restore window" : "Maximize window"}
            >
              <Maximize2 size={11} />
            </button>
          </div>
          <div
            id="active-module-title"
            className="ml-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45"
          >
            module://{module}
          </div>
          <div className="ml-auto hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-white/25 sm:flex">
            <span className="h-1 w-1 rounded-full bg-emerald-300/70" />
            focused
          </div>
        </div>
        <div className="anbv-scrollbar h-[calc(100%-2.75rem)] overflow-y-auto">
          {children}
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
