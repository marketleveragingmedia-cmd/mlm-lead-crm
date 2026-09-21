// Simple Email Template Library - ASCII only

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  html: string;
  category: string;
}

export function wrapEmailContent(content: string, fromName: string = 'Network Leveraging Cash Flow'): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
    .container { max-width: 600px; margin: 0 auto; background: white; }
    .header { background: #1E8E5A; padding: 32px 24px; text-align: center; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { padding: 32px 24px; }
    .button { display: inline-block; background: #1E8E5A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; }
    .footer { background: #f9f9f9; padding: 24px; text-align: center; font-size: 13px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>${fromName}</h1></div>
    <div class="content">${content}</div>
    <div class="footer">
      <p>You are receiving this from ${fromName}</p>
    </div>
  </div>
</body>
</html>`;
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'welcome-simple',
    name: 'Simple Welcome Email',
    description: 'Basic welcome email template',
    subject: 'Welcome!',
    category: 'welcome',
    html: wrapEmailContent(`
      <h2>Welcome!</h2>
      <p>Thanks for joining us. We are excited to have you here.</p>
      <p>Get started by exploring our platform.</p>
      <p><a href="#" class="button">Get Started</a></p>
    `),
  },
];

export function getTemplateById(id: string): EmailTemplate | undefined {
  return EMAIL_TEMPLATES.find(t => t.id === id);
}
