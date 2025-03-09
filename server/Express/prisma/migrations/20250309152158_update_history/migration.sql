/*
  Warnings:

  - Added the required column `testResult` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "history_userId_key";

-- AlterTable
ALTER TABLE "history" DROP COLUMN "testResult",
ADD COLUMN     "testResult" JSONB NOT NULL;
