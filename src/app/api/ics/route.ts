import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Pastikan path benar

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const districtId = url.searchParams.get("districtId");

        console.log("Fetching ICS for District ID:", districtId);

        if (!districtId) {
            return NextResponse.json({ error: "District ID is required" }, { status: 400 });
        }

        // JANGAN konversi districtId ke number karena di database bertipe string
        const subdistricts = await prisma.subDistrict.findMany({
            where: { districtId: districtId }, // districtId tetap string
            select: { id: true }
        });

        if (!subdistricts || subdistricts.length === 0) {
            return NextResponse.json({ message: "No subdistricts found for this district" }, { status: 404 });
        }

        const subdistrictIds = subdistricts.map(sub => sub.id);
        console.log("Subdistrict IDs:", subdistrictIds);

        // 2. Cari ICS berdasarkan subDistrictId
        const icsData = await prisma.ics.findMany({
            where: { subDistrictId: { in: subdistrictIds } },
        });

        console.log("ICS Data:", icsData);

        if (!icsData || icsData.length === 0) {
            return NextResponse.json({ message: "No ICS found" }, { status: 404 });
        }

        return NextResponse.json(icsData, { status: 200 });
    } catch (error) {
        console.error("Error fetching ICS:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}