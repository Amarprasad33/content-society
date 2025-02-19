/*
  Warnings:

  - Added the required column `coverLetter` to the `AppliedJob` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AppliedJob" ADD COLUMN     "coverLetter" TEXT NOT NULL;
