/*
  Warnings:

  - You are about to drop the column `resumeUrl` on the `AiTailoredResume` table. All the data in the column will be lost.
  - Added the required column `resumeData` to the `AiTailoredResume` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AiTailoredResume" DROP CONSTRAINT "AiTailoredResume_jobId_fkey";

-- AlterTable
ALTER TABLE "AiTailoredResume" DROP COLUMN "resumeUrl",
ADD COLUMN     "jobDescription" TEXT,
ADD COLUMN     "resumeData" JSONB NOT NULL,
ALTER COLUMN "jobId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AiTailoredResume" ADD CONSTRAINT "AiTailoredResume_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
