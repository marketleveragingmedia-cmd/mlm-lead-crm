# MLM Lead CRM

Standalone lead capture and management system for Network Leveraging Cash Flow landing pages.

## Features

- ✅ Lead capture API endpoint
- ✅ Automatic sync to Global Control CRM
- ✅ **Automatic welcome emails via Resend**
- ✅ Avatar-specific email templates (9 different templates)
- ✅ Dashboard for viewing and filtering leads
- ✅ CSV export functionality
- ✅ Integration with 9 MLM Command Center landing pages

## Setup

### 1. Environment Variables

Create `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
GLOBAL_CONTROL_API_KEY=your_global_control_api_key
GLOBAL_CONTROL_LOCATION_ID=your_location_id
RESEND_API_KEY=your_resend_api_key
API_SECRET_KEY=your_random_secret_key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

### 4. Deploy to Vercel

```bash
vercel
```

## API Endpoints

### POST /api/capture-lead

Captures a new lead and syncs to Global Control.

**Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "sourcePage": "jv-affiliate-marketers-primary.html"
}
```

**Response:**
```json
{
  "success": true,
  "leadId": "...",
  "syncedToGlobalControl": true,
  "emailSent": true
}
```

### GET /api/leads

Retrieves leads with optional filtering.

**Query Parameters:**
- `sourcePage` (optional): Filter by source page
- `limit` (optional): Number of results (default: 100)

## Landing Page Integration

Add this to your landing page modals:

```html
<script>
const LEAD_CRM_API = 'https://your-crm-domain.vercel.app/api/capture-lead';

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
</script>
```

## Dashboard

Access the dashboard at `/dashboard` to view, filter and export leads.

## Email & CRM Integration

The system automatically:
1. **Sends welcome email** via Resend (avatar-specific template)
2. Creates contacts in Global Control
3. Applies avatar-specific tags based on source page
4. Applies stage-new-lead tag (triggers automation workflow)
5. Stores sync status in database

### Email Templates

9 different welcome email templates based on avatar:
- JV & Affiliate Marketers
- High Risk Traders
- No More Clients (Service Providers)
- Side Hustlers
- Builder Class
- Artists & Musicians
- Social Security Trap
- UBI/CBDC Warning
- Why MOSCA

All emails:
- Personalized with first name
- Include SKOOL community link
- Sent from: MzSamantha <hello@m.networkleveragingcashflow.com>
- Reply-to: marketleveragingmedia@agentmail.to

## Source Pages

- jv-affiliate-marketers-primary.html
- high-risk-trading-primary.html
- no-more-clients-primary.html
- side-hustlers-primary.html
- builder-class-primary.html
- artists-musicians-primary.html
- social-security-trap-primary.html
- ubi-cbdc-warning-primary.html
- why-mosca.html
