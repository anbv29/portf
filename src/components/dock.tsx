"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Briefcase, Code2, Home, Layers, Mail } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSmoothScroll } from "@/components/smooth-scroll";
import { motion, useReducedMotion } from "framer-motion";

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
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState("top");

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.15, 0.4] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 sm:bottom-5 sm:px-4">
      <nav
        className="glass-card pointer-events-auto flex max-w-full items-center gap-1 overflow-x-auto rounded-2xl p-1.5 sm:p-2 shadow-[0_18px_60px_rgba(0,0,0,0.65)]"
        aria-label="Primary"
      >
        {items.map((it) => {
          const Icon = it.icon;
          const active = activeId === it.id;
          return (
            <a
              key={it.id}
              href={it.href}
              onClick={(e) => {
                e.preventDefault();
                setActiveId(it.id);
                scrollTo(it.href, { offset: -8 });
              }}
              aria-current={active ? "page" : undefined}
              className={cn(
                "group relative flex h-9 shrink-0 items-center justify-center overflow-hidden rounded-xl px-2.5 sm:h-10 sm:px-3",
                "transition-[color,transform] duration-300 active:scale-[0.98]",
                active ? "text-white" : "text-white/70 hover:text-white"
              )}
            >
              {active && (
                <motion.span
                  layoutId="dock-active"
                  className="absolute inset-0 rounded-xl border border-white/10 bg-white/[0.08]"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 320, damping: 30 }
                  }
                />
              )}
              <div className="relative z-10 flex items-center gap-2">
                <Icon
                  size={17}
                  strokeWidth={active ? 1.9 : 1.5}
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                <span
                  className={cn(
                    "hidden overflow-hidden whitespace-nowrap text-[12px] tracking-tight transition-[max-width,opacity,transform] duration-500 sm:inline-block",
                    active
                      ? "max-w-[120px] translate-x-0 opacity-100"
                      : "max-w-0 -translate-x-1 opacity-0 group-hover:max-w-[120px] group-hover:translate-x-0 group-hover:opacity-100"
                  )}
                >
                  {it.label}
                </span>
              </div>
              <span className="pointer-events-none fixed bottom-[4.65rem] left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-2 py-1 text-[11px] tracking-tight text-white/70 opacity-0 backdrop-blur-xl transition-opacity group-hover:opacity-100 max-sm:group-hover:block">
                {it.label}
              </span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

