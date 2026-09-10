/*
  Warnings:

  - Changed the type of `coverLetterUrl` on the `CoverLetter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CoverLetter" ADD COLUMN     "jobDescription" TEXT,
DROP COLUMN "coverLetterUrl",
ADD COLUMN     "coverLetterUrl" JSONB NOT NULL;
