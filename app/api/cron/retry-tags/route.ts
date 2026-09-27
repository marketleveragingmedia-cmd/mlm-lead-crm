// Global Control Tag Retry Cron
// Called periodically to retry failed tag deliveries
// Configure in Vercel Cron or external scheduler

import { NextRequest, NextResponse } from 'next/server';
import { retryPendingTags, markPermanentFailures } from '@/lib/global-control-outbox';

export async function GET(req: NextRequest) {
  try {
    // Verify authorization (optional: add secret token)
    const authHeader = req.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🔄 Starting Global Control tag retry cron...');

    // Retry pending tags
    await retryPendingTags();

    // Mark permanent failures (>= 10 attempts)
    await markPermanentFailures();

    console.log('✅ Tag retry cron complete');

    return NextResponse.json({
      success: true,
      message: 'Tag retry complete'
    });

  } catch (error) {
    console.error('❌ Tag retry cron error:', error);
    return NextResponse.json({
      error: 'Internal server error',
      message: String(error)
    }, { status: 500 });
  }
}
