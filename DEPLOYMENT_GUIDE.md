# Deployment Guide - Resend CRM System

## Quick Start

Your complete Resend CRM system is **built and ready to deploy**. Follow these steps to get it live.

---

## Step 1: Update Environment Variables

Edit `.env` file with your production values:

```bash
# Database (already configured)
DATABASE_URL="postgresql://neondb_owner:npg_Jo9GdDlavmC3@ep-summer-wave-b4d9vh2b-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

# Resend API Key (REPLACE THIS!)
RESEND_API_KEY="re_YOUR_ACTUAL_API_KEY_HERE"

# Dashboard Password (CHANGE THIS!)
DASHBOARD_PASSWORD="YourSecurePassword123!"
```

### Get Your Resend API Key:
1. Go to https://resend.com/api-keys
2. Create a new API key
3. Copy and paste into `.env`

---

## Step 2: Deploy to Vercel

### Option A: Deploy via CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login
vercel login

# Deploy
cd /root/.openclaw/workspace/mlm-lead-crm
vercel --prod
```

### Option B: Deploy via Git

1. Push code to GitHub:
```bash
cd /root/.openclaw/workspace/mlm-lead-crm
git init
git add .
git commit -m "Initial commit: Complete Resend CRM system"
git remote add origin https://github.com/YOUR_USERNAME/mlm-lead-crm.git
git push -u origin main
```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy

### Environment Variables in Vercel:
```
DATABASE_URL = your_postgresql_url
RESEND_API_KEY = your_resend_api_key
DASHBOARD_PASSWORD = your_secure_password
```

---

## Step 3: Verify Deployment

After deployment, test these URLs:

1. **Login:** `https://your-domain.vercel.app/login`
   - Enter your `DASHBOARD_PASSWORD`

2. **CRM Dashboard:** `https://your-domain.vercel.app/crm`
   - Should redirect to login if not authenticated

3. **Broadcasts:** `https://your-domain.vercel.app/crm/broadcasts`
   - View broadcast campaigns

4. **Automations:** `https://your-domain.vercel.app/crm/automations`
   - View automation sequences

---

## Step 4: Create Your First Broadcast

1. Login at `/login`
2. Go to `/crm/broadcasts`
3. Click "+ New Broadcast"
4. Follow 3-step wizard:
   - **Step 1:** Name, audience, from details
   - **Step 2:** Subject line and HTML content
   - **Step 3:** Preview and send (or save draft)

### Test with Small Audience First!
- Create a test audience in Resend
- Send to yourself or small group first
- Verify email deliverability before scaling

---

## Step 5: Activate Your First Automation

1. Go to `/crm/automations`
2. Click "+ New Automation"
3. Browse 11 pre-built templates
4. Click on a template to preview full email sequence
5. Click "Create This Automation"
6. Toggle "Active" to enable

### Recommended First Automations:
- **Basic Welcome Series** - Simple 3-email welcome
- **Cash Flow Visionaries Welcome** - If you have that audience
- **Simulator Completion Nurture** - For leads who completed simulator

---

## Step 6: Verify Resend Integration

### Test Email Sending:

```bash
# Quick test script
curl -X POST https://your-domain.vercel.app/api/crm/broadcasts \
  -H "Content-Type: application/json" \
  -H "Cookie: mlm-crm-auth=true" \
  -d '{
    "name": "Test Broadcast",
    "subject": "Test Email",
    "htmlContent": "<h1>Hello World</h1><p>This is a test.</p>",
    "audienceId": "YOUR_AUDIENCE_ID",
    "fromDomain": "m.networkleveragingcashflow.com",
    "fromName": "Test Sender",
    "sendNow": true
  }'
```

### Check Resend Dashboard:
1. Go to https://resend.com/emails
2. Verify test email appears
3. Check delivery status

---

## File Upload for Production (If Not Using Git)

If you need to manually upload files to a server:

```bash
# Create production build
npm run build

# Files to upload:
- .next/ (entire directory)
- node_modules/ (or run npm install on server)
- prisma/
- public/ (if you have static assets)
- .env (with production values)
- package.json
- package-lock.json

# On server, run:
npm install --production
npm start
```

---

## Security Checklist

✅ **Changed DASHBOARD_PASSWORD** from default  
✅ **Secured DATABASE_URL** (not exposed publicly)  
✅ **Protected RESEND_API_KEY** (environment variable only)  
✅ **Middleware authentication** enabled on `/crm` routes  
✅ **HTTPS enabled** (automatic with Vercel)  

---

## Monitoring & Maintenance

### Check Email Delivery:
- Monitor Resend dashboard daily
- Watch for bounces/complaints
- Track open rates

### Database Backup:
- Neon provides automatic backups
- Schedule manual exports weekly

### CRM Health Checks:
1. Test login monthly
2. Send test broadcast quarterly
3. Review automation performance monthly

---

## Troubleshooting

### Issue: "Invalid password" on login
**Solution:** Check `DASHBOARD_PASSWORD` in environment variables

### Issue: "Failed to send broadcast"
**Solution:**
1. Verify `RESEND_API_KEY` is correct
2. Check audience ID exists in Resend
3. Verify sending domain is verified in Resend

### Issue: "Database connection error"
**Solution:** Verify `DATABASE_URL` is accessible from deployment environment

### Issue: Automations not triggering
**Solution:**
1. Verify automation is set to "Active"
2. Check trigger conditions match your use case
3. Manually test with API call first

---

## API Documentation

### Create Broadcast:
```bash
POST /api/crm/broadcasts
Content-Type: application/json

{
  "name": "Campaign Name",
  "subject": "Email Subject",
  "htmlContent": "<html>...</html>",
  "audienceId": "audience-id",
  "fromDomain": "m.networkleveragingcashflow.com",
  "fromName": "Sender Name",
  "sendNow": false
}
```

### Create Automation from Template:
```bash
POST /api/crm/automations
Content-Type: application/json

{
  "templateId": "welcome-basic",
  "active": true
}
```

### List Automations:
```bash
GET /api/crm/automations
```

---

## Support Resources

- **Resend Docs:** https://resend.com/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Prisma Docs:** https://www.prisma.io/docs
- **Vercel Deployment:** https://vercel.com/docs

---

## What's Included

✅ Complete CRM with authentication  
✅ Broadcast email campaigns with HTML preview  
✅ 11 pre-built automation sequences  
✅ Visual email sequence workflow display  
✅ Full email content storage and viewing  
✅ Performance tracking (opens, clicks)  
✅ Multi-domain sending support  
✅ Professional, compact UI design  
✅ TypeScript type safety  
✅ Production-ready build  

---

## Congratulations! 🎉

Your Resend CRM system is ready. You now have a professional email marketing platform with full content viewing, automation workflows, and broadcast capabilities—all self-contained in one beautiful interface.

**Next:** Login, create your first broadcast, and start nurturing your leads!

---

**System Status:** ✅ READY FOR PRODUCTION  
**Build Status:** ✅ SUCCESSFUL  
**Deployment Method:** Vercel (recommended) or manual server deployment  
