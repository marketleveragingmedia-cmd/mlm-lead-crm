// Global Control Webinar Tag Integration
// Fires tags for webinar events

const GC_API_KEY = process.env.GLOBAL_CONTROL_API_KEY;
const GC_BASE_URL = 'https://api.globalcontrol.io/api/ai';

export async function fireWebinarTag(
  tagName: string,
  email: string,
  firstName: string | null,
  lastName: string | null,
  phone: string | null
): Promise<boolean> {
  try {
    if (!GC_API_KEY) {
      console.warn('⚠️ GLOBAL_CONTROL_API_KEY not configured, skipping tag');
      return false;
    }

    console.log(`🏷️ Firing Global Control tag: ${tagName} for ${email}`);

    // Fire tag (creates contact if missing)
    const response = await fetch(`${GC_BASE_URL}/tags/fire`, {
      method: 'POST',
      headers: {
        'X-API-KEY': GC_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag_name: tagName,
        email,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        phone: phone || undefined
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Global Control tag fire failed:`, error);
      return false;
    }

    const data = await response.json();
    console.log(`✅ Global Control tag fired: ${tagName}`);
    return true;

  } catch (error) {
    console.error(`❌ Error firing Global Control tag:`, error);
    return false;
  }
}
