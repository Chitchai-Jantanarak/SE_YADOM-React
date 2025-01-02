-- AlterTable
ALTER TABLE `user` ADD COLUMN `resetToken` VARCHAR(191) NULL,
    ADD COLUMN `resetTokenExpiry` DATETIME(3) NULL;
