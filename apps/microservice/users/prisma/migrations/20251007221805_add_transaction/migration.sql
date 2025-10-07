/*
  Warnings:

  - A unique constraint covering the columns `[transaction_id]` on the table `balance` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."balance" ADD COLUMN     "transaction_id" UUID;

-- CreateIndex
CREATE UNIQUE INDEX "balance_transaction_id_key" ON "public"."balance"("transaction_id");
