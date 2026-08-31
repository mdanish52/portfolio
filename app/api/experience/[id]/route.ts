// app/api/experience/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const experience = await prisma.experience.update({
    where: { id: params.id },
    data
  });
  return NextResponse.json(experience);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.experience.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}