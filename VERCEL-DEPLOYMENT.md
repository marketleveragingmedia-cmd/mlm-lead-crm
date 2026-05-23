# Vercel Deployment - Environment Variables

## Copy These Exact Values to Vercel

When deploying to Vercel, add these 5 environment variables:

---

### 1. MONGODB_URI
```
YOUR_MONGODB_CONNECTION_STRING_HERE
```
**Replace with:** Your MongoDB Atlas connection string from previous step
**Format:** `mongodb+srv://mlmcrmadmin:PASSWORD@cluster0.xxxxx.mongodb.net/mlm-leads?retryWrites=true&w=majority`

---

### 2. RESEND_API_KEY
```
YOUR_RESEND_API_KEY_HERE
```
**Replace with:** Your Resend API key (starts with `re_`)
**Where to find it:** Resend Dashboard → API Keys

**NOTE:** The Citizen Activation Resend key is: `re_Z4SzEvLF_8VY6gsZHVmTWmSk97NjgHQXf`
But you may want a separate key for MLM Lead CRM.

---

### 3. GLOBAL_CONTROL_API_KEY
```
pak_8237541872356fe17334d99cd355a24484646e4b3f7d81272580cdf0dfff803a86aedcc2ac46c
```
**Do NOT change this** - This is your Global Control API key

---

### 4. GLOBAL_CONTROL_LOCATION_ID
```
8237541872356
```
**Do NOT change this** - This is your Global Control Location ID

---

### 5. API_SECRET_KEY
```
318574a6352b26427809e1c5b3de8795c630b67bfb2c4eb066601d754fab734b
```
**Do NOT change this** - Random secret key for API security

---

## Vercel Deployment Steps

### 1. Go to Vercel
https://vercel.com

### 2. Import GitHub Repository
- Click "Add New" → "Project"
- Import the `mlm-lead-crm` repository you just created

### 3. Configure Project
- **Framework Preset:** Next.js (should auto-detect)
- **Root Directory:** `./` (leave as default)
- **Build Command:** (leave default)
- **Output Directory:** (leave default)

### 4. Add Environment Variables
Click "Environment Variables" and add all 5 variables above:

| Name | Value |
|------|-------|
| MONGODB_URI | (your MongoDB connection string) |
| RESEND_API_KEY | (your Resend API key) |
| GLOBAL_CONTROL_API_KEY | pak_8237541872356fe17334d99cd355a24484646e4b3f7d81272580cdf0dfff803a86aedcc2ac46c |
| GLOBAL_CONTROL_LOCATION_ID | 8237541872356 |
| API_SECRET_KEY | 318574a6352b26427809e1c5b3de8795c630b67bfb2c4eb066601d754fab734b |

### 5. Deploy
Click "Deploy" and wait 2-3 minutes.

### 6. Get Your URL
After deployment, Vercel will show your URL:
- Example: `https://mlm-lead-crm.vercel.app`
- **Save this URL** - you'll need it for landing pages

---

## After Deployment

### Test the System
```bash
curl -X POST https://your-deployed-url.vercel.app/api/capture-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "your-real-email@gmail.com",
    "sourcePage": "jv-affiliate-marketers-primary.html"
  }'
```

You should:
1. ✅ Receive welcome email
2. ✅ See contact in Global Control
3. ✅ See lead in dashboard: https://your-url.vercel.app/dashboard

---

## Quick Reference

**Dashboard URL:** https://your-deployed-url.vercel.app/dashboard
**API Endpoint:** https://your-deployed-url.vercel.app/api/capture-lead

Ready to integrate with your 9 landing pages! 💚
