/*
  Warnings:

  - You are about to drop the column `bundlingIdeas` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `competition` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `create_at` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `customerInsights` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `financials` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `keywords` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `launchStrategy` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `marketDemand` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `nextActions` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `productImprovements` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `productionRequirements` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `risks` on the `Analysis` table. All the data in the column will be lost.
  - You are about to drop the column `sourcing` on the `Analysis` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Analysis" DROP COLUMN "bundlingIdeas",
DROP COLUMN "competition",
DROP COLUMN "create_at",
DROP COLUMN "customerInsights",
DROP COLUMN "financials",
DROP COLUMN "keywords",
DROP COLUMN "launchStrategy",
DROP COLUMN "marketDemand",
DROP COLUMN "nextActions",
DROP COLUMN "productImprovements",
DROP COLUMN "productionRequirements",
DROP COLUMN "risks",
DROP COLUMN "sourcing",
ADD COLUMN     "competitionLevel" TEXT,
ADD COLUMN     "demandLevel" TEXT,
ADD COLUMN     "profitPotential" TEXT,
ADD COLUMN     "recommendedMarket" TEXT;
