/*
  Warnings:

  - You are about to drop the column `rawText` on the `NormalResume` table. All the data in the column will be lost.
  - Added the required column `resumeText` to the `NormalResume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NormalResume" DROP COLUMN "rawText",
ADD COLUMN     "resumeText" JSONB NOT NULL;
