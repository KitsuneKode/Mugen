/*
  Warnings:

  - You are about to drop the column `hash` on the `Brain` table. All the data in the column will be lost.
  - You are about to drop the column `share` on the `Content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[linkId]` on the table `Brain` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Brain" DROP COLUMN "hash",
ADD COLUMN     "linkId" INTEGER,
ADD COLUMN     "share" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "share";

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "brainId" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_id_key" ON "Link"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Link_brainId_key" ON "Link"("brainId");

-- CreateIndex
CREATE UNIQUE INDEX "Brain_linkId_key" ON "Brain"("linkId");

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_brainId_fkey" FOREIGN KEY ("brainId") REFERENCES "Brain"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
