import { NextResponse } from 'next/server';
import { AUDIENCE_MAP } from '@/lib/resend-crm';

export const dynamic = 'force-dynamic';

// GET - Return all available audiences
export async function GET() {
  try {
    // Return audience mapping as array
    const audiences = Object.entries(AUDIENCE_MAP).map(([key, id]) => ({
      id,
      key,
      name: formatAudienceName(key),
    }));

    return NextResponse.json({ audiences });
  } catch (error) {
    console.error('Error fetching audiences:', error);
    return NextResponse.json({ error: 'Failed to fetch audiences' }, { status: 500 });
  }
}

function formatAudienceName(key: string): string {
  return key
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
