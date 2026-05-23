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
