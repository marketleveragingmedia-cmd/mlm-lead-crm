import { Resend } from 'resend';

interface EmailTemplate {
  subject: string;
  body: string;
}

// Email templates based on avatar/source page
const EMAIL_TEMPLATES: Record<string, EmailTemplate> = {
  'jv-affiliate': {
    subject: 'Welcome to the JV & Affiliate Marketers Cash Flow Challenge',
    body: `Hi {firstName},

Thank you for joining the Network Leveraging Cash Flow community!

You've taken the first step toward building Residual Cash Flow through the JV & Affiliate Marketers 8-Week Challenge.

Here's what happens next:

✅ Access the SKOOL community
✅ Start Week 1 of the challenge
✅ Connect with other JV partners and affiliate marketers

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  },
  'high-risk-trader': {
    subject: 'Welcome to the High Risk Trading Exit Strategy',
    body: `Hi {firstName},

Thank you for joining the Network Leveraging Cash Flow community!

You've discovered a path from high-risk trading to predictable Residual Cash Flow.

Here's what happens next:

✅ Access the SKOOL community
✅ Learn the transition strategy
✅ Build sustainable Cash Flow

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  },
  'no-more-clients': {
    subject: 'Welcome to the No More Clients Cash Flow Challenge',
    body: `Hi {firstName},

Thank you for joining the Network Leveraging Cash Flow community!

You've taken the first step toward building Residual Cash Flow without chasing clients.

Here's what happens next:

✅ Access the SKOOL community
✅ Start the No More Clients 8-Week Challenge
✅ Connect with other service providers making the shift

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  },
  'side-hustlers': {
    subject: 'Welcome to the Side Hustlers Cash Flow Challenge',
    body: `Hi {firstName},

Thank you for joining the Network Leveraging Cash Flow community!

You've taken the first step toward building Residual Cash Flow alongside your current income.

Here's what happens next:

✅ Access the SKOOL community
✅ Start the Side Hustlers 8-Week Challenge
✅ Connect with others building Cash Flow on the side

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  },
  'builder-class': {
    subject: 'Welcome to the Builder Class',
    body: `Hi {firstName},

Thank you for joining the Network Leveraging Cash Flow community!

You've been invited to the Builder Class - where infrastructure workers build Residual Cash Flow.

Here's what happens next:

✅ Access the SKOOL community
✅ Join the Builder Class
✅ Connect with other infrastructure specialists

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  },
  'artists-musicians': {
    subject: 'Welcome to the Artists & Musicians Cash Flow Challenge',
    body: `Hi {firstName},

Thank you for joining the Network Leveraging Cash Flow community!

You've taken the first step toward building Residual Cash Flow from your creative work.

Here's what happens next:

✅ Access the SKOOL community
✅ Start the Artists & Musicians 8-Week Challenge
✅ Connect with other creatives building Cash Flow

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  },
  'social-security-trap': {
    subject: 'Welcome - Your Financial Freedom Path',
    body: `Hi {firstName},

Thank you for joining the Network Leveraging Cash Flow community!

You've discovered a path to Financial Freedom beyond traditional retirement systems.

Here's what happens next:

✅ Access the SKOOL community
✅ Learn the Cash Flow strategy
✅ Build true Financial Security

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  },
  'ubi-cbdc-warning': {
    subject: 'Welcome - Build Financial Independence Now',
    body: `Hi {firstName},

Thank you for joining the Network Leveraging Cash Flow community!

You've recognized the importance of Financial Independence in changing times.

Here's what happens next:

✅ Access the SKOOL community
✅ Learn the Cash Flow strategy
✅ Build real Financial Freedom

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  },
  'why-mosca': {
    subject: 'Welcome to MOSCA Community',
    body: `Hi {firstName},

Thank you for your interest in MOSCA!

You've discovered a movement building Generational Wealth through Community Compounding.

Here's what happens next:

✅ Access the SKOOL community
✅ Learn about MOSCA
✅ Connect with the movement

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  },
  'cash-flow-visionary': {
    subject: 'Welcome - We Are Cash Flow Visionaries',
    body: `Hi {firstName},

Welcome! You've just joined the Cash Flow Visionaries Movement.

We are Individuals who choose to see beyond Limitations and recognize Possibilities.

You're becoming a Cash Flow Visionary.

Here's what happens next:

✅ Join the FREE Community
✅ Discover Our Foundation: Connection. Activation. Duplication.
✅ Explore Premium Access (Complete Activation Pathway + Private Network Onboarding INCLUDED)
✅ Connect with Cash Flow Visionaries Worldwide

Join the community here:
https://www.skool.com/network-leveraging-cash-flow-4401

We Believe that:
→ Awareness Matters
→ Connections Matter
→ Community Matters
→ Participation Matters
→ IMPACT Matters

Through Connection, People discover Possibilities.
Through Activation, People execute with Intention.
Through Duplication, People create IMPACT that Compounds through Communities.

One Cash Flow Visionary At A Time.

See you inside!

MzSamantha
Founder, Network Leveraging Cash Flow
Cash Flow Visionary`
  },
  'default': {
    subject: 'Welcome to Network Leveraging Cash Flow',
    body: `Hi {firstName},

Thank you for joining the Network Leveraging Cash Flow community!

You've taken the first step toward building Residual Cash Flow.

Here's what happens next:

✅ Access the SKOOL community
✅ Start your journey
✅ Connect with the community

Join the community here:
https://skoo.ly/s/cashflow

Looking forward to seeing you inside!

MzSamantha
Network Leveraging Cash Flow`
  }
};

function getAvatarFromSourcePage(sourcePage: string): string {
  if (sourcePage.includes('jv-affiliate')) return 'jv-affiliate';
  if (sourcePage.includes('high-risk-trading')) return 'high-risk-trader';
  if (sourcePage.includes('no-more-clients')) return 'no-more-clients';
  if (sourcePage.includes('side-hustlers')) return 'side-hustlers';
  if (sourcePage.includes('builder-class')) return 'builder-class';
  if (sourcePage.includes('artists-musicians')) return 'artists-musicians';
  if (sourcePage.includes('social-security-trap')) return 'social-security-trap';
  if (sourcePage.includes('ubi-cbdc-warning')) return 'ubi-cbdc-warning';
  if (sourcePage.includes('why-mosca')) return 'why-mosca';
  if (sourcePage.includes('cash-flow-visionar')) return 'cash-flow-visionary';
  return 'default';
}

export async function sendWelcomeEmail(
  firstName: string,
  lastName: string,
  email: string,
  sourcePage: string
): Promise<boolean> {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    const avatar = getAvatarFromSourcePage(sourcePage);
    const template = EMAIL_TEMPLATES[avatar] || EMAIL_TEMPLATES['default'];

    const personalizedBody = template.body.replace('{firstName}', firstName);

    const { data, error } = await resend.emails.send({
      from: 'MzSamantha <hello@m.networkleveragingcashflow.com>',
      to: [email],
      subject: template.subject,
      text: personalizedBody,
      replyTo: 'marketleveragingmedia@agentmail.to'
    });

    if (error) {
      console.error('Resend email error:', error);
      return false;
    }

    console.log('Welcome email sent:', data?.id);
    return true;

  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

export async function sendAdminNotification(
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  sourcePage: string
): Promise<boolean> {
  try {
    console.log('📧 sendAdminNotification called for:', firstName, lastName);
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
    
    console.log('🔍 ADMIN_NOTIFICATION_EMAIL exists:', !!adminEmail);
    console.log('🔍 ADMIN_NOTIFICATION_EMAIL value:', adminEmail ? `${adminEmail.substring(0, 5)}...` : 'undefined');
    
    if (!adminEmail) {
      console.warn('⚠️ ADMIN_NOTIFICATION_EMAIL not configured, skipping admin notification');
      return false;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const avatar = getAvatarFromSourcePage(sourcePage);
    const timestamp = new Date().toLocaleString('en-US', { 
      timeZone: 'America/New_York',
      dateStyle: 'full',
      timeStyle: 'long'
    });

    const subject = `🎯 New Lead: ${firstName} ${lastName} (${avatar})`;
    
    const body = `New lead captured from modal!

📋 LEAD DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone || 'Not provided'}
Source Page: ${sourcePage}
Avatar: ${avatar}
Timestamp: ${timestamp}

🔗 QUICK ACTIONS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
View Dashboard: https://mlm-lead-crm.vercel.app/dashboard
View in Database: Lead captured successfully

💡 NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Welcome email sent to lead
✅ Lead redirected to SKOOL community
✅ Stored in MongoDB

---
MLM Lead CRM System
Network Leveraging Cash Flow`;

    console.log('📤 Sending admin notification email to:', adminEmail);
    console.log('📝 Subject:', subject);
    
    const { data, error } = await resend.emails.send({
      from: 'MLM Lead CRM <hello@m.networkleveragingcashflow.com>',
      to: [adminEmail],
      subject: subject,
      text: body,
      replyTo: email // Allow quick reply to the lead
    });

    if (error) {
      console.error('❌ Admin notification Resend error:', error);
      console.error('❌ Error type:', typeof error);
      console.error('❌ Error name:', error?.name);
      console.error('❌ Error message:', error?.message);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      
      // Log specific Resend error info
      if (error && typeof error === 'object') {
        console.error('❌ Resend error keys:', Object.keys(error));
        if ('statusCode' in error) console.error('❌ Status code:', error.statusCode);
        if ('message' in error) console.error('❌ Message:', error.message);
      }
      return false;
    }

    console.log('✅ Admin notification sent successfully! Email ID:', data?.id);
    return true;

  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
}
