"use client";

import { Mail, ArrowUpRight } from "lucide-react";
import { FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Reveal, Stagger } from "@/components/reveal";

export function Contact() {
  return (
    <section id="contact" className="relative w-full py-28">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Stagger>
          <Reveal>
            <div className="glass-card rounded-3xl p-6 sm:p-10">
              <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
                <div>
                  <div className="text-[12px] tracking-tight text-white/55">
                    Contact
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                    Let us connect and collaborate.
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 tracking-tight text-white/55">
                    Open to internships, full-time opportunities, and interesting
                    product collaborations.
                  </p>
                </div>

                <a
                  href="mailto:anubhavp950@gmail.com"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-tight text-white/80 transition-colors hover:bg-white/8 hover:text-white"
                >
                  <Mail size={16} strokeWidth={1.5} />
                  anubhavp950@gmail.com
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </a>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="https://x.com/anewbhev"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs tracking-tight text-white/75 transition-colors hover:bg-white/8 hover:text-white"
                >
                  <FaXTwitter className="h-[15px] w-[15px]" />
                  @anewbhev
                </a>
                <a
                  href="https://instagram.com/anbvsig"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs tracking-tight text-white/75 transition-colors hover:bg-white/8 hover:text-white"
                >
                  <FaInstagram className="h-[15px] w-[15px]" />
                  @anbvsig
                </a>
              </div>
            </div>
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
}

