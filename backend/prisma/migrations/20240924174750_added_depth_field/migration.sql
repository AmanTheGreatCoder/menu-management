/*
  Warnings:

  - Added the required column `depth` to the `menu_item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "menu_item" ADD COLUMN     "depth" INTEGER NOT NULL;
