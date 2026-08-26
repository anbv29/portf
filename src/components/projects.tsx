"use client";

import { ExternalLink, GitFork } from "lucide-react";
import { Reveal, Stagger } from "@/components/reveal";
import { TiltCard } from "@/components/tilt-card";

const projects = [
  {
    number: "01",
    title: "THROTTLE",
    github: "https://github.com/anbv29/Throttle",
    type: "Rate-limiting infrastructure",
    blurb:
      "A standalone, concurrency-safe rate-limiting service that gives teams configurable, per-client control over API traffic using Token Bucket and Sliding Window algorithms.",
    highlights: [
      "Designed RESTful APIs with persistent rate-limit state, PostgreSQL ACID transactions, row-level locking (SELECT ... FOR UPDATE), and atomic updates to prevent race conditions during concurrent requests.",
      "Built an interactive real-time monitoring and load-testing dashboard for request analytics, ALLOW/DENY decisions, client configuration, and high-concurrency traffic simulation.",
      "Developed a reusable API integration and middleware pattern that lets applications and microservices enforce centralized limits and return HTTP 429 Too Many Requests responses.",
    ],
    stack: [
      "PERN Stack",
      "PostgreSQL",
      "Express.js",
      "React.js",
      "Node.js",
      "REST APIs",
      "Token Bucket",
      "Sliding Window",
      "ACID Transactions",
      "Row-level Locking",
      "Atomic Operations",
      "Load Testing",
      "Microservices",
      "Middleware",
      "HTTP 429",
      "Real-time Monitoring",
    ],
  },
  {
    number: "02",
    title: "FINORA",
    github: "https://github.com/anbv29/Finora",
    type: "Document intelligence platform",
    blurb:
      "A multi-tenant, event-driven platform that turns unstructured PDFs into searchable, structured intelligence through asynchronous ingestion, OCR, classification, extraction, and grounded AI responses.",
    highlights: [
      "Engineered an asynchronous processing pipeline with React, Node.js/Fastify, Python/FastAPI, PostgreSQL, Redis, and BullMQ for PDF ingestion, OCR, document classification, and schema-driven data extraction.",
      "Implemented a Retrieval-Augmented Generation (RAG) pipeline using document chunking, vector embeddings, pgvector, semantic search, and LLM-based grounded responses with source citations.",
      "Designed secure REST APIs with JWT authentication, refresh-token rotation, RBAC, tenant isolation, idempotent background jobs, retries, WebSocket updates, and Dockerized multi-service deployment.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Fastify",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "BullMQ",
      "Docker",
      "REST APIs",
      "WebSockets",
      "OCR",
      "RAG",
      "LLMs",
      "JWT",
      "RBAC",
    ],
  },
  {
    number: "03",
    title: "NION",
    github: "https://github.com/anbv29/Nion",
    type: "Developer analytics platform",
    blurb:
      "A GitHub analytics platform that turns a developer's yearly activity into meaningful insights and a premium, customizable card built to download and share.",
    highlights: [
      "Built a dedicated analytics layer over GitHub's GraphQL API to evaluate commits, pull requests, issues, repositories, languages, contribution streaks, and productivity patterns across a developer's year.",
      "Derived project-level insights including Most Worked On, Longest-Running Build, Hidden Gem, Lost Momentum, and Comeback Project by analyzing contribution history, consistency, stars, and engagement.",
      "Designed a cache-first architecture with Upstash Redis to reduce API calls and handle GitHub rate limits, with server-side image generation using @vercel/og and Satori for downloadable social cards without a headless browser.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GitHub GraphQL API",
      "GitHub OAuth",
      "Auth.js",
      "Upstash Redis",
      "PostgreSQL",
      "Prisma / Drizzle",
      "@vercel/og",
      "Satori",
      "Vercel",
      "Server-side Rendering",
      "Data Analytics",
    ],
  },
  {
    number: "04",
    title: "MYDAY",
    github: "https://github.com/anbv29/Myday",
    type: "Public date marketplace",
    blurb:
      "A public date-claiming platform where people turn meaningful dates into shareable digital landmarks through competitive outbidding, public profiles, and a global leaderboard.",
    highlights: [
      "Engineered a race-condition-safe claim and outbid system with transaction-protected ownership updates, real-time public activity, claim history, unique profiles, and leaderboard rankings.",
      "Integrated Razorpay and Stripe for regional and international payments with server-verified webhooks, idempotency protection, strict authorization, row-level security, and abuse prevention.",
      "Designed a Cloudflare-ready architecture with Pinecone-powered semantic discovery, Redis caching and distributed rate limiting, plus product analytics and production monitoring through PostHog and Sentry.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Clerk",
      "Upstash Redis",
      "Cloudflare",
      "Razorpay",
      "Stripe",
      "Pinecone",
      "PostHog",
      "Sentry",
      "Row-level Security",
      "Distributed Rate Limiting",
    ],
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
                  Systems built beyond the interface
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-6 tracking-tight text-white/55">
                  Production-minded projects spanning distributed backend
                  systems, concurrency control, asynchronous processing,
                  developer analytics, and AI-powered user experiences.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] tracking-tight text-white/70 transition-colors hover:text-white"
                  href="https://github.com/anbv29"
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitFork size={16} strokeWidth={1.5} />
                  GitHub
                </a>
                <a
                  className="glass-card inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] tracking-tight text-white/70 transition-colors hover:text-white"
                  href="/anubhav-resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ExternalLink size={16} strokeWidth={1.5} />
                  Resume
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-5">
            {projects.map((project) => (
              <Reveal key={project.title}>
                <TiltCard
                  className="glass-card h-full rounded-3xl p-5 sm:p-7 lg:p-8"
                  maxTilt={3}
                >
                  <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-12">
                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-white/45">
                        <span>{project.number}</span>
                        <span className="h-px w-7 bg-white/15" />
                        <span>{project.type}</span>
                      </div>

                      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                        {project.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 tracking-tight text-white/60">
                        {project.blurb}
                      </p>

                      <a
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-[12px] tracking-tight text-white/70 transition-colors hover:border-white/20 hover:text-white"
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <GitFork size={15} strokeWidth={1.5} />
                        View on GitHub
                      </a>

                      <div className="mt-7 border-t border-white/10 pt-5">
                        <div className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                          Technology stack
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.stack.map((technology) => (
                            <span
                              key={technology}
                              className="rounded-full border border-white/10 bg-white/[0.035] px-2.5 py-1 text-[11px] tracking-tight text-white/65"
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-white/10 pt-7 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-white/40">
                        Engineering highlights
                      </div>
                      <ul className="mt-1 divide-y divide-white/10">
                        {project.highlights.map((highlight, index) => (
                          <li
                            key={highlight}
                            className="grid grid-cols-[2rem_1fr] gap-2 py-5 text-sm leading-7 tracking-tight text-white/60 first:pt-4 last:pb-0"
                          >
                            <span className="font-mono text-[11px] text-white/35">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
