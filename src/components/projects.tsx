"use client";

import Image from "next/image";
import { ExternalLink, GitFork } from "lucide-react";
import { Reveal, Stagger } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

const projects = [
  {
    title: "Throttle",
    blurb: "a multi-tenant, event-driven document intelligence platform with asynchronous PDF ingestion, OCR, document classification, and schema-driven structured data extraction using React, Node.js/Fastify, Python/FastAPI, PostgreSQL, Redis, and BullMQ.",
    tags: ["Next.js", "TypeScript", "MongoDB"],
    span: "md:col-span-7",
    image: "/images/campus.png",
  },
  {
    title: "SkillForge LMS",
    blurb: "A learning platform with authentication, progress analytics, and structured course modules.",
    tags: ["React", "Node.js", "JWT"],
    span: "md:col-span-5",
    image: "/images/skillforge.png",
  },
  {
    title: "Algo Visualizer",
    blurb: "Interactive visualizations for sorting and graph algorithms with real-time state transitions.",
    tags: ["JavaScript", "Data Structures", "UI"],
    span: "md:col-span-5",
    image: "/images/algo.png",
  },
  {
    title: "Portfolio Engine",
    blurb: "A performance-focused personal site with premium motion and reusable section architecture.",
    tags: ["Framer Motion", "Tailwind", "App Router"],
    span: "md:col-span-7",
    image: "/images/portfolio.png",
  },
] as const;

export function Projects() {
  return (
    <section id="projects" className="relative w-full py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Stagger>
          <Reveal>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="text-[12px] tracking-tight text-white/55">
                  Selected work
                </div>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                  Selected student projects
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 tracking-tight text-white/55">
                  Projects focused on product utility, clean architecture, and
                  production-style UI implementation.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] tracking-tight text-white/70 transition-colors hover:text-white"
                  href="#"
                >
                  <GitFork size={16} strokeWidth={1.5} />
                  GitHub
                </a>
                <a
                  className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] tracking-tight text-white/70 transition-colors hover:text-white"
                  href="#"
                >
                  <ExternalLink size={16} strokeWidth={1.5} />
                  Resume
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
            {projects.map((p) => (
              <Reveal key={p.title} className={p.span}>
                <TiltCard className="glass-card h-full rounded-3xl p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-4 sm:gap-6">
                    <div className="min-w-0">
                      <div className="text-[12px] tracking-tight text-white/55">
                        Case study
                      </div>
                      <div className="mt-3 text-lg font-medium tracking-tight text-white/85 sm:text-xl">
                        {p.title}
                      </div>
                      <div className="mt-2 text-sm leading-6 tracking-tight text-white/55">
                        {p.blurb}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[12px] tracking-tight text-white/60"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="group mt-8 relative overflow-hidden rounded-2xl border border-white/10 h-[120px] sm:h-[160px]">
                    <Image src={p.image} alt={p.title} fill className="object-cover opacity-70 transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent mix-blend-overlay" />
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}

