/*
  Warnings:

  - You are about to drop the `ExperienceDescription` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `description` to the `Experience` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExperienceDescription" DROP CONSTRAINT "ExperienceDescription_experienceId_fkey";

-- AlterTable
ALTER TABLE "Experience" ADD COLUMN     "description" JSONB NOT NULL;

-- DropTable
DROP TABLE "ExperienceDescription";
