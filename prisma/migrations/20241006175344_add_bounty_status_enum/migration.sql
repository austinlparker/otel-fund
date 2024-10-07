/*
  Warnings:

  - The `status` column on the `Bounty` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BountyStatus" AS ENUM ('NEW', 'PENDING_MODERATION', 'MODERATION_AUTO_REJECT', 'MODERATION_AUTO_UNSURE', 'MODERATION_AUTO_APPROVE', 'ACTIVE', 'COMPLETED');

-- AlterTable
ALTER TABLE "Bounty" DROP COLUMN "status",
ADD COLUMN     "status" "BountyStatus" NOT NULL DEFAULT 'NEW';
