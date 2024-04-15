/*
  Warnings:

  - You are about to drop the column `genre_id` on the `movies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `genres` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_genre_id_fkey";

-- DropIndex
DROP INDEX "movies_id_title_genre_id_rate_year_is_popular_idx";

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "genre_id";

-- CreateTable
CREATE TABLE "_GenreToMovie" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GenreToMovie_AB_unique" ON "_GenreToMovie"("A", "B");

-- CreateIndex
CREATE INDEX "_GenreToMovie_B_index" ON "_GenreToMovie"("B");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "genres"("name");

-- CreateIndex
CREATE INDEX "movies_id_title_rate_year_is_popular_idx" ON "movies"("id", "title", "rate", "year", "is_popular");

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_A_fkey" FOREIGN KEY ("A") REFERENCES "genres"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GenreToMovie" ADD CONSTRAINT "_GenreToMovie_B_fkey" FOREIGN KEY ("B") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
