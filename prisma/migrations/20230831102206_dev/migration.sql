/*
  Warnings:

  - Added the required column `author` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authorImage` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "authorImage" TEXT NOT NULL;