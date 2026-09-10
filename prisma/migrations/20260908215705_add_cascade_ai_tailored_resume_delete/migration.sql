-- DropForeignKey
ALTER TABLE "AiTailoredResume" DROP CONSTRAINT "AiTailoredResume_originalResumeId_fkey";

-- AddForeignKey
ALTER TABLE "AiTailoredResume" ADD CONSTRAINT "AiTailoredResume_originalResumeId_fkey" FOREIGN KEY ("originalResumeId") REFERENCES "NormalResume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
