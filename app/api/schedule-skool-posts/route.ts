import { NextRequest, NextResponse } from 'next/server';
import { scheduleSevenDayPosts } from '@/lib/skool-post-scheduler';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Schedule 7-day SKOOL community engagement posts
 * Authorized to execute immediately
 */
export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Starting 7-day SKOOL post scheduling...');
    
    const results = await scheduleSevenDayPosts();
    
    const summary = {
      total: results.length,
      published: results.filter(r => r.status === 'published').length,
      scheduled: results.filter(r => r.status === 'scheduled').length,
      blocked: results.filter(r => r.status === 'blocked').length,
      results,
    };
    
    console.log('✅ Scheduling complete:', summary);
    
    return NextResponse.json(summary, { status: 200 });
    
  } catch (error: any) {
    console.error('❌ Scheduling failed:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
