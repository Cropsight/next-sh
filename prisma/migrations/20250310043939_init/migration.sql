-- DropForeignKey
ALTER TABLE "District" DROP CONSTRAINT "District_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Farmer" DROP CONSTRAINT "Farmer_idVillage_fkey";

-- DropForeignKey
ALTER TABLE "SubDistrict" DROP CONSTRAINT "SubDistrict_districtId_fkey";

-- DropForeignKey
ALTER TABLE "Village" DROP CONSTRAINT "Village_subDistrictId_fkey";

-- AddForeignKey
ALTER TABLE "Farmer" ADD CONSTRAINT "Farmer_idVillage_fkey" FOREIGN KEY ("idVillage") REFERENCES "Village"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_subDistrictId_fkey" FOREIGN KEY ("subDistrictId") REFERENCES "SubDistrict"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubDistrict" ADD CONSTRAINT "SubDistrict_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;
