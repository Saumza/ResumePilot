/*
  Warnings:

  - Added the required column `languages` to the `Github` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `totalLanguages` on the `Github` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Github" ADD COLUMN     "languages" JSONB NOT NULL,
DROP COLUMN "totalLanguages",
ADD COLUMN     "totalLanguages" INTEGER NOT NULL;
