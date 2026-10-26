-- CreateTable: AutomationEnrollment for tracking member enrollment in automation sequences
CREATE TABLE "AutomationEnrollment" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "automationId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "metadata" JSONB,

    CONSTRAINT "AutomationEnrollment_pkey" PRIMARY KEY ("id")
);

-- CreateTable: ScheduledEmail for email delivery queue
CREATE TABLE "ScheduledEmail" (
    "id" TEXT NOT NULL,
    "enrollmentId" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "automationId" TEXT NOT NULL,
    "emailIndex" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "textContent" TEXT NOT NULL,
    "scheduledFor" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "sentAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "cancellationReason" TEXT,
    "fromDomain" TEXT NOT NULL,
    "fromName" TEXT NOT NULL,
    "replyTo" TEXT NOT NULL,
    "resendMessageId" TEXT,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScheduledEmail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AutomationEnrollment_leadId_automationId_key" ON "AutomationEnrollment"("leadId", "automationId");

-- CreateIndex
CREATE INDEX "AutomationEnrollment_leadId_idx" ON "AutomationEnrollment"("leadId");

-- CreateIndex
CREATE INDEX "AutomationEnrollment_automationId_idx" ON "AutomationEnrollment"("automationId");

-- CreateIndex
CREATE INDEX "AutomationEnrollment_status_idx" ON "AutomationEnrollment"("status");

-- CreateIndex
CREATE INDEX "ScheduledEmail_enrollmentId_idx" ON "ScheduledEmail"("enrollmentId");

-- CreateIndex
CREATE INDEX "ScheduledEmail_leadId_idx" ON "ScheduledEmail"("leadId");

-- CreateIndex
CREATE INDEX "ScheduledEmail_status_idx" ON "ScheduledEmail"("status");

-- CreateIndex
CREATE INDEX "ScheduledEmail_scheduledFor_idx" ON "ScheduledEmail"("scheduledFor");

-- CreateIndex
CREATE INDEX "ScheduledEmail_automationId_idx" ON "ScheduledEmail"("automationId");

-- AddForeignKey
ALTER TABLE "AutomationEnrollment" ADD CONSTRAINT "AutomationEnrollment_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledEmail" ADD CONSTRAINT "ScheduledEmail_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "AutomationEnrollment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScheduledEmail" ADD CONSTRAINT "ScheduledEmail_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
