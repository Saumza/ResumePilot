/*
  Warnings:

  - The values [Languages,Platfrom] on the enum `SkillType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SkillType_new" AS ENUM ('Language', 'Framework', 'Tool', 'Platform', 'Domain');
ALTER TABLE "Skill" ALTER COLUMN "skillType" TYPE "SkillType_new" USING ("skillType"::text::"SkillType_new");
ALTER TYPE "SkillType" RENAME TO "SkillType_old";
ALTER TYPE "SkillType_new" RENAME TO "SkillType";
DROP TYPE "public"."SkillType_old";
COMMIT;
