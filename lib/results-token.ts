// Secure Results Token Generation & Verification
// Created: October 29, 2026
// Purpose: Generate HMAC-signed tokens for personalized results access

import crypto from 'crypto';

// Secret key from environment (shared with CRM for verification)
const TOKEN_SECRET = process.env.RESULTS_TOKEN_SECRET || process.env.RESEND_API_KEY || 'fallback-dev-secret';

// Token validity: 90 days
const TOKEN_VALIDITY_DAYS = 90;

/**
 * Generate a secure token for accessing simulator results
 */
export function generateResultsToken(resultId: string, email: string): string {
  const expiresAt = Date.now() + (TOKEN_VALIDITY_DAYS * 24 * 60 * 60 * 1000);
  
  // Payload: resultId + email + expiry
  const payload = `${resultId}:${email.toLowerCase()}:${expiresAt}`;
  
  // Sign with HMAC-SHA256
  const signature = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(payload)
    .digest('hex');
  
  // Return base64-encoded token
  const token = Buffer.from(`${payload}:${signature}`).toString('base64url');
  
  return token;
}

/**
 * Verify and decode a results token
 */
export function verifyResultsToken(token: string): { resultId: string; email: string; expiresAt: Date } | null {
  try {
    // Decode from base64url
    const decoded = Buffer.from(token, 'base64url').toString('utf8');
    const parts = decoded.split(':');
    
    if (parts.length !== 4) {
      console.error('Invalid token format');
      return null;
    }
    
    const [resultId, email, expiresAt, signature] = parts;
    
    // Check expiry
    if (Date.now() > parseInt(expiresAt, 10)) {
      console.error('Token expired');
      return null;
    }
    
    // Verify signature
    const payload = `${resultId}:${email}:${expiresAt}`;
    const expectedSignature = crypto
      .createHmac('sha256', TOKEN_SECRET)
      .update(payload)
      .digest('hex');
    
    if (signature !== expectedSignature) {
      console.error('Invalid token signature');
      return null;
    }
    
    // Return decoded payload
    return {
      resultId,
      email: email.toLowerCase(),
      expiresAt: new Date(parseInt(expiresAt, 10))
    };
    
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

