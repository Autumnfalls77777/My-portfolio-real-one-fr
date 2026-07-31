-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" UUID NOT NULL,
    "key" TEXT NOT NULL DEFAULT 'global',
    "heroImageUrl" TEXT,
    "heroAltText" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SiteSettings_key_key" ON "SiteSettings"("key");

-- AlterTable
ALTER TABLE "SoftwareProject" ADD COLUMN "techStack" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "SoftwareProject" ADD COLUMN "thumbnailUrl" TEXT;

-- AlterTable
ALTER TABLE "DesignProject" ADD COLUMN "tags" TEXT[] DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "DesignProject" ADD COLUMN "thumbnailUrl" TEXT;
