import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const existing = await prisma.profile.findFirst();

  if (!existing) {
    const created = await prisma.profile.create({ data: body });
    return NextResponse.json(created);
  }

  const updated = await prisma.profile.update({
    where: { id: existing.id },
    data: body
  });
  return NextResponse.json(updated);
}