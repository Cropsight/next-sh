import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Pastikan ini benar

export async function GET() {
  const { userId } = auth();

  console.log("User ID dari Clerk:", userId); // Debugging

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userData = await prisma.sysuser.findUnique({
      where: { uid: userId },
    });

    console.log("Data User dari DB:", userData); // Debugging

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error("Error di API getUser:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}