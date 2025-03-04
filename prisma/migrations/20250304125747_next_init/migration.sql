-- AlterTable
ALTER TABLE "_ContentToTags" ADD CONSTRAINT "_ContentToTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ContentToTags_AB_unique";

-- AlterTable
ALTER TABLE "_TagsToUser" ADD CONSTRAINT "_TagsToUser_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_TagsToUser_AB_unique";
