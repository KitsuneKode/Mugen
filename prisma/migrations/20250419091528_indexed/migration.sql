-- CreateIndex
CREATE INDEX "Brain_share_id_userId_idx" ON "Brain"("share", "id", "userId");

-- CreateIndex
CREATE INDEX "Chat_userId_id_idx" ON "Chat"("userId", "id");

-- CreateIndex
CREATE INDEX "Content_id_idx" ON "Content"("id");

-- CreateIndex
CREATE INDEX "Link_brainId_hash_idx" ON "Link"("brainId", "hash");

-- CreateIndex
CREATE INDEX "Tag_tag_idx" ON "Tag"("tag");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");
