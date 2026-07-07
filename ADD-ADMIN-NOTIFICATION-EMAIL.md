# Add Admin Notification Email - Quick Fix

**Date:** July 6, 2026  
**Status:** Code Deployed, Needs 1 Environment Variable

---

## What You Need To Do (2 Minutes)

### Step 1: Go to Vercel Environment Variables
https://vercel.com/marketleveragingmedia-cmd/mlm-lead-crm/settings/environment-variables

### Step 2: Click "Add New"

### Step 3: Enter These Values
- **Key:** `ADMIN_NOTIFICATION_EMAIL`
- **Value:** `mzsamantha01@gmail.com`
- **Environment:** ✅ Production (check this box)
- Click **Save**

### Step 4: Wait ~30 Seconds
Vercel will automatically redeploy with the new variable.

---

## That's It!

Once saved, you'll immediately start receiving email notifications when someone completes the modal on:
- CashFlowVisionaries.com
- All other landing pages

---

## Why This One Variable?

The other 5 variables (MONGODB_URI, RESEND_API_KEY, etc.) were already added during initial deployment.

This is the 6th and final variable needed for admin notifications.

---

## What The Email Looks Like

**Subject:** 🎯 New Lead: John Doe (cash-flow-visionary)

**Body:**
```
New lead captured from modal!

📋 LEAD DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: John Doe
Email: john@example.com
Phone: +1234567890
Source Page: cashflowvisionaries.com
Avatar: cash-flow-visionary
Timestamp: Monday, July 6, 2026 at 3:45 PM EDT

🔗 QUICK ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
View Dashboard: https://mlm-lead-crm.vercel.app/dashboard

💡 NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Welcome email sent to lead
✅ Lead redirected to SKOOL community
✅ Stored in MongoDB
```

**Reply-To:** The lead's email (for quick follow-up)

---

## Testing After Setup

1. Visit: https://cashflowvisionaries.com
2. Click any CTA button
3. Fill out modal with test data
4. Submit
5. Check `mzsamantha01@gmail.com` for notification

---

**Code is already deployed. Just needs the environment variable! 🚀**
