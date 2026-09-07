"use client";

import { FormEvent, useRef, useState } from "react";
import type { ModuleId } from "@/data/portfolio";
import { links, profile, projects, skillGroups } from "@/data/portfolio";

type Entry = { command: string; output: string[] };

const navigationCommands: Array<{ module: ModuleId; commands: string[] }> = [
  {
    module: "core",
    commands: ["core", "open core", "open identity", "open identity module"],
  },
  {
    module: "projects",
    commands: ["projects", "open projects", "project services", "open project services"],
  },
  {
    module: "experience",
    commands: [
      "experience",
      "open experience",
      "experience timeline",
      "open experience timeline",
      "open system timeline",
    ],
  },
  {
    module: "stack",
    commands: ["stack", "open stack", "engineering stack", "open engineering stack"],
  },
  {
    module: "terminal",
    commands: ["terminal", "open terminal", "open command interface"],
  },
  {
    module: "about",
    commands: ["about", "open about", "system profile", "open system profile"],
  },
  {
    module: "contact",
    commands: ["contact", "open contact", "communications", "open communications"],
  },
];

function normalizeCommand(command: string) {
  return command
    .trim()
    .toLowerCase()
    .replace(/^\$\s*/, "")
    .replace(/\s+/g, " ");
}

export function Terminal({
  onNavigate,
}: {
  onNavigate: (module: ModuleId) => void;
}) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Entry[]>([
    {
      command: "",
      output: [
        "ANBV terminal ready.",
        "Type 'help' to inspect available commands.",
      ],
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  function execute(rawCommand: string) {
    const command = normalizeCommand(rawCommand);
    if (!command) return;

    if (command === "clear") {
      setHistory([]);
      return;
    }

    const destination = navigationCommands.find(({ commands }) =>
      commands.includes(command)
    )?.module;
    if (destination) {
      setHistory((current) => [
        ...current,
        { command: rawCommand, output: [`Opening ${destination} module...`] },
      ]);
      window.setTimeout(() => onNavigate(destination), 180);
      return;
    }

    let output: string[];
    switch (command) {
      case "help":
        output = [
          "help        list available commands",
          "whoami      inspect identity",
          "projects    open project services",
          "experience  open experience timeline",
          "stack       open engineering stack",
          "about       open system profile",
          "contact     open communications",
          "resume      open résumé document",
          "clear       clear terminal output",
        ];
        break;
      case "whoami":
        output = [profile.name, profile.role, profile.headline];
        break;
      case "sudo hire anubhav":
        output = [
          "Permission granted.",
          `Opening communication channel: ${links.emailLabel}`,
        ];
        break;
      case "ls projects":
        output = projects.map((project) => `${project.number}  ${project.title}`);
        break;
      case "ls stack":
        output = skillGroups.map(
          (group) => `${group.title}: ${group.items.join(", ")}`
        );
        break;
      case "resume":
      case "open resume":
      case "view resume":
      case "open résumé":
      case "view résumé":
        window.open(links.resume, "_blank", "noopener,noreferrer");
        output = ["Opening résumé document..."];
        break;
      default:
        output = [`Command not found: ${command}`, "Run 'help' for available commands."];
    }

    setHistory((current) => [...current, { command: rawCommand, output }]);
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    execute(input);
    setInput("");
  }

  return (
    <div
      className="min-h-full cursor-text bg-[#08090b] p-5 font-mono sm:p-8"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] uppercase tracking-[0.16em] text-white/30">
        <span>ANBV / COMMAND INTERFACE</span>
        <span className="flex items-center gap-2 text-emerald-200/55">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-300/70" />
          Local simulation
        </span>
      </div>

      <div aria-live="polite" className="space-y-5 text-[13px] leading-6">
        {history.map((entry, index) => (
          <div key={`${entry.command}-${index}`}>
            {entry.command && (
              <div className="text-white/80">
                <span className="text-emerald-300/70">anbv@core</span>
                <span className="text-white/25">:</span>
                <span className="text-sky-300/60">~</span>
                <span className="text-white/40">$ </span>
                {entry.command}
              </div>
            )}
            <div className="mt-1 whitespace-pre-wrap text-white/48">
              {entry.output.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="mt-5 flex items-center text-[13px]">
        <label htmlFor="anbv-terminal-input" className="shrink-0">
          <span className="text-emerald-300/70">anbv@core</span>
          <span className="text-white/25">:</span>
          <span className="text-sky-300/60">~</span>
          <span className="text-white/40">$&nbsp;</span>
        </label>
        <input
          ref={inputRef}
          id="anbv-terminal-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent text-white/85 caret-emerald-300 outline-none"
          aria-label="Terminal command"
        />
      </form>
    </div>
  );
}
