// Scheduled Email Processor - Cron Endpoint
// Created: October 26, 2026
// Protected endpoint for processing due Standard member emails
// Run hourly or daily via Vercel Cron or external scheduler

import { NextRequest, NextResponse } from 'next/server';
import { processScheduledEmails } from '@/lib/standard-member-automation';

// Security: Require dedicated authorization token
// Do NOT use RESEND_API_KEY for scheduler authentication
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: NextRequest) {
  try {
    // SECURITY CHECK: Verify authorization
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token || token !== CRON_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized - Invalid or missing authorization token' },
        { status: 401 }
      );
    }

    console.log('[CRON] Starting scheduled email processing...');

    // Process all due emails
    const result = await processScheduledEmails();

    console.log('[CRON] Processing complete:', result);

    return NextResponse.json({
      success: result.success,
      timestamp: new Date().toISOString(),
      emailsSent: result.emailsSent,
      emailsCancelled: result.emailsCancelled,
      emailsFailed: result.emailsFailed,
      errors: result.errors,
    });
  } catch (error: any) {
    console.error('[CRON] Error processing scheduled emails:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// Vercel Cron can also use POST
export async function POST(request: NextRequest) {
  return GET(request);
}
