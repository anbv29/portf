import { Code2, Database, Globe, Wrench, Container, Cloud } from "lucide-react";
import { Reveal, Stagger } from "@/components/reveal";

const skillGroups = [
  {
    title: "Frontend",
    icon: Code2,
    items: [
      "React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS",
      "Framer Motion", "HTML5", "CSS3", "Redux", "Zustand", "ShadCN UI",
    ],
  },
  {
    title: "Backend",
    icon: Database,
    items: [
      "Node.js", "Express.js", "REST APIs", "GraphQL", "JWT Auth",
      "Prisma", "WebSockets", "tRPC", "Hono",
    ],
  },
  {
    title: "DevOps & Cloud",
    icon: Container,
    items: [
      "Docker", "Docker Compose", "Kubernetes", "CI/CD", "GitHub Actions",
      "Nginx", "AWS EC2", "Vercel", "Cloudflare", "Linux",
    ],
  },
  {
    title: "Databases & Infra",
    icon: Cloud,
    items: [
      "MongoDB", "PostgreSQL", "Redis", "Firebase", "Supabase", "MySQL",
    ],
  },
  {
    title: "Core CS",
    icon: Globe,
    items: [
      "Data Structures", "Algorithms", "OOP", "DBMS", "Computer Networks",
      "Operating Systems", "System Design",
    ],
  },
  {
    title: "Tools & Workflow",
    icon: Wrench,
    items: [
      "Git & GitHub", "Postman", "VS Code", "Figma", "Jira",
      "Terraform", "Bash Scripting", "Prometheus", "Grafana",
    ],
  },
] as const;

export function Skills() {
  return (
    <section id="skills" className="relative w-full py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Stagger>
          <Reveal>
            <div>
              <div className="text-[12px] tracking-tight text-white/55">Skills</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                Technical toolkit
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 tracking-tight text-white/55">
                A practical stack built through projects, coursework, and
                continuous problem solving.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <Reveal key={group.title}>
                  <div className="glass-card h-full rounded-3xl p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75">
                        <Icon size={17} strokeWidth={1.5} />
                      </span>
                      <h3 className="text-base font-medium tracking-tight text-white/85">
                        {group.title}
                      </h3>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[12px] tracking-tight text-white/65"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Stagger>
      </div>
    </section>
  );
}

