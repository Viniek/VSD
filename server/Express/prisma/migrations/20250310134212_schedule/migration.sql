-- CreateTable
CREATE TABLE "schedule" (
    "id" TEXT NOT NULL,
    "userid" TEXT NOT NULL,
    "hospital" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schedule_id_key" ON "schedule"("id");

-- AddForeignKey
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
