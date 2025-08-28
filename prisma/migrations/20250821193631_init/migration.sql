-- CreateTable
CREATE TABLE "public"."Food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "kcalPerServe" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodTag" (
    "foodId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    CONSTRAINT "FoodTag_pkey" PRIMARY KEY ("foodId","tagId")
);

-- CreateTable
CREATE TABLE "public"."AgeBand" (
    "id" TEXT NOT NULL,
    "min" INTEGER NOT NULL,
    "max" INTEGER NOT NULL,
    "focus" TEXT NOT NULL,

    CONSTRAINT "AgeBand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FoodAge" (
    "foodId" TEXT NOT NULL,
    "ageBandId" TEXT NOT NULL,

    CONSTRAINT "FoodAge_pkey" PRIMARY KEY ("foodId","ageBandId")
);

-- CreateTable
CREATE TABLE "public"."Favorite" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "foodId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_key_key" ON "public"."Tag"("key");

-- AddForeignKey
ALTER TABLE "public"."FoodTag" ADD CONSTRAINT "FoodTag_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodTag" ADD CONSTRAINT "FoodTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodAge" ADD CONSTRAINT "FoodAge_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FoodAge" ADD CONSTRAINT "FoodAge_ageBandId_fkey" FOREIGN KEY ("ageBandId") REFERENCES "public"."AgeBand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_foodId_fkey" FOREIGN KEY ("foodId") REFERENCES "public"."Food"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
