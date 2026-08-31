// components/ProjectCard.tsx
"use client";

import { motion } from "framer-motion";

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

export default function ProjectCard({ project }: { project: Project }) {
  const tags = project.techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-lg border border-hairline bg-canvasSoft p-6 transition-colors hover:border-accent/60"
    >
      {/* ambient glow on hover */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent/0 blur-2xl transition-colors duration-300 group-hover:bg-accent/15" />

      <div className="relative mb-3 flex items-start justify-between gap-3">
        <h3 className="font-display text-xl text-inkText">{project.title}</h3>
        {project.featured && (
          <span className="whitespace-nowrap rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent">
            featured
          </span>
        )}
      </div>

      <p className="relative mb-4 font-body text-sm leading-relaxed text-muted">
        {project.description}
      </p>

      {tags.length > 0 && (
        <ul className="relative mb-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-hairline px-2 py-0.5 font-mono text-[11px] text-muted transition-colors group-hover:border-hairline/80"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="relative flex gap-4 font-mono text-xs">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-accent underline-offset-4 transition-all hover:gap-1.5 hover:underline"
          >
            live <span aria-hidden>→</span>
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-muted underline-offset-4 transition-all hover:gap-1.5 hover:text-inkText hover:underline"
          >
            source <span aria-hidden>→</span>
          </a>
        )}
      </div>

      {/* corner bracket, consistent with Hero/About signature */}
      <div className="pointer-events-none absolute -top-px -left-px h-3 w-3 border-l border-t border-accent/0 transition-colors duration-300 group-hover:border-accent/70" />
      <div className="pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b border-r border-accent/0 transition-colors duration-300 group-hover:border-accent/70" />
    </motion.article>
  );
}