import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Get the most recent lead
    const lastLead = await Lead.findOne()
      .sort({ createdAt: -1 })
      .limit(1);

    if (!lastLead) {
      return NextResponse.json({ 
        success: false, 
        message: 'No leads found' 
      });
    }

    return NextResponse.json({
      success: true,
      lead: {
        firstName: lastLead.firstName,
        lastName: lastLead.lastName,
        email: lastLead.email,
        phone: lastLead.phone || 'not provided',
        sourcePage: lastLead.sourcePage,
        createdAt: lastLead.createdAt,
        syncedToGlobalControl: lastLead.syncedToGlobalControl
      },
      adminEmailEnvExists: !!process.env.ADMIN_NOTIFICATION_EMAIL,
      adminEmailValue: process.env.ADMIN_NOTIFICATION_EMAIL 
        ? `${process.env.ADMIN_NOTIFICATION_EMAIL.substring(0, 8)}...` 
        : 'NOT SET'
    });

  } catch (error: any) {
    console.error('Error fetching last lead:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
