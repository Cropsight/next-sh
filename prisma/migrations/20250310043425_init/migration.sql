/*
  Warnings:

  - Added the required column `activeStatus` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `farmerStatus` to the `Farmer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FarmerStatus" AS ENUM ('REGISTERED', 'RESERVED', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Farmer" ADD COLUMN     "activeStatus" "ActiveStatus" NOT NULL,
ADD COLUMN     "farmerStatus" "FarmerStatus" NOT NULL;
