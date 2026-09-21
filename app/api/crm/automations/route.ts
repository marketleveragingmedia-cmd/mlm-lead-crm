import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { AUTOMATION_TEMPLATES, getAutomationTemplateById } from '@/lib/automation-templates';

export const dynamic = 'force-dynamic';

// GET - List all automations
export async function GET() {
  try {
    const automations = await prisma.resendAutomation.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ automations });
  } catch (error) {
    console.error('Error fetching automations:', error);
    return NextResponse.json({ error: 'Failed to fetch automations' }, { status: 500 });
  }
}

// POST - Create automation from template or custom
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      templateId,
      name,
      description,
      triggerType,
      triggerValue,
      audienceId,
      fromDomain,
      fromName,
      emails,
      active,
    } = body;

    let automationData;

    if (templateId) {
      // Create from template
      const template = getAutomationTemplateById(templateId);
      
      if (!template) {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }

      automationData = {
        name: template.name,
        description: template.description,
        triggerType: template.triggerType,
        triggerValue: triggerValue || template.audienceKey,
        audienceId: audienceId || null,
        fromDomain: template.defaultFromDomain,
        fromName: template.defaultFromName,
        fromEmail: `hello@${template.defaultFromDomain}`,
        emails: template.emails, // Store as JSON
        active: active !== undefined ? active : true,
      };
    } else {
      // Create custom automation
      if (!name || !triggerType || !emails || !Array.isArray(emails)) {
        return NextResponse.json(
          { error: 'Missing required fields for custom automation' },
          { status: 400 }
        );
      }

      automationData = {
        name,
        description: description || null,
        triggerType,
        triggerValue: triggerValue || null,
        audienceId: audienceId || null,
        fromDomain: fromDomain || 'm.networkleveragingcashflow.com',
        fromName: fromName || 'Network Leveraging Cash Flow',
        fromEmail: `hello@${fromDomain || 'm.networkleveragingcashflow.com'}`,
        emails,
        active: active !== undefined ? active : true,
      };
    }

    const automation = await prisma.resendAutomation.create({
      data: automationData,
    });

    return NextResponse.json({ automation });
  } catch (error) {
    console.error('Error creating automation:', error);
    return NextResponse.json({ error: 'Failed to create automation' }, { status: 500 });
  }
}

// DELETE - Delete an automation
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Automation ID required' }, { status: 400 });
    }

    await prisma.resendAutomation.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting automation:', error);
    return NextResponse.json({ error: 'Failed to delete automation' }, { status: 500 });
  }
}

// PATCH - Update automation (toggle active, update settings)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, active, name, description } = body;

    if (!id) {
      return NextResponse.json({ error: 'Automation ID required' }, { status: 400 });
    }

    const automation = await prisma.resendAutomation.update({
      where: { id },
      data: {
        ...(active !== undefined && { active }),
        ...(name && { name }),
        ...(description !== undefined && { description }),
      },
    });

    return NextResponse.json({ automation });
  } catch (error) {
    console.error('Error updating automation:', error);
    return NextResponse.json({ error: 'Failed to update automation' }, { status: 500 });
  }
}
