-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_coverLetterId_fkey";

-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "CoverLetter" DROP CONSTRAINT "CoverLetter_jobId_fkey";

-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "resumeId" DROP NOT NULL,
ALTER COLUMN "coverLetterId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CoverLetter" ALTER COLUMN "jobId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "AiTailoredResume"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_coverLetterId_fkey" FOREIGN KEY ("coverLetterId") REFERENCES "CoverLetter"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoverLetter" ADD CONSTRAINT "CoverLetter_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
