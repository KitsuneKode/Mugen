/*
  Warnings:

  - You are about to drop the column `avatarId` on the `Brain` table. All the data in the column will be lost.
  - Added the required column `avatarId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brain" DROP COLUMN "avatarId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatarId" INTEGER NOT NULL;
