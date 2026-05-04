"use client";

import Lenis from "lenis";
import React, { createContext, useContext, useEffect, useMemo, useRef } from "react";

type LenisContextValue = {
  scrollTo: (
    target: Parameters<Lenis["scrollTo"]>[0] | HTMLElement,
    opts?: { offset?: number }
  ) => void;
};

const LenisContext = createContext<LenisContextValue | null>(null);

export function useSmoothScroll() {
  const ctx = useContext(LenisContext);
  if (!ctx) {
    return {
      scrollTo: (target: string | number | HTMLElement) => {
        if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
        else if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else target.scrollIntoView({ behavior: "smooth", block: "start" });
      },
    } satisfies LenisContextValue;
  }
  return ctx;
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.12,
      wheelMultiplier: 0.9,
      touchMultiplier: 0.85,
    });

    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const value = useMemo<LenisContextValue>(() => {
    return {
      scrollTo: (target, opts) => {
        const offset = opts?.offset ?? 0;
        const l = lenisRef.current;
        if (!l) {
          if (typeof target === "number")
            window.scrollTo({ top: target + offset, behavior: "smooth" });
          else if (typeof target === "string") {
            const el = document.querySelector(target);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          } else target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        l.scrollTo(target as Parameters<Lenis["scrollTo"]>[0], { offset });
      },
    };
  }, []);

  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>;
}

