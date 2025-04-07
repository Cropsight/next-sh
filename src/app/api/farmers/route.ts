import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const provinceId = url.searchParams.get("provinceId");
    const districtId = url.searchParams.get("districtId");
    const icsId = url.searchParams.get("id");

    console.log("Fetching Farmers Count for:", {
      provinceId,
      districtId,
      icsId,
    });

    let whereClause: any = {};

    if (provinceId) {
      const districts = await prisma.district.findMany({
        where: { provinceId },
        select: { id: true },
      });

      const districtIds = districts.map((d) => d.id);
      const subdistricts = await prisma.subDistrict.findMany({
        where: { districtId: { in: districtIds } },
        select: { id: true },
      });

      const villages = await prisma.village.findMany({
        where: { subDistrictId: { in: subdistricts.map((s) => s.id) } },
        select: { id: true },
      });

      whereClause.idVillage = { in: villages.map((v) => v.id) };
    }

    if (districtId) {
      const subdistricts = await prisma.subDistrict.findMany({
        where: { districtId },
        select: { id: true },
      });

      const villages = await prisma.village.findMany({
        where: { subDistrictId: { in: subdistricts.map((s) => s.id) } },
        select: { id: true },
      });

      whereClause.idVillage = { in: villages.map((v) => v.id) };
    }

    if (icsId) {
      whereClause.idIcs = parseInt(icsId);
    }

    const farmerCount = await prisma.farmer.count({ where: whereClause });

    console.log("Where Clause:", whereClause);
    console.log("Total Farmers:", farmerCount);

    return NextResponse.json({ count: farmerCount }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Farmers:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
