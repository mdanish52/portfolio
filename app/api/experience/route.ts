// app/api/experience/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const experience = await prisma.experience.findMany({
    orderBy: { order: "asc" }
  });
  return NextResponse.json(experience);
}

export async function POST(req: Request) {
  const data = await req.json();
  const experience = await prisma.experience.create({ data });
  return NextResponse.json(experience);
}