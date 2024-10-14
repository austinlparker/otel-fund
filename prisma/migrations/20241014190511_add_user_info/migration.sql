-- AlterTable
ALTER TABLE "User" ADD COLUMN     "githubUrl" TEXT,
ADD COLUMN     "paymentLink" TEXT,
ADD COLUMN     "socialLinks" JSONB;
