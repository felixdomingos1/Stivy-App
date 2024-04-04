/*
  Warnings:

  - You are about to drop the column `type` on the `Reaction` table. All the data in the column will be lost.
  - Added the required column `usuarioID` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Reaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `usuarioID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Reaction` DROP COLUMN `type`,
    ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_usuarioID_fkey` FOREIGN KEY (`usuarioID`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reaction` ADD CONSTRAINT `Reaction_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
