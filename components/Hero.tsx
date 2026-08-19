"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { ArrowSquareOut } from "@phosphor-icons/react";
import { BentoGrid } from "./BentoGrid";
import { GITHUB_URL } from "@/lib/constants";

const KeyScene = dynamic(() => import("./KeyScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-accent/25 border-t-accent" />
    </div>
  ),
});

const easeOut = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-32">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="text-balance font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-tight text-foreground"
          >
            Your identity. Fully encrypted.{" "}
            <span className="text-accent">Fully yours.</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: easeOut }}
            className="mx-auto mt-5 max-w-xl text-balance text-base leading-relaxed text-muted md:text-lg"
          >
            Keypr encrypts every password, card, and identity on your device before it ever
            touches a server, so no one but you can read your vault.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: easeOut }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#download"
              className="inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-foreground shadow-[0_0_28px_rgba(169,30,228,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_36px_rgba(169,30,228,0.65)]"
            >
              Get Keypr
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-7 py-3 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-accent/60 hover:text-accent"
            >
              View on GitHub
              <ArrowSquareOut size={16} weight="bold" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeOut }}
          className="relative mx-auto mt-6 h-[340px] w-full max-w-2xl sm:h-[420px] md:h-[500px]"
        >
          <KeyScene />
        </motion.div>

        <div id="features" className="mt-8 scroll-mt-24 md:mt-4">
          <BentoGrid />
        </div>
      </div>
    </section>
  );
}
