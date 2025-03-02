-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "disability" TEXT NOT NULL,
    "maritual_status" TEXT NOT NULL DEFAULT 'single',
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "next_of_kin" TEXT,
    "next_of_kin_phone" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "users_id_key" ON "users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
