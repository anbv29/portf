"use client";

import { GitCommitHorizontal, GitFork } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type ActivityDay = {
  date: string;
  count: number;
};

type ActivityResponse = {
  username: string;
  days: ActivityDay[];
  total: number;
  stale?: boolean;
};

const RETRY_DELAYS = [0, 1_200, 3_000] as const;
const STORAGE_KEY = "anbv29-github-activity";
const BACKGROUND_RETRY_DELAY = 15_000;

function wait(milliseconds: number) {
  return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
}

function formatDate(date: string, includeYear = false) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(includeYear ? { year: "numeric" } : {}),
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}

function activityClass(count: number) {
  if (count === 0) {
    return "border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.07]";
  }
  if (count <= 2) {
    return "border-emerald-400/20 bg-emerald-400/20 hover:border-emerald-300/45 hover:bg-emerald-400/30";
  }
  if (count <= 5) {
    return "border-emerald-400/30 bg-emerald-400/40 hover:border-emerald-300/60 hover:bg-emerald-400/50";
  }
  if (count <= 9) {
    return "border-emerald-300/40 bg-emerald-400/60 hover:border-emerald-200/70 hover:bg-emerald-300/70";
  }

  return "border-emerald-200/60 bg-emerald-300/85 shadow-[0_0_16px_rgba(52,211,153,0.24)] hover:bg-emerald-200";
}

function tooltipPosition(index: number) {
  const column = index % 10;
  if (column === 0) return "left-0";
  if (column === 9) return "right-0";
  return "left-1/2 -translate-x-1/2";
}

export function GithubActivity() {
  const [activity, setActivity] = useState<ActivityResponse | null>(null);
  const [hasError, setHasError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let retryTimer: number | undefined;

    try {
      const cached = window.localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as ActivityResponse;
        if (parsed.days?.length === 20) {
          setActivity({ ...parsed, stale: true });
        }
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }

    async function loadActivity() {
      for (let attempt = 0; attempt < RETRY_DELAYS.length; attempt += 1) {
        try {
          if (RETRY_DELAYS[attempt] > 0) {
            await wait(RETRY_DELAYS[attempt]);
          }

          const response = await fetch(
            `/api/github-activity?v=4&attempt=${attempt + 1}`,
            {
              cache: "no-store",
              headers: { Accept: "application/json" },
              signal: controller.signal,
            }
          );

          if (!response.ok) throw new Error("GitHub activity unavailable");

          const data = (await response.json()) as ActivityResponse;
          if (
            data.days.length !== 20 ||
            data.days.some(
              (day) => !Number.isFinite(day.count) || day.count < 0
            )
          ) {
            throw new Error("Invalid activity data");
          }

          setActivity({
            ...data,
            total: data.days.reduce((sum, day) => sum + day.count, 0),
          });
          window.localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({
              ...data,
              stale: false,
              total: data.days.reduce((sum, day) => sum + day.count, 0),
            })
          );
          setHasError(false);
          return;
        } catch (error) {
          if ((error as Error).name === "AbortError") return;
        }
      }

      setHasError(true);
      retryTimer = window.setTimeout(
        () => setRefreshKey((current) => current + 1),
        BACKGROUND_RETRY_DELAY
      );
    }

    void loadActivity();
    return () => {
      controller.abort();
      if (retryTimer) window.clearTimeout(retryTimer);
    };
  }, [refreshKey]);

  const dateRange = useMemo(() => {
    if (!activity) return "Latest public activity";
    const range = `${formatDate(activity.days[0].date)} - ${formatDate(
      activity.days.at(-1)!.date,
      true
    )}`;
    return activity.stale ? `${range} · cached` : range;
  }, [activity]);

  return (
    <section
      aria-labelledby="github-activity-title"
      className="glass-card rounded-2xl p-4 text-left shadow-[0_20px_70px_rgba(0,0,0,0.32)] sm:p-5"
    >
      <div className="relative z-[1] flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="min-w-0 sm:max-w-[17rem]">
          <a
            href="https://github.com/anbv29"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 text-sm font-medium tracking-tight text-white/85 transition-colors hover:text-white"
          >
            <GitFork size={17} strokeWidth={1.6} />
            <span id="github-activity-title">GitHub activity</span>
            <span className="text-white/35 transition-transform group-hover:translate-x-0.5">
              ↗
            </span>
          </a>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-mono text-2xl font-medium tabular-nums tracking-[-0.04em] text-white">
              {activity ? activity.total : hasError ? "—" : "···"}
            </span>
            <span className="text-xs tracking-tight text-white/45">
              public commits / 20 days
            </span>
          </div>

          <div className="mt-1 text-xs tracking-tight text-white/35">
            {hasError && !activity ? (
              <button
                type="button"
                onClick={() => {
                  setHasError(false);
                  setRefreshKey((current) => current + 1);
                }}
                className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white/65"
              >
                Couldn&apos;t reach GitHub · retry
              </button>
            ) : (
              dateRange
            )}
          </div>
        </div>

        <div className="min-w-0 flex-1 sm:max-w-[31rem]">
          <ol
            className="grid grid-cols-10 gap-1.5 sm:gap-2"
            aria-label="Public GitHub commits for the last 20 days"
          >
            {activity
              ? activity.days.map((day, index) => (
                  <li key={day.date} className="group relative min-w-0">
                    <button
                      type="button"
                      className={`block aspect-square w-full rounded-[0.34rem] border transition duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${activityClass(
                        day.count
                      )}`}
                      aria-label={`${day.count} ${
                        day.count === 1 ? "contribution" : "contributions"
                      } on ${formatDate(day.date, true)}`}
                    />
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute bottom-[calc(100%+0.55rem)] z-30 w-max translate-y-1 rounded-lg border border-white/10 bg-black/90 px-2.5 py-2 text-center opacity-0 shadow-2xl backdrop-blur-xl transition duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 ${tooltipPosition(
                        index
                      )}`}
                    >
                      <span className="block text-xs font-medium text-white/90">
                        {day.count}{" "}
                        {day.count === 1 ? "contribution" : "contributions"}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-white/45">
                        {formatDate(day.date, true)}
                      </span>
                    </span>
                  </li>
                ))
              : Array.from({ length: 20 }, (_, index) => (
                  <li
                    key={index}
                    className={`aspect-square rounded-[0.34rem] border border-white/10 bg-white/[0.035] ${
                      hasError ? "" : "animate-pulse"
                    }`}
                    aria-hidden="true"
                  />
                ))}
          </ol>

          <div className="mt-2.5 flex items-center justify-between text-[11px] tracking-tight text-white/35">
            <span>20 days ago</span>
            <span className="inline-flex items-center gap-1.5">
              <GitCommitHorizontal size={13} strokeWidth={1.5} />
              Today
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
