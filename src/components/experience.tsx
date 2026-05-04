"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { Reveal, Stagger, springy } from "@/components/reveal";
import { cn } from "@/lib/cn";

const roles = [
  {
    title: "Google Summer of Code 2025 Contributor",
    org: "GSoC · Open Source",
    time: "May 2025 — Aug 2025",
    points: [
      "Selected as a GSoC 2025 contributor for an open-source organization.",
      "Contributing upstream patches, feature modules, and documentation improvements.",
      "Collaborating with global maintainers through code reviews and RFC discussions.",
    ],
  },
  {
    title: "Software Engineering Intern",
    org: "Atlassian",
    time: "Jan 2025 — Mar 2025",
    points: [
      "Worked on internal tooling and developer productivity platforms.",
      "Built scalable microservices and contributed to CI/CD pipeline enhancements.",
      "Collaborated with cross-functional teams in an agile environment.",
    ],
  },
  {
    title: "Full-Stack Developer",
    org: "Cluely",
    time: "Jun 2025 — Oct 2025",
    points: [
      "Developed AI-powered product features with React and Node.js.",
      "Shipped production-grade components with clean architecture and automated testing.",
      "Integrated third-party APIs and optimised end-to-end user flows.",
    ],
  },
  {
    title: "Software Developer",
    org: "Galvantrix",
    time: "Sep 2024 — Nov 2024",
    points: [
      "Built and maintained full-stack web applications for enterprise clients.",
      "Implemented Docker-based deployment workflows and automated staging environments.",
      "Contributed to internal design systems and reusable component libraries.",
    ],
  },
  {
    title: "Open-Source Contributor",
    org: "Cloud Native Computing Foundation (CNCF)",
    time: "Jun 2024 — Aug 2024",
    points: [
      "Contributing to CNCF ecosystem projects focused on cloud-native tooling.",
      "Participated in community discussions, issue triage, and documentation sprints.",
      "Building expertise in Kubernetes, Helm, and container orchestration.",
    ],
  },
  {
    title: "Final Year B.Tech Student",
    org: "Dr. B. R. Ambedkar National Institute of Technology, Jalandhar",
    time: "2022 — Present",
    points: [
      "Specializing in software development, data structures, and system design fundamentals.",
      "Building full-stack projects with modern React and backend technologies.",
      "Actively preparing for software engineering roles and internships.",
    ],
  },
  {
    title: "Technical Foundations",
    org: "Competitive Programming + Core CS",
    time: "2021 — Present",
    points: [
      "Practicing DSA regularly and applying problem-solving in real project decisions.",
      "Strengthening understanding of OOP, DBMS, OS, and computer networks.",
    ],
  },
] as const;

function TimelineItem({
  role,
}: {
  role: (typeof roles)[number];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { margin: "-30% 0px -55% 0px" });

  return (
    <div ref={ref} className="relative grid grid-cols-12 gap-4 py-10">
      <div className="col-span-12 sm:col-span-4">
        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={springy}
        >
          <div className="text-[12px] tracking-tight text-white/55">
            {role.time}
          </div>
          <div className="mt-2 text-base font-medium tracking-tight text-white/85">
            {role.title}
          </div>
          <div className="mt-1 text-sm tracking-tight text-white/55">
            {role.org}
          </div>
        </motion.div>
      </div>

      <div className="relative col-span-12 sm:col-span-8">
        <div className="absolute left-0 top-0 hidden h-full w-px bg-white/10 sm:block" />
        <div
          className={cn(
            "absolute left-0 top-10 hidden h-[calc(100%-2.5rem)] w-px sm:block",
            inView ? "bg-gradient-to-b from-white/40 via-white/20 to-white/5" : "bg-white/10"
          )}
        />
        <div
          className={cn(
            "absolute left-[-6px] top-9 hidden h-3 w-3 rounded-full border sm:block",
            inView
              ? "border-white/35 bg-white/20 shadow-[0_0_0_6px_rgba(255,255,255,0.06)]"
              : "border-white/15 bg-white/5"
          )}
        />

        <motion.div
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          variants={springy}
          className="glass-card rounded-3xl p-5 sm:ml-6 sm:p-6"
        >
          <div className="text-[12px] tracking-tight text-white/55">
            Impact
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 tracking-tight text-white/60">
            {role.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-[0.6rem] h-1 w-1 shrink-0 rounded-full",
                    inView ? "bg-white/60" : "bg-white/25"
                  )}
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section id="experience" className="relative w-full py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Stagger>
          <Reveal>
            <div>
              <div className="text-[12px] tracking-tight text-white/55">
                Experience
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                Education and growth timeline
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 tracking-tight text-white/55">
                My academic journey and practical engineering progress, mapped as
                a living timeline.
              </p>
            </div>
          </Reveal>

          <div className="mt-10">
            {roles.map((r) => (
              <TimelineItem key={r.title} role={r} />
            ))}
          </div>
        </Stagger>
      </div>
    </section>
  );
}

