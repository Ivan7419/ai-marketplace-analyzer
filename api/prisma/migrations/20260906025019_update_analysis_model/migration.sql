/*
  Warnings:

  - You are about to drop the column `competitionLevel` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `demandLevel` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `opportunityScore` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `product` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `profitPotential` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `recommendedMarket` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `verdict` on the `Analysis` table. All the data in the column will be lost.
  - Added the required column `businessModel` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `market` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketplace` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Analysis` table without a default value. This is not possible if the table is not empty.
  - Made the column `result` on table `Analysis` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "competitionLevel",
DROP COLUMN "demandLevel",
DROP COLUMN "opportunityScore",
DROP COLUMN "product",
DROP COLUMN "profitPotential",
DROP COLUMN "recommendedMarket",
DROP COLUMN "verdict",
ADD COLUMN     "businessModel" TEXT NOT NULL,
ADD COLUMN     "market" TEXT NOT NULL,
ADD COLUMN     "marketplace" TEXT NOT NULL,
ADD COLUMN     "targets" JSONB,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "result" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Analysis_createdAt_idx" ON "Analysis"("createdAt");

-- CreateIndex
CREATE INDEX "Analysis_marketplace_idx" ON "Analysis"("marketplace");

-- CreateIndex
CREATE INDEX "Analysis_market_idx" ON "Analysis"("market");
