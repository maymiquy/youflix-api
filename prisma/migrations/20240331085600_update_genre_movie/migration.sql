/*
  Warnings:

  - The primary key for the `genres` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `movies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_genre_id_fkey";

-- DropIndex
DROP INDEX "users_id_fullname_email_status_idx";

-- AlterTable
ALTER TABLE "genres" DROP CONSTRAINT "genres_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "genres_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "genres_id_seq";

-- AlterTable
ALTER TABLE "movies" DROP CONSTRAINT "movies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "genre_id" SET DATA TYPE TEXT,
ALTER COLUMN "rate" SET DATA TYPE TEXT,
ALTER COLUMN "year" SET DATA TYPE TEXT,
ADD CONSTRAINT "movies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "movies_id_seq";

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE TEXT,
ALTER COLUMN "updated_at" DROP DEFAULT,
ALTER COLUMN "fullname" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "users_id_seq";

-- CreateIndex
CREATE INDEX "users_id_fullname_email_idx" ON "users"("id", "fullname", "email");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
