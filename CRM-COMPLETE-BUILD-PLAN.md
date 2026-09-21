# Complete CRM Build Plan - All Functionality

## Issues to Fix:
1. ❌ No login system (middleware allows /crm without auth)
2. ❌ Buttons don't work (no actual pages/forms)
3. ❌ Display too large (need medium sizing)
4. ❌ No email templates
5. ❌ No workflow templates
6. ❌ No filters
7. ❌ No create broadcast form
8. ❌ No create automation form

## What Needs to Be Built:

### 1. Authentication (CRITICAL)
- [x] Login page exists at /login
- [ ] Middleware needs to REQUIRE auth for /crm routes
- [ ] Password: MLM2026Secure!

### 2. Broadcasts Page (/crm/broadcasts)
- [ ] List all broadcasts (from database)
- [ ] "Create Broadcast" button → form
- [ ] Form fields:
  - Name
  - Subject
  - From Name
  - From Domain (dropdown: 4 domains)
  - Audience (dropdown: 11 audiences)
  - Email content (HTML editor or textarea)
  - Schedule date/time (optional)
- [ ] Save to database (ResendBroadcast table)
- [ ] Actually send via Resend API

### 3. Automations Page (/crm/automations)
- [ ] List all automations (from database)
- [ ] "Create Automation" button → form
- [ ] Form fields:
  - Name
  - Description
  - Trigger (dropdown: form submission, tag added, etc.)
  - Audience
  - Email sequence (array of emails with delays)
- [ ] Pre-built templates:
  - CFV Welcome (5 emails)
  - Founders Beta Onboarding (5 emails)
  - Simulator Nurture (6 emails)
  - Strategic Partner Welcome (4 emails)
- [ ] Save to database (ResendAutomation table)

### 4. Leads Page (/crm/leads) - Enhanced
- [ ] Filters:
  - By source
  - By date range
  - By engagement (opened/clicked)
  - By tags
- [ ] Search by name/email
- [ ] Pagination (50 per page)
- [ ] Export to CSV button
- [ ] Bulk actions (tag, delete)

### 5. Analytics Page (/crm/analytics) - Working
- Already exists, just needs auth

### 6. Email Templates Library
- [ ] Pre-built HTML templates
- [ ] Template variables ({{firstName}}, {{email}}, etc.)
- [ ] Template editor
- [ ] Save custom templates

### 7. Workflow Templates
- [ ] 11 pre-built sequences (matching audiences)
- [ ] One-click activate

### 8. UI Sizing
- [ ] Reduce font sizes by 20%
- [ ] Reduce padding/margins
- [ ] More compact stat cards
- [ ] Tighter spacing

## Database Already Has:
- Lead table ✅
- ResendBroadcast table ✅
- ResendAutomation table ✅
- ResendAudience table ✅
- EmailEvent table ✅

## Resend API Ready:
- 4 domains configured ✅
- 11 audiences created ✅
- API key set ✅

## Build Order (Single Deployment):
1. Fix middleware (require auth)
2. Reduce UI sizing (20% smaller)
3. Build Broadcasts create form + list
4. Build Automations create form + list + templates
5. Enhance Leads page (filters, search, export)
6. Add email templates library
7. Test everything locally
8. Single deployment

Estimated time: 2-3 hours to build properly
Estimated deployment: 1 final push
