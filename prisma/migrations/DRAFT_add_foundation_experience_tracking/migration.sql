-- AddFoundationExperienceTracking
-- Adds fields to track NLC | Laying the Foundation for Success Experience purchases
-- Version: 1.0
-- Date: November 2, 2026
-- 
-- IMPORTANT: This is a DRAFT migration. Do NOT run until SKOOL purchase verification is confirmed.
-- Fields added are ADDITIVE ONLY - no destructive changes to existing data.

-- Add Foundation Experience purchase tracking fields to Lead table
ALTER TABLE "Lead" ADD COLUMN "foundationExperiencePurchased" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Lead" ADD COLUMN "foundationExperiencePurchasedAt" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN "foundationExperienceTransactionId" TEXT;
ALTER TABLE "Lead" ADD COLUMN "foundationExperienceSource" TEXT;

-- Add index for quick lookup of Foundation Experience purchasers
CREATE INDEX "Lead_foundationExperiencePurchased_idx" ON "Lead"("foundationExperiencePurchased");

-- Add index for transaction ID lookups (idempotency)
CREATE INDEX "Lead_foundationExperienceTransactionId_idx" ON "Lead"("foundationExperienceTransactionId");

-- Optional: Create audit trail table for Foundation Experience events
CREATE TABLE "FoundationExperienceEvent" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "transactionId" TEXT,
    "amount" INTEGER,
    "currency" TEXT DEFAULT 'USD',
    "skoolMemberId" TEXT,
    "skoolEmail" TEXT,
    "rawPayload" JSONB,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "processedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoundationExperienceEvent_pkey" PRIMARY KEY ("id")
);

-- Add foreign key relationship
ALTER TABLE "FoundationExperienceEvent" ADD CONSTRAINT "FoundationExperienceEvent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Add indexes for FoundationExperienceEvent
CREATE INDEX "FoundationExperienceEvent_leadId_idx" ON "FoundationExperienceEvent"("leadId");
CREATE INDEX "FoundationExperienceEvent_eventType_idx" ON "FoundationExperienceEvent"("eventType");
CREATE INDEX "FoundationExperienceEvent_transactionId_idx" ON "FoundationExperienceEvent"("transactionId");
CREATE INDEX "FoundationExperienceEvent_createdAt_idx" ON "FoundationExperienceEvent"("createdAt");

-- Comments for documentation
COMMENT ON COLUMN "Lead"."foundationExperiencePurchased" IS 'True if user completed $97 Foundation for Success Experience purchase';
COMMENT ON COLUMN "Lead"."foundationExperiencePurchasedAt" IS 'Timestamp of verified Foundation Experience purchase';
COMMENT ON COLUMN "Lead"."foundationExperienceTransactionId" IS 'SKOOL/Skooly transaction ID for idempotency';
COMMENT ON COLUMN "Lead"."foundationExperienceSource" IS 'Attribution source for Foundation Experience purchase';

COMMENT ON TABLE "FoundationExperienceEvent" IS 'Audit trail for Foundation Experience purchase events and webhooks';
