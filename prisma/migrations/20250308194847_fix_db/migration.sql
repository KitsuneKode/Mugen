/*
  Warnings:

  - You are about to drop the column `linkId` on the `Brain` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Brain_linkId_key";

-- AlterTable
ALTER TABLE "Brain" DROP COLUMN "linkId";
