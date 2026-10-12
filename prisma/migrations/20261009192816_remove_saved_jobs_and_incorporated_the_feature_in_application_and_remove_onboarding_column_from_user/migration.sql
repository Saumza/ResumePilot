/*
  Warnings:

  - You are about to drop the column `isOnboarded` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `SavedJobs` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'Saved';

-- DropForeignKey
ALTER TABLE "SavedJobs" DROP CONSTRAINT "SavedJobs_jobId_fkey";

-- DropForeignKey
ALTER TABLE "SavedJobs" DROP CONSTRAINT "SavedJobs_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isOnboarded";

-- DropTable
DROP TABLE "SavedJobs";
