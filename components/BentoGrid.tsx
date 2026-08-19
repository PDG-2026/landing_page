"use client";

import { motion } from "motion/react";
import {
  ShieldCheck,
  UserSwitch,
  EnvelopeSimple,
  AppleLogo,
  WindowsLogo,
  LinuxLogo,
  PuzzlePiece,
  Stack,
  Timer,
  LockKey,
} from "@phosphor-icons/react";

const cardBase =
  "group relative overflow-hidden rounded-2xl border border-white/10 bg-primary/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_0_40px_rgba(169,30,228,0.18)]";

export function BentoGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[140px] md:gap-5"
    >
      {/* Military-grade encryption */}
      <div
        className={`${cardBase} md:col-start-1 md:row-start-1 md:col-span-2 md:row-span-2 flex flex-col justify-between`}
      >
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(169,30,228,0.35), transparent 70%)" }}
        />
        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent animate-glow-pulse">
          <ShieldCheck size={24} weight="duotone" />
        </div>
        <div className="relative z-10">
          <h3 className="font-display text-xl font-semibold text-foreground">
            Military-grade encryption
          </h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            AES-256 locks every entry in your vault, and Argon2id hardens your master password
            against brute-force attacks before it ever derives an encryption key.
          </p>
        </div>
      </div>

      {/* Personas */}
      <div className={`${cardBase} md:col-start-3 md:row-start-1 md:col-span-2 md:row-span-1`}>
        <div className="flex h-full items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <UserSwitch size={22} weight="duotone" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">Personas</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Generate believable fake identities to keep your real details off forms you do not trust.
            </p>
          </div>
        </div>
      </div>

      {/* Email Aliases */}
      <div className={`${cardBase} md:col-start-3 md:row-start-2 md:col-span-2 md:row-span-1`}>
        <div className="flex h-full items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
            <EnvelopeSimple size={22} weight="duotone" />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-foreground">Email aliases</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Redirect signup emails through a disposable alias without ever exposing your real inbox.
            </p>
          </div>
        </div>
      </div>

      {/* Cross-platform */}
      <div className={`${cardBase} md:col-start-1 md:row-start-3 md:col-span-1 md:row-span-1`}>
        <div className="flex h-full flex-col justify-between">
          <h3 className="font-display text-sm font-semibold text-foreground">Cross-platform</h3>
          <div className="flex items-center gap-2.5 text-accent">
            <WindowsLogo size={18} weight="fill" />
            <AppleLogo size={18} weight="fill" />
            <LinuxLogo size={18} weight="fill" />
          </div>
        </div>
      </div>

      {/* Browser extension */}
      <div className={`${cardBase} md:col-start-2 md:row-start-3 md:col-span-1 md:row-span-1`}>
        <div className="flex h-full flex-col justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <PuzzlePiece size={18} weight="duotone" />
          </div>
          <h3 className="font-display text-sm font-semibold text-foreground">Browser extension</h3>
        </div>
      </div>

      {/* Multiple vaults */}
      <div
        className={`${cardBase} md:col-start-3 md:row-start-3 md:col-span-2 md:row-span-2 flex flex-col justify-between`}
      >
        <div
          className="pointer-events-none absolute -left-10 bottom-0 h-48 w-48 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(200,107,240,0.35), transparent 70%)" }}
        />
        <div className="relative z-10 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent">
          <Stack size={22} weight="duotone" />
        </div>
        <div className="relative z-10">
          <h3 className="font-display text-lg font-semibold text-foreground">Multiple vaults</h3>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
            Split logins, cards, and wifi credentials into separate vaults, organized by category.
          </p>
        </div>
      </div>

      {/* Stat: unlock speed */}
      <div className={`${cardBase} md:col-start-1 md:row-start-4 md:col-span-1 md:row-span-1`}>
        <div className="flex h-full flex-col justify-between">
          <Timer size={18} weight="duotone" className="text-accent" />
          <div>
            <p className="font-display text-2xl font-bold text-foreground">&lt; 1s</p>
            <p className="text-xs text-muted">vault unlock</p>
          </div>
        </div>
      </div>

      {/* Stat: auto-lock */}
      <div className={`${cardBase} md:col-start-2 md:row-start-4 md:col-span-1 md:row-span-1`}>
        <div className="flex h-full flex-col justify-between">
          <LockKey size={18} weight="duotone" className="text-accent" />
          <div>
            <p className="font-display text-2xl font-bold text-foreground">5 min</p>
            <p className="text-xs text-muted">auto-lock idle timeout</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
