// app/projects/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProjectDetail from "@/components/ProjectDetail";

export const dynamic = "force-dynamic";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({ where: { id: params.id } });

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-canvas px-6 py-16 text-inkText md:px-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#projects"
          className="mb-10 inline-flex items-center gap-2 font-mono text-xs tracking-wide text-muted transition-colors hover:text-accent"
        >
          ← back to work
        </Link>
        <ProjectDetail project={project} />
      </div>
    </main>
  );
}