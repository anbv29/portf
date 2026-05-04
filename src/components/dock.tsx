"use client";

import React from "react";
import { BookOpen, Briefcase, Code2, Home, Layers, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSmoothScroll } from "@/components/smooth-scroll";

const items = [
  { id: "top", label: "Home", icon: Home, href: "#top" },
  { id: "skills", label: "Skills", icon: Code2, href: "#skills" },
  { id: "projects", label: "Projects", icon: Layers, href: "#projects" },
  { id: "experience", label: "Experience", icon: Briefcase, href: "#experience" },
  { id: "education", label: "Education", icon: BookOpen, href: "#education" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
] as const;

export function Dock() {
  const { scrollTo } = useSmoothScroll();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-5 sm:px-4">
      <nav
        className="glass-card pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl p-1.5 sm:p-2 shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
        aria-label="Primary"
      >
        {items.map((it) => {
          const Icon = it.icon;
          return (
            <a
              key={it.id}
              href={it.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(it.href, { offset: -8 });
              }}
              className={cn(
                "group relative flex h-9 shrink-0 items-center justify-center rounded-xl px-2.5 sm:h-10 sm:px-3 transition-[width,background,transform] duration-200",
                "hover:bg-white/6 active:scale-[0.98]"
              )}
            >
              <div className="flex items-center gap-2">
                <Icon size={17} strokeWidth={1.5} className="text-white/75" />
                <span className="hidden max-w-0 overflow-hidden text-[12px] tracking-tight text-white/70 transition-[max-width,opacity,transform] duration-200 group-hover:max-w-[120px] group-hover:opacity-100 group-hover:translate-x-0 opacity-0 -translate-x-1 sm:inline-block">
                  {it.label}
                </span>
              </div>
              <span className="pointer-events-none absolute -top-9 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/40 px-2 py-1 text-[11px] tracking-tight text-white/70 backdrop-blur-xl group-hover:block">
                {it.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

