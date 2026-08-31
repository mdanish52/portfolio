import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const project = await prisma.project.update({
    where: { id: params.id },
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
  return NextResponse.json(project);
}

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.project.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
