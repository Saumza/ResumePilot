/*
  Warnings:

  - Made the column `atsScore` on table `AiTailoredResume` required. This step will fail if there are existing NULL values in that column.
  - Made the column `atsScore` on table `NormalResume` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "AiTailoredResume" ALTER COLUMN "atsScore" SET NOT NULL,
ALTER COLUMN "atsScore" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "NormalResume" ALTER COLUMN "atsScore" SET NOT NULL,
ALTER COLUMN "atsScore" SET DEFAULT 0;
