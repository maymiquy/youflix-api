-- DropIndex
DROP INDEX "users_id_name_email_idx";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "ActiveStatus" NOT NULL DEFAULT 'IsActive',
ADD COLUMN     "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "users_id_name_email_status_idx" ON "users"("id", "name", "email", "status");
