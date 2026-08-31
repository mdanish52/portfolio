// app/api/skills/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const skills = await prisma.skill.findMany({
    orderBy: { order: "asc" }
  });
  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  const data = await req.json();
  const skill = await prisma.skill.create({ data });
  return NextResponse.json(skill);
}