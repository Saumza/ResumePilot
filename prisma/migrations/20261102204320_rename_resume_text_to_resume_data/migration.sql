/*
Warnings:

- You are about to drop the column `resumeText` on the `NormalResume` table. All the data in the column will be lost.
- Added the required column `resumeData` to the `NormalResume` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NormalResume"
RENAME COLUMN "resumeText" to "resumeData"