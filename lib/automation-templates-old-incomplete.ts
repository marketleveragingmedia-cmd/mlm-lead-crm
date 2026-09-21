// Complete Automation Templates with Full Email Content
// Created: September 21, 2026

import { wrapEmailContent } from './email-templates-simple';

export interface AutomationEmail {
  subject: string;
  htmlContent: string;
  textContent: string;
  delayDays: number;
}

export interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  triggerType: string;
  audienceKey: string;
  emails: AutomationEmail[];
  defaultFromDomain: string;
  defaultFromName: string;
}

// Helper to create text version from HTML
function htmlToText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
  // 1. CASH FLOW VISIONARIES WELCOME
  {
    id: 'cash-flow-visionaries-welcome',
    name: 'Cash Flow Visionaries Welcome',
    description: '5-email welcome sequence over 10 days for visionary entrepreneurs',
    triggerType: 'form_submit',
    audienceKey: 'cash-flow-visionaries',
    defaultFromDomain: 'm.cashflowvisionaries.com',
    defaultFromName: 'Cash Flow Visionaries',
    emails: [
      {
        subject: 'Welcome to Cash Flow Visionaries - Your Journey Starts Now',
        delayDays: 0,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Welcome, Visionary!</h2>
          
          <p>You've just taken a powerful step toward transforming how you think about income, wealth, and freedom.</p>
          
          <p>Cash Flow Visionaries isn't just another business opportunity - it's a <strong>mindset shift</strong>. We're building a community of entrepreneurs who understand that true wealth comes from systems, leverage, and recurring revenue.</p>
          
          <h3 style="color: #C9A441;">What You Can Expect</h3>
          
          <ul>
            <li><strong>Weekly insights</strong> on building automated income streams</li>
            <li><strong>Real case studies</strong> from members creating $5K-$50K/month in cash flow</li>
            <li><strong>Exclusive tools & templates</strong> to accelerate your journey</li>
            <li><strong>Community access</strong> to network with fellow visionaries</li>
          </ul>
          
          <p>Over the next 10 days, I'll personally guide you through the fundamentals of the Cash Flow Visionary model.</p>
          
          <p>Your first step? <strong>Define your vision.</strong> What would life look like with an extra $10K, $25K, or $50K per month in passive income?</p>
          
          <p>Reply to this email and share your vision with me. I read every response.</p>
          
          <p>To your freedom,<br>
          <strong>Cash Flow Visionaries Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'How Cash Flow Visionaries Actually Works',
        delayDays: 2,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">The System Behind the Vision</h2>
          
          <p>Yesterday, you joined Cash Flow Visionaries. Today, let me show you how this actually works.</p>
          
          <h3 style="color: #C9A441;">The 3 Pillars of Our System</h3>
          
          <p><strong>1. Network Leverage</strong><br>
          You're not building alone. Every visionary you connect with multiplies your potential income. We call this "enterprise connections" - and each one can generate recurring cash flow.</p>
          
          <p><strong>2. Automated Systems</strong><br>
          No cold calling. No chasing leads. Our platform does the heavy lifting - from lead generation to onboarding to support.</p>
          
          <p><strong>3. Community Compounding</strong><br>
          As the network grows, so does everyone's income. We've designed this so success is collaborative, not competitive.</p>
          
          <h3 style="color: #C9A441;">Real Numbers</h3>
          
          <ul>
            <li>Average member connects with <strong>12 enterprise partners</strong> in their first 90 days</li>
            <li>Each connection generates <strong>$300-$800/month</strong> in recurring cash flow</li>
            <li>Top 20% of visionaries earn <strong>$15K-$45K/month</strong> within 6 months</li>
          </ul>
          
          <p>This isn't hype. It's math + leverage + systems.</p>
          
          <p><strong>Your Next Step:</strong> Watch this 12-minute walkthrough of the platform [link would go here]</p>
          
          <p>More tomorrow,<br>
          <strong>Cash Flow Visionaries Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Success Story: From Struggling Coach to $28K/Month',
        delayDays: 4,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Meet Sarah - A Visionary Just Like You</h2>
          
          <p>8 months ago, Sarah was a life coach making $3,500/month... on a good month.</p>
          
          <p>She was trading time for money. Exhausted. Frustrated. Wondering if entrepreneurship was even worth it.</p>
          
          <p>Then she discovered Cash Flow Visionaries.</p>
          
          <h3 style="color: #C9A441;">What Changed?</h3>
          
          <p>Sarah didn't quit coaching. She <strong>added leverage</strong>.</p>
          
          <ul>
            <li><strong>Month 1:</strong> Connected with 5 enterprise partners, generated her first $1,200 in residual income</li>
            <li><strong>Month 3:</strong> 14 active connections, $4,800/month recurring</li>
            <li><strong>Month 6:</strong> 23 connections, $12,600/month</li>
            <li><strong>Today:</strong> 38 connections, $28,400/month - while still coaching 10 hours/week</li>
          </ul>
          
          <p>"I didn't have to choose between my passion and my income," Sarah told me. "Cash Flow Visionaries gave me both."</p>
          
          <h3 style="color: #C9A441;">The Pattern We See</h3>
          
          <p>Sarah's story isn't unique. We've seen it dozens of times:</p>
          
          <p>✓ Struggling entrepreneur discovers leverage<br>
          ✓ Builds enterprise connections (not a "downline")<br>
          ✓ Recurring cash flow grows month over month<br>
          ✓ Freedom replaces frustration</p>
          
          <p><strong>Your turn.</strong> Ready to write your own success story?</p>
          
          <p>Let's talk,<br>
          <strong>Cash Flow Visionaries Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Your Personalized Getting Started Roadmap',
        delayDays: 7,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Your First 30 Days: The Roadmap</h2>
          
          <p>You've learned what Cash Flow Visionaries is. You've seen proof it works. Now let's get you started.</p>
          
          <h3 style="color: #C9A441;">Week 1: Foundation</h3>
          
          <ul>
            <li>Complete your visionary profile</li>
            <li>Watch the platform training (60 min)</li>
            <li>Identify 10 potential enterprise connections</li>
            <li>Schedule your onboarding call with our team</li>
          </ul>
          
          <h3 style="color: #C9A441;">Week 2-3: First Connections</h3>
          
          <ul>
            <li>Share your vision with your network (we provide the script)</li>
            <li>Host 1-2 "vision casting" conversations per day</li>
            <li>Activate your first 3-5 enterprise partners</li>
            <li>Join weekly community calls</li>
          </ul>
          
          <h3 style="color: #C9A441;">Week 4: Systems & Scale</h3>
          
          <ul>
            <li>Set up your automated follow-up sequences</li>
            <li>Launch your personal landing page</li>
            <li>Connect with 5 more enterprise partners</li>
            <li>See your first residual payments hit your account</li>
          </ul>
          
          <p><strong>The Key:</strong> Consistency beats intensity. 1 hour a day, focused on the right activities, creates life-changing results.</p>
          
          <p><strong>Ready to Begin?</strong> [Link to getting started dashboard]</p>
          
          <p>Your guide,<br>
          <strong>Cash Flow Visionaries Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Join Our Private Visionaries Community',
        delayDays: 10,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">You're Not Building This Alone</h2>
          
          <p>The most successful Cash Flow Visionaries have one thing in common: <strong>they're plugged into the community.</strong></p>
          
          <p>Not because we force them to attend meetings or "stay motivated." But because community is where collaboration happens. Where partnerships form. Where million-dollar ideas are born.</p>
          
          <h3 style="color: #C9A441;">What's Inside Our Private Community</h3>
          
          <ul>
            <li><strong>Weekly Strategy Calls</strong> - Live Q&A with top earners and our leadership team</li>
            <li><strong>Success Stories Channel</strong> - Real wins, real numbers, real inspiration</li>
            <li><strong>Partnership Opportunities</strong> - Connect with visionaries in complementary niches</li>
            <li><strong>Resource Library</strong> - Scripts, templates, training videos, and tools</li>
            <li><strong>Accountability Partners</strong> - Get matched with someone at your level</li>
          </ul>
          
          <p><strong>No gatekeeping. No upsells. Just value.</strong></p>
          
          <p>Every visionary gets full access. You paid your way in when you joined.</p>
          
          <h3 style="color: #C9A441;">This Week's Community Highlights</h3>
          
          <p>🎉 Marcus just hit $50K/month recurring<br>
          💡 New training: "How to Pre-Frame Your Vision Conversations"<br>
          🤝 Partnership event: Connect with 3 new visionaries this Thursday</p>
          
          <p><strong>Join us now:</strong> [Link to community platform]</p>
          
          <p>See you inside,<br>
          <strong>Cash Flow Visionaries Team</strong></p>
        `),
        textContent: '',
      },
    ],
  },

  // 2. FOUNDERS BETA ONBOARDING
  {
    id: 'founders-beta-onboarding',
    name: 'Founders Beta Onboarding',
    description: '5-email exclusive onboarding for beta founders over 7 days',
    triggerType: 'form_submit',
    audienceKey: 'founders-beta',
    defaultFromDomain: 'm.citizenactivation.com',
    defaultFromName: 'Citizen Activation',
    emails: [
      {
        subject: 'Welcome to Founders Beta - You\'re In',
        delayDays: 0,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Welcome, Founder.</h2>
          
          <p>You're among the first 100 people to access this platform. That's not an accident - you were selected because of your entrepreneurial track record, your network, and your vision.</p>
          
          <p><strong>Founders Beta isn't a course. It's an opportunity.</strong></p>
          
          <p>You're getting first access to a system that will transform how entrepreneurs build recurring income. No MLM tactics. No pyramid schemes. Just pure leverage, automation, and network effects.</p>
          
          <h3 style="color: #C9A441;">What Makes Founders Beta Different</h3>
          
          <ul>
            <li>You get <strong>lifetime founder pricing</strong> - locked in forever</li>
            <li>You have <strong>direct access</strong> to our leadership team</li>
            <li>Your <strong>feedback shapes</strong> the platform roadmap</li>
            <li>You build your network <strong>before the masses arrive</strong></li>
          </ul>
          
          <p>Over the next 7 days, I'll walk you through everything - the platform, the compensation model, the growth strategy, and how to position yourself for maximum impact.</p>
          
          <p><strong>First action:</strong> Book your 1-on-1 strategy session [link here]</p>
          
          <p>Let's build,<br>
          <strong>Citizen Activation - Founders Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Founders Beta: The Complete Platform Walkthrough',
        delayDays: 2,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Your Founder Dashboard: A Tour</h2>
          
          <p>Let me show you around your new command center.</p>
          
          <h3 style="color: #C9A441;">1. The Network Builder</h3>
          
          <p>This is where you connect with enterprise partners. Unlike traditional MLM "downlines," these are peer-to-peer partnerships. Every connection is a collaboration, not a hierarchy.</p>
          
          <p><strong>Your goal:</strong> 10 enterprise connections in your first 30 days.</p>
          
          <h3 style="color: #C9A441;">2. Automated Funnels</h3>
          
          <p>We've built the entire lead generation system for you. Landing pages. Email sequences. Webinar replays. Sales conversations. All automated.</p>
          
          <p><strong>Your job:</strong> Drive traffic. We convert.</p>
          
          <h3 style="color: #C9A441;">3. Community Intelligence</h3>
          
          <p>See what's working. Who's winning. What strategies are generating the most cash flow. Real-time transparency.</p>
          
          <h3 style="color: #C9A441;">4. Residual Income Tracker</h3>
          
          <p>Watch your recurring revenue grow in real-time. Every connection. Every transaction. Full visibility.</p>
          
          <p><strong>Platform Training Video:</strong> [12-minute walkthrough link]</p>
          
          <p>Tomorrow: The compensation model explained in plain English.</p>
          
          <p>Talk soon,<br>
          <strong>Citizen Activation - Founders Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'How You Actually Make Money as a Founder',
        delayDays: 4,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">The Economics of Network Leverage</h2>
          
          <p>Let's talk numbers. No fluff. Just math.</p>
          
          <h3 style="color: #C9A441;">How Founders Earn</h3>
          
          <p><strong>1. Direct Partnerships ($300-$800/connection)</strong><br>
          When you bring someone into the network, you earn recurring revenue from their activity. Not from their money - from the value they create in the ecosystem.</p>
          
          <p><strong>2. Network Growth Bonuses ($500-$2,000/month)</strong><br>
          As your connections bring in their connections, the network compounds. You benefit from growth you didn't directly create.</p>
          
          <p><strong>3. Founder's Equity Pool (10% of company revenue)</strong><br>
          The first 100 founders share in 10% of all company revenue. Forever. This is your equity position without investing capital.</p>
          
          <h3 style="color: #C9A441;">Real Founder Numbers (90 Days In)</h3>
          
          <p><strong>Conservative Builder:</strong> 8 connections = $2,400-$4,800/month<br>
          <strong>Active Founder:</strong> 15 connections = $6,000-$12,000/month<br>
          <strong>All-In Visionary:</strong> 25+ connections = $12,000-$30,000+/month</p>
          
          <p>Plus your share of the equity pool.</p>
          
          <p><strong>The Key:</strong> This isn't about recruiting. It's about connecting visionaries with a system that works.</p>
          
          <p>Want me to build a personalized income projection for you? Reply with your target monthly income.</p>
          
          <p>More tomorrow,<br>
          <strong>Citizen Activation - Founders Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Your Founder Activation Checklist',
        delayDays: 5,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Let's Get You Fully Activated</h2>
          
          <p>You've learned what this is and how it works. Now let's activate your founder position.</p>
          
          <h3 style="color: #C9A441;">Activation Checklist</h3>
          
          <p>✓ <strong>Complete your founder profile</strong> (2 min)<br>
          ✓ <strong>Set up your custom landing page</strong> (5 min)<br>
          ✓ <strong>Connect your social accounts</strong> for easy sharing (3 min)<br>
          ✓ <strong>Schedule your strategy call</strong> with our team (required)<br>
          ✓ <strong>Join the Founders Slack</strong> - where the real magic happens<br>
          ✓ <strong>Identify your first 10 potential connections</strong> (we have a template)</p>
          
          <p><strong>Once You're Activated:</strong></p>
          
          <ul>
            <li>Your automated funnel goes live</li>
            <li>You get access to our founder-only training library</li>
            <li>You can start building your enterprise network immediately</li>
            <li>Your equity pool position is locked in</li>
          </ul>
          
          <p><strong>⏰ Activation Deadline: 7 Days</strong></p>
          
          <p>We need active founders, not inactive profiles. Complete your activation by [date] to maintain your founder status.</p>
          
          <p><strong>Start Here:</strong> [Activation Dashboard Link]</p>
          
          <p>Let's go,<br>
          <strong>Citizen Activation - Founders Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Founders-Only: This Week\'s Strategy Session',
        delayDays: 7,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Live with the Founders: This Thursday</h2>
          
          <p>Every Thursday at 2pm PT, we host a live strategy session exclusively for founders.</p>
          
          <p><strong>This week's agenda:</strong></p>
          
          <ul>
            <li><strong>Case Study:</strong> How Jennifer activated 12 connections in 18 days</li>
            <li><strong>Platform Update:</strong> New features launching next week</li>
            <li><strong>Q&A:</strong> Your questions answered live</li>
            <li><strong>Network Intros:</strong> Meet 3-5 fellow founders for potential partnerships</li>
          </ul>
          
          <h3 style="color: #C9A441;">Why These Calls Matter</h3>
          
          <p>The founders who show up consistently are the ones building the biggest networks. Not because the calls are mandatory - but because this is where relationships form.</p>
          
          <p>Every major partnership I've seen happen started on a Thursday call.</p>
          
          <p><strong>Join Us This Thursday</strong><br>
          📅 2:00pm PT / 5:00pm ET<br>
          🔗 [Zoom Link]<br>
          📱 Calendar invite attached</p>
          
          <p>Can't make it live? No problem - we'll send the replay. But live is always better.</p>
          
          <p>See you there,<br>
          <strong>Citizen Activation - Founders Team</strong></p>
        `),
        textContent: '',
      },
    ],
  },

  // 3. SIMULATOR NURTURE
  {
    id: 'simulator-nurture',
    name: 'Simulator Nurture',
    description: '6-email nurture sequence for simulator completers over 10 days',
    triggerType: 'form_submit',
    audienceKey: 'simulator',
    defaultFromDomain: 'm.cashflowvisionary.com',
    defaultFromName: 'Cash Flow Visionary',
    emails: [
      {
        subject: 'Your Cash Flow Projection: What It Means',
        delayDays: 0,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Thanks for Completing the Simulator</h2>
          
          <p>You just projected your potential recurring cash flow based on network leverage. Pretty eye-opening, right?</p>
          
          <p>Most people don't realize how quickly residual income can scale when you combine:</p>
          
          <ul>
            <li><strong>Enterprise connections</strong> (quality over quantity)</li>
            <li><strong>Automated systems</strong> (leverage over labor)</li>
            <li><strong>Community compounding</strong> (network effects over individual effort)</li>
          </ul>
          
          <p>The numbers you saw aren't fantasy. They're based on real data from our existing network.</p>
          
          <h3 style="color: #C9A441;">What Happens Next?</h3>
          
          <p>Over the next 10 days, I'll show you:</p>
          
          <p>✓ How people are actually hitting these numbers<br>
          ✓ The exact system they're using<br>
          ✓ How you can start building your own cash flow network<br>
          ✓ What to do in your first 30 days</p>
          
          <p>First question: <strong>What would you do with an extra $10K per month in recurring income?</strong></p>
          
          <p>Reply and let me know. I read every response.</p>
          
          <p>More tomorrow,<br>
          <strong>Cash Flow Visionary Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Case Study: From $0 to $12K/Month in 4 Months',
        delayDays: 2,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Real Numbers from a Real Person</h2>
          
          <p>Meet David. A 42-year-old consultant who ran the simulator just like you did 4 months ago.</p>
          
          <p>His projection: <strong>$8,500/month with 15 enterprise connections.</strong></p>
          
          <p>His reality today: <strong>$12,300/month with 18 connections.</strong></p>
          
          <h3 style="color: #C9A441;">What David Did</h3>
          
          <p><strong>Month 1:</strong> Set up his automated funnel, connected with 5 people in his network<br>
          <strong>Month 2:</strong> Added 6 more connections, refined his messaging<br>
          <strong>Month 3:</strong> Hit 14 connections, crossed $6K/month recurring<br>
          <strong>Month 4:</strong> 18 connections, $12.3K/month, quit his consulting practice</p>
          
          <p>"The simulator wasn't selling me a dream," David told me. "It was showing me a formula. I just had to execute."</p>
          
          <h3 style="color: #C9A441;">The Pattern</h3>
          
          <p>Here's what we see across successful members:</p>
          
          <ul>
            <li>They take action within 48 hours of completing the simulator</li>
            <li>They focus on <strong>quality connections</strong>, not mass recruiting</li>
            <li>They use the automated system instead of reinventing the wheel</li>
            <li>They stay consistent for 90 days minimum</li>
          </ul>
          
          <p><strong>The question:</strong> Are you ready to follow the same path?</p>
          
          <p>Tomorrow, I'll show you the system David used.</p>
          
          <p>Talk soon,<br>
          <strong>Cash Flow Visionary Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'The 3-Part System Behind Your Projection',
        delayDays: 4,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">How the System Actually Works</h2>
          
          <p>The numbers in your simulator weren't random. They're based on a proven 3-part system.</p>
          
          <h3 style="color: #C9A441;">Part 1: Enterprise Connections (Not Downlines)</h3>
          
          <p>Forget everything you know about MLM. We don't build downlines. We build peer-to-peer enterprise networks.</p>
          
          <p>Each connection = a collaboration = recurring cash flow for both parties.</p>
          
          <h3 style="color: #C9A441;">Part 2: Automated Funnels (You Don't Sell)</h3>
          
          <p>The system handles everything:</p>
          
          <ul>
            <li>Lead capture pages</li>
            <li>Email nurture sequences</li>
            <li>Webinar presentations</li>
            <li>Onboarding processes</li>
          </ul>
          
          <p>Your job: drive traffic. The funnel converts.</p>
          
          <h3 style="color: #C9A441;">Part 3: Community Compounding (Network Effects)</h3>
          
          <p>As your connections bring in their connections, everyone benefits. The network effect multiplies income without multiplying effort.</p>
          
          <p><strong>Real Example:</strong><br>
          You connect with Sarah. Sarah connects with 8 people. Those 8 bring in 47 more.</p>
          
          <p>Your direct effort: 1 connection.<br>
          Your total network impact: 56 people.<br>
          Your recurring income: $4,200/month.</p>
          
          <p><strong>That's leverage.</strong></p>
          
          <p>Tomorrow: How to activate your first enterprise connection.</p>
          
          <p>More soon,<br>
          <strong>Cash Flow Visionary Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Your First Connection: A Simple Script',
        delayDays: 6,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">Let's Activate Your First Connection</h2>
          
          <p>The hardest part of building recurring cash flow is starting. So let's make it stupid simple.</p>
          
          <h3 style="color: #C9A441;">The 3-Minute Connection Script</h3>
          
          <p><strong>Step 1: The Context (20 seconds)</strong><br>
          "Hey [name], I came across something interesting and immediately thought of you..."</p>
          
          <p><strong>Step 2: The Hook (30 seconds)</strong><br>
          "It's a system for building recurring income through network leverage - think peer-to-peer business partnerships, not MLM. I ran a projection and it showed $[X]/month with [Y] connections. Seemed too good to be true, so I dug deeper..."</p>
          
          <p><strong>Step 3: The Invitation (20 seconds)</strong><br>
          "Would you be open to taking a look? There's a 5-minute simulator that shows how it works. No pressure - just thought you'd find it interesting."</p>
          
          <p><strong>Step 4: The Link</strong><br>
          [Your custom simulator link]</p>
          
          <h3 style="color: #C9A441;">Who to Reach Out To First</h3>
          
          <ul>
            <li>Entrepreneurs already building something</li>
            <li>People frustrated with trading time for money</li>
            <li>Network marketers tired of old-school tactics</li>
            <li>Consultants, coaches, or freelancers looking for leverage</li>
          </ul>
          
          <p><strong>Your Goal:</strong> 10 conversations this week. Even if only 3 look at it and 1 joins, you've started.</p>
          
          <p>Want feedback on your approach? Reply with your draft message.</p>
          
          <p>Let's go,<br>
          <strong>Cash Flow Visionary Team</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Common Mistakes (And How to Avoid Them)',
        delayDays: 8,
        htmlContent: wrapEmailContent(`
          <h2 style="color: #1E8E5A;">What Kills Most People's Momentum</h2>
          
          <p>I've watched hundreds of people run the simulator, get excited, start building... and then quit within 30 days.</p>
          
          <p>Here's why they fail (and how you can avoid it).</p>
          
          <h3 style="color: #C9A441;">Mistake #1: Overthinking It</h3>
          
          <p>They spend weeks perfecting their message, designing custom landing pages, planning elaborate launch strategies...</p>
          
          <p><strong>The Fix:</strong> Use the done-for-you system. Just share the link and let it work.</p>
          
          <h3 style="color: #C9A441;">Mistake #2: Mass Spamming</h3>