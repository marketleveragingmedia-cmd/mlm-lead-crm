# PostgreSQL Migration Guide
**Date:** August 11, 2026  
**Status:** READY TO DEPLOY

## What Changed

**Before:** MongoDB (Mongoose)  
**After:** PostgreSQL (Prisma)

**Why:** MongoDB cluster was paused/broken. PostgreSQL consolidates with other systems (Citizen Activation, CFV Content Engine).

---

## Vercel Environment Variables

### 1. Remove Old Variable

In Vercel dashboard for `mlm-lead-crm`:
- **Delete:** `MONGODB_URI`

### 2. Add New Variable

- **Key:** `DATABASE_URL`
- **Value:** Use the same PostgreSQL database as Citizen Activation System:
  ```
  postgresql://neondb_owner:npg_Z2fY4VFJpyKM@ep-square-mountain-appxory3.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require
  ```
- **Environment:** Production, Preview, Development (All)

### 3. Keep These (No Changes)

- ✅ `RESEND_API_KEY`
- ✅ `GLOBAL_CONTROL_API_KEY`
- ✅ `GLOBAL_CONTROL_LOCATION_ID`
- ✅ `API_SECRET_KEY`
- ✅ `DASHBOARD_PASSWORD`
- ✅ `ADMIN_NOTIFICATION_EMAIL` (if exists)

---

## Database Migration

### Option A: Auto-Migration (Recommended)

The database table will be created automatically on first deployment.

Prisma will detect the schema and create the `Lead` table.

### Option B: Manual Migration (If needed)

Run this SQL in your PostgreSQL database:

```sql
-- Create Lead table
CREATE TABLE "Lead" (
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
CREATE UNIQUE INDEX "Lead_email_key" ON "Lead"("email");

-- Create performance indexes
CREATE INDEX "Lead_email_idx" ON "Lead"("email");
CREATE INDEX "Lead_createdAt_idx" ON "Lead"("createdAt");
CREATE INDEX "Lead_sourcePage_idx" ON "Lead"("sourcePage");
```

---

## Deployment Steps

1. **Update Vercel Environment Variables** (see above)
2. **Trigger Redeploy:**
   - Go to Vercel dashboard
   - Deployments tab
   - Click "Redeploy" on latest deployment
   - OR: Push will auto-deploy (already done)
3. **Wait for deployment** (~2-3 minutes)
4. **Test API:**
   ```bash
   curl -X POST https://mlm-lead-crm.vercel.app/api/capture-lead \
     -H "Content-Type: application/json" \
     -d '{"firstName":"Test","lastName":"User","email":"test@example.com","pageUrl":"/"}'
   ```
5. **Verify:**
   - Should return `{"success":true,...}`
   - Lead should appear in database
   - Welcome email should send
   - Global Control contact created

---

## What's Preserved

✅ All existing functionality:
- Lead capture API
- Global Control CRM sync
- Welcome emails (9 avatar templates)
- Admin notifications
- Dashboard
- CSV export
- All 9 landing page integrations

✅ Same API endpoints:
- `POST /api/capture-lead`
- `GET /api/leads`
- `GET /api/debug-last-lead`
- `GET /api/search-lead`

---

## Benefits

- ✅ Uses PostgreSQL (same as Citizen Activation System)
- ✅ No more MongoDB account to manage
- ✅ Better performance and reliability
- ✅ Simpler architecture
- ✅ No mysterious connection failures

---

## Rollback Plan

If needed, revert to previous commit:
```bash
cd /root/.openclaw/workspace/mlm-lead-crm
git revert HEAD
git push origin master
```

Then restore `MONGODB_URI` in Vercel and redeploy.

---

**Status:** ✅ CODE DEPLOYED  
**Next:** Update Vercel environment variables
