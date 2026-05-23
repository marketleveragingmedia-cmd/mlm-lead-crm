import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Lead from '@/models/Lead';
import { syncToGlobalControl } from '@/lib/globalControl';
import { sendWelcomeEmail } from '@/lib/email';

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, sourcePage, pageUrl } = body;
    
    // Accept either sourcePage or pageUrl
    const source = sourcePage || pageUrl || 'unknown';

    // Validation
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    // Connect to database
    await dbConnect();

    // Check if lead already exists
    const existingLead = await Lead.findOne({ email });
    if (existingLead) {
      return NextResponse.json(
        { success: false, error: 'Email already exists' },
        { 
          status: 409,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
          },
        }
      );
    }

    // Create lead
    const lead = await Lead.create({
      firstName,
      lastName,
      email,
      phone,
      sourcePage: source,
      createdAt: new Date(),
      syncedToGlobalControl: false
    });

    // Sync to Global Control
    const contactId = await syncToGlobalControl(lead);

    if (contactId) {
      lead.syncedToGlobalControl = true;
      lead.globalControlContactId = contactId;
      await lead.save();
    }

    // Send welcome email
    const emailSent = await sendWelcomeEmail(
      lead.firstName,
      lead.lastName,
      lead.email,
      lead.sourcePage
    );

    return NextResponse.json(
      {
        success: true,
        leadId: lead._id,
        syncedToGlobalControl: lead.syncedToGlobalControl,
        emailSent
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );

  } catch (error: any) {
    console.error('Error capturing lead:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
      }
    );
  }
}
