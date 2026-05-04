import { GraduationCap, Medal, CalendarClock } from "lucide-react";
import { Reveal, Stagger } from "@/components/reveal";

const educationItems = [
  {
    degree: "B.Tech (Final Year)",
    institute: "Dr. B. R. Ambedkar National Institute of Technology, Jalandhar",
    meta: "2022 — 2026",
    detail:
      "Focused on software development, data structures, and system-driven project work.",
  },
  {
    degree: "Senior Secondary (XII)",
    institute: "Blooming Dale School",
    meta: "Completed",
    detail:
      "Built a strong mathematics and analytical foundation that shaped engineering interests.",
  },
  {
    degree: "Secondary (X)",
    institute: "Blooming Dale School",
    meta: "Completed",
    detail:
      "Established core academic discipline and early interest in science and technology.",
  },
] as const;

const highlights = [
  "Consistent project-building with modern web technologies",
  "Hands-on implementation of full-stack application workflows",
  "Strong focus on internship and placement readiness",
] as const;

export function Education() {
  return (
    <section id="education" className="relative w-full py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Stagger>
          <Reveal>
            <div>
              <div className="text-[12px] tracking-tight text-white/55">
                Education
              </div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                Academic background
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 tracking-tight text-white/55">
                My core education journey and key highlights that support my
                software engineering growth.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="glass-card h-full rounded-3xl p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-2 text-[12px] tracking-tight text-white/55">
                  <GraduationCap size={16} strokeWidth={1.5} />
                  Degree timeline
                </div>

                <div className="space-y-4">
                  {educationItems.map((item) => (
                    <div
                      key={item.degree}
                      className="rounded-2xl border border-white/10 bg-black/25 p-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="text-base font-medium tracking-tight text-white/85">
                          {item.degree}
                        </div>
                        <div className="inline-flex items-center gap-1 rounded-full border border-white/10 px-2 py-1 text-[11px] tracking-tight text-white/60">
                          <CalendarClock size={13} strokeWidth={1.5} />
                          {item.meta}
                        </div>
                      </div>
                      <div className="mt-1 text-sm tracking-tight text-white/60">
                        {item.institute}
                      </div>
                      <div className="mt-3 text-sm leading-6 tracking-tight text-white/55">
                        {item.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="md:col-span-5">
              <div className="glass-card h-full rounded-3xl p-5 sm:p-6">
                <div className="mb-5 flex items-center gap-2 text-[12px] tracking-tight text-white/55">
                  <Medal size={16} strokeWidth={1.5} />
                  Highlights
                </div>
                <ul className="space-y-3 text-sm leading-6 tracking-tight text-white/60">
                  {highlights.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-white/50"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Stagger>
      </div>
    </section>
  );
}

