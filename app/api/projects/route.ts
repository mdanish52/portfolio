import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: [{ featured: "desc" }, { order: "asc" }]
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const project = await prisma.project.create({
    data: {
      title: body.title,
      description: body.description,
      techStack: body.techStack ?? "",
      imageUrl: body.imageUrl || null,
      liveUrl: body.liveUrl || null,
      repoUrl: body.repoUrl || null,
      featured: Boolean(body.featured),
      order: Number(body.order ?? 0)
    }
  });
  return NextResponse.json(project, { status: 201 });
}
