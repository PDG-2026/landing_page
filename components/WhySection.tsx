"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { StackCard } from "./StackCard";

gsap.registerPlugin(ScrollTrigger);

const shapeTriangleStack = (
  <svg width="320" height="320" viewBox="0 0 320 320" fill="none" aria-hidden="true">
    <polygon points="160,20 300,280 20,280" fill="white" fillOpacity="0.08" />
    <polygon points="160,90 250,270 70,270" fill="white" fillOpacity="0.1" />
    <polygon points="160,160 200,260 120,260" fill="white" fillOpacity="0.16" />
  </svg>
);

const shapeLayeredSquares = (
  <svg width="300" height="300" viewBox="0 0 300 300" fill="none" aria-hidden="true">
    <rect x="40" y="40" width="180" height="180" rx="24" stroke="white" strokeOpacity="0.14" strokeWidth="2" />
    <rect x="90" y="90" width="180" height="180" rx="24" fill="white" fillOpacity="0.06" />
    <circle cx="130" cy="130" r="60" stroke="white" strokeOpacity="0.18" strokeWidth="2" />
  </svg>
);

const shapeHexCluster = (
  <svg width="320" height="320" viewBox="0 0 320 320" fill="none" aria-hidden="true">
    <polygon
      points="160,30 260,90 260,210 160,270 60,210 60,90"
      fill="white"
      fillOpacity="0.07"
    />
    <polygon
      points="160,90 220,125 220,195 160,230 100,195 100,125"
      stroke="white"
      strokeOpacity="0.2"
      strokeWidth="2"
    />
  </svg>
);

const shapeOrbitRings = (
  <svg width="320" height="320" viewBox="0 0 320 320" fill="none" aria-hidden="true">
    <circle cx="160" cy="160" r="130" stroke="white" strokeOpacity="0.1" strokeWidth="2" />
    <circle cx="160" cy="160" r="90" stroke="white" strokeOpacity="0.16" strokeWidth="2" />
    <circle cx="160" cy="160" r="50" fill="white" fillOpacity="0.08" />
  </svg>
);

const CARDS = [
  {
    number: "01",
    title: "Zero-knowledge architecture",
    description:
      "Keypr never sees your master password or your plaintext data. Everything is encrypted on your device before it touches disk or sync.",
    background: "bg-gradient-to-br from-accent to-[#6b1494]",
    shape: shapeTriangleStack,
  },
  {
    number: "02",
    title: "Personas and email aliasing",
    description:
      "Spin up fictional identities and disposable email aliases on demand, so data brokers and breached sites never get your real details.",
    background: "bg-primary",
    shape: shapeLayeredSquares,
  },
  {
    number: "03",
    title: "Built for every credential",
    description:
      "Website logins, wifi passwords, credit cards, and categorized notes all live in one encrypted vault, organized the way you actually work.",
    background: "bg-[#2d1042]",
    shape: shapeHexCluster,
  },
  {
    number: "04",
    title: "Resilient by design",
    description:
      "Atomic writes and crash-safe vault files keep your data intact offline, and sync safely across iCloud, OneDrive, or Google Drive.",
    background: "bg-background border border-white/5",
    shape: shapeOrbitRings,
  },
];

export function WhySection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="security" className="relative bg-background pt-20">
      <div ref={wrapperRef} className="relative">
        <div className="-mt-9">
          {CARDS.map((card) => (
            <StackCard key={card.number} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
