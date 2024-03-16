-- CreateEnum
CREATE TYPE "PopularStatus" AS ENUM ('POPULAR', 'NOTPOPULAR');

-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('IsActive', 'NotActive');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "status" "ActiveStatus" NOT NULL DEFAULT 'IsActive',
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movies" (
    "id" BIGSERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "genre_id" INTEGER NOT NULL,
    "img_url" TEXT NOT NULL,
    "director" TEXT NOT NULL,
    "rate" DOUBLE PRECISION NOT NULL,
    "is_popular" "PopularStatus" NOT NULL DEFAULT 'POPULAR',
    "release_date" DATE NOT NULL,
    "year" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_id_name_email_status_idx" ON "users"("id", "name", "email", "status");

-- CreateIndex
CREATE UNIQUE INDEX "genres_id_key" ON "genres"("id");

-- CreateIndex
CREATE INDEX "genres_id_name_idx" ON "genres"("id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "movies_id_key" ON "movies"("id");

-- CreateIndex
CREATE INDEX "movies_id_title_genre_id_rate_year_is_popular_idx" ON "movies"("id", "title", "genre_id", "rate", "year", "is_popular");

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
