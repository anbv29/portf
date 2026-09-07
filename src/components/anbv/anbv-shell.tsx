"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, UserRoundSearch } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { ModuleId } from "@/data/portfolio";
import { links, profile } from "@/data/portfolio";
import { ApplicationDock } from "@/components/anbv/application-dock";
import { BootSequence } from "@/components/anbv/boot-sequence";
import { CommandPalette } from "@/components/anbv/command-palette";
import { ExperienceModule, StackModule } from "@/components/anbv/experience-stack-modules";
import { CoreModule, AboutModule, ContactModule } from "@/components/anbv/profile-modules";
import { ProjectsModule } from "@/components/anbv/projects-module";
import { RecruiterMode } from "@/components/anbv/recruiter-mode";
import { SystemBar } from "@/components/anbv/system-bar";
import { SystemWindow } from "@/components/anbv/system-window";
import { Terminal } from "@/components/anbv/terminal";

type ViewMode = "gateway" | "os" | "recruiter";

export function AnbvShell() {
  const reduceMotion = useReducedMotion();
  const [booting, setBooting] = useState(true);
  const [mode, setMode] = useState<ViewMode>("gateway");
  const [activeModule, setActiveModule] = useState<ModuleId>("core");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [maximized, setMaximized] = useState(false);

  const finishBoot = useCallback(() => setBooting(false), []);

  const navigate = useCallback((module: ModuleId) => {
    setActiveModule(module);
    setMinimized(false);
    setMode("os");
  }, []);

  const openRecruiterMode = useCallback(() => {
    setPaletteOpen(false);
    setMode("recruiter");
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (mode !== "os") return;
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((current) => !current);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mode]);

  return (
    <div className="min-h-svh bg-[#08090b] text-white">
      <AnimatePresence>{booting && <BootSequence onComplete={finishBoot} />}</AnimatePresence>

      {!booting && mode === "gateway" && (
        <Gateway
          onEnter={() => setMode("os")}
          onRecruiter={openRecruiterMode}
          reduceMotion={Boolean(reduceMotion)}
        />
      )}

      {!booting && mode === "recruiter" && (
        <RecruiterMode onEnterAnbv={() => setMode("os")} />
      )}

      {!booting && mode === "os" && (
        <div className="anbv-desktop min-h-svh overflow-hidden bg-[#08090b]">
          <SystemBar
            activeModule={activeModule}
            onOpenPalette={() => setPaletteOpen(true)}
            onExit={() => setMode("gateway")}
          />
          <ApplicationDock active={activeModule} onSelect={navigate} />

          <main
            className={`mx-auto max-w-[1540px] px-3 pb-20 pt-14 sm:px-5 lg:pb-4 lg:pl-24 lg:pr-6 ${
              maximized ? "" : ""
            }`}
          >
            <SystemWindow
              module={activeModule}
              minimized={minimized}
              maximized={maximized}
              onMinimize={() => setMinimized((current) => !current)}
              onMaximize={() => setMaximized((current) => !current)}
              onClose={() => setMode("gateway")}
            >
              <ActiveModule module={activeModule} onNavigate={navigate} />
            </SystemWindow>
          </main>

          <CommandPalette
            open={paletteOpen}
            onClose={() => setPaletteOpen(false)}
            onNavigate={(module) => {
              navigate(module);
              setPaletteOpen(false);
            }}
            onRecruiter={openRecruiterMode}
          />
        </div>
      )}
    </div>
  );
}

function Gateway({
  onEnter,
  onRecruiter,
  reduceMotion,
}: {
  onEnter: () => void;
  onRecruiter: () => void;
  reduceMotion: boolean;
}) {
  return (
    <main className="anbv-gateway relative flex min-h-svh items-center justify-center overflow-hidden px-5 py-16">
      <motion.section
        initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-xl border border-white/10 bg-[#0b0d10]/88 shadow-[0_30px_120px_rgba(0,0,0,0.55)] backdrop-blur-xl"
      >
        <div className="flex h-11 items-center justify-between border-b border-white/[0.08] px-4 font-mono text-[9px] uppercase tracking-[0.17em] text-white/28">
          <span>ANBV / ACCESS GATEWAY</span>
          <span className="flex items-center gap-2 text-emerald-200/55">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" /> Ready
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.3fr_0.7fr]">
          <div className="p-6 sm:p-10 lg:border-r lg:border-white/[0.08] lg:p-12">
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/50">
              Personal engineering operating system
            </div>
            <h1 className="mt-5 text-4xl font-medium tracking-[-0.055em] text-white sm:text-5xl">
              {profile.name}
            </h1>
            <p className="mt-4 text-sm text-white/48 sm:text-base">{profile.role}</p>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/58">{profile.headline}</p>
          </div>

          <div className="grid gap-px border-t border-white/[0.08] bg-white/[0.08] lg:border-t-0">
            <button type="button" onClick={onEnter} className="anbv-gateway-action group">
              <span>
                <span className="anbv-gateway-index">01 / EXPLORE</span>
                <span className="anbv-gateway-label">Enter ANBV</span>
              </span>
              <ArrowRight className="transition-transform group-hover:translate-x-1" size={17} />
            </button>
            <button type="button" onClick={onRecruiter} className="anbv-gateway-action group">
              <span>
                <span className="anbv-gateway-index">02 / QUICK VIEW</span>
                <span className="anbv-gateway-label">Recruiter mode</span>
              </span>
              <UserRoundSearch className="transition-transform group-hover:scale-105" size={17} />
            </button>
            <a
              href={links.resume}
              target="_blank"
              rel="noreferrer"
              className="anbv-gateway-action group"
            >
              <span>
                <span className="anbv-gateway-index">03 / DOCUMENT</span>
                <span className="anbv-gateway-label">View résumé</span>
              </span>
              <FileText className="transition-transform group-hover:-translate-y-0.5" size={17} />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] px-4 py-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/22 sm:px-6">
          <span>Interface / ANBV</span>
          <span>Keyboard: CTRL / CMD + K</span>
        </div>
      </motion.section>
    </main>
  );
}

function ActiveModule({
  module,
  onNavigate,
}: {
  module: ModuleId;
  onNavigate: (module: ModuleId) => void;
}) {
  switch (module) {
    case "projects":
      return <ProjectsModule />;
    case "experience":
      return <ExperienceModule />;
    case "stack":
      return <StackModule />;
    case "terminal":
      return <Terminal onNavigate={onNavigate} />;
    case "about":
      return <AboutModule />;
    case "contact":
      return <ContactModule />;
    default:
      return <CoreModule />;
  }
}
