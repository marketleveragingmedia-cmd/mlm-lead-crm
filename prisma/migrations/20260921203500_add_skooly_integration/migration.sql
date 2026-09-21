-- Add Skooly fields to Lead table
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "skoolMemberId" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "skoolPlan" TEXT;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "skoolMembershipStartedAt" TIMESTAMP(3);
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "fullSimulatorResultsUnlocked" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Lead" ADD COLUMN IF NOT EXISTS "officialCashFlowVisionary" BOOLEAN NOT NULL DEFAULT false;

-- Create unique index on skoolMemberId
CREATE UNIQUE INDEX IF NOT EXISTS "Lead_skoolMemberId_key" ON "Lead"("skoolMemberId");

-- Create SkoolEvent table
CREATE TABLE IF NOT EXISTS "SkoolEvent" (
    "id" TEXT NOT NULL,
    "leadId" TEXT,
    "eventType" TEXT NOT NULL,
    "skoolMemberId" TEXT,
    "skoolEmail" TEXT,
    "rawPayload" JSONB NOT NULL,
    "membershipPlan" TEXT,
    "membershipStatus" TEXT,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "processedAt" TIMESTAMP(3),
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SkoolEvent_pkey" PRIMARY KEY ("id")
);

-- Create indexes on SkoolEvent
CREATE INDEX IF NOT EXISTS "SkoolEvent_leadId_idx" ON "SkoolEvent"("leadId");
CREATE INDEX IF NOT EXISTS "SkoolEvent_eventType_idx" ON "SkoolEvent"("eventType");
CREATE INDEX IF NOT EXISTS "SkoolEvent_skoolMemberId_idx" ON "SkoolEvent"("skoolMemberId");
CREATE INDEX IF NOT EXISTS "SkoolEvent_skoolEmail_idx" ON "SkoolEvent"("skoolEmail");
CREATE INDEX IF NOT EXISTS "SkoolEvent_createdAt_idx" ON "SkoolEvent"("createdAt");

-- Add foreign key
ALTER TABLE "SkoolEvent" ADD CONSTRAINT "SkoolEvent_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE SET NULL ON UPDATE CASCADE;
