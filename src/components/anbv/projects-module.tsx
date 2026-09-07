"use client";

import { ArrowRight, ExternalLink, GitFork } from "lucide-react";
import { useState } from "react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/cn";

export function ProjectsModule() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const project = projects[selectedIndex];

  return (
    <div className="grid min-h-full lg:grid-cols-[19rem_minmax(0,1fr)]">
      <aside className="border-b border-white/[0.08] lg:border-b-0 lg:border-r">
        <div className="border-b border-white/[0.08] px-5 py-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200/50">
            Service monitor
          </div>
          <h1 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white">
            Projects
          </h1>
          <p className="mt-2 text-sm leading-6 text-white/40">
            Select a service to inspect its engineering record.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px bg-white/[0.08] sm:grid-cols-4 lg:grid-cols-1">
          {projects.map((item, index) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "group relative min-h-24 bg-[#0b0d10] px-4 py-4 text-left transition-colors hover:bg-white/[0.035] sm:px-5",
                selectedIndex === index && "bg-white/[0.05]"
              )}
              aria-pressed={selectedIndex === index}
            >
              {selectedIndex === index && (
                <span className="absolute inset-y-0 left-0 w-px bg-emerald-300/70" />
              )}
              <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.15em] text-white/28">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/60" />
                service {item.number}
              </div>
              <div className="mt-2 text-sm font-medium tracking-wide text-white/70 group-hover:text-white">
                {item.title}
              </div>
              <div className="mt-1 truncate text-[11px] text-white/32">{item.type}</div>
            </button>
          ))}
        </div>
      </aside>

      <article key={project.title} className="min-w-0">
        <header className="border-b border-white/[0.08] px-5 py-7 sm:px-8 sm:py-9">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
                Project / {project.number}
              </div>
              <h2 className="mt-3 text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl">
                {project.title}
              </h2>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-200/55">
                {project.type}
              </div>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="anbv-action"
            >
              <GitFork size={14} /> Source <ExternalLink size={13} />
            </a>
          </div>
          <p className="mt-6 max-w-3xl text-base leading-8 text-white/58">
            {project.overview}
          </p>
        </header>

        <section className="border-b border-white/[0.08] p-5 sm:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            Architecture trace
          </div>
          <div className="mt-5 flex flex-col gap-2 md:flex-row md:items-center">
            {project.architecture.map((node, index) => (
              <div key={node} className="contents">
                <div className="anbv-node flex-1">{node}</div>
                {index < project.architecture.length - 1 && (
                  <ArrowRight
                    size={14}
                    className="data-flow-arrow mx-auto rotate-90 text-emerald-300/35 md:rotate-0"
                  />
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="grid gap-px bg-white/[0.08] xl:grid-cols-[1.4fr_0.6fr]">
          <section className="bg-[#0b0d10] p-5 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
              Engineering record
            </div>
            <ol className="mt-3 divide-y divide-white/[0.08]">
              {project.highlights.map((highlight, index) => (
                <li key={highlight} className="grid grid-cols-[2rem_1fr] gap-3 py-5">
                  <span className="font-mono text-[10px] text-emerald-200/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-7 text-white/55">{highlight}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="bg-[#0b0d10] p-5 sm:p-8">
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
              Technical stack
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((technology) => (
                <span key={technology} className="anbv-tag">
                  {technology}
                </span>
              ))}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
