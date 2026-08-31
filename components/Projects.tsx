// components/Projects.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  videoUrl?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured: boolean;
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="relative border-t border-hairline px-6 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute right-1/4 top-0 -z-10 h-[360px] w-[360px] -translate-y-1/2 rounded-full bg-accent/10 blur-[100px]"
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
              03 — SELECTED WORK
            </p>
            <h2 className="max-w-xl font-display text-4xl leading-tight text-inkText md:text-5xl">
              A few projects worth showing.
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="max-w-xs font-body text-sm text-muted">
            Product builds, front-end systems and tools from recent work.
          </motion.p>
        </motion.div>

        {projects.length === 0 ? (
          <p className="text-muted">No projects yet — add some from the admin dashboard.</p>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid border border-hairline sm:grid-cols-2"
          >
            {projects.map((project, i) => {
              const tags = project.techStack.split(",").map((t) => t.trim()).filter(Boolean);
              return (
                <motion.a
                  key={project.id}
                  href={`/projects/${project.id}`}
                  variants={fadeUp}
                  whileHover="hover"
                  className={`group relative flex flex-col justify-between gap-8 overflow-hidden border-hairline p-8 transition-colors hover:bg-canvasSoft ${i % 2 === 0 ? "sm:border-r" : ""
                    } border-b`}
                >
                  {/* sweep glow on hover */}
                  <motion.div
                    variants={{ hover: { opacity: 1, scale: 1.15 } }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-3xl"
                  />

                  <div className="relative flex items-start justify-between">
                    <p className="font-mono text-[11px] tracking-wide text-muted">
                      {project.featured ? "FEATURED" : `PROJECT · ${String(i + 1).padStart(2, "0")}`}
                    </p>
                    <motion.span
                      variants={{ hover: { rotate: 45, borderColor: "rgb(232 162 61)", color: "rgb(232 162 61)" } }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center border border-hairline font-mono text-sm text-muted"
                    >
                      ↗
                    </motion.span>
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-2xl leading-snug text-inkText">
                      {project.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                  </div>

                  {tags.length > 0 && (
                    <p className="relative font-mono text-[11px] tracking-wide text-muted">
                      {tags.join(" · ").toUpperCase()}
                    </p>
                  )}
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}