"use client";

import {
  Boxes,
  BriefcaseBusiness,
  CircleUserRound,
  Code2,
  Cpu,
  Mail,
  TerminalSquare,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { ModuleId } from "@/data/portfolio";
import { cn } from "@/lib/cn";

const modules = [
  { id: "core", label: "Core", icon: Cpu },
  { id: "projects", label: "Projects", icon: Boxes },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "stack", label: "Stack", icon: Code2 },
  { id: "terminal", label: "Terminal", icon: TerminalSquare },
  { id: "about", label: "About", icon: CircleUserRound },
  { id: "contact", label: "Contact", icon: Mail },
] as const;

export const moduleItems = modules;

export function ApplicationDock({
  active,
  onSelect,
}: {
  active: ModuleId;
  onSelect: (module: ModuleId) => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="ANBV applications"
      className="fixed inset-x-3 bottom-3 z-40 flex justify-center lg:inset-y-0 lg:left-5 lg:right-auto lg:items-center"
    >
      <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-[#0b0d10]/92 p-1.5 shadow-2xl backdrop-blur-xl lg:flex-col lg:overflow-visible">
        {modules.map((item) => {
          const Icon = item.icon;
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item.id)}
              aria-label={`Open ${item.label}`}
              aria-pressed={selected}
              className={cn(
                "group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white/40 transition-colors hover:text-white/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/50",
                selected && "text-emerald-200"
              )}
            >
              {selected && (
                <motion.span
                  layoutId="anbv-dock-selection"
                  className="absolute inset-0 rounded-lg border border-emerald-300/20 bg-emerald-300/[0.08]"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 350, damping: 30 }
                  }
                />
              )}
              <Icon className="relative z-10" size={17} strokeWidth={1.5} />
              <span className="pointer-events-none absolute bottom-[calc(100%+0.55rem)] left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded border border-white/10 bg-black/90 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/65 group-hover:block lg:bottom-auto lg:left-[calc(100%+0.6rem)] lg:top-1/2 lg:-translate-x-0 lg:-translate-y-1/2">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
