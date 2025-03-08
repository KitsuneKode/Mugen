-- DropIndex
DROP INDEX "Brain_userId_key";

-- CreateTable
CREATE TABLE "_BrainToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BrainToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BrainToTag_B_index" ON "_BrainToTag"("B");

-- AddForeignKey
ALTER TABLE "_BrainToTag" ADD CONSTRAINT "_BrainToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Brain"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BrainToTag" ADD CONSTRAINT "_BrainToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
