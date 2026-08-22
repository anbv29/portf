"use client";

import { Clock3, Users } from "lucide-react";
import { useEffect, useState } from "react";

const SESSION_VISIT_KEY = "portfolio-visit-counted";

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return [hours, minutes, seconds]
      .map((value) => String(value).padStart(2, "0"))
      .join(":");
  }

  return [minutes, seconds]
    .map((value) => String(value).padStart(2, "0"))
    .join(":");
}

export function SiteStats() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const readVisitorCount = async (registerVisit = false) => {
      try {
        const response = await fetch("/api/visitors", {
          method: registerVisit ? "POST" : "GET",
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Visitor counter unavailable");

        const data = (await response.json()) as { count: number };
        if (isMounted) setVisitorCount(data.count);
      } catch {
        if (registerVisit) sessionStorage.removeItem(SESSION_VISIT_KEY);
      }
    };

    const alreadyCounted = sessionStorage.getItem(SESSION_VISIT_KEY) === "true";
    if (!alreadyCounted) sessionStorage.setItem(SESSION_VISIT_KEY, "true");

    void readVisitorCount(!alreadyCounted);
    const refreshInterval = window.setInterval(
      () => void readVisitorCount(),
      15_000
    );

    return () => {
      isMounted = false;
      window.clearInterval(refreshInterval);
    };
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        setElapsedSeconds((current) => current + 1);
      }
    }, 1_000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
          <Users size={13} strokeWidth={1.5} />
          Visitors
        </div>
        <div className="mt-2 font-mono text-lg font-medium tabular-nums tracking-tight text-white/80">
          {visitorCount === null ? "—" : visitorCount.toLocaleString()}
        </div>
        <div className="mt-1 text-[10px] tracking-tight text-white/35">
          Total visits
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/35 p-4 backdrop-blur-md">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-white/45">
          <Clock3 size={13} strokeWidth={1.5} />
          Time here
        </div>
        <div className="mt-2 font-mono text-lg font-medium tabular-nums tracking-tight text-white/80">
          {formatDuration(elapsedSeconds)}
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[10px] tracking-tight text-white/35">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400/70" />
          Live session
        </div>
      </div>
    </div>
  );
}
