"use client";

import {
  ArrowLeft,
  ArrowUpRight,
  Download,
  Mail,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import {
  education,
  experience,
  links,
  profile,
  projects,
  skillGroups,
} from "@/data/portfolio";

export function RecruiterMode({ onEnterAnbv }: { onEnterAnbv: () => void }) {
  return (
    <div className="min-h-svh bg-[#08090b] text-white">
      <header className="sticky top-0 z-40 border-b border-white/[0.08] bg-[#08090b]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-5 sm:px-8">
          <button
            type="button"
            onClick={onEnterAnbv}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-white"
          >
            <ArrowLeft size={14} /> ANBV
          </button>
          <span className="hidden h-4 w-px bg-white/10 sm:block" />
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-200/55 sm:block">
            Recruiter mode
          </span>
          <div className="ml-auto flex items-center gap-2">
            <a href={links.resume} target="_blank" rel="noreferrer" className="anbv-action">
              View résumé <ArrowUpRight size={13} />
            </a>
            <a
              href={links.resume}
              download
              className="anbv-action anbv-action-primary hidden sm:inline-flex"
            >
              Download <Download size={13} />
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <section className="grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[1.35fr_0.65fr]">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200/50">
              Candidate profile
            </div>
            <h1 className="mt-4 text-4xl font-medium tracking-[-0.05em] sm:text-5xl">
              {profile.name}
            </h1>
            <div className="mt-4 text-sm text-white/52 sm:text-base">{profile.role}</div>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/62">
              {profile.summary}
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-white/45">
              {profile.philosophy}
            </p>
          </div>
          <aside className="anbv-panel self-end p-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/28">
              Availability
            </div>
            <p className="mt-3 text-sm leading-6 text-white/58">{profile.availability}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a href={links.email} className="anbv-action anbv-action-primary">
                <Mail size={13} /> Email
              </a>
              <a href={links.github} target="_blank" rel="noreferrer" className="anbv-action">
                <FaGithub size={13} /> GitHub
              </a>
            </div>
          </aside>
        </section>

        <section className="border-b border-white/10 py-10" id="recruiter-experience">
          <SectionHeading index="01" title="Experience" />
          <div className="mt-7 space-y-8">
            {experience.map((item) => (
              <article key={item.title} className="grid gap-3 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.12em] text-emerald-200/45">
                  {item.period}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white/85">{item.title}</h3>
                  <div className="mt-1 text-sm text-white/42">{item.organization}</div>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-white/55">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-emerald-300/55" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-white/10 py-10" id="recruiter-projects">
          <SectionHeading index="02" title="Selected projects" />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <article key={project.title} className="anbv-panel flex flex-col p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.15em] text-emerald-200/45">
                    {project.type}
                  </div>
                  <span className="font-mono text-[9px] text-white/20">{project.number}</span>
                </div>
                <h3 className="mt-4 text-xl font-medium tracking-[-0.03em]">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/52">{project.overview}</p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {project.stack.slice(0, 7).map((technology) => (
                    <span key={technology} className="anbv-tag">{technology}</span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm text-white/48 transition-colors hover:text-white"
                >
                  Inspect source <ArrowUpRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-white/10 py-10" id="recruiter-stack">
          <SectionHeading index="03" title="Technical stack" />
          <div className="mt-7 grid gap-px bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="bg-[#08090b] p-5">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/55">
                  {group.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-white/45">{group.items.join(" · ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <SectionHeading index="04" title="Education" />
            <div className="mt-7 space-y-6">
              {education.map((item) => (
                <article key={item.degree}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-medium text-white/78">{item.degree}</h3>
                    <span className="font-mono text-[10px] text-emerald-200/40">{item.period}</span>
                  </div>
                  <div className="mt-1 text-sm text-white/42">{item.institute}</div>
                  <p className="mt-2 text-sm leading-6 text-white/48">{item.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div>
            <SectionHeading index="05" title="Contact" />
            <div className="mt-7 space-y-3 text-sm">
              <a href={links.email} className="block text-white/55 hover:text-white">{links.emailLabel}</a>
              <a href={links.github} target="_blank" rel="noreferrer" className="block text-white/55 hover:text-white">github.com/anbv29</a>
              <a href={links.x} target="_blank" rel="noreferrer" className="block text-white/55 hover:text-white">{links.xLabel} on X</a>
              <a href={links.instagram} target="_blank" rel="noreferrer" className="block text-white/55 hover:text-white">{links.instagramLabel} on Instagram</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-[10px] text-emerald-200/45">{index}</span>
      <span className="h-px w-6 bg-white/15" />
      <h2 className="text-xl font-medium tracking-[-0.03em] text-white/85 sm:text-2xl">
        {title}
      </h2>
    </div>
  );
}
