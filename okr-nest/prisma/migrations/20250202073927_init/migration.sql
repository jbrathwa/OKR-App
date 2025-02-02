-- DropForeignKey
ALTER TABLE "KeyResults" DROP CONSTRAINT "KeyResults_objectiveId_fkey";

-- AddForeignKey
ALTER TABLE "KeyResults" ADD CONSTRAINT "KeyResults_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objectives"("id") ON DELETE CASCADE ON UPDATE CASCADE;
