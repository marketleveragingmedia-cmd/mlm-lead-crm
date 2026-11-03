# Foundation for Success Experience - Testing Checklist
**Version:** 1.0  
**Date:** November 2, 2026  
**Status:** Ready for Execution (Partial Blockers)

---

## PHASE 1: REGISTRATION FORM TESTING ✅ CAN TEST NOW

### 1.1 Form Validation
- [ ] First name required field validation
- [ ] Last name required field validation
- [ ] Email required field validation
- [ ] Email format validation (basic regex)
- [ ] Phone optional field behavior
- [ ] Form submit button disabled during submission
- [ ] Form inputs disabled during submission
- [ ] Status message display

### 1.2 Lead Capture API Integration
- [ ] Successful new lead creation (201 response)
- [ ] Email deduplication (409 conflict response for existing lead)
- [ ] Phone number normalization (digits only, + prefix)
- [ ] Source attribution (`laying_the_foundation_for_success_experience`)
- [ ] Landing path captured correctly
- [ ] UTM parameters captured (test with ?utm_source=test)
- [ ] Referrer tracking
- [ ] Timestamp accuracy

### 1.3 Error Handling
- [ ] Network error handling (simulate offline)
- [ ] API error response handling (500 server error)
- [ ] User-friendly error messages displayed
- [ ] Form remains usable after error
- [ ] Retry functionality works

### 1.4 Success Flow
- [ ] Success message displayed
- [ ] Email stored in sessionStorage
- [ ] Name stored in sessionStorage
- [ ] Redirect timer triggers (1.5 seconds)
- [ ] SKOOL redirect URL correct
- [ ] Email pre-fill parameter appended (if supported)

**Test Data:**
```
First Name: Test
Last Name: Foundationuser
Email: test+foundation@example.com
Phone: (555) 123-4567
```

**Expected API Payload:**
```json
{
  "firstName": "Test",
  "lastName": "Foundationuser",
  "email": "test+foundation@example.com",
  "phone": "+5551234567",
  "sourcePage": "laying_the_foundation_for_success_experience",
  "pageUrl": "https://[staging-url]/",
  "attribution": "{...}"
}
```

---

## PHASE 2: RESPONSIVE DESIGN TESTING ✅ CAN TEST NOW

### 2.1 Mobile Breakpoints
- [ ] 320px width (iPhone SE)
- [ ] 375px width (iPhone X/11)
- [ ] 390px width (iPhone 12/13)
- [ ] 430px width (iPhone 14 Pro Max)

### 2.2 Tablet Breakpoints
- [ ] 768px width (iPad Portrait)
- [ ] 1024px width (iPad Landscape)

### 2.3 Desktop Breakpoints
- [ ] 1440px width (Standard Desktop)
- [ ] 1920px width (Full HD)

### 2.4 Design Verification
- [ ] No horizontal overflow at any breakpoint
- [ ] Heading text wraps balanced (no orphan single words)
- [ ] Form card displays correctly on mobile
- [ ] Navigation menu collapses appropriately
- [ ] Images/artwork scale correctly
- [ ] Typography readable at all sizes
- [ ] Touch targets minimum 44px (mobile)

**Testing Tools:**
- Chrome DevTools Responsive Mode
- Real device testing (iOS, Android)
- BrowserStack (optional)

---

## PHASE 3: ACCESSIBILITY TESTING ✅ CAN TEST NOW

### 3.1 Keyboard Navigation
- [ ] All interactive elements focusable via Tab
- [ ] Focus visible (outline present)
- [ ] Form submission via Enter key
- [ ] Skip to content link (if present)

### 3.2 Screen Reader Testing
- [ ] Form labels associated with inputs
- [ ] Required fields announced
- [ ] Error messages announced (aria-live)
- [ ] Success messages announced
- [ ] Button purpose clear
- [ ] Image alt text present and descriptive

### 3.3 WCAG 2.1 Compliance
- [ ] Color contrast minimum 4.5:1 (text)
- [ ] Color contrast minimum 3:1 (UI components)
- [ ] Text resizable to 200% without loss of functionality
- [ ] No content lost when zoomed
- [ ] Semantic HTML used correctly
- [ ] Landmark regions defined (header, main, footer)

**Testing Tools:**
- axe DevTools (Chrome Extension)
- WAVE (Web Accessibility Evaluation Tool)
- NVDA or JAWS screen reader
- macOS VoiceOver

---

## PHASE 4: DATABASE TESTING 🟡 STAGING ONLY

### 4.1 Lead Creation
- [ ] New lead inserted with correct source
- [ ] Email normalized (lowercase, trimmed)
- [ ] Phone normalized (digits only, + prefix)
- [ ] Attribution data stored correctly
- [ ] Created timestamp accurate

### 4.2 Lead Deduplication
- [ ] Existing lead detected by email
- [ ] Name updated only if placeholder
- [ ] Phone updated only if missing
- [ ] Source preserved (original not overwritten)
- [ ] Updated timestamp reflects change

### 4.3 Schema Migration (DRAFT)
- [ ] Migration file syntax valid
- [ ] Migration runs without errors
- [ ] New fields added to Lead table
- [ ] Default values correct (`foundationExperiencePurchased = false`)
- [ ] Indexes created successfully
- [ ] FoundationExperienceEvent table created
- [ ] Foreign key constraints valid
- [ ] Existing data unaffected

**Test Environment:** Staging database only (do not run on production until verified)

---

## PHASE 5: SKOOL INTEGRATION TESTING 🚨 BLOCKED

### 5.1 SKOOL Redirect Flow
- [ ] Correct SKOOL Classroom URL configured
- [ ] Redirect triggers after successful registration
- [ ] Email pre-fill parameter works (if supported)
- [ ] Redirect works for new users
- [ ] Redirect works for existing SKOOL members
- [ ] Instructions clear for $97 purchase

**Blocker:** Exact SKOOL Classroom URL unknown

### 5.2 SKOOL Purchase Verification 🚨 CRITICAL BLOCKER
- [ ] Skooly webhook receives course purchase event
- [ ] Event payload contains transaction ID
- [ ] Event payload contains purchaser email
- [ ] Event payload contains amount ($97)
- [ ] Event payload contains SKOOL member ID
- [ ] Webhook signature verification passes
- [ ] Lead matched by email correctly
- [ ] `foundationExperiencePurchased` set to true
- [ ] `foundationExperiencePurchasedAt` timestamp accurate
- [ ] `foundationExperienceTransactionId` stored
- [ ] Idempotency prevents duplicate processing
- [ ] Audit event logged to FoundationExperienceEvent table

**Blocker:** Unknown if Skooly emits course-specific purchase events  
**Required:** Test purchase event payload or SKOOL admin confirmation

---

## PHASE 6: MASTERCLASS QUALIFICATION TESTING 🟡 AFTER SCHEMA MIGRATION

### 6.1 Qualification Logic
- [ ] SKOOL Premium member qualifies (existing logic preserved)
- [ ] Foundation Experience purchaser qualifies (new logic)
- [ ] Non-Premium, non-Foundation lead does not qualify
- [ ] Pending registration detected correctly
- [ ] WebinarJam registration triggered for qualified leads
- [ ] Qualification source tracked (`skool_premium` vs `foundation_experience`)

### 6.2 Webinar Registration
- [ ] WebinarJam API registration succeeds
- [ ] Registration ID returned and stored
- [ ] Duplicate registrations prevented
- [ ] Email confirmation sent (WebinarJam side)
- [ ] Registration status updated to `qualified`
- [ ] Qualified timestamp accurate

### 6.3 Edge Cases
- [ ] Lead upgrades from Standard to Premium (existing flow)
- [ ] Lead purchases Foundation after already being Premium
- [ ] Lead purchases Foundation before becoming Premium
- [ ] Lead has pending registration before purchase
- [ ] Lead registers after purchase is already confirmed

**Test Data:**
```javascript
// Scenario 1: Premium member (existing flow)
{
  email: 'premium@example.com',
  skoolPlan: 'Premium',
  foundationExperiencePurchased: false
}
// Expected: Qualifies via SKOOL Premium

// Scenario 2: Foundation purchaser (new flow)
{
  email: 'foundation@example.com',
  skoolPlan: 'Standard',
  foundationExperiencePurchased: true
}
// Expected: Qualifies via Foundation Experience

// Scenario 3: Both Premium + Foundation
{
  email: 'both@example.com',
  skoolPlan: 'Premium',
  foundationExperiencePurchased: true
}
// Expected: Qualifies (qualification source = skool_premium takes precedence)

// Scenario 4: Neither Premium nor Foundation
{
  email: 'pending@example.com',
  skoolPlan: 'Standard',
  foundationExperiencePurchased: false
}
// Expected: Does NOT qualify
```

---

## PHASE 7: END-TO-END INTEGRATION TESTING 🚨 BLOCKED

### 7.1 Complete User Journey (New User)
- [ ] User visits Sales Page
- [ ] User fills out registration form
- [ ] Form submits successfully
- [ ] Lead created in CRM
- [ ] User redirected to SKOOL
- [ ] User joins SKOOL Community (or signs in)
- [ ] User navigates to Foundation Classroom
- [ ] User completes $97 purchase
- [ ] Purchase webhook received
- [ ] Lead updated with purchase confirmation
- [ ] Masterclass qualification triggered
- [ ] WebinarJam registration completed
- [ ] User receives WebinarJam confirmation email

**Blocker:** Cannot complete without SKOOL purchase verification

### 7.2 Complete User Journey (Existing Lead)
- [ ] User already in CRM from different source
- [ ] User submits registration form
- [ ] Duplicate email detected (409 response)
- [ ] User still redirected to SKOOL
- [ ] Lead record preserved (original source intact)
- [ ] Purchase webhook updates existing lead
- [ ] Masterclass qualification works for existing lead

**Blocker:** Cannot complete without SKOOL purchase verification

### 7.3 Complete User Journey (Existing SKOOL Member)
- [ ] User already a SKOOL member (Premium or Standard)
- [ ] User submits registration form
- [ ] Lead updated with latest info
- [ ] User redirected to SKOOL (no duplicate join required)
- [ ] User purchases Foundation Experience
- [ ] Purchase webhook received
- [ ] Lead updated correctly
- [ ] Masterclass qualification works

**Blocker:** Cannot complete without SKOOL purchase verification

---

## PHASE 8: STAGING DEPLOYMENT VERIFICATION ✅ CAN TEST NOW

### 8.1 Vercel Preview Deployment
- [ ] Feature branch created (`foundation-experience-staging`)
- [ ] V10 HTML deployed to staging
- [ ] JavaScript form handler deployed
- [ ] Staging URL accessible
- [ ] No-index meta tag present (prevent search indexing)
- [ ] Password protection enabled (optional)

### 8.2 Staging Environment Configuration
- [ ] Staging database connection configured
- [ ] API endpoints point to staging
- [ ] SKOOL redirect URL uses test/staging classroom (if available)
- [ ] Environment variables loaded correctly
- [ ] Logs accessible for debugging

### 8.3 Staging Functionality
- [ ] Form submits to staging API
- [ ] Leads created in staging database
- [ ] No production data affected
- [ ] Status messages display correctly
- [ ] Responsive design verified on staging

---

## PHASE 9: PRODUCTION READINESS CHECKLIST ⏳ PENDING

### 9.1 Pre-Production Requirements
- [ ] ✅ Infrastructure audit complete
- [ ] ✅ Registration form tested
- [ ] ✅ CRM schema migration prepared
- [ ] 🚨 SKOOL purchase verification confirmed (BLOCKER)
- [ ] ⏳ Final founder-approved Sales Page copy received
- [ ] ⏳ Approved Foundation for Success image assets received
- [ ] 🟡 End-to-end integration tested
- [ ] ✅ Responsive design verified
- [ ] ✅ Accessibility audit passed
- [ ] 🟡 Staging deployment successful

### 9.2 Launch Approval
- [ ] Founder reviews staging deployment
- [ ] Founder approves final design and copy
- [ ] Founder confirms SKOOL Classroom is live
- [ ] Founder confirms $97 purchase is configured
- [ ] Founder authorizes test purchase (if needed)
- [ ] Purchase webhook integration verified
- [ ] Masterclass qualification tested end-to-end

### 9.3 Production Deployment
- [ ] Merge feature branch to main
- [ ] Deploy to production
- [ ] Run database migration on production database
- [ ] Verify production environment variables
- [ ] Monitor initial registrations
- [ ] Monitor purchase webhooks
- [ ] Monitor Masterclass qualifications
- [ ] Confirm no errors in production logs

### 9.4 Post-Launch Monitoring
- [ ] Track registration conversion rate
- [ ] Track SKOOL redirect success rate
- [ ] Track purchase confirmation rate
- [ ] Track Masterclass qualification rate
- [ ] Monitor error rates and webhook failures
- [ ] Review user feedback and support tickets

---

## SUMMARY STATUS

### ✅ Ready to Test Now
- Registration form validation and submission
- Responsive design across all breakpoints
- Accessibility compliance
- Staging deployment

### 🟡 Ready After Schema Migration
- Database field additions
- Masterclass qualification logic extension
- Foundation Experience purchase tracking

### 🚨 Blocked Until Resolved
- SKOOL Classroom URL confirmation
- Skooly course purchase event verification
- Purchase webhook integration
- End-to-end user journey testing

---

**Next Action:** Deploy staging and begin Phase 1-3 testing while waiting for SKOOL/Skooly clarification.

