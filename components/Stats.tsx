// components/Stats.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Stat = { value: string; label: string };

const stats: Stat[] = [
  { value: "03+", label: "years building" },
  { value: "12", label: "projects shipped" },
  { value: "05", label: "technologies mastered" },
  { value: "01", label: "developer & editor, no agency" }
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-t border-hairline">
      {/* subtle grid, quieter than hero */}
      <div className="bg-grid absolute inset-0 -z-30 opacity-30 animate-grid-pulse" />

      {/* soft ambient glow, off-center */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
        <div
          className="absolute right-0 top-1/2 h-[280px] w-[280px] -translate-y-1/2 translate-x-1/3 animate-aurora-spin opacity-10 blur-[60px] md:h-[380px] md:w-[380px] md:opacity-15 md:blur-[90px]"
          style={{
            background:
              "conic-gradient(from 90deg, transparent 0deg, #E8A23D 60deg, transparent 140deg, #F3D67C 220deg, transparent 300deg)"
          }}
        />
      </div>

      {/* vignette to keep edges dark */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(11,12,16,0.9)_100%)]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4 md:gap-0 md:divide-x md:divide-hairline/60"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="group relative cursor-default md:px-6"
          >
            {/* corner brackets, matching hero availability card */}
            <div className="pointer-events-none absolute -top-2 -left-2 h-3 w-3 border-l border-t border-transparent transition-colors duration-200 group-hover:border-accent md:left-4" />
            <div className="pointer-events-none absolute -bottom-2 -right-2 h-3 w-3 border-b border-r border-transparent transition-colors duration-200 group-hover:border-accent" />

            <p className="font-display text-4xl text-inkText transition-colors duration-200 group-hover:text-accent">
              {stat.value}
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-muted">
              <span className="h-1 w-1 rounded-full bg-hairline transition-colors duration-200 group-hover:bg-accent" />
              {stat.label}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}