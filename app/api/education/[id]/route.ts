// app/api/education/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const education = await prisma.education.update({
    where: { id: params.id },
    data
  });
  return NextResponse.json(education);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  await prisma.education.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}