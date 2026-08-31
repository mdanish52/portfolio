// app/api/education/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const education = await prisma.education.findMany({
    orderBy: { order: "asc" }
  });
  return NextResponse.json(education);
}

export async function POST(req: Request) {
  const data = await req.json();
  const education = await prisma.education.create({ data });
  return NextResponse.json(education);
}