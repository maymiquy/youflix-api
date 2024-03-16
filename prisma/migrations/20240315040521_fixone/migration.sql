/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(12)`.
  - Added the required column `fullname` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_id_name_email_status_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name",
ADD COLUMN     "fullname" VARCHAR(100) NOT NULL,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(12);

-- CreateIndex
CREATE INDEX "users_id_fullname_email_status_idx" ON "users"("id", "fullname", "email", "status");
