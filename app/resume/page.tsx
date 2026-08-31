// app/resume/page.tsx
import { prisma } from "@/lib/prisma";
import PrintButton from "@/components/PrintButton";
import Link from "next/link";
import type { Skill } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function ResumePage() {
  const [profile, experience, education, skills] = await Promise.all([
    prisma.profile.findFirst(),
    prisma.experience.findMany({ orderBy: { order: "asc" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
    prisma.skill.findMany({ orderBy: { order: "asc" } })
  ]);

  if (!profile) {
    return (
      <main className="min-h-screen bg-canvas px-6 py-16 text-inkText">
        <p className="font-mono text-sm text-muted">Profile not set up yet.</p>
      </main>
    );
  }

  const skillGroups = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const key = skill.category || "Other";
    acc[key] = acc[key] || [];
    acc[key].push(skill);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-canvas px-6 py-16 text-inkText md:px-16 print:bg-white print:px-0 print:py-8 print:text-black">
      <div className="mx-auto max-w-3xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted transition-colors hover:text-accent print:hidden"
        >
          ← back to site
        </Link>

        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 border-b border-hairline pb-8 print:border-black/20 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-4xl text-inkText print:text-black">{profile.name}</h1>
            <p className="mt-1 font-mono text-sm text-muted print:text-black/70">{profile.title}</p>
          </div>
          <div className="flex gap-3 print:hidden">
            <PrintButton />
            {/* {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="inline-flex items-center gap-2 border border-accent bg-accent px-5 py-2.5 font-mono text-xs tracking-wide text-canvas transition-opacity hover:opacity-90"
              >
                DOWNLOAD PDF
              </a>
            )} */}
          </div>
        </div>

        {/* Contact line */}
        <div className="mb-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted print:text-black/70">
          <a href={`mailto:${profile.email}`} className="hover:text-accent print:text-black/70">
            {profile.email}
          </a>
          {profile.location && <span>{profile.location}</span>}
          {profile.githubUrl && (
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent print:text-black/70"
            >
              GitHub ↗
            </a>
          )}
          {profile.linkedinUrl && (
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent print:text-black/70"
            >
              LinkedIn ↗
            </a>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <section className="mb-12">
            <p className="max-w-2xl font-body text-base leading-relaxed text-muted print:text-black/80">
              {profile.bio}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-12">
            <p className="mb-6 font-mono text-xs tracking-wide text-accent print:text-black">EXPERIENCE</p>
            <div className="flex flex-col gap-8">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-xl text-inkText print:text-black">
                      {exp.role} · {exp.company}
                    </h3>
                    <span className="font-mono text-xs text-muted print:text-black/60">
                      {exp.startDate} — {exp.endDate || "Present"}
                    </span>
                  </div>
                  <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-muted print:text-black/80">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-12">
            <p className="mb-6 font-mono text-xs tracking-wide text-accent print:text-black">EDUCATION</p>
            <div className="flex flex-col gap-6">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                    <h3 className="font-display text-xl text-inkText print:text-black">
                      {edu.degree} · {edu.school}
                    </h3>
                    <span className="font-mono text-xs text-muted print:text-black/60">
                      {edu.startDate} — {edu.endDate || "Present"}
                    </span>
                  </div>
                  {edu.description && (
                    <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-muted print:text-black/80">
                      {edu.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-12">
            <p className="mb-6 font-mono text-xs tracking-wide text-accent print:text-black">SKILLS</p>
            <div className="flex flex-col gap-3">
              {Object.entries(skillGroups).map(([category, group]) => (
                <div key={category} className="flex flex-wrap gap-x-2 font-body text-sm text-muted print:text-black/80">
                  <span className="font-mono text-xs uppercase tracking-wide text-inkText print:text-black">
                    {category}:
                  </span>
                  <span>{group.map((s) => s.name).join(", ")}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main >
  );
}