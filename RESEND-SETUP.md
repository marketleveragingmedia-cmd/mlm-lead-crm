# Resend Email Setup Guide

## Step 1: Create Resend Account

1. Go to https://resend.com
2. Sign up (free tier includes 100 emails/day, 3,000/month)
3. Verify your email

## Step 2: Get API Key

1. Go to Dashboard → API Keys
2. Click "Create API Key"
3. Name it "MLM Lead CRM"
4. Copy the key (starts with `re_`)
5. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   ```

## Step 3: Verify Domain (IMPORTANT)

### Option A: Use networkleveragingcashflow.com (Recommended)

1. Go to Resend Dashboard → Domains
2. Click "Add Domain"
3. Enter: `networkleveragingcashflow.com`
4. Resend will show DNS records to add
5. Add these DNS records to your domain provider:
   - SPF record
   - DKIM records (2-3 records)
   - DMARC record (optional but recommended)

**DNS Records Example:**
```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all

Type: TXT  
Name: resend._domainkey
Value: [provided by Resend]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:marketleveragingmedia@agentmail.to
```

6. Wait 10-60 minutes for DNS propagation
7. Click "Verify" in Resend dashboard

### Option B: Use Resend Subdomain (Testing Only)

For testing, you can use Resend's subdomain:
- Change `from` address in `lib/email.ts` to:
  ```typescript
  from: 'MzSamantha <onboarding@resend.dev>'
  ```
- **WARNING:** This only works for sending TO the email address registered with Resend
- Not suitable for production (leads won't receive emails)

## Step 4: Test Email

After domain verification:

```bash
curl -X POST https://your-crm-domain.vercel.app/api/capture-lead \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "your-real-email@gmail.com",
    "sourcePage": "jv-affiliate-marketers-primary.html"
  }'
```

Check your inbox for the welcome email!

## Step 5: Monitor Emails

Resend Dashboard shows:
- ✅ Emails sent
- ✅ Emails delivered
- ❌ Bounces
- 📊 Open rates (if tracking enabled)

## Email From Address

Current setup uses:
```
From: MzSamantha <hello@m.networkleveragingcashflow.com>
Reply-To: marketleveragingmedia@agentmail.to
```

✅ Domain `m.networkleveragingcashflow.com` is already verified in Resend.

You can change this in `lib/email.ts` if you want a different address.

## Free Tier Limits

Resend Free Tier:
- 100 emails per day
- 3,000 emails per month
- 1 custom domain

**If you exceed:**
- Upgrade to Pro: $20/month (50,000 emails)
- Or upgrade as needed

## Troubleshooting

### Email Not Received?

1. Check Resend dashboard for delivery status
2. Check spam folder
3. Verify domain DNS records are correct
4. Test with different email provider (Gmail, Outlook, etc.)

### API Error?

1. Verify `RESEND_API_KEY` is in `.env.local`
2. Check API key hasn't been revoked
3. Check Resend dashboard for error logs

### Wrong Template?

The system auto-detects template from `sourcePage`:
- `jv-affiliate-marketers-primary.html` → JV Affiliate template
- `side-hustlers-primary.html` → Side Hustlers template
- etc.

Edit templates in `lib/email.ts` if needed.

## Next Steps

Once Resend is configured:
1. Deploy updated code to Vercel
2. Test with real lead capture
3. Monitor Resend dashboard for deliverability
4. Adjust email templates as needed

All emails will send automatically when leads are captured! 💚
