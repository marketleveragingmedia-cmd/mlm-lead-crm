-- Create Lead table for MLM Lead CRM
-- Date: August 11, 2026

-- Create Lead table
CREATE TABLE IF NOT EXISTS "Lead" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "sourcePage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "syncedToGlobalControl" BOOLEAN NOT NULL DEFAULT false,
    "globalControlContactId" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- Create unique constraint on email
CREATE UNIQUE INDEX IF NOT EXISTS "Lead_email_key" ON "Lead"("email");

-- Create performance indexes
CREATE INDEX IF NOT EXISTS "Lead_email_idx" ON "Lead"("email");
CREATE INDEX IF NOT EXISTS "Lead_createdAt_idx" ON "Lead"("createdAt");
CREATE INDEX IF NOT EXISTS "Lead_sourcePage_idx" ON "Lead"("sourcePage");

-- Grant permissions (if needed)
-- GRANT ALL ON TABLE "Lead" TO neondb_owner;
