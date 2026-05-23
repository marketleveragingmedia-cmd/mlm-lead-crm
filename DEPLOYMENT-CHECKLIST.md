# MLM Lead CRM - Deployment Checklist

## ✅ COMPLETED

1. **Code Ready**
   - Next.js application built ✅
   - MongoDB integration ✅
   - Global Control sync ✅
   - Resend email integration ✅
   - 9 avatar-specific email templates ✅
   - Dashboard with CSV export ✅
   - Git repository initialized ✅
   - Code committed ✅

## 🎯 NEXT STEPS (Required Before Deploy)

### Step 1: Create GitHub Repository
**You need to do this manually** (GitHub token expired):

1. Go to https://github.com/new
2. Repository name: `mlm-lead-crm`
3. Description: "Lead capture and management system with email automation for Network Leveraging Cash Flow"
4. Make it **Public**
5. **Do NOT** initialize with README
6. Click "Create repository"
7. Copy the repository URL (should be: `https://github.com/YOUR-USERNAME/mlm-lead-crm.git`)

Then run:
```bash
cd /root/.openclaw/workspace/mlm-lead-crm
git remote set-url origin https://github.com/YOUR-USERNAME/mlm-lead-crm.git
git push -u origin master
```

### Step 2: Set Up MongoDB Atlas (FREE)

1. Go to https://mongodb.com/atlas
2. Sign up / Log in
3. Create FREE cluster (M0 tier)
4. Create database user:
   - Username: `mlmcrmadmin`
   - Password: (generate strong password, save it)
5. Whitelist IP: **0.0.0.0/0** (allow from anywhere - Vercel needs this)
6. Click "Connect" → "Connect your application"
7. Copy connection string (looks like: `mongodb+srv://...`)
8. Replace `<password>` with your actual password
9. Save this for Step 4

### Step 3: Set Up Resend Email (FREE)

1. Go to https://resend.com
2. Sign up (FREE - 3,000 emails/month)
3. Verify your email
4. Go to Dashboard → API Keys
5. Click "Create API Key"
6. Name: "MLM Lead CRM"
7. Copy the key (starts with `re_`)
8. Save this for Step 4

**IMPORTANT - Domain Verification:**
1. Go to Resend Dashboard → Domains
2. Click "Add Domain"
3. Enter: `networkleveragingcashflow.com`
4. Resend will show DNS records
5. Add these DNS records to your domain registrar:
   - SPF record (TXT)
   - DKIM records (2-3 TXT records)
   - DMARC record (TXT, optional)
6. Wait 10-60 minutes for DNS propagation
7. Click "Verify" in Resend

See `RESEND-SETUP.md` for detailed DNS instructions.

### Step 4: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import Git Repository:
   - Select the `mlm-lead-crm` repo you created in Step 1
4. Configure Environment Variables:
   ```
   MONGODB_URI=mongodb+srv://mlmcrmadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/mlm-leads?retryWrites=true&w=majority
   GLOBAL_CONTROL_API_KEY=pak_xxxxxxxxxxxxxxxxx
   GLOBAL_CONTROL_LOCATION_ID=xxxxxxxxxxxxxxxxxxxx
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
   API_SECRET_KEY=your_random_secret_key_here
   ```
5. Click "Deploy"
6. Wait 2-3 minutes for deployment
7. Copy the deployment URL (e.g., `https://mlm-lead-crm.vercel.app`)

### Step 5: Get Global Control Credentials

Your credentials are in: `/root/.openclaw/workspace/credentials/titanium_software.txt`

You'll need:
- API Key (pak_...)
- Location ID

### Step 6: Test the System

After deployment:

```bash
curl -X POST https://mlm-lead-crm.vercel.app/api/capture-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "your-real-email@gmail.com",
    "sourcePage": "jv-affiliate-marketers-primary.html"
  }'
```

You should receive:
- Welcome email in your inbox ✅
- Contact appears in Global Control ✅
- Lead appears in CRM dashboard ✅

### Step 7: Update Landing Pages

Once deployed and tested, update all 9 landing pages with the new CRM API endpoint.

Add this JavaScript to each modal:

```javascript
const LEAD_CRM_API = 'https://mlm-lead-crm.vercel.app/api/capture-lead';

async function captureLeadToCRM(formData) {
  try {
    const response = await fetch(LEAD_CRM_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone || '',
        sourcePage: window.location.pathname.split('/').pop()
      })
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('CRM capture failed:', error);
    return false;
  }
}
```

## 📊 ACCESS YOUR CRM

Once deployed:
- **Dashboard:** https://mlm-lead-crm.vercel.app/dashboard
- **API Endpoint:** https://mlm-lead-crm.vercel.app/api/capture-lead

## 🔥 WHAT THIS GIVES YOU

1. **Complete Lead Database** (all leads captured and stored)
2. **Automatic Email Sending** (9 different templates)
3. **Global Control Sync** (tags + workflows)
4. **Dashboard** (view, filter, export)
5. **Full Control** (your system, your data)

## ⚡ READY TO GO LIVE

System is code-complete and ready to deploy once you:
1. Create GitHub repo
2. Set up MongoDB (5 minutes)
3. Set up Resend (5 minutes)
4. Deploy to Vercel (3 minutes)

**Total setup time: ~15 minutes** ⏱️

Then leads start flowing automatically! 💚
