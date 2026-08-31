// components/Hero.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

type HeroProps = {
  name: string;
  title: string;
  location?: string | null;
  resumeUrl?: string | null;
};

const disciplines = ["SOFTWARE ENGINEERING", "FULL-STACK DEV", "VIDEO EDITING"];

// Fixed (non-random) particle configs — deterministic so SSR/client markup always matches.
const particles = [
  { left: "6%",  duration: "9s",  delay: "0s",   drift: "10px", size: "2px" },
  { left: "14%", duration: "12s", delay: "1.2s", drift: "-14px", size: "3px" },
  { left: "23%", duration: "8s",  delay: "2.4s", drift: "8px",  size: "2px" },
  { left: "34%", duration: "13s", delay: "0.6s", drift: "-10px", size: "2px" },
  { left: "45%", duration: "10s", delay: "3s",   drift: "12px", size: "3px" },
  { left: "56%", duration: "11s", delay: "1.8s", drift: "-16px", size: "2px" },
  { left: "64%", duration: "9s",  delay: "4s",   drift: "10px", size: "2px" },
  { left: "73%", duration: "14s", delay: "0.9s", drift: "-8px", size: "3px" },
  { left: "82%", duration: "10s", delay: "2.7s", drift: "14px", size: "2px" },
  { left: "90%", duration: "12s", delay: "3.6s", drift: "-12px", size: "2px" },
  { left: "38%", duration: "15s", delay: "5s",   drift: "6px",  size: "2px" },
  { left: "68%", duration: "8s",  delay: "5.5s", drift: "-6px", size: "2px" }
];

// Fixed constellation points + connecting edges — deterministic for SSR.
const constellationPoints = [
  { cx: "10%", cy: "20%" },
  { cx: "25%", cy: "35%" },
  { cx: "15%", cy: "55%" },
  { cx: "80%", cy: "18%" },
  { cx: "88%", cy: "40%" },
  { cx: "72%", cy: "60%" }
];

const constellationEdges = [
  { x1: "10%", y1: "20%", x2: "25%", y2: "35%" },
  { x1: "25%", y1: "35%", x2: "15%", y2: "55%" },
  { x1: "80%", y1: "18%", x2: "88%", y2: "40%" },
  { x1: "88%", y1: "40%", x2: "72%", y2: "60%" }
];

export default function Hero({ name, title, location, resumeUrl }: HeroProps) {
  const headline = [
    { text: "I build products that think like ", em: false },
    { text: "engineering", em: true },
    { text: ", scale like ", em: false },
    { text: "full-stack", em: true },
    { text: ", and cut like ", em: false },
    { text: "a story", em: true },
    { text: ".", em: false }
  ];

  return (
    <section id="top" className="relative overflow-hidden px-6 pb-28 pt-40">
      {/* --- background / color grading layers --- */}

      {/* 1. base grid with pulsing opacity */}
      <div className="bg-grid absolute inset-0 -z-30 animate-grid-pulse" />

      {/* 2. aurora mesh wash — rotating conic gradient, blurred */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-30 overflow-hidden">
        <div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 animate-aurora-spin opacity-20 blur-[60px] md:h-[800px] md:w-[800px] md:opacity-30 md:blur-[100px]"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, #E8A23D 60deg, transparent 140deg, #F3D67C 220deg, transparent 300deg)"
          }}
        />
      </div>

      {/* 3. morphing blobs (existing orbs + border-radius morph + drift) */}
      <motion.div
        aria-hidden
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -top-40 right-[-10%] -z-20 h-[520px] w-[520px] animate-blob-morph bg-accent/20 blur-[80px] md:blur-[120px]"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, -30, 20, 0], y: [0, 20, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -bottom-40 left-[-10%] -z-20 h-[420px] w-[420px] animate-blob-morph bg-amber-soft/10 blur-[70px] md:blur-[110px]"
        style={{ animationDelay: "2s" }}
      />

      {/* rising particle field — pure CSS, GPU-accelerated, cheap on mobile */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        {particles.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0 rounded-full bg-accent/60 animate-particle-float"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              // @ts-expect-error -- custom property consumed by the keyframe
              "--drift": p.drift
            }}
          />
        ))}
      </div>

      {/* 4. diagonal light beam sweep */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[200%] w-24 animate-beam-sweep bg-gradient-to-b from-transparent via-accent/10 to-transparent blur-xl md:w-40 md:via-accent/15 md:blur-2xl" />
      </div>

      {/* vertical scan-line sweep */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-accent/10 to-transparent animate-scan-line" />
      </div>

      {/* 5. constellation dots — hidden on mobile, shown from md up to avoid clutter on small screens */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 hidden h-full w-full opacity-30 md:block"
      >
        {constellationEdges.map((e, i) => (
          <line
            key={i}
            x1={e.x1}
            y1={e.y1}
            x2={e.x2}
            y2={e.y2}
            stroke="#E8A23D"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        ))}
        {constellationPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="2"
            fill="#E8A23D"
            className="animate-dot-drift"
            style={{ animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </svg>

      {/* vignette for color-graded contrast */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(11,12,16,0.85)_100%)]" />

      {/* grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"
        }}
      />

      {/* coordinate readout w/ blinking cursor using your existing animate-blink token */}
      <div className="pointer-events-none absolute right-6 top-24 hidden items-center gap-2 border border-hairline/60 bg-canvas/60 px-3 py-1.5 font-mono text-[11px] text-muted/70 backdrop-blur-sm md:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        X 0004 · Y 0002
        <span className="ml-0.5 inline-block h-3 w-px animate-blink bg-accent" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mx-auto grid max-w-6xl gap-16 md:grid-cols-12 md:items-end"
      >
        <div className="md:col-span-8">
          <motion.p
            variants={fadeUp}
            className="mb-6 flex items-center gap-3 font-mono text-xs tracking-wide text-accent"
          >
            <span className="inline-block h-px w-8 bg-accent" />
            {title.toUpperCase()}
            {location ? ` — BASED IN ${location.toUpperCase()}` : ""}
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="max-w-5xl font-display text-5xl leading-[1.08] text-inkText md:text-6xl"
          >
            {headline.map((part, i) =>
              part.em ? (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
                  className="bg-gradient-to-r from-accent to-amber-soft bg-clip-text italic text-transparent"
                >
                  {part.text}
                </motion.span>
              ) : (
                <span key={i}>{part.text}</span>
              )
            )}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-xl font-body text-base leading-relaxed text-muted md:text-lg"
          >
            {name} — a full-stack developer and video editor working across product,
            front-end systems, and motion. I turn ambiguous briefs into precise,
            considered software, and raw footage into stories that hook.
          </motion.p>

          {/* discipline badges */}
          <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <span
                key={d}
                className="cursor-default border border-hairline/70 bg-canvas/40 px-3 py-1.5 font-mono text-[10px] tracking-wide text-muted backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-canvasSoft/60 hover:text-accent"
              >
                {d}
              </span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden border border-accent bg-accent px-6 py-3 font-mono text-xs tracking-wide text-canvas transition-transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">VIEW SELECTED WORK</span>
              <span className="relative z-10 transition-transform group-hover:translate-x-1">→</span>
              <span className="absolute inset-0 -translate-x-full bg-white/25 skew-x-12 transition-transform duration-500 group-hover:translate-x-full" />
            </a>
            {resumeUrl ? (
              <a
                href="/resume"
                className="inline-flex items-center gap-2 border border-hairline px-6 py-3 font-mono text-xs tracking-wide text-inkText transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                VIEW RÉSUMÉ
              </a>
            ) : (
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-hairline px-6 py-3 font-mono text-xs tracking-wide text-inkText transition-all hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                GET IN TOUCH
              </a>
            )}
          </motion.div>
        </div>

        {/* availability card */}
        <motion.div variants={fadeUp} className="md:col-span-4">
          <div className="group relative border border-hairline/70 bg-canvas/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-canvasSoft/60">
            <div className="absolute -top-px -left-px h-4 w-4 border-l border-t border-accent" />
            <div className="absolute -bottom-px -right-px h-4 w-4 border-b border-r border-accent" />
            <div className="mb-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-muted">
                AVAILABLE FOR NEW WORK
              </span>
            </div>
            <p className="font-body text-sm leading-relaxed text-muted">
              Currently booking new engagements. Usually replies within two working days.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}