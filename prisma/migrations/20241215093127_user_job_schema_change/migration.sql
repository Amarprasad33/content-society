-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "experience" TEXT,
ADD COLUMN     "requiredSkills" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "experience" TEXT,
ADD COLUMN     "portfolioUrl" TEXT,
ADD COLUMN     "skills" TEXT[];

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
