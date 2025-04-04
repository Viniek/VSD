/*
  Warnings:

  - You are about to drop the column `factors` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `testDate` on the `history` table. All the data in the column will be lost.
  - You are about to drop the column `testResult` on the `history` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "history" DROP COLUMN "factors",
DROP COLUMN "testDate",
DROP COLUMN "testResult",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "details" TEXT,
ADD COLUMN     "historyTittle" TEXT;
