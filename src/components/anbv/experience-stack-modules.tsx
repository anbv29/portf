import { ChevronDown, Code2 } from "lucide-react";
import { education, experience, skillGroups } from "@/data/portfolio";

export function ExperienceModule() {
  return (
    <div>
      <header className="border-b border-white/[0.08] px-5 py-7 sm:px-8 sm:py-9">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/50">
          Experience records
        </div>
        <h1 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
          System timeline
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
          Professional work, academic progression, and technical foundations.
        </p>
      </header>

      <div className="p-5 sm:p-8">
        <div className="relative ml-2 border-l border-white/10 pl-5 sm:ml-5 sm:pl-8">
          {experience.map((item, index) => (
            <details
              key={item.title}
              open={index === 0}
              className="group relative border-b border-white/[0.08] py-6 last:border-b-0"
            >
              <span className="absolute -left-[1.57rem] top-8 h-2 w-2 rounded-full border border-emerald-200/35 bg-[#0b0d10] shadow-[0_0_0_5px_rgba(52,211,153,0.04)] sm:-left-[2.29rem]" />
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/30 [&::-webkit-details-marker]:hidden">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-200/45">
                    {item.period}
                  </div>
                  <h2 className="mt-2 text-lg font-medium text-white/82 sm:text-xl">
                    {item.title}
                  </h2>
                  <div className="mt-1 text-sm text-white/42">{item.organization}</div>
                </div>
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-white/10 text-white/35 transition-transform group-open:rotate-180">
                  <ChevronDown size={14} />
                </span>
              </summary>
              <ul className="mt-5 space-y-3 border-l border-white/[0.08] pl-4 text-sm leading-7 text-white/52 sm:pl-5">
                {item.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>

        <section className="mt-8 border-t border-white/[0.08] pt-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            Education archive
          </div>
          <div className="mt-5 grid gap-px bg-white/[0.08] md:grid-cols-3">
            {education.map((item) => (
              <article key={item.degree} className="bg-[#0b0d10] p-5">
                <div className="font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-200/40">
                  {item.period}
                </div>
                <h3 className="mt-3 text-base font-medium text-white/78">{item.degree}</h3>
                <p className="mt-2 text-sm leading-6 text-white/42">{item.institute}</p>
                <p className="mt-4 text-sm leading-6 text-white/48">{item.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export function StackModule() {
  return (
    <div>
      <header className="border-b border-white/[0.08] px-5 py-7 sm:px-8 sm:py-9">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/50">
          Technical registry
        </div>
        <h1 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
          Engineering stack
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45 sm:text-base sm:leading-7">
          Tools and systems used across product engineering, infrastructure, and computer science.
        </p>
      </header>

      <div className="grid gap-px bg-white/[0.08] md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group, index) => (
          <section
            key={group.title}
            className="group min-h-60 bg-[#0b0d10] p-5 transition-colors hover:bg-white/[0.025] sm:p-7"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-white/10 text-white/35 transition-colors group-hover:border-emerald-300/20 group-hover:text-emerald-200/65">
                <Code2 size={14} />
              </span>
              <span className="font-mono text-[9px] text-white/20">
                MOD-{String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h2 className="mt-5 font-mono text-xs uppercase tracking-[0.16em] text-white/70">
              {group.title}
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="anbv-tag">
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
