import { NextRequest, NextResponse } from 'next/server';
import { getAutomationTemplateById } from '@/lib/automation-templates';

export const dynamic = 'force-dynamic';

// GET - Get a specific automation template with full content
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const template = getAutomationTemplateById(params.id);

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    return NextResponse.json({ template });
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json({ error: 'Failed to fetch template' }, { status: 500 });
  }
}
