import { NextResponse } from 'next/server';
import { AUTOMATION_TEMPLATES } from '@/lib/automation-templates-simple';

export const dynamic = 'force-dynamic';

// GET - List all available automation templates
export async function GET() {
  try {
    // Return templates with summary info (not full email content in list view)
    const templates = AUTOMATION_TEMPLATES.map(template => ({
      id: template.id,
      name: template.name,
      description: template.description,
      triggerType: template.triggerType,
      audienceKey: template.audienceKey,
      defaultFromDomain: template.defaultFromDomain,
      defaultFromName: template.defaultFromName,
      emailCount: template.emails.length,
      // Include first email subject as preview
      previewSubject: template.emails[0]?.subject || '',
    }));

    return NextResponse.json({ templates });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json({ error: 'Failed to fetch templates' }, { status: 500 });
  }
}
