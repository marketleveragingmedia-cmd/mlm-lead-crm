import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const headers = Object.fromEntries(req.headers.entries());
    
    const timestamp = Date.now();
    const logData = {
      timestamp: new Date().toISOString(),
      headers,
      body,
      url: req.url,
      method: req.method
    };

    // Log to console
    console.log('=== WEBINARJAM WEBHOOK RECEIVED ===');
    console.log(JSON.stringify(logData, null, 2));

    // Save to file for inspection
    const logPath = join('/tmp', `webinarjam-webhook-${timestamp}.json`);
    await writeFile(logPath, JSON.stringify(logData, null, 2));
    
    console.log(`✅ Webhook saved to: ${logPath}`);

    return NextResponse.json({ success: true, received: true }, { status: 200 });
  } catch (error) {
    console.error('❌ Error processing webhook:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ 
    status: 'WebinarJam test endpoint active',
    url: 'https://mlm-lead-crm.vercel.app/api/webhooks/webinarjam-test',
    instructions: 'Configure this URL in WebinarJam to test webhook payload'
  });
}
