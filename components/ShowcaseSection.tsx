/* This file has been for the most part implemented by Claude AI */

"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

const easeOut = [0.16, 1, 0.3, 1] as const;

type Frame = {
  src: string;
  alt: string;
  label: string;
  /** Anchor point of the frame center, in % of the stage. */
  top: string;
  left: string;
  /** Resting 3D pose. */
  z: number;
  rotateX: number;
  rotateY: number;
  scale: number;
  opacity: number;
  blur: number;
  zIndex: number;
  delay: number;
  width: string;
};

const FRAMES: Frame[] = [
  {
    src: "/landing_page/mockups/vault-list.svg",
    alt: "Vault list screen showing categorized encrypted entries",
    label: "Vault",
    top: "54%",
    left: "50%",
    z: 90,
    rotateX: 0,
    rotateY: 0,
    scale: 1.08,
    opacity: 1,
    blur: 0,
    zIndex: 60,
    delay: 0.05,
    width: "min(30vw, 400px)",
  },
  {
    src: "/landing_page/mockups/unlocked-vault-detail.svg",
    alt: "Unlocked vault detail screen with credential fields revealed",
    label: "Vault detail",
    top: "24%",
    left: "20%",
    z: 10,
    rotateX: 3,
    rotateY: 16,
    scale: 0.9,
    opacity: 0.96,
    blur: 0,
    zIndex: 50,
    delay: 0.16,
    width: "min(24vw, 320px)",
  },
  {
    src: "/landing_page/mockups/personas-manager.svg",
    alt: "Personas manager screen listing generated identities",
    label: "Personas",
    top: "76%",
    left: "80%",
    z: 10,
    rotateX: -3,
    rotateY: -16,
    scale: 0.9,
    opacity: 0.96,
    blur: 0,
    zIndex: 50,
    delay: 0.16,
    width: "min(24vw, 320px)",
  },
  {
    src: "/landing_page/mockups/master-password-unlock.svg",
    alt: "Master password unlock screen",
    label: "Unlock",
    top: "18%",
    left: "84%",
    z: -100,
    rotateX: -4,
    rotateY: -22,
    scale: 0.72,
    opacity: 0.72,
    blur: 1.5,
    zIndex: 30,
    delay: 0.28,
    width: "min(20vw, 260px)",
  },
  {
    src: "/landing_page/mockups/create-vault-modal.svg",
    alt: "Create vault modal for organizing a new encrypted vault",
    label: "New vault",
    top: "84%",
    left: "16%",
    z: -100,
    rotateX: 4,
    rotateY: 22,
    scale: 0.72,
    opacity: 0.72,
    blur: 1.5,
    zIndex: 30,
    delay: 0.28,
    width: "min(20vw, 260px)",
  },
  {
    src: "/landing_page/mockups/create-persona-form.svg",
    alt: "Create persona form for generating a fictional identity",
    label: "New persona",
    top: "26%",
    left: "50%",
    z: -190,
    rotateX: 6,
    rotateY: 0,
    scale: 0.58,
    opacity: 0.5,
    blur: 2.5,
    zIndex: 10,
    delay: 0.4,
    width: "min(22vw, 300px)",
  },
];

function FrameChrome({
  src,
  alt,
  label,
  onOpen,
}: Pick<Frame, "src" | "alt" | "label"> & { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open larger view of ${label}`}
      className="group relative block w-full appearance-none rounded-xl bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <div className="relative aspect-[1440/1024] w-full cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-primary shadow-[0_40px_70px_-25px_rgba(0,0,0,0.7),0_0_50px_-15px_rgba(169,30,228,0.25)] transition-transform duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.02] group-active:scale-[0.98]">
        <div className="flex h-6 items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-3">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
        </div>
        <div className="relative h-[calc(100%-1.5rem)] w-full">
          <Image src={src} alt={alt} fill sizes="40vw" className="object-cover object-top" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-gradient-to-t from-background/90 via-background/40 to-transparent px-3 pb-2 pt-6">
            <span className="h-1 w-1 rounded-full bg-accent" />
            <span className="font-display text-[11px] font-medium tracking-wide text-foreground/90">
              {label}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const showPrev = () =>
    setActiveIndex((i) => (i === null ? null : (i - 1 + FRAMES.length) % FRAMES.length));
  const showNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % FRAMES.length));
  const close = () => setActiveIndex(null);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 120, damping: 20, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 120, damping: 20, mass: 0.6 });
  const rotateX = useTransform(springY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-9, 9]);

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function handlePointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
  }

  useEffect(() => {
    if (!stageRef.current) return;

    const ctx = gsap.context(() => {
      frameRefs.current.forEach((el, i) => {
        if (!el) return;
        const frame = FRAMES[i];

        gsap.set(el, {
          xPercent: -50,
          yPercent: -50,
          z: frame.z,
          rotationX: frame.rotateX,
          rotationY: frame.rotateY,
          scale: reduce ? frame.scale : frame.scale * 0.86,
          opacity: reduce ? frame.opacity : 0,
          filter: `blur(${frame.blur}px)`,
        });

        if (reduce) return;

        gsap.to(el, {
          opacity: frame.opacity,
          scale: frame.scale,
          duration: 1.2,
          delay: frame.delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            toggleActions: "play none none none",
          },
        });
      });
    }, stageRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative overflow-hidden bg-background py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 animate-glow-pulse rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(169,30,228,0.45), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mx-auto max-w-xl text-center"
        >
          <h2 className="text-balance font-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-tight tracking-tight text-foreground">
            The vault, from every angle
          </h2>
          <p className="mt-4 text-balance text-base leading-relaxed text-muted">
            Six real screens from the app: unlocking, browsing, and building personas, all
            without your data ever leaving the encrypted vault.
          </p>
        </motion.div>

        <div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative mt-16 hidden h-[46rem] w-full lg:block"
          style={{ perspective: "1800px" }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              rotateX: reduce ? 0 : rotateX,
              rotateY: reduce ? 0 : rotateY,
            }}
          >
            {FRAMES.map((frame, i) => (
              <div
                key={frame.label}
                ref={(el) => {
                  frameRefs.current[i] = el;
                }}
                className="absolute"
                style={{
                  top: frame.top,
                  left: frame.left,
                  width: frame.width,
                  zIndex: frame.zIndex,
                  transformStyle: "preserve-3d",
                }}
              >
                <FrameChrome
                  src={frame.src}
                  alt={frame.alt}
                  label={frame.label}
                  onOpen={() => setActiveIndex(i)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="-mx-4 mt-14 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 lg:hidden">
          {FRAMES.map((frame, i) => (
            <div
              key={frame.label}
              className="w-[78vw] shrink-0 snap-center sm:w-[420px]"
              style={{ transform: i % 2 === 0 ? "rotate(-1.2deg)" : "rotate(1.2deg)" }}
            >
              <FrameChrome
                src={frame.src}
                alt={frame.alt}
                label={frame.label}
                onOpen={() => setActiveIndex(i)}
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 p-4 backdrop-blur-md sm:p-8"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-colors duration-300 hover:border-accent/60 hover:text-accent sm:right-8 sm:top-8"
            >
              <X size={18} weight="bold" />
            </button>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrev();
              }}
              aria-label="Previous screen"
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-colors duration-300 hover:border-accent/60 hover:text-accent sm:left-8"
            >
              <CaretLeft size={18} weight="bold" />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next screen"
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/5 text-foreground transition-colors duration-300 hover:border-accent/60 hover:text-accent sm:right-8"
            >
              <CaretRight size={18} weight="bold" />
            </button>

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: easeOut }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-primary shadow-[0_60px_120px_-30px_rgba(0,0,0,0.8),0_0_80px_-10px_rgba(169,30,228,0.3)]"
            >
              <div className="flex h-8 items-center gap-1.5 border-b border-white/10 bg-white/[0.03] px-4">
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
                <span className="h-2 w-2 rounded-full bg-foreground/15" />
              </div>
              <div className="relative aspect-[1440/1024] w-full">
                <Image
                  src={FRAMES[activeIndex].src}
                  alt={FRAMES[activeIndex].alt}
                  fill
                  sizes="90vw"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-display text-sm font-medium tracking-wide text-foreground">
                  {FRAMES[activeIndex].label}
                </span>
                <span className="ml-auto text-xs text-muted">
                  {activeIndex + 1} / {FRAMES.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
