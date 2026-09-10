/*
  Warnings:

  - Added the required column `name` to the `CoverLetter` table without a default value. This is not possible if the table is not empty.
  - Made the column `aiInsights` on table `CoverLetter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoverLetter" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "aiInsights" SET NOT NULL;
