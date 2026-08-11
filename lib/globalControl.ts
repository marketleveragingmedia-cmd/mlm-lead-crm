const GC_API_KEY = process.env.GLOBAL_CONTROL_API_KEY!;
const GC_BASE_URL = 'https://api.globalcontrol.io/api/ai';

// Avatar tags for Cash Flow Visionaries and other landing pages
const AVATAR_TAGS: Record<string, string> = {
  'jv-affiliate': 'avatar-jv-affiliate',
  'high-risk-trader': 'avatar-high-risk-trading',
  'no-more-clients': 'avatar-no-more-clients',
  'side-hustlers': 'avatar-side-hustler',
  'builder-class': 'avatar-builder-class',
  'artists-musicians': 'avatar-artist-musician',
  'social-security-trap': 'avatar-social-security',
  'ubi-cbdc-warning': 'avatar-ubi-cbdc',
  'cash-flow-visionary': 'avatar-cash-flow-visionary' // Main CFV landing page
};

const STAGE_TAG = 'stage-new-lead'; // New lead entry point

export async function syncToGlobalControl(lead: any): Promise<string | null> {
  try {
    // Step 1: Create contact in Global Control
    const createResponse = await fetch(`${GC_BASE_URL}/contacts`, {
      method: 'POST',
      headers: {
        'X-API-KEY': GC_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: lead.email,
        firstName: lead.firstName,
        lastName: lead.lastName,
        phone: lead.phone || '',
        source: lead.sourcePage || 'website',
        tags: [] // Tags will be added via tag endpoints
      })
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('Global Control create contact failed:', createResponse.status, errorText);
      return null;
    }

    const createData = await createResponse.json();
    const contactId = createData.id || createData.contactId;

    if (!contactId) {
      console.error('No contact ID returned from Global Control:', createData);
      return null;
    }

    console.log('✅ Global Control contact created:', contactId);

    // Step 2: Add avatar tag based on source page
    const avatarTag = getAvatarTag(lead.sourcePage);
    if (avatarTag) {
      await addTagToContact(contactId, avatarTag);
    }

    // Step 3: Add stage tag (new lead)
    await addTagToContact(contactId, STAGE_TAG);

    return contactId;

  } catch (error) {
    console.error('Error syncing to Global Control:', error);
    return null;
  }
}

function getAvatarTag(sourcePage: string): string | null {
  if (!sourcePage) return null;
  
  const normalized = sourcePage.toLowerCase();
  
  if (normalized.includes('jv-affiliate')) return AVATAR_TAGS['jv-affiliate'];
  if (normalized.includes('high-risk-trading')) return AVATAR_TAGS['high-risk-trader'];
  if (normalized.includes('no-more-clients')) return AVATAR_TAGS['no-more-clients'];
  if (normalized.includes('side-hustler')) return AVATAR_TAGS['side-hustlers'];
  if (normalized.includes('builder-class')) return AVATAR_TAGS['builder-class'];
  if (normalized.includes('artist') || normalized.includes('musician')) return AVATAR_TAGS['artists-musicians'];
  if (normalized.includes('social-security')) return AVATAR_TAGS['social-security-trap'];
  if (normalized.includes('ubi') || normalized.includes('cbdc')) return AVATAR_TAGS['ubi-cbdc-warning'];
  if (normalized.includes('cash-flow-visionar')) return AVATAR_TAGS['cash-flow-visionary'];
  
  return null;
}

async function addTagToContact(contactId: string, tagName: string): Promise<void> {
  try {
    const response = await fetch(`${GC_BASE_URL}/contacts/${contactId}/tags`, {
      method: 'POST',
      headers: {
        'X-API-KEY': GC_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag: tagName
      })
    });

    if (response.ok) {
      console.log(`✅ Tag added to contact ${contactId}: ${tagName}`);
    } else {
      const errorText = await response.text();
      console.error(`Failed to add tag ${tagName}:`, response.status, errorText);
    }
  } catch (error) {
    console.error(`Error adding tag ${tagName}:`, error);
  }
}
