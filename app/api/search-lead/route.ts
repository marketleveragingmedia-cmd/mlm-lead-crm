import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ 
        success: false, 
        message: 'Email parameter required' 
      }, { status: 400 });
    }

    await dbConnect();

    const lead = await Lead.findOne({ email: email });

    if (!lead) {
      return NextResponse.json({ 
        success: false, 
        message: 'Lead not found',
        searched: email
      });
    }

    return NextResponse.json({
      success: true,
      found: true,
      lead: {
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        phone: lead.phone || 'not provided',
        sourcePage: lead.sourcePage,
        createdAt: lead.createdAt,
        syncedToGlobalControl: lead.syncedToGlobalControl
      }
    });

  } catch (error: any) {
    console.error('Error searching lead:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
