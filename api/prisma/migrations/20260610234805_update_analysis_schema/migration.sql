/*
  Warnings:

  - You are about to drop the column `profitPotential` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `Analysis` table. All the data in the column will be lost.
  - The `competition` column on the `Analysis` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "profitPotential",
DROP COLUMN "score",
ADD COLUMN     "bundlingIdeas" JSONB,
ADD COLUMN     "customerInsights" JSONB,
ADD COLUMN     "financials" JSONB,
ADD COLUMN     "keywords" JSONB,
ADD COLUMN     "launchStrategy" JSONB,
ADD COLUMN     "marketDemand" JSONB,
ADD COLUMN     "nextActions" JSONB,
ADD COLUMN     "opportunityScore" INTEGER,
ADD COLUMN     "product" TEXT,
ADD COLUMN     "productImprovements" JSONB,
ADD COLUMN     "productionRequirements" JSONB,
ADD COLUMN     "risks" JSONB,
ADD COLUMN     "sourcing" JSONB,
ADD COLUMN     "verdict" TEXT,
DROP COLUMN "competition",
ADD COLUMN     "competition" JSONB;
