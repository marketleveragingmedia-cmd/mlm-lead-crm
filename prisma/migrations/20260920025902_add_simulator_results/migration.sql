-- CreateTable
CREATE TABLE "SimulatorResult" (
    "id" TEXT NOT NULL,
    "leadId" TEXT NOT NULL,
    "selectedPurposes" TEXT[],
    "monthlyGoal" DOUBLE PRECISION NOT NULL,
    "enterpriseConnections" INTEGER NOT NULL,
    "enterpriseResidualCashFlow" DOUBLE PRECISION NOT NULL,
    "communityCompoundingWeek" DOUBLE PRECISION NOT NULL,
    "simulatorStarted" BOOLEAN NOT NULL DEFAULT true,
    "simulatorCompleted" BOOLEAN NOT NULL DEFAULT false,
    "completedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SimulatorResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SimulatorResult_leadId_idx" ON "SimulatorResult"("leadId");

-- CreateIndex
CREATE INDEX "SimulatorResult_simulatorCompleted_idx" ON "SimulatorResult"("simulatorCompleted");

-- CreateIndex
CREATE INDEX "SimulatorResult_createdAt_idx" ON "SimulatorResult"("createdAt");

-- AddForeignKey
ALTER TABLE "SimulatorResult" ADD CONSTRAINT "SimulatorResult_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE CASCADE ON UPDATE CASCADE;
