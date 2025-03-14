-- CreateTable
CREATE TABLE "_AnalysisTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnalysisTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AnalysisTags_B_index" ON "_AnalysisTags"("B");

-- AddForeignKey
ALTER TABLE "_AnalysisTags" ADD CONSTRAINT "_AnalysisTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Analysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnalysisTags" ADD CONSTRAINT "_AnalysisTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
