/*
  Warnings:

  - You are about to drop the column `name` on the `obituary` table. All the data in the column will be lost.
  - Added the required column `deceased` to the `Obituary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `obituary` DROP COLUMN `name`,
    ADD COLUMN `deceased` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Condolence` (
    `id` VARCHAR(191) NOT NULL,
    `obituaryId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Condolence` ADD CONSTRAINT `Condolence_obituaryId_fkey` FOREIGN KEY (`obituaryId`) REFERENCES `Obituary`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
