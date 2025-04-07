import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const provinceId = url.searchParams.get("provinceId");
    const districtId = url.searchParams.get("districtId");
    const icsId = url.searchParams.get("id");

    console.log("Fetching ICS for:", { provinceId, districtId, icsId });

    // 1️⃣ Jika ada ICS ID, langsung cari berdasarkan ID
    if (icsId) {
      const ics = await prisma.ics.findUnique({
        where: { id: parseInt(icsId) },
      });
      return ics
        ? NextResponse.json([ics], { status: 200 })
        : NextResponse.json({ message: "ICS not found" }, { status: 404 });
    }

    // 2️⃣ Jika tidak ada ICS ID, buat filter berdasarkan Province & District
    let whereClause: any = { status: 1 };

    if (provinceId) {
      // Cari daftar District berdasarkan Province
      const districts = await prisma.district.findMany({
        where: { provinceId },
        select: { id: true },
      });
      const districtIds = districts.map((d) => d.id);

      // Cari SubDistrict berdasarkan District yang ditemukan
      const subdistricts = await prisma.subDistrict.findMany({
        where: { districtId: { in: districtIds } },
        select: { id: true },
      });
      whereClause.subDistrictId = { in: subdistricts.map((sd) => sd.id) };
    }

    if (districtId) {
      // Cari SubDistrict berdasarkan District
      const subdistricts = await prisma.subDistrict.findMany({
        where: { districtId },
        select: { id: true },
      });
      whereClause.subDistrictId = { in: subdistricts.map((sd) => sd.id) };
    }

    // 3️⃣ Ambil data ICS berdasarkan filter
    const icsData = await prisma.ics.findMany({ where: whereClause });
    return NextResponse.json(icsData, { status: 200 });
  } catch (error) {
    console.error("Error fetching ICS:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
