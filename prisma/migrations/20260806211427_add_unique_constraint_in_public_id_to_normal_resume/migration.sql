/*
  Warnings:

  - A unique constraint covering the columns `[publicId]` on the table `NormalResume` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NormalResume_publicId_key" ON "NormalResume"("publicId");
