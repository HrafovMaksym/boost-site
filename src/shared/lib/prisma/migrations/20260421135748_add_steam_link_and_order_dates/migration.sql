-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "completed_at" TIMESTAMP(3),
ADD COLUMN     "started_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "steam_link" TEXT;
