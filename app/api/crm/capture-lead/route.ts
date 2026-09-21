import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { addContactToAudience, getAudienceForSource, getDomainForSource, AUDIENCE_MAP } from '@/lib/resend-crm';
import { syncToGlobalControl } from '@/lib/globalControl';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      firstName,
      lastName,
      email,
      phone,
      source,
      metadata,
    } = body;

    // Validation
    if (!firstName || !lastName || !email || !source) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: firstName, lastName, email, source' },
        { status: 400 }
      );
    }

    // Check if lead already exists
    let lead = await prisma.lead.findUnique({
      where: { email }
    });

    let isNewLead = false;

    if (!lead) {
      // Create new lead
      lead = await prisma.lead.create({
        data: {
          firstName,
          lastName,
          email,
          phone: phone || null,
          sourcePage: source,
        }
      });
      isNewLead = true;
    }

    // Get audience for this source
    const audienceKey = getAudienceForSource(source);
    const audienceId = AUDIENCE_MAP[audienceKey];

    // Add to Resend audience (if new lead or not already added)
    let resendContactId = lead.resendContactId;
    
    if (!resendContactId) {
      try {
        resendContactId = await addContactToAudience(
          email,
          firstName,
          lastName,
          audienceId
        );

        // Update lead with Resend contact ID
        await prisma.lead.update({
          where: { id: lead.id },
          data: {
            resendContactId,
            resendAudienceId: audienceId,
            resendTags: [audienceKey, 'new-lead'],
          }
        });
      } catch (resendError) {
        console.error('Resend error (non-blocking):', resendError);
        // Continue even if Resend fails
      }
    }

    // Sync to Global Control (passive backup)
    let globalControlSynced = false;
    try {
      await syncToGlobalControl(lead.id, firstName, lastName, email, source);
      globalControlSynced = true;
      
      await prisma.lead.update({
        where: { id: lead.id },
        data: { syncedToGlobalControl: true }
      });
    } catch (gcError) {
      console.error('Global Control sync error (non-blocking):', gcError);
    }

    // Return success
    return NextResponse.json({
      success: true,
      status: isNewLead ? 'lead_created' : 'existing_lead',
      leadId: lead.id,
      resendContactId,
      audienceId,
      audienceKey,
      tags: [audienceKey, 'new-lead'],
      globalControlSynced,
      metadata: {
        source,
        ...metadata
      }
    });

  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}

// CORS support
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
