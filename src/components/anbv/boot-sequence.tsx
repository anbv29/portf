"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const bootLines = [
  "Initializing interface kernel...",
  "Loading identity module...",
  "Indexing project services...",
  "Mounting experience records...",
  "Loading engineering stack...",
] as const;

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const reduceMotion = useReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);
  const [ready, setReady] = useState(false);

  const finish = useCallback(() => {
    window.sessionStorage.setItem("anbv-boot-seen", "1");
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const alreadySeen = window.sessionStorage.getItem("anbv-boot-seen") === "1";
    if (alreadySeen || reduceMotion) {
      finish();
      return;
    }

    const timers = bootLines.map((_, index) =>
      window.setTimeout(() => setVisibleLines(index + 1), 170 * (index + 1))
    );
    timers.push(window.setTimeout(() => setReady(true), 1_050));
    timers.push(window.setTimeout(() => finish(), 1_450));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [finish, reduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(8px)" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#08090b] px-5"
    >
      <div className="w-full max-w-xl font-mono">
        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4 text-[11px] uppercase tracking-[0.18em] text-white/45">
          <span>ANBV / BOOT</span>
          <button
            type="button"
            onClick={finish}
            className="rounded border border-white/10 px-2.5 py-1.5 text-white/55 transition-colors hover:border-white/25 hover:text-white"
          >
            Skip
          </button>
        </div>

        <div className="space-y-2 text-sm text-white/55">
          <div className="mb-5 text-base text-white/90">ANBV SYSTEM INITIALIZATION</div>
          {bootLines.slice(0, visibleLines).map((line, index) => (
            <motion.div
              key={line}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <span className="text-emerald-300/70">
                {index < visibleLines - 1 || ready ? "✓" : "›"}
              </span>
              {line}
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {ready && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 flex items-center gap-3 border-t border-white/10 pt-4 text-xs uppercase tracking-[0.2em] text-emerald-200/80"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
              System ready
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
