/*
  Warnings:

  - You are about to drop the column `created_at` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_id_name_email_status_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_at",
DROP COLUMN "status",
DROP COLUMN "updated_at";

-- CreateIndex
CREATE INDEX "users_id_name_email_idx" ON "users"("id", "name", "email");
