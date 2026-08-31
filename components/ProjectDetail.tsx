// components/ProjectDetail.tsx
"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  liveUrl?: string | null;
  repoUrl?: string | null;
  featured: boolean;
};

export default function ProjectDetail({ project }: { project: Project }) {
  const tags = project.techStack.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="show">
      <motion.div variants={fadeUp} className="mb-4 flex items-center gap-3">
        {project.featured && (
          <span className="border border-accent/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent">
            featured
          </span>
        )}
        {tags.length > 0 && (
          <p className="font-mono text-[11px] tracking-wide text-muted">
            {tags.join(" · ").toUpperCase()}
          </p>
        )}
      </motion.div>

      <motion.h1 variants={fadeUp} className="mb-8 font-display text-4xl leading-tight text-inkText md:text-5xl">
        {project.title}
      </motion.h1>

      {/* Media: video takes priority over static image */}
      {project.videoUrl ? (
        <motion.div
          variants={fadeUp}
          className="relative mb-10 aspect-video overflow-hidden border border-hairline bg-canvasSoft"
        >
          <video
            src={project.videoUrl}
            controls
            playsInline
            className="h-full w-full"
          >
            Your browser doesn&rsquo;t support embedded video.{" "}
            <a href={project.videoUrl} className="text-accent underline">
              Download the video instead.
            </a>
          </video>
        </motion.div>
      ) : project.imageUrl ? (
        <motion.div
          variants={fadeUp}
          className="relative mb-10 aspect-video overflow-hidden border border-hairline bg-canvasSoft"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </motion.div>
      ) : null}

      <motion.p variants={fadeUp} className="mb-10 max-w-2xl font-body text-lg leading-relaxed text-muted">
        {project.description}
      </motion.p>

      <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 overflow-hidden border border-accent bg-accent px-6 py-3 font-mono text-xs tracking-wide text-canvas transition-transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">VISIT LIVE SITE</span>
            <span className="relative z-10 transition-transform group-hover:translate-x-1">↗</span>
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-hairline px-6 py-3 font-mono text-xs tracking-wide text-inkText transition-colors hover:border-accent hover:text-accent"
          >
            VIEW SOURCE ↗
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}