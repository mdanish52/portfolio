// app/api/skills/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const skill = await prisma.skill.update({
    where: { id: params.id },
    data
  });
  return NextResponse.json(skill);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.skill.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}