/*
  Warnings:

  - You are about to drop the column `userId` on the `Bounty` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userEmail,bountyId]` on the table `Vote` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repoLink` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Bounty" DROP CONSTRAINT "Bounty_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vote" DROP CONSTRAINT "Vote_userId_fkey";

-- DropIndex
DROP INDEX "Vote_userId_bountyId_key";

-- AlterTable
ALTER TABLE "Bounty" DROP COLUMN "userId",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "repoLink" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Vote" DROP COLUMN "userId",
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BountyToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_BountyToTag_AB_unique" ON "_BountyToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BountyToTag_B_index" ON "_BountyToTag"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Vote_userEmail_bountyId_key" ON "Vote"("userEmail", "bountyId");

-- AddForeignKey
ALTER TABLE "_BountyToTag" ADD CONSTRAINT "_BountyToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Bounty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BountyToTag" ADD CONSTRAINT "_BountyToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
