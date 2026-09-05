"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useMemo, useRef } from "react";
import { Reveal, Stagger } from "@/components/reveal";
import { SiteStats } from "@/components/site-stats";
import { GithubActivity } from "@/components/github-activity";

function MaskReveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="inline-block overflow-hidden align-top">
      <motion.span
        initial={{ y: "110%", filter: "blur(10px)", opacity: 0 }}
        animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
        className="inline-block"
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.55], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.6], [22, 0]);

  const headline = useMemo(
    () => (
      <>
        <MaskReveal>Anubhav</MaskReveal>{" "}
        <MaskReveal delay={0.06}>Pandey</MaskReveal>{" "}
        <MaskReveal delay={0.12}>builds</MaskReveal>{" "}
        <MaskReveal delay={0.18}>digital</MaskReveal>{" "}
        <MaskReveal delay={0.24}>
          <span className="text-white/90">experiences</span>
        </MaskReveal>
        <span className="text-white/40">.</span>
      </>
    ),
    []
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-[100svh] w-full overflow-hidden"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-5 pt-28 sm:px-8">
        <Stagger className="text-center">
          <Reveal>
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[12px] tracking-tight text-white/70 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
              Your Friendly Neighborhood Developer
            </div>
          </Reveal>

          <Reveal>
            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
              {headline}
            </h1>
          </Reveal>

          <Reveal>
            <p className="mx-auto mt-5 max-w-2xl text-pretty text-[15px] leading-7 tracking-tight text-white/60 sm:text-[16px]">
              I am Anubhav Pandey, a full-stack developer and open-source contributor who builds scalable web applications alongside resilient cloud infrastructure.
            </p>
          </Reveal>

          <Reveal>
            <p className="mx-auto mt-3 max-w-3xl text-pretty text-sm leading-7 tracking-tight text-white/50 sm:text-[15px]">
              From crafting polished frontends to orchestrating automated, containerized deployments, I bridge the gap between product engineering and modern DevOps to deliver highly reliable software.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
              {[
                "Full-Stack Web Development",
                "DevOps & Infrastructure",
                "Docker / Kubernetes",
                "System Architecture",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[12px] tracking-tight text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal className="mx-auto mt-8 w-full max-w-5xl">
            <GithubActivity />
          </Reveal>
        </Stagger>

        <motion.div
          style={{ scale, y }}
          className="mt-5 w-full"
          aria-hidden="true"
        >
          <div className="glass-card mx-auto grid w-full max-w-5xl grid-cols-12 gap-4 rounded-3xl p-4 sm:p-6">
            <div className="col-span-12 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-5 sm:col-span-7 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="text-[12px] tracking-tight text-white/60">
                  Flagship
                </div>
              </div>
              <div className="mt-6 text-lg font-medium tracking-tight text-white/85 sm:text-2xl">
                Student portfolio crafted with engineering precision
              </div>
              <div className="mt-2 text-sm leading-6 tracking-tight text-white/55">
                The portfolio you are viewing, built as a fast and responsive
                showcase for my work.
              </div>
              <div className="group relative mt-8 h-[220px] overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src="/images/portfolio-site.png"
                  alt="Preview of Anubhav Pandey's portfolio website"
                  fill
                  className="object-cover object-top opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Built with
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Next.js",
                      "React",
                      "TypeScript",
                      "Tailwind CSS",
                      "Framer Motion",
                      "Lenis",
                    ].map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/15 bg-black/60 px-2.5 py-1 text-[10px] tracking-tight text-white/75 backdrop-blur-md"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <SiteStats />
            </div>

            <div className="col-span-12 grid gap-4 sm:col-span-5">
              <div className="glass-card rounded-2xl p-5">
                <div className="text-[12px] tracking-tight text-white/60">
                  About
                </div>
                <div className="mt-3 text-sm leading-6 tracking-tight text-white/60">
                  I enjoy building clean, high-performance interfaces that solve
                  real user problems.
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <div className="text-[12px] tracking-tight text-white/60">
                  Focus
                </div>
                <div className="mt-3 text-sm leading-6 tracking-tight text-white/60">
                  Full-stack engineering, cloud infrastructure, container orchestration, and open-source collaboration.
                </div>
              </div>
              <div className="glass-card rounded-2xl p-5">
                <div className="text-[12px] tracking-tight text-white/60">
                  Snapshot
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-white/85">
                      15+
                    </div>
                    <div className="mt-1 text-[11px] tracking-tight text-white/50">
                      Projects built
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-white/85">
                      3+
                    </div>
                    <div className="mt-1 text-[11px] tracking-tight text-white/50">
                      Years coding
                    </div>
                  </div>
                  <div>
                    <div className="text-xl font-semibold tracking-tight text-white/85">
                      2026
                    </div>
                    <div className="mt-1 text-[11px] tracking-tight text-white/50">
                      Graduation
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

