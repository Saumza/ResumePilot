/*
  Warnings:

  - You are about to drop the column `coverLetterUrl` on the `CoverLetter` table. All the data in the column will be lost.
  - Added the required column `coverLetterData` to the `CoverLetter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoverLetter" DROP COLUMN "coverLetterUrl",
ADD COLUMN     "coverLetterData" JSONB NOT NULL;
