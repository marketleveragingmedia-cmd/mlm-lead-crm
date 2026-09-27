import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  const filePath = join(process.cwd(), 'public', 'MASTERCLASS-END-TO-END-VERIFICATION-REPORT.html');
  const content = readFileSync(filePath, 'utf-8');
  
  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/html',
      'Content-Disposition': 'attachment; filename="MASTERCLASS-END-TO-END-VERIFICATION-REPORT.html"',
    },
  });
}
