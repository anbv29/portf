import {
  ArrowUpRight,
  Boxes,
  CheckCircle2,
  Download,
  Mail,
  Radio,
} from "lucide-react";
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { GithubActivity } from "@/components/github-activity";
import { SiteStats } from "@/components/site-stats";
import {
  educationHighlights,
  links,
  profile,
  projects,
} from "@/data/portfolio";

function ModuleHeading({
  code,
  title,
  description,
}: {
  code: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-white/[0.08] px-5 py-7 sm:px-8 sm:py-9">
      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/50">
        {code}
      </div>
      <h1 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/48 sm:text-base sm:leading-7">
        {description}
      </p>
    </header>
  );
}

export function CoreModule() {
  return (
    <div>
      <div className="grid border-b border-white/[0.08] lg:grid-cols-[1.45fr_0.55fr]">
        <section className="px-5 py-10 sm:px-8 sm:py-14 lg:border-r lg:border-white/[0.08]">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
            Identity / primary
          </div>
          <h1 className="mt-5 max-w-3xl text-4xl font-medium leading-[1.02] tracking-[-0.055em] text-white sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <div className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-emerald-200/65">
            {profile.role}
          </div>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/58 sm:text-lg sm:leading-8">
            {profile.headline}
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/42 sm:text-base">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={links.resume}
              target="_blank"
              rel="noreferrer"
              className="anbv-action anbv-action-primary"
            >
              View résumé <ArrowUpRight size={14} />
            </a>
            <a href={links.email} className="anbv-action">
              Contact <Mail size={14} />
            </a>
          </div>
        </section>

        <aside className="grid grid-cols-2 border-t border-white/[0.08] lg:grid-cols-1 lg:border-t-0">
          <div className="border-b border-r border-white/[0.08] p-5 sm:p-6 lg:border-r-0">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/28">
              System status
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-white/70">
              <Radio size={14} className="text-emerald-300/70" />
              Online
            </div>
          </div>
          <div className="border-b border-white/[0.08] p-5 sm:p-6">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/28">
              Project services
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-white/70">
              <Boxes size={14} className="text-white/40" />
              {projects.length} indexed
            </div>
          </div>
          <div className="col-span-2 p-5 sm:p-6 lg:col-span-1">
            <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/28">
              Current focus
            </div>
            <p className="mt-3 text-sm leading-6 text-white/55">{profile.focus}</p>
          </div>
        </aside>
      </div>

      <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[1.5fr_0.5fr]">
        <GithubActivity />
        <div className="anbv-panel p-4">
          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
            Session telemetry
          </div>
          <SiteStats />
        </div>
      </div>
    </div>
  );
}

export function AboutModule() {
  return (
    <div>
      <ModuleHeading
        code="about.sys"
        title="System profile"
        description="The person behind the interface—how I think about engineering, products, and reliable software."
      />
      <div className="grid gap-px bg-white/[0.08] lg:grid-cols-2">
        <section className="bg-[#0b0d10] p-5 sm:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            Identity
          </div>
          <p className="mt-5 text-base leading-8 text-white/62">{profile.summary}</p>
        </section>
        <section className="bg-[#0b0d10] p-5 sm:p-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            Engineering philosophy
          </div>
          <p className="mt-5 text-base leading-8 text-white/62">{profile.philosophy}</p>
        </section>
      </div>

      <section className="border-t border-white/[0.08] p-5 sm:p-8">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
          Operating principles
        </div>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {educationHighlights.map((item) => (
            <li
              key={item}
              className="anbv-panel flex gap-3 p-4 text-sm leading-6 text-white/55"
            >
              <CheckCircle2 size={15} className="mt-1 shrink-0 text-emerald-300/55" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function ContactModule() {
  const channels = [
    { label: "Email", value: links.emailLabel, href: links.email, icon: Mail },
    { label: "GitHub", value: "github.com/anbv29", href: links.github, icon: FaGithub },
    { label: "X", value: links.xLabel, href: links.x, icon: FaXTwitter },
    {
      label: "Instagram",
      value: links.instagramLabel,
      href: links.instagram,
      icon: FaInstagram,
    },
  ] as const;

  return (
    <div>
      <ModuleHeading
        code="communications"
        title="Open a channel"
        description={profile.availability}
      />

      <div className="grid gap-px bg-white/[0.08] sm:grid-cols-2">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex min-h-36 items-end justify-between bg-[#0b0d10] p-5 transition-colors hover:bg-white/[0.035] sm:p-7"
            >
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.17em] text-white/28">
                  {channel.label}
                </div>
                <div className="mt-3 break-all text-sm text-white/65 sm:text-base">
                  {channel.value}
                </div>
              </div>
              <Icon className="shrink-0 text-white/25 transition-[color,transform] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-200/70" size={18} />
            </a>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 border-t border-white/[0.08] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            Résumé packet
          </div>
          <p className="mt-2 text-sm text-white/48">Professional experience and technical background.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={links.resume} target="_blank" rel="noreferrer" className="anbv-action">
            View résumé <ArrowUpRight size={14} />
          </a>
          <a href={links.resume} download className="anbv-action anbv-action-primary">
            Download <Download size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
