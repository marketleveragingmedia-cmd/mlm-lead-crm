const GC_API_KEY = process.env.GLOBAL_CONTROL_API_KEY!;
const GC_BASE_URL = 'https://api.globalcontrol.io/api/ai';

// Tag IDs from Global Control (fetched August 11, 2026)
const AVATAR_TAG_IDS: Record<string, string> = {
  'jv-affiliate': '6a08e006923e6123303bac7e', // avatar-jv-affiliate
  'high-risk-trader': '69ed61cc71e469e5362884d6', // avatar-high-risk-trading
  'no-more-clients': '69ed61cc71e469e53628858a', // avatar-no-more-clients
  'side-hustlers': '69ed61cc71e469e53628863e', // avatar-side-hustler
  'builder-class': '69ed61cc71e469e5362886f2', // avatar-builder-class
  'artists-musicians': '69ed61cd71e469e5362887a6', // avatar-artist-musician
  'social-security-trap': '69ed61cd71e469e53628885a', // avatar-social-security
  'ubi-cbdc-warning': '69ed61cd71e469e53628890e', // avatar-ubi-cbdc
  'cash-flow-visionary': '6a7a8b02e5e54cbbe6f65b01' // avatar-cash-flow-visionary (CREATED Aug 11, 2026)
};

const STAGE_NEW_LEAD_TAG_ID = '6a08e006923e6123303baa61'; // stage-new-lead

export async function syncToGlobalControl(lead: any): Promise<string | null> {
  try {
    // Step 1: Fire avatar tag (creates contact if missing)
    const avatarTagId = getAvatarTagId(lead.sourcePage);
    if (avatarTagId) {
      await fireTag(avatarTagId, lead.email, lead.firstName, lead.lastName, lead.phone);
    }

    // Step 2: Fire stage tag (new lead)
    await fireTag(STAGE_NEW_LEAD_TAG_ID, lead.email, lead.firstName, lead.lastName, lead.phone);

    // Step 3: Get contact to return ID
    const contactsResponse = await fetch(`${GC_BASE_URL}/contacts?search=${encodeURIComponent(lead.email)}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': GC_API_KEY
      }
    });

    if (contactsResponse.ok) {
      const contactsData = await contactsResponse.json();
      const contact = contactsData.data?.find((c: any) => c.email === lead.email);
      if (contact) {
        console.log('✅ Global Control contact synced:', contact._id);
        return contact._id;
      }
    }

    return 'synced'; // Tag fired successfully even if we can't get contact ID

  } catch (error) {
    console.error('Error syncing to Global Control:', error);
    return null;
  }
}

function getAvatarTagId(sourcePage: string): string | null {
  if (!sourcePage) return null;
  
  const normalized = sourcePage.toLowerCase();
  
  if (normalized.includes('jv-affiliate')) return AVATAR_TAG_IDS['jv-affiliate'];
  if (normalized.includes('high-risk-trading')) return AVATAR_TAG_IDS['high-risk-trader'];
  if (normalized.includes('no-more-clients')) return AVATAR_TAG_IDS['no-more-clients'];
  if (normalized.includes('side-hustler')) return AVATAR_TAG_IDS['side-hustlers'];
  if (normalized.includes('builder-class')) return AVATAR_TAG_IDS['builder-class'];
  if (normalized.includes('artist') || normalized.includes('musician')) return AVATAR_TAG_IDS['artists-musicians'];
  if (normalized.includes('social-security')) return AVATAR_TAG_IDS['social-security-trap'];
  if (normalized.includes('ubi') || normalized.includes('cbdc')) return AVATAR_TAG_IDS['ubi-cbdc-warning'];
  if (normalized.includes('cash-flow-visionar')) return AVATAR_TAG_IDS['cash-flow-visionary'];
  
  return null;
}

async function fireTag(tagId: string, email: string, firstName: string, lastName: string, phone?: string): Promise<void> {
  try {
    const response = await fetch(`${GC_BASE_URL}/tags/fire-tag/${tagId}`, {
      method: 'POST',
      headers: {
        'X-API-KEY': GC_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName,
        phone: phone || ''
      })
    });

    if (response.ok) {
      console.log(`✅ Tag fired: ${tagId} for ${email}`);
    } else {
      const errorText = await response.text();
      console.error(`Failed to fire tag ${tagId}:`, response.status, errorText);
    }
  } catch (error) {
    console.error(`Error firing tag ${tagId}:`, error);
  }
}
