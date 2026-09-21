// Professional Email Templates Library
// 5 Reusable HTML Templates for Broadcasts
// Created: September 21, 2026

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  subject: string;
  html: string;
  category: string;
  preview: string;
}

// Shared styles
const baseStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
  .container { max-width: 600px; margin: 0 auto; background: white; }
  .header { background: #1E8E5A; padding: 32px 24px; text-align: center; }
  .header h1 { color: white; margin: 0; font-size: 26px; font-weight: 700; }
  .content { padding: 40px 32px; }
  .content h2 { color: #1E8E5A; font-size: 22px; margin: 0 0 16px 0; }
  .content h3 { color: #C9A441; font-size: 18px; margin: 24px 0 12px 0; }
  .content p { margin: 0 0 16px 0; }
  .content ul, .content ol { margin: 0 0 16px 0; padding-left: 24px; }
  .content li { margin-bottom: 8px; }
  .button { display: inline-block; background: #1E8E5A; color: white !important; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 16px 0; }
  .button:hover { background: #166B44; }
  .footer { background: #f9f9f9; padding: 32px 24px; text-align: center; font-size: 13px; color: #666; border-top: 1px solid #e5e5e5; }
  .footer a { color: #1E8E5A; text-decoration: none; }
  .divider { height: 1px; background: #e5e5e5; margin: 24px 0; }
`;

// Template 1: SIMPLE TEXT (Clean, readable)
const simpleTextTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="content">
      <h2>{{subject}}</h2>
      
      <p>Hi {{firstName}},</p>
      
      <p>This is where your main message goes. Keep it clear, concise, and valuable.</p>
      
      <p>Use multiple paragraphs to break up your content and make it easy to read.</p>
      
      <p><strong>Key points can be emphasized in bold</strong> to draw attention to what matters most.</p>
      
      <ul>
        <li>Bullet points make information scannable</li>
        <li>Great for lists of benefits or features</li>
        <li>Keep each point focused and brief</li>
      </ul>
      
      <p>End with a clear next step or call to action.</p>
      
      <p>Best regards,<br>
      <strong>Network Leveraging Cash Flow</strong></p>
    </div>
    <div class="footer">
      <p>You're receiving this because you subscribed to Network Leveraging Cash Flow</p>
      <p><a href="{{unsubscribeUrl}}">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>`;

// Template 2: PROFESSIONAL (Header, body, footer with brand colors)
const professionalTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Network Leveraging Cash Flow</h1>
    </div>
    <div class="content">
      <h2 style="color: #1E8E5A;">{{subject}}</h2>
      
      <p>Hello {{firstName}},</p>
      
      <p>Welcome to another update from Network Leveraging Cash Flow. We're committed to helping you build sustainable, recurring income through proven systems.</p>
      
      <h3 style="color: #C9A441;">This Week's Insights</h3>
      
      <p>Here's what you need to know this week to accelerate your progress:</p>
      
      <ul>
        <li><strong>Strategy Update:</strong> New automation features now live</li>
        <li><strong>Success Story:</strong> Member hits $15K/month milestone</li>
        <li><strong>Community:</strong> Join Thursday's strategy call at 2pm PT</li>
      </ul>
      
      <div class="divider"></div>
      
      <h3 style="color: #C9A441;">Take Action</h3>
      
      <p>Ready to implement what you've learned? Click below to access your dashboard and get started.</p>
      
      <p style="text-align: center;">
        <a href="#" class="button">Access Your Dashboard</a>
      </p>
      
      <p>Questions? Reply to this email - we read every message.</p>
      
      <p>To your success,<br>
      <strong>The NLC Team</strong></p>
    </div>
    <div class="footer">
      <p><strong>Network Leveraging Cash Flow</strong></p>
      <p>Building sustainable recurring income through network leverage</p>
      <p><a href="{{unsubscribeUrl}}">Unsubscribe</a> | <a href="#">Preferences</a></p>
    </div>
  </div>
</body>
</html>`;

// Template 3: NEWSLETTER (Multi-section)
const newsletterTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${baseStyles}
    .section { background: #f9f9f9; padding: 20px; margin: 16px 0; border-left: 4px solid #1E8E5A; border-radius: 4px; }
    .section h3 { margin-top: 0; color: #1E8E5A; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>NLC Weekly Newsletter</h1>
      <p style="color: white; margin: 8px 0 0 0; opacity: 0.9;">{{date}}</p>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>Here's your weekly roundup of insights, updates, and opportunities to accelerate your cash flow journey.</p>
      
      <div class="section">
        <h3>📊 This Week in Numbers</h3>
        <p><strong>12 new members</strong> joined the network<br>
        <strong>$847K</strong> in collective recurring income<br>
        <strong>2,341</strong> enterprise connections formed</p>
      </div>
      
      <div class="section">
        <h3>🎯 Feature Spotlight</h3>
        <p><strong>New: Automated Follow-Up Sequences</strong></p>
        <p>Set it once, let it run forever. Our new follow-up automation ensures no lead falls through the cracks.</p>
        <p><a href="#" style="color: #1E8E5A; font-weight: 600;">Learn More →</a></p>
      </div>
      
      <div class="section">
        <h3>🌟 Member Spotlight</h3>
        <p><strong>Marcus J. - $42K/Month</strong></p>
        <p>"I built this part-time while running my agency. The key was using the system instead of fighting it." <a href="#" style="color: #1E8E5A;">Read his story →</a></p>
      </div>
      
      <div class="section">
        <h3>📅 Upcoming Events</h3>
        <p><strong>Thursday, 2pm PT:</strong> Weekly Strategy Call<br>
        <strong>Friday, 11am PT:</strong> New Member Onboarding<br>
        <strong>Next Monday:</strong> Platform Update Release</p>
      </div>
      
      <div class="divider"></div>
      
      <p><strong>Quick Action:</strong> What's one thing you'll implement this week? Hit reply and let me know!</p>
      
      <p>Cheers,<br>
      <strong>The NLC Team</strong></p>
    </div>
    <div class="footer">
      <p>Network Leveraging Cash Flow | Weekly Newsletter</p>
      <p><a href="{{unsubscribeUrl}}">Unsubscribe</a> | <a href="#">Update Preferences</a></p>
    </div>
  </div>
</body>
</html>`;

// Template 4: ANNOUNCEMENT (Bold, attention-grabbing)
const announcementTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${baseStyles}
    .alert { background: #fff7e6; border-left: 4px solid #C9A441; padding: 16px 20px; margin: 24px 0; border-radius: 4px; }
    .alert h3 { margin: 0 0 8px 0; color: #C9A441; font-size: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header" style="background: #C9A441;">
      <h1>🔔 Important Announcement</h1>
    </div>
    <div class="content">
      <h2 style="color: #C9A441;">{{subject}}</h2>
      
      <p>Hi {{firstName}},</p>
      
      <p><strong>We have exciting news to share with you.</strong></p>
      
      <div class="alert">
        <h3>📢 What's New</h3>
        <p>Major platform update launching this week with game-changing features for all members.</p>
      </div>
      
      <h3 style="color: #1E8E5A;">What This Means for You</h3>
      
      <ul>
        <li><strong>More Automation:</strong> New tools to scale your network faster</li>
        <li><strong>Better Analytics:</strong> Real-time tracking of all your metrics</li>
        <li><strong>Enhanced Support:</strong> Faster response times and more resources</li>
      </ul>
      
      <h3 style="color: #1E8E5A;">Next Steps</h3>
      
      <p>1. <strong>Update your account</strong> before Friday to access new features<br>
      2. <strong>Join the launch webinar</strong> Thursday at 2pm PT<br>
      3. <strong>Review your dashboard</strong> for personalized recommendations</p>
      
      <p style="text-align: center; margin: 32px 0;">
        <a href="#" class="button" style="background: #C9A441; font-size: 16px; padding: 16px 40px;">Access Update Now</a>
      </p>
      
      <p>This is a big moment for our community. Don't miss out.</p>
      
      <p>See you on the other side,<br>
      <strong>The NLC Team</strong></p>
    </div>
    <div class="footer">
      <p>Network Leveraging Cash Flow</p>
      <p><a href="{{unsubscribeUrl}}">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>`;

// Template 5: WELCOME (Friendly, warm)
const welcomeTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${baseStyles}
    .welcome-box { background: linear-gradient(135deg, #1E8E5A 0%, #166B44 100%); color: white; padding: 32px; text-align: center; border-radius: 8px; margin: 24px 0; }
    .welcome-box h2 { color: white; font-size: 28px; margin: 0 0 12px 0; }
    .checklist { background: #f9f9f9; padding: 20px; border-radius: 6px; margin: 20px 0; }
    .checklist li { margin-bottom: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="welcome-box">
      <h2>🎉 Welcome, {{firstName}}!</h2>
      <p style="font-size: 18px; margin: 0;">You're officially part of the Network Leveraging Cash Flow community</p>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>Welcome! We're thrilled to have you here. You've just taken a powerful step toward building sustainable, recurring income.</p>
      
      <h3 style="color: #1E8E5A;">What Happens Next?</h3>
      
      <p>We've designed a simple onboarding process to get you up and running quickly:</p>
      
      <div class="checklist">
        <h4 style="margin: 0 0 16px 0; color: #1E8E5A;">Your First Week Checklist</h4>
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li>✅ <strong>Day 1:</strong> Complete your profile (5 minutes)</li>
          <li>✅ <strong>Day 2:</strong> Watch the platform walkthrough (12 minutes)</li>
          <li>✅ <strong>Day 3:</strong> Run the cash flow simulator</li>
          <li>✅ <strong>Day 4:</strong> Join the community workspace</li>
          <li>✅ <strong>Day 5:</strong> Attend your first strategy call</li>
        </ul>
      </div>
      
      <h3 style="color: #1E8E5A;">Start Here</h3>
      
      <p>Your first step is simple: complete your member profile. This takes about 5 minutes and unlocks your full dashboard.</p>
      
      <p style="text-align: center;">
        <a href="#" class="button">Complete Your Profile</a>
      </p>
      
      <h3 style="color: #1E8E5A;">Need Help?</h3>
      
      <p>We're here for you every step of the way:</p>
      
      <ul>
        <li><strong>Reply to this email</strong> with any questions</li>
        <li><strong>Join our community chat</strong> for instant support</li>
        <li><strong>Book a 1-on-1 call</strong> with our onboarding team</li>
      </ul>
      
      <p>This is the beginning of something exciting. Let's make it count.</p>
      
      <p>Welcome aboard!<br>
      <strong>The NLC Team</strong></p>
    </div>
    <div class="footer">
      <p>Network Leveraging Cash Flow</p>
      <p>You joined on {{date}}</p>
      <p><a href="{{unsubscribeUrl}}">Unsubscribe</a> | <a href="#">Preferences</a></p>
    </div>
  </div>
</body>
</html>`;

// Export all templates
export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: 'simple-text',
    name: 'Simple Text',
    description: 'Clean, readable text-focused email',
    subject: 'Your Subject Here',
    category: 'basic',
    html: simpleTextTemplate,
    preview: 'Best for straightforward messages and updates',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Professional layout with header and footer',
    subject: 'Professional Update',
    category: 'business',
    html: professionalTemplate,
    preview: 'Perfect for business updates and announcements',
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Multi-section newsletter layout',
    subject: 'Weekly Newsletter',
    category: 'newsletter',
    html: newsletterTemplate,
    preview: 'Great for weekly updates with multiple topics',
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'Bold, attention-grabbing announcement',
    subject: 'Important Announcement',
    category: 'alert',
    html: announcementTemplate,
    preview: 'Use for important news and urgent updates',
  },
  {
    id: 'welcome',
    name: 'Welcome Email',
    description: 'Friendly, warm welcome message',
    subject: 'Welcome to the Community!',
    category: 'welcome',
    html: welcomeTemplate,
    preview: 'Perfect for welcoming new members',
  },
];

// Helper functions
export function getTemplateById(id: string): EmailTemplate | undefined {
  return EMAIL_TEMPLATES.find(t => t.id === id);
}

export function getTemplatesByCategory(category: string): EmailTemplate[] {
  return EMAIL_TEMPLATES.filter(t => t.category === category);
}

// Variable replacement helper
export function fillTemplate(html: string, variables: Record<string, string>): string {
  let filled = html;
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    filled = filled.replace(regex, value);
  }
  return filled;
}
