// SKOOL Community Welcome Email Templates
// Created: October 25, 2026
// Purpose: Welcome emails for Standard and Premium SKOOL members

const baseStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f4f4f4; }
  .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #1E8E5A 0%, #166B44 100%); padding: 30px; text-align: center; color: white; }
  .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
  .content { padding: 30px; }
  .footer { background: #f9f9f9; padding: 20px 30px; text-align: center; font-size: 14px; color: #666; border-top: 1px solid #e0e0e0; }
  .button { display: inline-block; background: #1E8E5A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 16px 0; }
  .button:hover { background: #166B44; }
  h2 { color: #1E8E5A; margin-top: 24px; }
  h3 { color: #166B44; margin-top: 20px; }
  ul { line-height: 1.8; }
  .highlight-box { background: #f0f9f5; border-left: 4px solid #1E8E5A; padding: 16px; margin: 20px 0; border-radius: 4px; }
  .premium-badge { background: linear-gradient(135deg, #C99B37 0%, #A17829 100%); color: white; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; display: inline-block; margin-bottom: 12px; }
`;

// Standard Member Welcome Email
export const skoolStandardWelcomeTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome to Network Leveraging Cash Flow!</h1>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>Welcome to the <strong>Network Leveraging Cash Flow</strong> community on SKOOL! We're thrilled to have you here.</p>
      
      <p>You've just joined a community of visionaries, builders, and cash flow strategists who understand that <strong>the Network is the Asset</strong> and <strong>Leverage is the Strategy</strong>.</p>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0;">🚀 Your Next Steps:</h3>
        <ul style="margin-bottom: 0;">
          <li><strong>Introduce yourself</strong> in the Welcome thread</li>
          <li><strong>Explore the classroom</strong> to access free training</li>
          <li><strong>Join the discussions</strong> and connect with fellow members</li>
          <li><strong>Run the Cash Flow Simulator</strong> to see your potential</li>
        </ul>
      </div>
      
      <h2>What You'll Discover Here:</h2>
      
      <ul>
        <li><strong>Cash Flow Strategies:</strong> Learn how to create immediate and residual income</li>
        <li><strong>Community Power:</strong> Discover the power of Networks Within Networks</li>
        <li><strong>Proven Framework:</strong> Connect • Activate • Duplicate for sustainable results</li>
        <li><strong>Live Training:</strong> Join weekly strategy sessions and Q&A calls</li>
      </ul>
      
      <h2>Ready to Level Up?</h2>
      
      <p>As a <strong>Standard Member</strong>, you have access to our core community and resources. Want to unlock everything?</p>
      
      <p><strong>Premium Members</strong> get:</p>
      <ul>
        <li>✨ <strong>Full Cash Flow Simulator</strong> with detailed scenario modeling</li>
        <li>🎓 <strong>Exclusive masterclasses</strong> and advanced training</li>
        <li>🤝 <strong>Official Cash Flow Visionary status</strong></li>
        <li>📊 <strong>Priority access</strong> to tools and resources</li>
        <li>💎 <strong>Premium-only community</strong> and networking</li>
      </ul>
      
      <p style="text-align: center;">
        <a href="https://www.skool.com/network-leveraging-cash-flow-4401" class="button">Upgrade to Premium ($50/year)</a>
      </p>
      
      <h2>Let's Connect!</h2>
      
      <p>Have questions? Need guidance? I'm here to help:</p>
      
      <ul>
        <li><strong>Reply to this email</strong> - I read every message</li>
        <li><strong>DM me on SKOOL</strong> - @MzSamantha</li>
        <li><strong>Join the community chat</strong> - Get instant support</li>
      </ul>
      
      <p>This is the beginning of something powerful. Welcome to the community!</p>
      
      <p>To Your Cash Flow Success,<br>
      <strong>Samantha Hill | MzSamantha</strong><br>
      <em>Founder, Network Leveraging Cash Flow</em></p>
    </div>
    <div class="footer">
      <p><strong>Network Leveraging Cash Flow</strong></p>
      <p>SKOOL Community: <a href="https://www.skool.com/network-leveraging-cash-flow-4401">Join the Discussion</a></p>
      <p style="font-size: 12px; color: #999;">This email was sent because you joined our SKOOL community.</p>
    </div>
  </div>
</body>
</html>`;

// Premium Member Welcome Email
export const skoolPremiumWelcomeTemplate = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Welcome, Official Cash Flow Visionary!</h1>
    </div>
    <div class="content">
      <div class="premium-badge">💎 PREMIUM MEMBER</div>
      
      <p>Hi {{firstName}},</p>
      
      <p>Welcome to the <strong>Network Leveraging Cash Flow Premium Community</strong> on SKOOL! You're now an <strong>Official Cash Flow Visionary</strong>.</p>
      
      <p>By investing in Premium membership, you've shown that you're serious about leveraging networks, creating cash flow, and building something meaningful. This community is designed for people exactly like you.</p>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0;">🚀 Your Premium Access Includes:</h3>
        <ul style="margin-bottom: 0;">
          <li>✨ <strong>Full Cash Flow Simulator</strong> - Model your exact scenario</li>
          <li>🎓 <strong>Exclusive Masterclasses</strong> - Premium training & strategies</li>
          <li>📊 <strong>Advanced Tools</strong> - Full platform access</li>
          <li>💎 <strong>Premium Community</strong> - Network with top performers</li>
          <li>🎯 <strong>Priority Support</strong> - Direct access to our team</li>
        </ul>
      </div>
      
      <h2>Your Next Steps:</h2>
      
      <ol>
        <li><strong>Introduce yourself</strong> in the Premium Welcome thread</li>
        <li><strong>Run the Full Cash Flow Simulator</strong> - See your potential in detail</li>
        <li><strong>Join the next Masterclass</strong> - Check the calendar for upcoming sessions</li>
        <li><strong>Explore Premium resources</strong> - Access exclusive content in the classroom</li>
        <li><strong>Connect with fellow Visionaries</strong> - Network and collaborate</li>
      </ol>
      
      <h2>🎓 Upcoming Premium Masterclass:</h2>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0; color: #C99B37;">Cash Flow Injection Strategy Masterclass</h3>
        <p style="margin-bottom: 0;"><strong>Date:</strong> Thursday, November 12, 2026 at 11:00 AM Eastern<br>
        <strong>Register:</strong> <a href="https://mlm-lead-crm.vercel.app/cash-flow-injection-masterclass">Secure Your Spot</a></p>
      </div>
      
      <p>As a Premium member, you're automatically eligible to attend all exclusive masterclasses. Don't miss this opportunity to discover the Cash Flow Injection Framework!</p>
      
      <h2>What Makes Premium Different?</h2>
      
      <p>You're not just getting <em>access</em> - you're getting <strong>priority</strong>, <strong>depth</strong>, and <strong>direct support</strong>:</p>
      
      <ul>
        <li><strong>Full Simulator Results:</strong> See detailed projections for Immediate Cash Flow, Residual Cash Flow, and Community Compounding</li>
        <li><strong>Masterclass Access:</strong> Live training sessions with Q&A and implementation support</li>
        <li><strong>Premium Network:</strong> Connect with serious builders and strategists</li>
        <li><strong>Advanced Resources:</strong> Tools, templates, and frameworks not available to Standard members</li>
        <li><strong>Direct Support:</strong> Priority access to me and our core team</li>
      </ul>
      
      <h2>Let's Connect!</h2>
      
      <p>I'm personally invested in your success. Here's how to reach me:</p>
      
      <ul>
        <li><strong>Reply to this email</strong> - I read every Premium member message</li>
        <li><strong>DM me on SKOOL</strong> - @MzSamantha (priority response)</li>
        <li><strong>Join Premium Calls</strong> - Weekly strategy sessions for Premium members</li>
      </ul>
      
      <p>You've made a powerful decision. Let's make the most of it together.</p>
      
      <p>To Your Cash Flow Success,<br>
      <strong>Samantha Hill | MzSamantha</strong><br>
      <em>Founder, Network Leveraging Cash Flow</em></p>
      
      <p style="background: #f0f9f5; padding: 16px; border-radius: 4px; margin-top: 24px;">
        <strong>💡 Pro Tip:</strong> Start by running the Full Cash Flow Simulator. It takes 3-5 minutes and gives you a personalized roadmap for building immediate and residual cash flow. This is your foundation.
      </p>
    </div>
    <div class="footer">
      <p><strong>Network Leveraging Cash Flow | Premium Community</strong></p>
      <p>SKOOL Community: <a href="https://www.skool.com/network-leveraging-cash-flow-4401">Access Premium Resources</a></p>
      <p style="font-size: 12px; color: #999;">This email was sent because you joined our SKOOL Premium community.</p>
    </div>
  </div>
</body>
</html>`;

export interface SkoolWelcomeEmailConfig {
  tier: 'Standard' | 'Premium';
  firstName: string;
  email: string;
  fromDomain?: string;
  personalizedResultsUrl?: string | null;
}

export function getSkoolWelcomeEmail(config: SkoolWelcomeEmailConfig): { subject: string; html: string } {
  const { tier, firstName, personalizedResultsUrl } = config;
  
  let template = tier === 'Premium' ? skoolPremiumWelcomeTemplate : skoolStandardWelcomeTemplate;
  
  // Add personalized results section if available
  if (personalizedResultsUrl) {
    const resultsSection = `
      <div class="highlight-box" style="background: #fff9e6; border-left: 4px solid #C99B37;">
        <h3 style="margin-top: 0; color: #C99B37;">🎯 Your Personalized Cash Flow Injection Results</h3>
        <p>We saved your personalized Simulator results! Access your complete Enterprise vs Citizen comparison and all your historical simulations anytime:</p>
        <p style="text-align: center;">
          <a href="${personalizedResultsUrl}" class="button" style="background: #C99B37;">📊 View My Personalized Results</a>
        </p>
        <p style="font-size: 13px; color: #666; margin-top: 12px;"><em>This secure link is personalized for you and expires in 90 days. Bookmark it for easy access!</em></p>
      </div>
    `;
    // Insert before the "What You'll Discover Here" section
    template = template.replace('</div>\n      \n      <h2>What You\'ll Discover Here:</h2>', `</div>\n      ${resultsSection}\n      <h2>What You\'ll Discover Here:</h2>`);
  }
  
  const html = template.replace(/\{\{firstName\}\}/g, firstName);
  
  const subject = tier === 'Premium' 
    ? '🎉 Welcome, Official Cash Flow Visionary!'
    : '🎉 Welcome to Network Leveraging Cash Flow!';
  
  return { subject, html };
}
