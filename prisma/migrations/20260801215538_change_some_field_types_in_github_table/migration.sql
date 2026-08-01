/*
  Warnings:

  - Added the required column `totalPublicRepos` to the `Github` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Github` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Github` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Github" ADD COLUMN     "totalPublicRepos" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
