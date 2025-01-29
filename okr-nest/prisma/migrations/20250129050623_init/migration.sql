-- CreateTable
CREATE TABLE "Objectives" (
    "id" TEXT NOT NULL,
    "objective" TEXT NOT NULL,

    CONSTRAINT "Objectives_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyResults" (
    "id" TEXT NOT NULL,
    "objectiveId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "initialValue" INTEGER NOT NULL,
    "currentValue" INTEGER NOT NULL,
    "targetValue" INTEGER NOT NULL,
    "metric" TEXT NOT NULL,

    CONSTRAINT "KeyResults_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KeyResults" ADD CONSTRAINT "KeyResults_objectiveId_fkey" FOREIGN KEY ("objectiveId") REFERENCES "Objectives"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
