"use client";

import { motion } from "motion/react";
import {
  WindowsLogo,
  AppleLogo,
  LinuxLogo,
  Browser,
  GithubLogo,
  ArrowUpRight,
} from "@phosphor-icons/react";
import { DOWNLOAD_LINKS, EXTENSION_URL, GITHUB_URL } from "@/lib/constants";

const PLATFORMS = [
  { label: "Windows", href: DOWNLOAD_LINKS.windows, icon: WindowsLogo },
  { label: "macOS", href: DOWNLOAD_LINKS.macos, icon: AppleLogo },
  { label: "Linux", href: DOWNLOAD_LINKS.linux, icon: LinuxLogo },
];

export function DownloadSection() {
  return (
    <section id="download" className="relative scroll-mt-16 bg-background pb-28 pt-32">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-20 bg-primary [clip-path:polygon(0_0,100%_0,100%_35%,0_100%)] sm:h-28"
      />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <h2 className="inline-flex items-center gap-3 text-balance font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-tight text-foreground">
            Download Keypr
            <ArrowUpRight size={36} weight="bold" className="text-accent" />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-balance text-base leading-relaxed text-muted">
            Grab the desktop app and browser extension. Keypr is open source, so you can read
            every line that touches your vault.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[36rem] -translate-x-1/2 animate-glow-pulse rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(169,30,228,0.5), transparent 70%)" }}
          />

          <div className="glass relative rounded-2xl p-8 sm:p-10">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              Desktop app
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              {PLATFORMS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/10"
                >
                  <Icon size={18} weight="fill" className="text-accent" />
                  {label}
                </a>
              ))}
            </div>

            <div className="mx-auto mt-8 h-px w-full max-w-sm bg-white/10" />

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={EXTENSION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-foreground shadow-[0_0_24px_rgba(169,30,228,0.4)] transition-all duration-300 hover:scale-105"
              >
                <Browser size={18} weight="bold" />
                Browser extension
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors duration-300 hover:text-accent"
              >
                <GithubLogo size={18} weight="fill" />
                View source on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
