/*
  Warnings:

  - Added the required column `rawText` to the `NormalResume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NormalResume" ADD COLUMN     "rawText" TEXT NOT NULL;
