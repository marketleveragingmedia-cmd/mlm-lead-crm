// Resend CRM Library
// Unified API wrapper for all Resend operations
// Created: September 21, 2026

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_BASE_URL = 'https://api.resend.com';

// ============================================
// AUDIENCE MANAGEMENT
// ============================================

/**
 * Add contact to Resend audience
 */
export async function addContactToAudience(
  email: string,
  firstName: string,
  lastName: string,
  audienceId: string,
  unsubscribed: boolean = false
): Promise<string> {
  try {
    const response = await fetch(`${RESEND_BASE_URL}/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        first_name: firstName,
        last_name: lastName,
        unsubscribed,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Resend API error: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    return data.id; // Contact ID
  } catch (error) {
    console.error('Error adding contact to audience:', error);
    throw error;
  }
}

/**
 * Get all audiences
 */
export async function getAudiences() {
  try {
    const response = await fetch(`${RESEND_BASE_URL}/audiences`, {
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch audiences: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching audiences:', error);
    throw error;
  }
}

// ============================================
// EMAIL SENDING
// ============================================

/**
 * Send individual email via Resend
 */
export async function sendEmail(params: {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
}) {
  try {
    const response = await fetch(`${RESEND_BASE_URL}/emails`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Resend email error: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

/**
 * Send batch emails
 */
export async function sendBatchEmails(emails: Array<{
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}>) {
  try {
    const response = await fetch(`${RESEND_BASE_URL}/emails/batch`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emails),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Resend batch error: ${error.message || response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending batch emails:', error);
    throw error;
  }
}

// ============================================
// AUDIENCE ID MAPPING
// ============================================

// Map source pages to Resend audience IDs
export const AUDIENCE_MAP: Record<string, string> = {
  // Main audiences
  'main-list': '4db16471-5f5e-47fd-ac10-8da6fb7c1199',
  'founders-beta': '8d443344-fa9c-4ae1-bf12-cf0673e9487b',
  'simulator': 'b03c35c6-e0aa-4c00-87d7-1c923a83119f',
  'cash-flow-visionaries': 'e5ef05c9-58b7-4c93-974e-49879a6bf288',
  'strategic-partners': '332f5da8-92d2-4441-aaec-8ebd0333339c',
  
  // Avatar audiences
  'jv-affiliates': 'c66ce3e3-8de3-4106-a882-1c7bd7d3cd2b',
  'side-hustlers': 'ac58e01c-607f-4440-a298-cfbd9bdfb306',
  'high-risk-traders': '84253e2a-77b5-467f-ab68-053b9ddd2812',
  'no-more-clients': '01f9bdf7-750e-4eca-b668-b6f0c53f6b3f',
  'builder-class': '83c0d958-17bc-4354-8adb-b2f0a55e19be',
  'artists-musicians': '9ef15d14-a0c9-465d-82dc-219ffba7463e',
};

// Map source pages to audience keys
export function getAudienceForSource(sourcePage: string): string {
  if (sourcePage.includes('cash-flow-visionaries')) return 'cash-flow-visionaries';
  if (sourcePage.includes('simulator')) return 'simulator';
  if (sourcePage.includes('founders-beta')) return 'founders-beta';
  if (sourcePage.includes('jv-affiliate')) return 'jv-affiliates';
  if (sourcePage.includes('side-hustler')) return 'side-hustlers';
  if (sourcePage.includes('high-risk')) return 'high-risk-traders';
  if (sourcePage.includes('no-more-clients')) return 'no-more-clients';
  if (sourcePage.includes('builder')) return 'builder-class';
  if (sourcePage.includes('artist') || sourcePage.includes('musician')) return 'artists-musicians';
  
  return 'main-list'; // Default fallback
}

// ============================================
// DOMAIN MAPPING
// ============================================

export const DOMAIN_MAP: Record<string, { domain: string; name: string }> = {
  'cash-flow-visionaries': {
    domain: 'm.cashflowvisionaries.com',
    name: 'Cash Flow Visionaries',
  },
  'simulator': {
    domain: 'm.cashflowvisionary.com',
    name: 'Cash Flow Visionary',
  },
  'citizen-activation': {
    domain: 'm.citizenactivation.com',
    name: 'Citizen Activation',
  },
  'default': {
    domain: 'm.networkleveragingcashflow.com',
    name: 'Network Leveraging Cash Flow',
  },
};

/**
 * Get email domain for source
 */
export function getDomainForSource(sourcePage: string): { domain: string; name: string } {
  if (sourcePage.includes('cash-flow-visionaries')) return DOMAIN_MAP['cash-flow-visionaries'];
  if (sourcePage.includes('simulator')) return DOMAIN_MAP['simulator'];
  if (sourcePage.includes('citizen-activation') || sourcePage.includes('founders-beta')) {
    return DOMAIN_MAP['citizen-activation'];
  }
  
  return DOMAIN_MAP['default'];
}
