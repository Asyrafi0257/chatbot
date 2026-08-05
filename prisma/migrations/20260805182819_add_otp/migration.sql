/*
  Warnings:

  - You are about to drop the column `otpExpiredOtp` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "otpExpiredOtp",
ADD COLUMN     "otpExpiredAt" TIMESTAMP(3);
