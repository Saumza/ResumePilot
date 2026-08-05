/*
  Warnings:

  - Changed the type of `startDate` on the `Experience` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "startDate",
ADD COLUMN     "startDate" INTEGER NOT NULL,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;
