"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Boxes,
  BriefcaseBusiness,
  CircleUserRound,
  Code2,
  Cpu,
  FileText,
  Mail,
  Search,
  TerminalSquare,
  UserRoundSearch,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { ModuleId } from "@/data/portfolio";

type PaletteAction = {
  label: string;
  hint: string;
  icon: typeof Cpu;
  run: () => void;
};

export function CommandPalette({
  open,
  onClose,
  onNavigate,
  onRecruiter,
}: {
  open: boolean;
  onClose: () => void;
  onNavigate: (module: ModuleId) => void;
  onRecruiter: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const actions = useMemo<PaletteAction[]>(
    () => [
      { label: "Core", hint: "Open identity module", icon: Cpu, run: () => onNavigate("core") },
      { label: "Projects", hint: "Inspect project services", icon: Boxes, run: () => onNavigate("projects") },
      { label: "Experience", hint: "Open system timeline", icon: BriefcaseBusiness, run: () => onNavigate("experience") },
      { label: "Stack", hint: "Inspect technical modules", icon: Code2, run: () => onNavigate("stack") },
      { label: "Terminal", hint: "Open command interface", icon: TerminalSquare, run: () => onNavigate("terminal") },
      { label: "About", hint: "Inspect system profile", icon: CircleUserRound, run: () => onNavigate("about") },
      { label: "Contact", hint: "Open communications", icon: Mail, run: () => onNavigate("contact") },
      { label: "Recruiter mode", hint: "Open condensed professional view", icon: UserRoundSearch, run: onRecruiter },
      {
        label: "View résumé",
        hint: "Open résumé document",
        icon: FileText,
        run: () => window.open("/anubhav-resume.pdf", "_blank", "noopener,noreferrer"),
      },
    ],
    [onNavigate, onRecruiter]
  );

  const filtered = actions.filter((action) =>
    `${action.label} ${action.hint}`.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setSelectedIndex(0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setSelectedIndex((current) =>
          Math.min(current + 1, Math.max(filtered.length - 1, 0))
        );
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setSelectedIndex((current) => Math.max(current - 1, 0));
      }
      if (event.key === "Enter" && filtered[selectedIndex]) {
        event.preventDefault();
        filtered[selectedIndex].run();
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filtered, onClose, open, selectedIndex]);

  useEffect(() => setSelectedIndex(0), [query]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search ANBV"
            initial={reduceMotion ? false : { opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-xl overflow-hidden rounded-xl border border-white/12 bg-[#0b0d10] shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
          >
            <label className="flex h-14 items-center gap-3 border-b border-white/10 px-4">
              <Search size={17} className="text-white/35" />
              <span className="sr-only">Search ANBV actions</span>
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search ANBV"
                className="min-w-0 flex-1 bg-transparent text-sm text-white/90 outline-none placeholder:text-white/25"
              />
              <kbd className="rounded border border-white/10 px-1.5 py-1 font-mono text-[9px] text-white/30">
                ESC
              </kbd>
            </label>

            <div className="max-h-[24rem] overflow-y-auto p-2">
              {filtered.length ? (
                filtered.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={action.label}
                      type="button"
                      onMouseEnter={() => setSelectedIndex(index)}
                      onClick={() => {
                        action.run();
                        onClose();
                      }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                        selectedIndex === index
                          ? "bg-white/[0.07] text-white"
                          : "text-white/60 hover:bg-white/[0.04]"
                      }`}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-black/25">
                        <Icon size={15} strokeWidth={1.5} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm">{action.label}</span>
                        <span className="mt-0.5 block truncate font-mono text-[10px] text-white/30">
                          {action.hint}
                        </span>
                      </span>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-10 text-center font-mono text-xs text-white/35">
                  No matching module
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
