/**
 * Standard SKOOL Member Follow-Up Email Sequence (DRAFT)
 * Created: October 26, 2026
 * Status: INACTIVE - Awaiting content approval
 * 
 * 7-Day onboarding sequence for Standard (Free) SKOOL members
 * Sender: Samantha Hill | MzSamantha
 */

const baseStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
  .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
  .header { background: linear-gradient(135deg, #1E8E5A 0%, #166B44 100%); padding: 30px; text-align: center; color: white; }
  .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
  .content { padding: 30px; }
  .footer { background: #f9f9f9; padding: 20px 30px; text-align: center; font-size: 14px; color: #666; border-top: 1px solid #e0e0e0; }
  .button { display: inline-block; background: #1E8E5A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 16px 0; }
  .button:hover { background: #166B44; }
  h2 { color: #1E8E5A; margin-top: 24px; }
  h3 { color: #C9A441; margin-top: 20px; }
  ul { line-height: 1.8; }
  .highlight-box { background: #f0f9f5; border-left: 4px solid #1E8E5A; padding: 16px; margin: 20px 0; border-radius: 4px; }
`;

export interface StandardMemberEmail {
  dayNumber: number;
  subject: string;
  html: string;
  delayDays: number;
}

/**
 * Day 1: SKOOL Community Orientation
 */
const day1_CommunityOrientation: StandardMemberEmail = {
  dayNumber: 1,
  delayDays: 1,
  subject: "Your SKOOL Community Tour - Let's Get Started!",
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Welcome Back, {{firstName}}!</h1>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>Yesterday, you joined the <strong>Network Leveraging Cash Flow</strong> community on SKOOL. Today, let me give you a quick tour so you can make the most of your membership.</p>
      
      <h2>🗺️ Your SKOOL Community Map</h2>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0;">📚 The Classroom</h3>
        <p>This is where you'll find structured training, resources, and frameworks for understanding cash flow in today's economy.</p>
        <ul>
          <li><strong>Getting Started</strong> - Begin here</li>
          <li><strong>Cash Flow Fundamentals</strong> - Core concepts</li>
          <li><strong>Platform Economy Opportunities</strong> - What's possible today</li>
          <li><strong>Community Resources</strong> - Tools and templates</li>
        </ul>
      </div>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0;">💬 The Community Feed</h3>
        <p>This is where members connect, ask questions, share insights, and support each other.</p>
        <p><strong>Your Action:</strong> Introduce yourself in the Welcome thread. Tell us:</p>
        <ul>
          <li>What brought you to Network Leveraging Cash Flow?</li>
          <li>What are you hoping to learn or accomplish?</li>
          <li>What IMPACT matters most to you?</li>
        </ul>
      </div>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0;">📅 Live Events</h3>
        <p>We host regular live sessions, Q&A calls, and strategy discussions. Check the Events calendar to see what's coming up!</p>
      </div>
      
      <h2>🎯 Your Next Step</h2>
      
      <p>Head over to the community and introduce yourself. We're excited to meet you!</p>
      
      <p style="text-align: center;">
        <a href="https://www.skool.com/network-leveraging-cash-flow-4401" class="button">Access the SKOOL Community →</a>
      </p>
      
      <p>Looking forward to seeing you inside!</p>
      
      <p>To Your Success,<br>
      <strong>Samantha Hill | MzSamantha</strong><br>
      <em>Founder, Network Leveraging Cash Flow</em></p>
    </div>
    <div class="footer">
      <p><strong>Network Leveraging Cash Flow</strong></p>
      <p>SKOOL Community: <a href="https://www.skool.com/network-leveraging-cash-flow-4401">Join the Discussion</a></p>
    </div>
  </div>
</body>
</html>`
};

/**
 * Day 2: Master Cash Flow Injection Simulator Introduction
 */
const day2_SimulatorIntroduction: StandardMemberEmail = {
  dayNumber: 2,
  delayDays: 2,
  subject: "See Your Cash Flow Potential - Try the Simulator",
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Discover What's Possible</h1>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>One of the most powerful tools in the Network Leveraging Cash Flow ecosystem is the <strong>Master Cash Flow Injection Simulator</strong>.</p>
      
      <p>In just 3-5 minutes, you can see personalized projections for:</p>
      
      <ul>
        <li><strong>Immediate Cash Flow</strong> - What you could generate in the first 30 days</li>
        <li><strong>Residual Cash Flow</strong> - Ongoing recurring income potential</li>
        <li><strong>Community Compounding</strong> - How your network amplifies over time</li>
      </ul>
      
      <h2>Why This Matters</h2>
      
      <p>The simulator helps you understand the <strong>difference between the Industrial Economy and the Platform Economy</strong>.</p>
      
      <div class="highlight-box">
        <p><strong>Industrial Economy:</strong> Trade time for money. Limited by hours in a day.</p>
        <p><strong>Platform Economy:</strong> Leverage technology, networks, and systems. Not limited by your personal time.</p>
      </div>
      
      <p>The simulator shows you what becomes possible when you understand and leverage the Platform Economy.</p>
      
      <h2>🎯 Your Turn</h2>
      
      <p>Run the simulator and see your personalized cash flow projections. It takes less than 5 minutes and gives you a clear picture of what's possible.</p>
      
      <p style="text-align: center;">
        <a href="https://cash-flow-injection-simulator.vercel.app" class="button">Run the Simulator →</a>
      </p>
      
      <p><em>Note: As a Standard member, you'll see summary projections. Premium members unlock the full detailed breakdown.</em></p>
      
      <p>Let me know what you discover!</p>
      
      <p>To Your Cash Flow Success,<br>
      <strong>Samantha Hill | MzSamantha</strong><br>
      <em>Founder, Network Leveraging Cash Flow</em></p>
    </div>
    <div class="footer">
      <p><strong>Network Leveraging Cash Flow</strong></p>
      <p>Community: <a href="https://www.skool.com/network-leveraging-cash-flow-4401">SKOOL</a> | Simulator: <a href="https://cash-flow-injection-simulator.vercel.app">Try It Now</a></p>
    </div>
  </div>
</body>
</html>`
};

/**
 * Day 3: Understanding Today's Economy and Cash Flow
 */
const day3_EconomyAndCashFlow: StandardMemberEmail = {
  dayNumber: 3,
  delayDays: 3,
  subject: "Why Cash Flow Matters More Than Ever",
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Understanding Today's Economy</h1>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>Let's talk about why <strong>cash flow matters more than ever</strong> in today's economy.</p>
      
      <h2>The Shift That Changed Everything</h2>
      
      <p>We're living through the transition from the <strong>Industrial Economy</strong> to the <strong>Platform Economy</strong>.</p>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0;">Industrial Economy (Old Model)</h3>
        <ul>
          <li>Trade time for money</li>
          <li>Limited by geography</li>
          <li>Build everything from scratch</li>
          <li>Income stops when you stop working</li>
        </ul>
      </div>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0;">Platform Economy (New Model)</h3>
        <ul>
          <li>Leverage technology and systems</li>
          <li>Global reach, local relationships</li>
          <li>Build on existing platforms</li>
          <li>Create residual, recurring income</li>
          <li><strong>Income compounds through community</strong></li>
        </ul>
      </div>
      
      <h2>What's Possible Today That Wasn't Possible Before</h2>
      
      <p>Just two years ago, the tools, platforms, and systems available today didn't exist or weren't accessible in the same way.</p>
      
      <p><strong>Technology has democratized access to:</strong></p>
      <ul>
        <li>Global digital payment systems</li>
        <li>Community platforms (like SKOOL)</li>
        <li>Automated marketing and sales systems</li>
        <li>Network leverage tools</li>
        <li>Residual income structures</li>
      </ul>
      
      <h2>We the People Have the Power</h2>
      
      <p>The <strong>Network Is the Asset</strong>. The <strong>Leverage Is the Strategy</strong>.</p>
      
      <div class="highlight-box">
        <p><strong>Communities Within Communities</strong><br>
        <strong>Networks Within Networks</strong><br>
        <strong>Organizations Within Organizations</strong></p>
        <p>This creates the potential for <strong>Community Compounding</strong> and <strong>Residual Cash Flow</strong>.</p>
      </div>
      
      <h2>Cash Flow Is Not the Purpose</h2>
      
      <p>Cash flow <strong>supports</strong> the purpose.</p>
      
      <p>Whether it's:</p>
      <ul>
        <li>Expanding the IMPACT of a Ministry</li>
        <li>Advancing an Organization's Mission</li>
        <li>Strengthening a Business</li>
        <li>Supporting a Network Marketing Team</li>
        <li>Creating greater financial freedom for your family</li>
      </ul>
      
      <p><strong>Imagine what becomes possible when cash flow supports what already matters to you.</strong></p>
      
      <p>That's what we're building together.</p>
      
      <p>To Your Awareness,<br>
      <strong>Samantha Hill | MzSamantha</strong><br>
      <em>Founder, Network Leveraging Cash Flow</em></p>
    </div>
    <div class="footer">
      <p><strong>Network Leveraging Cash Flow</strong></p>
      <p>SKOOL Community: <a href="https://www.skool.com/network-leveraging-cash-flow-4401">Join the Discussion</a></p>
    </div>
  </div>
</body>
</html>`
};

/**
 * Day 4: Cash Flow Visionaries Movement and Community Purpose
 */
const day4_CashFlowVisionaries: StandardMemberEmail = {
  dayNumber: 4,
  delayDays: 4,
  subject: "The Cash Flow Visionaries Movement",
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Who Are the Cash Flow Visionaries?</h1>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>You've been exploring the Network Leveraging Cash Flow community for a few days now. Today, I want to share what the <strong>Cash Flow Visionaries Movement</strong> is really about.</p>
      
      <h2>We Believe</h2>
      
      <ul>
        <li><strong>Awareness Matters</strong></li>
        <li><strong>Learning Matters</strong></li>
        <li><strong>Connections Matter</strong></li>
        <li><strong>Community Matters</strong></li>
        <li><strong>Participation Matters</strong></li>
        <li><strong>IMPACT Matters</strong></li>
        <li><strong>Purpose Matters</strong></li>
        <li><strong>Everyone Matters</strong></li>
      </ul>
      
      <h2>When Everyone Wins</h2>
      
      <p>When everyone wins:</p>
      <ul>
        <li>Families become <strong>Stronger</strong></li>
        <li>Communities become <strong>Stronger</strong></li>
        <li>Organizations become <strong>Stronger</strong></li>
        <li>Visions become <strong>Stronger</strong></li>
        <li>Missions become <strong>Stronger</strong></li>
        <li><strong>IMPACT becomes Stronger</strong></li>
      </ul>
      
      <h2>Our Core Framework</h2>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0; color: #1E8E5A;">Connect • Activate • Duplicate</h3>
        <p><strong>Connect With Meaning:</strong> Build meaningful relationships, not just contacts.</p>
        <p><strong>Activate With Intention:</strong> Take purposeful action aligned with your vision.</p>
        <p><strong>Duplicate With Purpose:</strong> Share what works so others can succeed too.</p>
      </div>
      
      <p>This simple framework creates the potential for:</p>
      <ul>
        <li><strong>Immediate Cash Flow</strong></li>
        <li><strong>Ongoing Residual Cash Flow</strong></li>
        <li><strong>Community Compounding</strong></li>
      </ul>
      
      <h2>Who Is a Cash Flow Visionary?</h2>
      
      <p>Cash Flow Visionaries are:</p>
      <ul>
        <li><strong>Lifelong Learners</strong> - Always growing and adapting</li>
        <li><strong>Connectors</strong> - Building meaningful relationships</li>
        <li><strong>Activators</strong> - Taking purposeful action</li>
        <li><strong>Participants</strong> - Engaged in community</li>
        <li><strong>Innovators</strong> - Finding new solutions</li>
        <li><strong>Early Adopters</strong> - Seeing possibilities before others</li>
      </ul>
      
      <p>They understand that <strong>Connection creates Possibility</strong>, <strong>Activation creates Momentum</strong>, and <strong>Duplication expands IMPACT</strong>.</p>
      
      <h2>You're Already Part of This</h2>
      
      <p>By joining this community, you've taken the first step. You're exploring, learning, and considering what's possible.</p>
      
      <p><strong>That makes you a visionary</strong> - whether you're a Standard or Premium member.</p>
      
      <p>The question is: How deep do you want to go?</p>
      
      <p>To Your Vision,<br>
      <strong>Samantha Hill | MzSamantha</strong><br>
      <em>Founder, Cash Flow Visionaries</em></p>
    </div>
    <div class="footer">
      <p><strong>Network Leveraging Cash Flow</strong></p>
      <p>SKOOL Community: <a href="https://www.skool.com/network-leveraging-cash-flow-4401">Join the Conversation</a></p>
    </div>
  </div>
</body>
</html>`
};

/**
 * Day 5: Standard vs Premium Membership
 */
const day5_StandardVsPremium: StandardMemberEmail = {
  dayNumber: 5,
  delayDays: 5,
  subject: "Standard vs Premium - What's the Difference?",
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Understanding Your Membership Options</h1>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>You joined as a <strong>Standard (Free) Member</strong>, and I want to make sure you understand exactly what that includes — and what's available if you decide to upgrade.</p>
      
      <h2>🌟 Standard Membership (FREE)</h2>
      
      <p><strong>What You Have Now:</strong></p>
      <ul>
        <li>✅ Access to the SKOOL Community</li>
        <li>✅ Community discussions and networking</li>
        <li>✅ Selected classroom resources</li>
        <li>✅ Live event participation</li>
        <li>✅ Cash Flow Injection Simulator (summary results)</li>
        <li>✅ Weekly community updates</li>
      </ul>
      
      <p>This is a <strong>great starting point</strong> for exploring cash flow strategies and connecting with like-minded people.</p>
      
      <h2>💎 Premium Membership ($50/year)</h2>
      
      <p><strong>What Premium Members Get:</strong></p>
      <ul>
        <li>✨ <strong>Official Cash Flow Visionary Status</strong></li>
        <li>🎓 <strong>Exclusive Masterclasses</strong> - Advanced training and strategies</li>
        <li>📊 <strong>Full Cash Flow Simulator</strong> - Detailed scenario modeling with exact projections</li>
        <li>🤝 <strong>Premium Community Access</strong> - Network with top performers</li>
        <li>📈 <strong>Advanced Tools & Resources</strong> - Full platform access</li>
        <li>🎯 <strong>Priority Support</strong> - Direct access to our team</li>
        <li>💼 <strong>Implementation Resources</strong> - Templates, systems, frameworks</li>
      </ul>
      
      <h2>Why Premium Members Upgrade</h2>
      
      <div class="highlight-box">
        <p><strong>"I wanted the full picture"</strong></p>
        <p>Standard gives you awareness. Premium gives you the complete roadmap and tools to act on it.</p>
      </div>
      
      <div class="highlight-box">
        <p><strong>"$50/year is nothing compared to what I learned"</strong></p>
        <p>One insight from a masterclass can pay for years of membership.</p>
      </div>
      
      <div class="highlight-box">
        <p><strong>"I wanted to be an Official Cash Flow Visionary"</strong></p>
        <p>Premium membership isn't just access - it's a commitment to the movement and community.</p>
      </div>
      
      <h2>The Real Question</h2>
      
      <p>It's not "Can I afford $50/year?" It's:</p>
      
      <p><strong>"What's it worth to have clarity, community, and a proven framework for creating cash flow that supports my purpose?"</strong></p>
      
      <p>If you're serious about understanding and leveraging today's economy, Premium is the next step.</p>
      
      <p>But there's no pressure. Standard membership is valuable on its own, and you can upgrade anytime.</p>
      
      <p>The choice is yours.</p>
      
      <p>To Your Success,<br>
      <strong>Samantha Hill | MzSamantha</strong><br>
      <em>Founder, Network Leveraging Cash Flow</em></p>
    </div>
    <div class="footer">
      <p><strong>Network Leveraging Cash Flow</strong></p>
      <p>SKOOL Community: <a href="https://www.skool.com/network-leveraging-cash-flow-4401">Explore</a> | <a href="https://www.skool.com/network-leveraging-cash-flow-4401/about">Upgrade to Premium ($50/year)</a></p>
    </div>
  </div>
</body>
</html>`
};

/**
 * Day 7: Invitation to Become an Official Cash Flow Visionary
 */
const day7_PremiumInvitation: StandardMemberEmail = {
  dayNumber: 7,
  delayDays: 7,
  subject: "Are You Ready to Become an Official Cash Flow Visionary?",
  html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${baseStyles}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your Journey So Far</h1>
    </div>
    <div class="content">
      <p>Hi {{firstName}},</p>
      
      <p>It's been a week since you joined Network Leveraging Cash Flow.</p>
      
      <p>In that time, you've:</p>
      <ul>
        <li>Explored the SKOOL Community</li>
        <li>Learned about the Platform Economy</li>
        <li>Discovered the Master Cash Flow Injection Simulator</li>
        <li>Understood why cash flow matters more than ever</li>
        <li>Explored the Cash Flow Visionaries Movement</li>
      </ul>
      
      <p>You've seen what's possible. You understand the framework: <strong>Connect • Activate • Duplicate</strong>.</p>
      
      <h2>The Next Step</h2>
      
      <p>Now it's time to decide: Are you ready to go deeper?</p>
      
      <div class="highlight-box">
        <h3 style="margin-top: 0; color: #C9A441;">Become an Official Cash Flow Visionary</h3>
        <p><strong>Premium Membership - $50/year</strong></p>
        <p>This isn't just an upgrade. It's a commitment to:</p>
        <ul>
          <li>Your financial awareness and education</li>
          <li>Your community and relationships</li>
          <li>Your vision and purpose</li>
          <li>The movement we're building together</li>
        </ul>
      </div>
      
      <h2>What You Get Immediately</h2>
      
      <ul>
        <li>💎 <strong>Official Cash Flow Visionary Status</strong></li>
        <li>🎓 <strong>Access to Exclusive Masterclasses</strong> - Including the upcoming <em>Cash Flow Injection Strategy Masterclass</em> (November 12, 2026)</li>
        <li>📊 <strong>Full Cash Flow Simulator Access</strong> - See detailed projections and scenario modeling</li>
        <li>🤝 <strong>Premium Community</strong> - Connect with serious builders and strategists</li>
        <li>📈 <strong>Advanced Resources</strong> - Tools, templates, and systems not available to Standard members</li>
        <li>🎯 <strong>Priority Support</strong> - Direct access to our core team</li>
      </ul>
      
      <h2>Why Now?</h2>
      
      <p>The <strong>Cash Flow Injection Strategy Masterclass</strong> is happening on <strong>November 12, 2026 at 11:00 AM Eastern</strong>.</p>
      
      <p>This masterclass will show you:</p>
      <ul>
        <li>Live cash flow scenario modeling</li>
        <li>The complete Connect • Activate • Duplicate framework</li>
        <li>How to create immediate AND residual cash flow</li>
        <li>Real examples of community compounding</li>
      </ul>
      
      <p><strong>Premium members get automatic access.</strong></p>
      
      <h2>This Is Your Invitation</h2>
      
      <p>I'm not here to pressure you. I'm here to invite you.</p>
      
      <p>If you're ready to commit to your growth, your vision, and this community — <strong>become an Official Cash Flow Visionary today</strong>.</p>
      
      <p style="text-align: center; margin-top: 30px;">
        <a href="https://www.skool.com/network-leveraging-cash-flow-4401/about" class="button" style="font-size: 18px; padding: 16px 32px;">Upgrade to Premium ($50/year) →</a>
      </p>
      
      <p style="text-align: center; margin-top: 20px; font-size: 14px; color: #666;">
        Questions? Reply to this email. I read every message.
      </p>
      
      <p style="margin-top: 40px;">Welcome to the movement,</p>
      
      <p><strong>Samantha Hill | MzSamantha</strong><br>
      <em>Founder, Cash Flow Visionaries</em></p>
      
      <p style="background: #f0f9f5; padding: 16px; border-radius: 4px; margin-top: 24px; font-size: 14px;">
        <strong>💡 Remember:</strong> This is about more than $50/year. It's about who you're becoming and the IMPACT you're creating. If you're ready, I'm here to support you every step of the way.
      </p>
    </div>
    <div class="footer">
      <p><strong>Network Leveraging Cash Flow | Cash Flow Visionaries</strong></p>
      <p>SKOOL Community: <a href="https://www.skool.com/network-leveraging-cash-flow-4401">Access Now</a></p>
    </div>
  </div>
</body>
</html>`
};

export const STANDARD_MEMBER_SEQUENCE: StandardMemberEmail[] = [
  day1_CommunityOrientation,
  day2_SimulatorIntroduction,
  day3_EconomyAndCashFlow,
  day4_CashFlowVisionaries,
  day5_StandardVsPremium,
  day7_PremiumInvitation
];

export const AUTOMATION_CONFIG = {
  id: 'standard-member-onboarding',
  name: 'Standard SKOOL Member Onboarding',
  description: '7-day follow-up sequence for Standard (Free) SKOOL members',
  triggerType: 'skool_member_joined',
  triggerValue: 'Standard',
  audienceKey: 'skool-standard',
  fromDomain: 'm.networkleveragingcashflow.com',
  fromName: 'Samantha Hill | MzSamantha',
  fromEmail: 'notifications@m.networkleveragingcashflow.com',
  active: false, // INACTIVE pending approval
  emails: STANDARD_MEMBER_SEQUENCE
};
