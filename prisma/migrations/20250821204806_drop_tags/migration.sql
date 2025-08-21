/*
  Warnings:

  - You are about to drop the `FoodTag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."FoodTag" DROP CONSTRAINT "FoodTag_foodId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FoodTag" DROP CONSTRAINT "FoodTag_tagId_fkey";

-- DropTable
DROP TABLE "public"."FoodTag";

-- DropTable
DROP TABLE "public"."Tag";
