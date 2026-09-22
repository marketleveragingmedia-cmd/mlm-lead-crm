/**
 * Skooly Webhook Signing Secrets
 * Each webhook event has its own HMAC secret for signature verification
 * Loaded from environment variables to avoid committing secrets to git
 */

export const SKOOLY_SECRETS: Record<string, string> = {
  'new_member': process.env.SKOOLY_SECRET_NEW_MEMBER || '',
  'in_cancellation': process.env.SKOOLY_SECRET_IN_CANCELLATION || '',
  'card_declined': process.env.SKOOLY_SECRET_CARD_DECLINED || '',
  'fully_churned': process.env.SKOOLY_SECRET_FULLY_CHURNED || '',
  'resubscribed': process.env.SKOOLY_SECRET_RESUBSCRIBED || '',
  'tier_change': process.env.SKOOLY_SECRET_TIER_CHANGE || '',
  'ltv_change': process.env.SKOOLY_SECRET_LTV_CHANGE || '',
  'join_questions_answered': process.env.SKOOLY_SECRET_JOIN_QUESTIONS_ANSWERED || ''
};

/**
 * Get the appropriate secret for a given event type
 */
export function getSkoolySecret(eventType: string): string | null {
  // Normalize event type (convert spaces/dashes to underscores, lowercase)
  const normalized = eventType.toLowerCase().replace(/[\s-]/g, '_');
  return SKOOLY_SECRETS[normalized] || null;
}
