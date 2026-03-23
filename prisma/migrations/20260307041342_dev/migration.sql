/*
  Warnings:

  - The `aspectRatio` column on the `Project` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "aspectRatio",
ADD COLUMN     "aspectRatio" TEXT NOT NULL DEFAULT '9:16';

-- DropEnum
DROP TYPE "aspectRatioType";
