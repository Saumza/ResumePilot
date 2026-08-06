/*
  Warnings:

  - Made the column `publicId` on table `NormalResume` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "NormalResume" ALTER COLUMN "publicId" SET NOT NULL;
