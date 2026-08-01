-- CreateTable
CREATE TABLE "Github" (
    "id" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "totalStars" INTEGER NOT NULL,
    "totalLanguages" JSONB NOT NULL,
    "repositories" JSONB NOT NULL,
    "lastSyncedAt" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Github_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Github" ADD CONSTRAINT "Github_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
