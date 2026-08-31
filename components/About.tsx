// components/About.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function About({
  bio,
  location,
  skills
}: {
  bio: string;
  location?: string | null;
  skills: string[];
}) {
  return (
    <section id="about" className="relative overflow-hidden border-t border-hairline px-6 py-24">
      {/* subtle grid, quieter than hero */}
      <div className="bg-grid absolute inset-0 -z-30 opacity-30 animate-grid-pulse" />

      {/* ambient glow — upgraded to the rotating aurora wash, positioned top-left */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute left-1/4 top-0 h-[300px] w-[300px] -translate-y-1/2 animate-aurora-spin opacity-15 blur-[70px] md:h-[420px] md:w-[420px] md:opacity-20 md:blur-[100px]"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, #E8A23D 60deg, transparent 140deg, #F3D67C 220deg, transparent 300deg)"
          }}
        />
      </div>

      {/* second, quieter glow bottom-right for balance */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-[-5%] -z-20 h-[280px] w-[280px] translate-y-1/3 rounded-full bg-amber-soft/8 blur-[90px]"
      />

      {/* vignette to keep edges dark and text legible */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(11,12,16,0.9)_100%)]" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end"
        >
          <motion.div variants={fadeUp}>
            <p className="mb-4 flex items-center gap-3 font-mono text-xs tracking-wide text-accent">
              <span className="inline-block h-px w-8 bg-accent" />
              02 — ABOUT
            </p>
            <h2 className="max-w-xl font-display text-4xl leading-tight text-inkText md:text-5xl">
              How I work, and what I reach for.
            </h2>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-12 md:grid-cols-[1fr_1.4fr]"
        >
          {/* portrait panel */}
          <motion.div
            variants={fadeUp}
            whileHover="hover"
            className="group relative aspect-square overflow-hidden border border-hairline bg-canvasSoft"
          >
            <motion.div
              variants={{ hover: { scale: 1.04 } }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-grid absolute inset-0"
            />

            {/* scan-line sweep on hover */}
            <motion.div
              variants={{
                hover: { y: ["-100%", "220%"] }
              }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-accent/15 to-transparent"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                variants={{ hover: { rotate: 90 } }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative flex h-24 w-24 items-center justify-center rounded-full border border-accent/50"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              </motion.div>
            </div>

            {/* corner brackets */}
            <div className="absolute left-3 top-3 h-4 w-4 border-l border-t border-accent/60 transition-colors duration-300 group-hover:border-accent" />
            <div className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-accent/60 transition-colors duration-300 group-hover:border-accent" />

            <p className="absolute bottom-4 left-4 font-mono text-[11px] text-muted">
              FIG. 01 — PORTRAIT_PLACEHOLDER.SVG
            </p>
          </motion.div>

          {/* copy + skills */}
          <motion.div variants={fadeUp}>
            <p className="max-w-2xl font-body text-lg leading-relaxed text-muted">{bio}</p>

            {location && (
              <p className="mt-6 flex items-center gap-2 font-mono text-sm text-inkText">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {location}
              </p>
            )}

            {skills.length > 0 && (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                className="mt-8 flex flex-wrap gap-3"
              >
                {skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={fadeUp}
                    whileHover={{ y: -3, borderColor: "rgb(232 162 61 / 0.6)" }}
                    transition={{ duration: 0.2 }}
                    className="cursor-default border border-hairline px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:text-accent"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}