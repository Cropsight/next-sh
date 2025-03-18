import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const provinceId = searchParams.get("provinceId");

  if (!provinceId) {
    return NextResponse.json({ error: "Missing provinceId" }, { status: 400 });
  }

  try {
    const districts = await prisma.district.findMany({
      where: { provinceId, status: 1 },
      orderBy: { name: "asc" },
      select: { id: true, name: true },
    });

    return NextResponse.json(districts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch districts" },
      { status: 500 }
    );
  }
}
