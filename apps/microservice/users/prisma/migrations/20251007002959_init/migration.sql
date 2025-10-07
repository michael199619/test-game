-- CreateEnum
CREATE TYPE "public"."action" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" UUID NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."balance" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "action" "public"."action" NOT NULL DEFAULT 'INCOME',
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "balance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."balance" ADD CONSTRAINT "balance_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
