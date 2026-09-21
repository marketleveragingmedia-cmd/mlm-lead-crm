import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { sendBatchEmails, getAudiences } from '@/lib/resend-crm';

export const dynamic = 'force-dynamic';

// GET - List all broadcasts
export async function GET() {
  try {
    const broadcasts = await prisma.resendBroadcast.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ broadcasts });
  } catch (error) {
    console.error('Error fetching broadcasts:', error);
    return NextResponse.json({ error: 'Failed to fetch broadcasts' }, { status: 500 });
  }
}

// POST - Create and optionally send broadcast
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      subject,
      htmlContent,
      textContent,
      audienceId,
      fromDomain,
      fromName,
      scheduledFor,
      sendNow,
    } = body;

    // Validate required fields
    if (!name || !subject || !htmlContent || !fromDomain || !fromName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const fromEmail = `hello@${fromDomain}`;

    // Create broadcast in database
    const broadcast = await prisma.resendBroadcast.create({
      data: {
        name,
        subject,
        htmlContent,
        textContent: textContent || '',
        audienceId: audienceId || null,
        fromDomain,
        fromName,
        fromEmail,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        status: sendNow ? 'sending' : scheduledFor ? 'scheduled' : 'draft',
      },
    });

    // If sendNow is true, send the broadcast immediately
    if (sendNow && audienceId) {
      try {
        // Get all leads for this audience
        const leads = await prisma.lead.findMany({
          where: {
            resendAudienceId: audienceId,
          },
          select: {
            email: true,
            firstName: true,
            lastName: true,
          },
        });

        if (leads.length === 0) {
          return NextResponse.json({
            broadcast,
            warning: 'No leads found for this audience',
          });
        }

        // Prepare batch emails
        const emails = leads.map(lead => ({
          from: `${fromName} <${fromEmail}>`,
          to: lead.email,
          subject,
          html: htmlContent,
          text: textContent || htmlContent.replace(/<[^>]*>/g, ''),
        }));

        // Send in batches of 100 (Resend limit)
        const batchSize = 100;
        let totalSent = 0;

        for (let i = 0; i < emails.length; i += batchSize) {
          const batch = emails.slice(i, i + batchSize);
          await sendBatchEmails(batch);
          totalSent += batch.length;
        }

        // Update broadcast status
        await prisma.resendBroadcast.update({
          where: { id: broadcast.id },
          data: {
            status: 'sent',
            sentAt: new Date(),
            recipientCount: totalSent,
          },
        });

        return NextResponse.json({
          broadcast,
          sent: true,
          recipientCount: totalSent,
        });
      } catch (sendError) {
        console.error('Error sending broadcast:', sendError);
        
        // Update broadcast status to failed
        await prisma.resendBroadcast.update({
          where: { id: broadcast.id },
          data: {
            status: 'draft',
          },
        });

        return NextResponse.json(
          { error: 'Failed to send broadcast', broadcast },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ broadcast });
  } catch (error) {
    console.error('Error creating broadcast:', error);
    return NextResponse.json({ error: 'Failed to create broadcast' }, { status: 500 });
  }
}

// DELETE - Delete a broadcast
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Broadcast ID required' }, { status: 400 });
    }

    await prisma.resendBroadcast.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting broadcast:', error);
    return NextResponse.json({ error: 'Failed to delete broadcast' }, { status: 500 });
  }
}
