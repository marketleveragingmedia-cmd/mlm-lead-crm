import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { syncToGlobalControl } from '@/lib/globalControl';
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/email';

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

    // Check if lead already exists
    const existingLead = await prisma.lead.findUnique({
      where: { email }
    });

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
    const lead = await prisma.lead.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        sourcePage: source,
        syncedToGlobalControl: false
      }
    });

    // Sync to Global Control
    const contactId = await syncToGlobalControl({
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      sourcePage: lead.sourcePage
    });

    if (contactId) {
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          syncedToGlobalControl: true,
          globalControlContactId: contactId
        }
      });
    }

    // Send welcome email
    const emailSent = await sendWelcomeEmail(
      lead.firstName,
      lead.lastName,
      lead.email,
      lead.sourcePage
    );

    // Send admin notification (non-blocking)
    const adminNotificationPromise = sendAdminNotification(
      lead.firstName,
      lead.lastName,
      lead.email,
      lead.phone || '',
      lead.sourcePage
    );
    
    adminNotificationPromise
      .then(result => {
        if (result) {
          console.log('✅ Admin notification sent successfully');
        } else {
          console.warn('⚠️ Admin notification returned false - check ADMIN_NOTIFICATION_EMAIL env var');
        }
      })
      .catch(err => {
        console.error('❌ Admin notification failed with error:', err);
        console.error('Error details:', JSON.stringify(err, null, 2));
      });

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
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
