-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "MediaResourceType" AS ENUM ('IMAGE', 'VIDEO', 'RAW', 'AUTO');

-- CreateEnum
CREATE TYPE "MediaRole" AS ENUM ('THUMBNAIL', 'GALLERY', 'COVER', 'OG_IMAGE', 'VIDEO', 'ATTACHMENT');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('INTERNSHIP', 'FULL_TIME', 'PART_TIME', 'FREELANCE', 'CONTRACT');

-- CreateEnum
CREATE TYPE "ResumeType" AS ENUM ('RESUME', 'CV');

-- CreateEnum
CREATE TYPE "ContactReason" AS ENUM ('PROJECT', 'JOB', 'COLLABORATION', 'GENERAL');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "isEmailVerified" BOOLEAN NOT NULL DEFAULT false,
    "lastLoginAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtpCode" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "email" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "consumedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OtpCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" UUID NOT NULL,
    "cloudinaryId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "secureUrl" TEXT NOT NULL,
    "resourceType" "MediaResourceType" NOT NULL DEFAULT 'IMAGE',
    "format" TEXT,
    "mimeType" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "bytes" BIGINT,
    "duration" DOUBLE PRECISION,
    "altText" TEXT,
    "caption" TEXT,
    "folder" TEXT NOT NULL,
    "uploadedById" UUID,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "color" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftwareProject" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "category" TEXT,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "complexity" TEXT,
    "githubUrl" TEXT,
    "liveDemoUrl" TEXT,
    "problemStatement" TEXT,
    "solution" TEXT,
    "features" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "challenges" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "futureImprovements" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "completionDate" TIMESTAMP(3),
    "displayDate" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "canonicalUrl" TEXT,
    "thumbnailId" UUID,
    "ogImageId" UUID,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "SoftwareProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SoftwareProjectTag" (
    "projectId" UUID NOT NULL,
    "tagId" UUID NOT NULL,

    CONSTRAINT "SoftwareProjectTag_pkey" PRIMARY KEY ("projectId","tagId")
);

-- CreateTable
CREATE TABLE "SoftwareProjectMedia" (
    "projectId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "role" "MediaRole" NOT NULL DEFAULT 'GALLERY',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SoftwareProjectMedia_pkey" PRIMARY KEY ("projectId","mediaId","role")
);

-- CreateTable
CREATE TABLE "DesignProject" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "category" TEXT,
    "status" "Status" NOT NULL DEFAULT 'DRAFT',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "client" TEXT,
    "designProcess" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "softwareUsed" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "colorPalette" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "typographySpecs" TEXT,
    "learnings" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "caseStudyUrl" TEXT,
    "completionDate" TIMESTAMP(3),
    "displayDate" TEXT,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "seoTitle" TEXT,
    "seoDescription" TEXT,
    "seoKeywords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "canonicalUrl" TEXT,
    "thumbnailId" UUID,
    "ogImageId" UUID,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "DesignProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignProjectMedia" (
    "projectId" UUID NOT NULL,
    "mediaId" UUID NOT NULL,
    "role" "MediaRole" NOT NULL DEFAULT 'GALLERY',
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "DesignProjectMedia_pkey" PRIMARY KEY ("projectId","mediaId","role")
);

-- CreateTable
CREATE TABLE "CareerExperience" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "companyLogoUrl" TEXT,
    "employmentType" "EmploymentType" NOT NULL,
    "isInternship" BOOLEAN NOT NULL DEFAULT false,
    "duration" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "location" TEXT,
    "description" TEXT NOT NULL,
    "learnings" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "recommended" BOOLEAN NOT NULL DEFAULT false,
    "recommendationText" TEXT,
    "recommendationAuthor" TEXT,
    "recommendationRole" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "CareerExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "issuer" TEXT,
    "issuedAt" TIMESTAMP(3),
    "displayDate" TEXT,
    "description" TEXT,
    "credentialUrl" TEXT,
    "mediaId" UUID,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Certificate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeDocument" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "type" "ResumeType" NOT NULL,
    "version" TEXT,
    "mediaId" UUID,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "downloadCount" INTEGER NOT NULL DEFAULT 0,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ResumeDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OfferLetter" (
    "id" UUID NOT NULL,
    "company" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "offeredAt" TIMESTAMP(3),
    "displayDate" TEXT,
    "description" TEXT,
    "mediaId" UUID,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "OfferLetter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Achievement" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT,
    "year" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowcaseItem" (
    "id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "linkUrl" TEXT,
    "mediaId" UUID,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ShowcaseItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "role" TEXT,
    "company" TEXT,
    "quote" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "level" TEXT,
    "icon" TEXT,
    "category" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TechTool" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT,
    "color" TEXT,
    "status" "Status" NOT NULL DEFAULT 'PUBLISHED',
    "order" INTEGER NOT NULL DEFAULT 0,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "TechTool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "reason" "ContactReason",
    "message" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "submissionHash" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "isSpam" BOOLEAN NOT NULL DEFAULT false,
    "repliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" UUID NOT NULL,
    "userId" UUID,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "before" JSONB,
    "after" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_expiresAt_idx" ON "RefreshToken"("expiresAt");

-- CreateIndex
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");

-- CreateIndex
CREATE INDEX "PasswordResetToken_expiresAt_idx" ON "PasswordResetToken"("expiresAt");

-- CreateIndex
CREATE INDEX "OtpCode_email_purpose_idx" ON "OtpCode"("email", "purpose");

-- CreateIndex
CREATE INDEX "OtpCode_expiresAt_idx" ON "OtpCode"("expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "Media_cloudinaryId_key" ON "Media"("cloudinaryId");

-- CreateIndex
CREATE INDEX "Media_folder_idx" ON "Media"("folder");

-- CreateIndex
CREATE INDEX "Media_resourceType_idx" ON "Media"("resourceType");

-- CreateIndex
CREATE INDEX "Media_createdAt_idx" ON "Media"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_slug_key" ON "Tag"("slug");

-- CreateIndex
CREATE INDEX "Tag_slug_idx" ON "Tag"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SoftwareProject_slug_key" ON "SoftwareProject"("slug");

-- CreateIndex
CREATE INDEX "SoftwareProject_slug_idx" ON "SoftwareProject"("slug");

-- CreateIndex
CREATE INDEX "SoftwareProject_status_idx" ON "SoftwareProject"("status");

-- CreateIndex
CREATE INDEX "SoftwareProject_featured_idx" ON "SoftwareProject"("featured");

-- CreateIndex
CREATE INDEX "SoftwareProject_category_idx" ON "SoftwareProject"("category");

-- CreateIndex
CREATE INDEX "SoftwareProject_publishedAt_idx" ON "SoftwareProject"("publishedAt");

-- CreateIndex
CREATE INDEX "SoftwareProject_createdAt_idx" ON "SoftwareProject"("createdAt");

-- CreateIndex
CREATE INDEX "SoftwareProjectMedia_order_idx" ON "SoftwareProjectMedia"("order");

-- CreateIndex
CREATE UNIQUE INDEX "DesignProject_slug_key" ON "DesignProject"("slug");

-- CreateIndex
CREATE INDEX "DesignProject_slug_idx" ON "DesignProject"("slug");

-- CreateIndex
CREATE INDEX "DesignProject_status_idx" ON "DesignProject"("status");

-- CreateIndex
CREATE INDEX "DesignProject_featured_idx" ON "DesignProject"("featured");

-- CreateIndex
CREATE INDEX "DesignProject_category_idx" ON "DesignProject"("category");

-- CreateIndex
CREATE INDEX "DesignProject_publishedAt_idx" ON "DesignProject"("publishedAt");

-- CreateIndex
CREATE INDEX "DesignProject_createdAt_idx" ON "DesignProject"("createdAt");

-- CreateIndex
CREATE INDEX "DesignProjectMedia_order_idx" ON "DesignProjectMedia"("order");

-- CreateIndex
CREATE UNIQUE INDEX "CareerExperience_slug_key" ON "CareerExperience"("slug");

-- CreateIndex
CREATE INDEX "CareerExperience_slug_idx" ON "CareerExperience"("slug");

-- CreateIndex
CREATE INDEX "CareerExperience_status_idx" ON "CareerExperience"("status");

-- CreateIndex
CREATE INDEX "CareerExperience_order_idx" ON "CareerExperience"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_slug_key" ON "Certificate"("slug");

-- CreateIndex
CREATE INDEX "Certificate_slug_idx" ON "Certificate"("slug");

-- CreateIndex
CREATE INDEX "Certificate_category_idx" ON "Certificate"("category");

-- CreateIndex
CREATE INDEX "Certificate_featured_idx" ON "Certificate"("featured");

-- CreateIndex
CREATE INDEX "Certificate_status_idx" ON "Certificate"("status");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeDocument_slug_key" ON "ResumeDocument"("slug");

-- CreateIndex
CREATE INDEX "ResumeDocument_slug_idx" ON "ResumeDocument"("slug");

-- CreateIndex
CREATE INDEX "ResumeDocument_type_isActive_idx" ON "ResumeDocument"("type", "isActive");

-- CreateIndex
CREATE INDEX "ResumeDocument_status_idx" ON "ResumeDocument"("status");

-- CreateIndex
CREATE UNIQUE INDEX "OfferLetter_slug_key" ON "OfferLetter"("slug");

-- CreateIndex
CREATE INDEX "OfferLetter_slug_idx" ON "OfferLetter"("slug");

-- CreateIndex
CREATE INDEX "OfferLetter_status_idx" ON "OfferLetter"("status");

-- CreateIndex
CREATE INDEX "OfferLetter_order_idx" ON "OfferLetter"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Achievement_slug_key" ON "Achievement"("slug");

-- CreateIndex
CREATE INDEX "Achievement_slug_idx" ON "Achievement"("slug");

-- CreateIndex
CREATE INDEX "Achievement_status_idx" ON "Achievement"("status");

-- CreateIndex
CREATE INDEX "Achievement_order_idx" ON "Achievement"("order");

-- CreateIndex
CREATE UNIQUE INDEX "ShowcaseItem_slug_key" ON "ShowcaseItem"("slug");

-- CreateIndex
CREATE INDEX "ShowcaseItem_slug_idx" ON "ShowcaseItem"("slug");

-- CreateIndex
CREATE INDEX "ShowcaseItem_status_idx" ON "ShowcaseItem"("status");

-- CreateIndex
CREATE INDEX "ShowcaseItem_order_idx" ON "ShowcaseItem"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Testimonial_slug_key" ON "Testimonial"("slug");

-- CreateIndex
CREATE INDEX "Testimonial_slug_idx" ON "Testimonial"("slug");

-- CreateIndex
CREATE INDEX "Testimonial_status_idx" ON "Testimonial"("status");

-- CreateIndex
CREATE INDEX "Testimonial_order_idx" ON "Testimonial"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Language_slug_key" ON "Language"("slug");

-- CreateIndex
CREATE INDEX "Language_slug_idx" ON "Language"("slug");

-- CreateIndex
CREATE INDEX "Language_category_idx" ON "Language"("category");

-- CreateIndex
CREATE INDEX "Language_status_idx" ON "Language"("status");

-- CreateIndex
CREATE UNIQUE INDEX "TechTool_slug_key" ON "TechTool"("slug");

-- CreateIndex
CREATE INDEX "TechTool_slug_idx" ON "TechTool"("slug");

-- CreateIndex
CREATE INDEX "TechTool_category_idx" ON "TechTool"("category");

-- CreateIndex
CREATE INDEX "TechTool_status_idx" ON "TechTool"("status");

-- CreateIndex
CREATE INDEX "ContactMessage_email_idx" ON "ContactMessage"("email");

-- CreateIndex
CREATE INDEX "ContactMessage_isRead_isArchived_isSpam_idx" ON "ContactMessage"("isRead", "isArchived", "isSpam");

-- CreateIndex
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_userId_idx" ON "AuditLog"("userId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "AuditLog_action_idx" ON "AuditLog"("action");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PasswordResetToken" ADD CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OtpCode" ADD CONSTRAINT "OtpCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareProject" ADD CONSTRAINT "SoftwareProject_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareProject" ADD CONSTRAINT "SoftwareProject_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareProjectTag" ADD CONSTRAINT "SoftwareProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "SoftwareProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareProjectTag" ADD CONSTRAINT "SoftwareProjectTag_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareProjectMedia" ADD CONSTRAINT "SoftwareProjectMedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "SoftwareProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SoftwareProjectMedia" ADD CONSTRAINT "SoftwareProjectMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignProject" ADD CONSTRAINT "DesignProject_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignProject" ADD CONSTRAINT "DesignProject_ogImageId_fkey" FOREIGN KEY ("ogImageId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignProjectMedia" ADD CONSTRAINT "DesignProjectMedia_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "DesignProject"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DesignProjectMedia" ADD CONSTRAINT "DesignProjectMedia_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certificate" ADD CONSTRAINT "Certificate_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeDocument" ADD CONSTRAINT "ResumeDocument_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OfferLetter" ADD CONSTRAINT "OfferLetter_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShowcaseItem" ADD CONSTRAINT "ShowcaseItem_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

