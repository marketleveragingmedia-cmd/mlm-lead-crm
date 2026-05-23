const GC_API_KEY = process.env.GLOBAL_CONTROL_API_KEY!;
const GC_LOCATION_ID = process.env.GLOBAL_CONTROL_LOCATION_ID!;
const GC_BASE_URL = 'https://services.leadconnectorhq.com';

// Tag IDs from Global Control
const AVATAR_TAGS: Record<string, string> = {
  'jv-affiliate': 'W3LGQQ6QpbDShLR9tUUd',
  'high-risk-trader': 'q7X4S9x00WCKjGtmMqNw',
  'no-more-clients': 'zJ95kfcP6sTDxY7VB0hS',
  'side-hustlers': 'Lmr4SqSUqD8nSRQ3KbYj',
  'builder-class': 'dPV9nzAWyW8EHxjvyRoX',
  'artists-musicians': 'VmgB5hVPzZOXK7LCHqZk',
  'social-security-trap': 'aE4TxPc7QzSB9KfNvWmJ',
  'ubi-cbdc-warning': 'R2wYnH6vDxKL8TfQsP5j',
  'why-mosca': 'Xz3NqK8WpY9Rm5VfJcHd'
};

const STAGE_TAG = 'OC5dWqTG7ZaDM6nRwkXf'; // stage-new-lead

export async function syncToGlobalControl(lead: any): Promise<string | null> {
  try {
    // Step 1: Create contact
    const createResponse = await fetch(`${GC_BASE_URL}/contacts/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GC_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone || '',
        locationId: GC_LOCATION_ID,
        tags: []
      })
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      console.error('Global Control create contact failed:', errorText);
      return null;
    }

    const createData = await createResponse.json();
    const contactId = createData.contact?.id;

    if (!contactId) {
      console.error('No contact ID returned from Global Control');
      return null;
    }

    // Step 2: Fire avatar tag
    const avatarTag = getAvatarTag(lead.sourcePage);
    if (avatarTag) {
      await fireTag(avatarTag, lead.email, lead.firstName, lead.lastName);
    }

    // Step 3: Fire stage tag (triggers workflow)
    await fireTag(STAGE_TAG, lead.email, lead.firstName, lead.lastName);

    return contactId;

  } catch (error) {
    console.error('Error syncing to Global Control:', error);
    return null;
  }
}

function getAvatarTag(sourcePage: string): string | null {
  if (sourcePage.includes('jv-affiliate')) return AVATAR_TAGS['jv-affiliate'];
  if (sourcePage.includes('high-risk-trading')) return AVATAR_TAGS['high-risk-trader'];
  if (sourcePage.includes('no-more-clients')) return AVATAR_TAGS['no-more-clients'];
  if (sourcePage.includes('side-hustlers')) return AVATAR_TAGS['side-hustlers'];
  if (sourcePage.includes('builder-class')) return AVATAR_TAGS['builder-class'];
  if (sourcePage.includes('artists-musicians')) return AVATAR_TAGS['artists-musicians'];
  if (sourcePage.includes('social-security-trap')) return AVATAR_TAGS['social-security-trap'];
  if (sourcePage.includes('ubi-cbdc-warning')) return AVATAR_TAGS['ubi-cbdc-warning'];
  if (sourcePage.includes('why-mosca')) return AVATAR_TAGS['why-mosca'];
  return null;
}

async function fireTag(tagId: string, email: string, firstName: string, lastName: string): Promise<void> {
  try {
    await fetch(`${GC_BASE_URL}/tags/${tagId}/fire-tag`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GC_API_KEY}`,
        'Version': '2021-07-28',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        firstName,
        lastName
      })
    });
  } catch (error) {
    console.error('Error firing tag:', error);
  }
}
