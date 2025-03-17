/*
  Warnings:

  - You are about to alter the column `createdBy` on the `Farmer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `updatedBy` on the `Farmer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - Added the required column `address` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthplace` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmerId` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `idVillage` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `joinDate` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kwd` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urlImage` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `SysUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "birthdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "birthplace" TEXT NOT NULL,
ADD COLUMN     "farmerId" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "idVillage" TEXT NOT NULL,
ADD COLUMN     "joinDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "kwd" TEXT NOT NULL,
ADD COLUMN     "urlImage" TEXT NOT NULL,
ALTER COLUMN "createdBy" SET DATA TYPE INTEGER,
ALTER COLUMN "updatedBy" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "SysUser" ADD COLUMN     "status" SMALLINT NOT NULL;

-- CreateTable
CREATE TABLE "Village" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" SMALLINT NOT NULL,
    "subDistrictId" TEXT NOT NULL,

    CONSTRAINT "Village_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubDistrict" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" SMALLINT NOT NULL,
    "districtId" TEXT NOT NULL,

    CONSTRAINT "SubDistrict_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" SMALLINT NOT NULL,
    "provinceId" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Province" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" SMALLINT NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Farmer" ADD CONSTRAINT "Farmer_idVillage_fkey" FOREIGN KEY ("idVillage") REFERENCES "Village"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Village" ADD CONSTRAINT "Village_subDistrictId_fkey" FOREIGN KEY ("subDistrictId") REFERENCES "SubDistrict"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubDistrict" ADD CONSTRAINT "SubDistrict_districtId_fkey" FOREIGN KEY ("districtId") REFERENCES "District"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "District" ADD CONSTRAINT "District_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
