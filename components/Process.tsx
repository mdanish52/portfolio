// components/Process.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

const stages = [
  {
    stage: "STAGE 1",
    title: "Discovery",
    body: "A short call and a written brief we both agree on before anything gets built."
  },
  {
    stage: "STAGE 2",
    title: "Direction",
    body: "One clear plan for the build, checked against your real requirements and edge cases."
  },
  {
    stage: "STAGE 3",
    title: "Build",
    body: "Production-grade code, built in the open, with regular check-ins along the way."
  },
  {
    stage: "STAGE 4",
    title: "Handoff",
    body: "Clean documentation and a walkthrough so you fully own what's been built."
  }
];

export default function Process() {
  return (
    <section id="process" className="relative border-t border-hairline px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[360px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[110px]"
      />

      <div className="mx-auto max-w-6xl">
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
              04 — ENGAGEMENT
            </p>
            <h2 className="max-w-xl font-display text-4xl leading-tight text-inkText md:text-5xl">
              What working together looks like.
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="max-w-xs font-body text-sm text-muted">
            A typical project runs a few weeks, structured in four stages.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="relative grid border border-hairline sm:grid-cols-2 lg:grid-cols-4"
        >
          {/* connecting line, animates in to reinforce sequence */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
            style={{ originX: 0 }}
            className="pointer-events-none absolute left-0 right-0 top-0 hidden h-px bg-gradient-to-r from-accent/0 via-accent/70 to-accent/0 lg:block"
          />

          {stages.map((s, i) => (
            <motion.div
              key={s.stage}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="group relative border-hairline p-8 transition-colors hover:bg-canvasSoft [&:not(:last-child)]:border-r [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-b-0 lg:[&:nth-child(2)]:border-b-0"
            >
              {/* node on the connecting line */}
              <span className="absolute -top-[3px] left-8 hidden h-[7px] w-[7px] rounded-full bg-hairline transition-colors duration-300 group-hover:bg-accent lg:block" />

              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-xs tracking-wide text-accent">{s.stage}</p>
                <span className="font-display text-2xl text-hairline transition-colors duration-300 group-hover:text-accent/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mb-2 font-display text-xl text-inkText">{s.title}</h3>
              <p className="font-body text-sm leading-relaxed text-muted">{s.body}</p>

              <div className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent/0 transition-colors duration-300 group-hover:border-accent/70" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}