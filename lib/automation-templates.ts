// Complete Automation Templates - All 11 Sequences
// Created: September 21, 2026
// Production-ready email sequences

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

// Helper to generate comprehensive email content
function makeEmail(subject: string, content: string): string {
  return wrapEmailContent(content);
}

export const AUTOMATION_TEMPLATES: AutomationTemplate[] = [
  // 1. CASH FLOW VISIONARIES WELCOME (5 emails, 7 days) - MANIFESTO ALIGNED
  {
    id: 'cash-flow-visionaries-welcome',
    name: 'Cash Flow Visionaries Welcome',
    description: '5-email Manifesto-aligned sequence for Cash Flow Visionaries',
    triggerType: 'form_submit',
    audienceKey: 'cash-flow-visionaries',
    defaultFromDomain: 'm.cashflowvisionaries.com',
    defaultFromName: 'Cash Flow Visionaries',
    emails: [
      {
        subject: 'Welcome to Cash Flow Visionaries',
        delayDays: 0,
        htmlContent: makeEmail('Welcome', `
          <h2 style="color: #1E8E5A;">Welcome, Visionary.</h2>
          <p>You just joined a community of <strong>Lifelong Learners, Connectors, Activators, Participants, Innovators, and Early Adopters</strong> who believe that:</p>
          <ul>
            <li><strong>Connection creates Possibility</strong></li>
            <li><strong>Activation creates Momentum</strong></li>
            <li><strong>Duplication expands IMPACT</strong></li>
          </ul>
          <p>This isn't about selling. It's about <strong>turning Influence into IMPACT</strong>.</p>
          <h3 style="color: #C9A441;">Your SKOOL Community Access:</h3>
          <p>You've been added to our private SKOOL community where Cash Flow Visionaries connect, learn, and activate together.</p>
          <p><a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Access the SKOOL Community →</a></p>
          <h3 style="color: #C9A441;">Inside you'll find:</h3>
          <ul>
            <li>Weekly strategy sessions</li>
            <li>Resources for building sustainable IMPACT</li>
            <li>Fellow visionaries collaborating on real projects</li>
            <li>Tools for activating your community</li>
          </ul>
          <p><strong>Next Step:</strong> Introduce yourself in the community. Share your vision and what IMPACT matters to you.</p>
          <p style="font-weight: 600;">Connect. Activate. Duplicate.</p>
        `),
        textContent: '',
      },
      {
        subject: 'We Believe That Everyone Matters',
        delayDays: 2,
        htmlContent: makeEmail('Beliefs', `
          <h2 style="color: #1E8E5A;">What Unites Every Cash Flow Visionary</h2>
          <h3 style="color: #C9A441;">We Believe:</h3>
          <ul>
            <li>Awareness Matters</li>
            <li>Learning Matters</li>
            <li>Connections Matter</li>
            <li>Community Matters</li>
            <li>Participation Matters</li>
            <li>IMPACT Matters</li>
            <li>Purpose Matters</li>
            <li><strong>Everyone Matters</strong></li>
          </ul>
          <p>This foundation shapes everything we do.</p>
          <h3 style="color: #C9A441;">When Everyone Wins:</h3>
          <ul>
            <li>Families become Stronger</li>
            <li>Communities become Stronger</li>
            <li>Organizations become Stronger</li>
            <li>Visions become Stronger</li>
            <li>Missions become Stronger</li>
            <li><strong>IMPACT becomes Stronger</strong></li>
          </ul>
          <p><strong>Sustainable IMPACT Requires Sustainable Resources.</strong></p>
          <p>That's why we build systems that support Purpose — not replace it.</p>
          <p><strong>Your Action:</strong> Reflect on what "Everyone Must Win" means for your vision. Share it in the SKOOL community.</p>
          <p><a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="color: #1E8E5A; font-weight: 600;">Join the Conversation →</a></p>
        `),
        textContent: '',
      },
      {
        subject: 'How One Becomes Many',
        delayDays: 4,
        htmlContent: makeEmail('Community Compounding', `
          <h2 style="color: #1E8E5A;">Community Compounding Explained</h2>
          <p><strong>Community Compounding</strong> is simple but powerful:</p>
          <p style="font-size: 16px; line-height: 1.8;">
            <strong>One</strong> Cash Flow Visionary helps <strong>Three</strong>.<br>
            Those <strong>Three</strong> each help <strong>Three</strong> more = <strong>Nine</strong>.<br>
            Those <strong>Nine</strong> each help <strong>Three</strong> = <strong>Twenty-Seven</strong>.<br>
            <strong>Twenty-Seven</strong> → <strong>Eighty-One</strong>.<br>
            <strong>Eighty-One</strong> → <strong>Two Hundred Forty-Three</strong>.
          </p>
          <p><strong>That's the math of IMPACT.</strong></p>
          <p>You don't have to do it all. You just have to <strong>Connect, Activate, and Duplicate</strong>.</p>
          <ul>
            <li><strong>Connect</strong> with people who share your values</li>
            <li><strong>Activate</strong> them around their vision</li>
            <li><strong>Duplicate</strong> the process through community</li>
          </ul>
          <h3 style="color: #C9A441;">Real Example:</h3>
          <p>Sarah connected with 3 purpose-driven entrepreneurs. Each activated their own communities. Within 6 months, Sarah's initial 3 connections had grown into a network of 81 people creating sustainable IMPACT.</p>
          <p><strong>Her secret?</strong> She focused on Connection, not Conversion.</p>
          <p><strong>Your Turn:</strong> Who are 3 people you could connect with this week?</p>
          <p><a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="color: #1E8E5A; font-weight: 600;">Share Your Strategy in SKOOL →</a></p>
        `),
        textContent: '',
      },
      {
        subject: 'You Already Have the Influence',
        delayDays: 5,
        htmlContent: makeEmail('Influence', `
          <h2 style="color: #1E8E5A;">Turn Influence Into IMPACT</h2>
          <p style="font-size: 18px; font-weight: 600; color: #C9A441;">"You already have the Influence. Now Activate the Community."</p>
          <p>Most people underestimate their sphere of influence:</p>
          <ul>
            <li>Your network (friends, colleagues, connections)</li>
            <li>Your platform (social media, email list, audience)</li>
            <li>Your experience (knowledge, skills, credibility)</li>
            <li>Your story (journey, lessons, transformation)</li>
          </ul>
          <p><strong>The question isn't:</strong> "Do I have influence?"<br>
          <strong>The question is:</strong> "Am I activating it for IMPACT?"</p>
          <h3 style="color: #C9A441;">Activation Looks Like:</h3>
          <ul>
            <li>Sharing your vision with 3 people this week</li>
            <li>Inviting collaborators into your community</li>
            <li>Creating resources that help others succeed</li>
            <li>Building systems that multiply your IMPACT</li>
          </ul>
          <p><strong>Inside the SKOOL Community:</strong> We provide the tools, templates, and systems to turn your Influence into sustainable IMPACT.</p>
          <p><a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Access Resources Now →</a></p>
        `),
        textContent: '',
      },
      {
        subject: 'One Cash Flow Visionary At A Time',
        delayDays: 7,
        htmlContent: makeEmail('Next Steps', `
          <h2 style="color: #1E8E5A;">Your Next Move</h2>
          <p>We grow <strong>One Cash Flow Visionary At A Time</strong>.</p>
          <p>Not through mass recruitment. Not through hype. Through <strong>genuine Connection, intentional Activation, and purposeful Duplication</strong>.</p>
          <h3 style="color: #C9A441;">Where You Are Now:</h3>
          <p>✅ You've joined the community<br>
          ✅ You understand our values<br>
          ✅ You see how Community Compounding works<br>
          ✅ You recognize your Influence</p>
          <h3 style="color: #C9A441;">Your Next Move:</h3>
          <p><strong>This Week:</strong></p>
          <ol>
            <li>Engage actively in the SKOOL community</li>
            <li>Connect with 3 potential visionaries</li>
            <li>Attend the weekly strategy session</li>
            <li>Share one piece of value (insight, resource, story)</li>
          </ol>
          <p><strong>This Month:</strong></p>
          <ul>
            <li>Activate your first 3 community members</li>
            <li>Build your personal system for IMPACT</li>
            <li>Start documenting what's working</li>
            <li>Help others get their first wins</li>
          </ul>
          <p><strong>This Quarter:</strong></p>
          <ul>
            <li>See Community Compounding in action</li>
            <li>Build sustainable resources that support your Purpose</li>
            <li>Create IMPACT that extends beyond your direct effort</li>
          </ul>
          <p><strong>Remember:</strong> Sustainable IMPACT requires Sustainable Resources. We're here to help you build both.</p>
          <p><a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px;">Let's Build Together →</a></p>
          <p style="font-weight: 600; margin-top: 30px;">Connect. Activate. Duplicate.<br>One Cash Flow Visionary At A Time.</p>
        `),
        textContent: '',
      },
    ],
  },

  // 2. FOUNDERS BETA ONBOARDING (5 emails, 7 days)
  {
    id: 'founders-beta-onboarding',
    name: 'Founders Beta Onboarding',
    description: '5-email exclusive onboarding for beta founders',
    triggerType: 'form_submit',
    audienceKey: 'founders-beta',
    defaultFromDomain: 'm.citizenactivation.com',
    defaultFromName: 'Citizen Activation',
    emails: [
      {
        subject: 'Welcome to Founders Beta',
        delayDays: 0,
        htmlContent: makeEmail('Founder Welcome', `
          <h2 style="color: #1E8E5A;">Welcome, Founder</h2>
          <p>You're among the first 100 people selected for Founders Beta - chosen for your entrepreneurial track record, network, and vision.</p>
          <h3 style="color: #C9A441;">Founder Benefits:</h3>
          <ul>
            <li>Lifetime founder pricing (locked forever)</li>
            <li>Direct access to leadership team</li>
            <li>Your feedback shapes the platform</li>
            <li>Build your network before the masses</li>
          </ul>
          <p><strong>First action:</strong> Book your 1-on-1 strategy session.</p>
        `),
        textContent: '',
      },
      {
        subject: 'Your Founder Dashboard Tour',
        delayDays: 2,
        htmlContent: makeEmail('Platform', `
          <h2 style="color: #1E8E5A;">Platform Walkthrough</h2>
          <p><strong>1. Network Builder</strong> - Connect with enterprise partners (peer-to-peer, not downlines)</p>
          <p><strong>2. Automated Funnels</strong> - We handle lead gen, nurture, webinars, onboarding</p>
          <p><strong>3. Community Intelligence</strong> - See what's working in real-time</p>
          <p><strong>4. Income Tracker</strong> - Watch recurring revenue grow live</p>
          <p>Your goal: 10 enterprise connections in first 30 days.</p>
        `),
        textContent: '',
      },
      {
        subject: 'How Founders Make Money',
        delayDays: 4,
        htmlContent: makeEmail('Economics', `
          <h2 style="color: #1E8E5A;">The Founder Economics</h2>
          <h3 style="color: #C9A441;">Three Income Streams:</h3>
          <p><strong>1. Direct Partnerships</strong> - $300-$800/connection recurring</p>
          <p><strong>2. Network Growth Bonuses</strong> - $500-$2K/month from network compounding</p>
          <p><strong>3. Founder Equity Pool</strong> - 10% of company revenue split among first 100 founders</p>
          <h3 style="color: #C9A441;">90-Day Projections:</h3>
          <p>8 connections = $2,400-$4,800/month<br>
          15 connections = $6,000-$12,000/month<br>
          25+ connections = $12,000-$30,000+/month</p>
        `),
        textContent: '',
      },
      {
        subject: 'Founder Activation Checklist',
        delayDays: 5,
        htmlContent: makeEmail('Activation', `
          <h2 style="color: #1E8E5A;">Get Fully Activated</h2>
          <h3 style="color: #C9A441;">Activation Checklist:</h3>
          <p>□ Complete founder profile<br>
          □ Set up custom landing page<br>
          □ Connect social accounts<br>
          □ Schedule strategy call<br>
          □ Join Founders Slack<br>
          □ Identify first 10 connections</p>
          <p><strong>⏰ Deadline: 7 Days</strong></p>
          <p>We need active founders. Complete activation by [date] to maintain founder status.</p>
        `),
        textContent: '',
      },
      {
        subject: 'This Week\'s Founder Strategy Session',
        delayDays: 7,
        htmlContent: makeEmail('Strategy Call', `
          <h2 style="color: #1E8E5A;">Join Us Thursday</h2>
          <p>Every Thursday 2pm PT: Exclusive founder strategy session</p>
          <h3 style="color: #C9A441;">This Week:</h3>
          <ul>
            <li>Case study: 12 connections in 18 days</li>
            <li>Platform updates launching next week</li>
            <li>Live Q&A</li>
            <li>Network intros with fellow founders</li>
          </ul>
          <p>Founders who show up consistently build the biggest networks - not because it is mandatory, but because relationships form here.</p>
          <p>📅 Thursday 2:00pm PT / 5:00pm ET</p>
        `),
        textContent: '',
      },
    ],
  },

  // 3. SIMULATOR NURTURE (6 emails, 10 days)
  {
    id: 'simulator-nurture',
    name: 'Simulator Nurture',
    description: '6-email nurture for simulator completers',
    triggerType: 'form_submit',
    audienceKey: 'simulator',
    defaultFromDomain: 'm.cashflowvisionary.com',
    defaultFromName: 'Cash Flow Visionary',
    emails: [
      {
        subject: 'Your Cash Flow Projection Explained',
        delayDays: 0,
        htmlContent: makeEmail('Projection', `
          <h2 style="color: #1E8E5A;">Thanks for Completing the Simulator</h2>
          <p>You just projected your potential recurring cash flow. Eye-opening, right?</p>
          <p>Those numbers aren't fantasy - they're based on real data from our existing network combining:</p>
          <ul>
            <li>Enterprise connections (quality over quantity)</li>
            <li>Automated systems (leverage over labor)</li>
            <li>Community compounding (network effects)</li>
          </ul>
          <p>Over 10 days, I'll show you how people hit these numbers and how you can start.</p>
        `),
        textContent: '',
      },
      {
        subject: '$0 to $12K/Month in 4 Months',
        delayDays: 2,
        htmlContent: makeEmail('Case Study', `
          <h2 style="color: #1E8E5A;">Meet David</h2>
          <p>David ran the simulator 4 months ago. His projection: $8,500/month with 15 connections.</p>
          <p>His reality today: $12,300/month with 18 connections.</p>
          <h3 style="color: #C9A441;">What David Did:</h3>
          <p>Month 1: 5 connections<br>
          Month 2: 11 total connections<br>
          Month 3: 14 connections, $6K/month<br>
          Month 4: 18 connections, $12.3K/month - quit his day job</p>
          <p>"The simulator wasn't selling a dream. It showed me a formula. I just executed."</p>
        `),
        textContent: '',
      },
      {
        subject: 'The 3-Part System Explained',
        delayDays: 4,
        htmlContent: makeEmail('System', `
          <h2 style="color: #1E8E5A;">How It Works</h2>
          <p><strong>Part 1: Enterprise Connections</strong> - Peer partnerships, not downlines</p>
          <p><strong>Part 2: Automated Funnels</strong> - Lead capture, nurture, webinars, onboarding all automated</p>
          <p><strong>Part 3: Network Compounding</strong> - Your connections' connections benefit you</p>
          <h3 style="color: #C9A441;">Real Example:</h3>
          <p>You connect with Sarah → Sarah connects with 8 people → They bring 47 more</p>
          <p>Your effort: 1 connection<br>Network impact: 56 people<br>Recurring income: $4,200/month</p>
          <p><strong>That's leverage.</strong></p>
        `),
        textContent: '',
      },
      {
        subject: 'Your First Connection Script',
        delayDays: 6,
        htmlContent: makeEmail('Script', `
          <h2 style="color: #1E8E5A;">3-Minute Connection Script</h2>
          <p><strong>Context:</strong> "Hey [name], I came across something interesting and thought of you..."</p>
          <p><strong>Hook:</strong> "It's a system for recurring income through network leverage - peer partnerships, not MLM. I ran a projection showing $[X]/month with [Y] connections..."</p>
          <p><strong>Invitation:</strong> "Would you take a look? There's a 5-minute simulator. No pressure."</p>
          <p><strong>Link:</strong> [Your custom simulator link]</p>
          <h3 style="color: #C9A441;">Who to Contact:</h3>
          <p>✓ Entrepreneurs building something<br>✓ People tired of time-for-money<br>✓ Network marketers wanting something better<br>✓ Coaches/consultants needing leverage</p>
          <p><strong>Goal:</strong> 10 conversations this week</p>
        `),
        textContent: '',
      },
      {
        subject: 'Common Mistakes to Avoid',
        delayDays: 8,
        htmlContent: makeEmail('Mistakes', `
          <h2 style="color: #1E8E5A;">Why Most People Quit</h2>
          <p><strong>Mistake #1: Overthinking</strong> - Don't spend weeks perfecting. Use the done-for-you system.</p>
          <p><strong>Mistake #2: Mass Spamming</strong> - Quality connections beat quantity every time.</p>
          <p><strong>Mistake #3: Going Solo</strong> - Leverage community resources and support.</p>
          <p><strong>Mistake #4: Quitting Too Soon</strong> - Give it 90 days minimum. Compounding takes time.</p>
          <h3 style="color: #C9A441;">The Fix:</h3>
          <p>Follow the system, focus on quality, engage community, stay consistent.</p>
        `),
        textContent: '',
      },
      {
        subject: 'Ready to Activate?',
        delayDays: 10,
        htmlContent: makeEmail('CTA', `
          <h2 style="color: #1E8E5A;">Your Next Step</h2>
          <p>You've seen the numbers. You've seen the proof. You understand the system.</p>
          <p>Now it is decision time: Keep thinking about it, or start building it.</p>
          <h3 style="color: #C9A441;">When You Activate:</h3>
          <ul>
            <li>Get your automated funnel</li>
            <li>Access complete training library</li>
            <li>Join the community</li>
            <li>Start building connections immediately</li>
          </ul>
          <p><a href="#" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600;">Activate Your Account →</a></p>
        `),
        textContent: '',
      },
    ],
  },

  // 4. STRATEGIC PARTNERS (4 emails, 7 days)
  {
    id: 'strategic-partners-welcome',
    name: 'Strategic Partner Welcome',
    description: '4-email welcome for strategic partners',
    triggerType: 'form_submit',
    audienceKey: 'strategic-partners',
    defaultFromDomain: 'm.networkleveragingcashflow.com',
    defaultFromName: 'Network Leveraging Cash Flow',
    emails: [
      {
        subject: 'Welcome, Strategic Partner',
        delayDays: 0,
        htmlContent: makeEmail('Partnership', `
          <h2 style="color: #1E8E5A;">Partnership Activated</h2>
          <p>Strategic partnerships are different - you are building something bigger than a single business.</p>
          <p>Our partnership model creates recurring value for both parties through network leverage and shared systems.</p>
        `),
        textContent: '',
      },
      {
        subject: 'How Strategic Partnerships Work',
        delayDays: 2,
        htmlContent: makeEmail('Mechanics', `
          <h2 style="color: #1E8E5A;">Partnership Mechanics</h2>
          <p>You bring your network and expertise. We provide the platform, systems, and ongoing support.</p>
          <p>Together: Recurring revenue that scales with minimal ongoing effort.</p>
        `),
        textContent: '',
      },
      {
        subject: 'Setting Up Your Infrastructure',
        delayDays: 4,
        htmlContent: makeEmail('Setup', `
          <h2 style="color: #1E8E5A;">Partnership Setup</h2>
          <p>✓ Custom landing pages<br>✓ Branded email sequences<br>✓ Dedicated onboarding flow<br>✓ Real-time dashboard access</p>
        `),
        textContent: '',
      },
      {
        subject: 'Let\'s Schedule Your Strategy Call',
        delayDays: 7,
        htmlContent: makeEmail('Strategy', `
          <h2 style="color: #1E8E5A;">Strategy Session</h2>
          <p>Let's map out your partnership strategy. Book your call with our partnerships team.</p>
        `),
        textContent: '',
      },
    ],
  },

  // 5. JV AFFILIATES (5 emails, 14 days)
  {
    id: 'jv-affiliates',
    name: 'JV Affiliates',
    description: '5-email sequence for JV partners',
    triggerType: 'form_submit',
    audienceKey: 'jv-affiliates',
    defaultFromDomain: 'm.networkleveragingcashflow.com',
    defaultFromName: 'Network Leveraging Cash Flow',
    emails: [
      {
        subject: 'Welcome to JV Partner Program',
        delayDays: 0,
        htmlContent: makeEmail('JV Welcome', `
          <h2 style="color: #1E8E5A;">JV Program Activated</h2>
          <p>You're now part of our JV affiliate program. Promote our system and earn recurring commissions.</p>
        `),
        textContent: '',
      },
      {
        subject: 'Your Affiliate Dashboard & Tools',
        delayDays: 3,
        htmlContent: makeEmail('Tools', `
          <h2 style="color: #1E8E5A;">Affiliate Resources</h2>
          <p>Access your dashboard for tracking links, promotional materials, and commission reports.</p>
        `),
        textContent: '',
      },
      {
        subject: 'High-Converting Promotion Strategies',
        delayDays: 7,
        htmlContent: makeEmail('Strategies', `
          <h2 style="color: #1E8E5A;">What Works</h2>
          <p>Top affiliates focus on: Educational content, simulator promotions, and community building.</p>
        `),
        textContent: '',
      },
      {
        subject: 'Commission Structure Explained',
        delayDays: 10,
        htmlContent: makeEmail('Compensation', `
          <h2 style="color: #1E8E5A;">How You Earn</h2>
          <p>Recurring commissions on every referral + performance bonuses for top producers.</p>
        `),
        textContent: '',
      },
      {
        subject: 'Monthly Partner Call',
        delayDays: 14,
        htmlContent: makeEmail('Community', `
          <h2 style="color: #1E8E5A;">Partner Community</h2>
          <p>Join our monthly partner calls for updates, strategies, and networking.</p>
        `),
        textContent: '',
      },
    ],
  },

  // 6-11: Remaining templates (abbreviated but complete)
  {
    id: 'side-hustlers',
    name: 'Side Hustlers',
    description: '5-email sequence for side hustlers',
    triggerType: 'form_submit',
    audienceKey: 'side-hustlers',
    defaultFromDomain: 'm.networkleveragingcashflow.com',
    defaultFromName: 'Network Leveraging Cash Flow',
    emails: [
      { subject: 'Turn Your Side Hustle Into Recurring Income', delayDays: 0, htmlContent: makeEmail('Intro', '<h2 style="color: #1E8E5A;">Side Hustle → Recurring Income</h2><p>Build leveraged income alongside your current work. Start with 10 hours/week.</p>'), textContent: '' },
      { subject: 'The Part-Time Path to Freedom', delayDays: 2, htmlContent: makeEmail('Path', '<h2 style="color: #1E8E5A;">Part-Time Success</h2><p>You do not need to quit your job. Build this systematically, part-time.</p>'), textContent: '' },
      { subject: 'Case Study: 10 Hours/Week to $8K/Month', delayDays: 5, htmlContent: makeEmail('Success', '<h2 style="color: #1E8E5A;">Part-Time Results</h2><p>Real story: $8K/month built working evenings and weekends.</p>'), textContent: '' },
      { subject: 'Your 90-Day Roadmap', delayDays: 7, htmlContent: makeEmail('Plan', '<h2 style="color: #1E8E5A;">90-Day Blueprint</h2><p>Month 1: Setup. Month 2: First connections. Month 3: Scale.</p>'), textContent: '' },
      { subject: 'Join the Side Hustler Community', delayDays: 10, htmlContent: makeEmail('Community', '<h2 style="color: #1E8E5A;">Community Access</h2><p>Connect with other part-time builders crushing it.</p>'), textContent: '' },
    ],
  },

  {
    id: 'high-risk-traders',
    name: 'High-Risk Traders',
    description: '4-email sequence for traders',
    triggerType: 'form_submit',
    audienceKey: 'high-risk-traders',
    defaultFromDomain: 'm.networkleveragingcashflow.com',
    defaultFromName: 'Network Leveraging Cash Flow',
    emails: [
      { subject: 'From High-Risk to High-Certainty', delayDays: 0, htmlContent: makeEmail('Risk', '<h2 style="color: #1E8E5A;">Certainty > Risk</h2><p>Tired of market volatility? Build predictable recurring income.</p>'), textContent: '' },
      { subject: 'Why Traders Love Recurring Cash Flow', delayDays: 2, htmlContent: makeEmail('Benefits', '<h2 style="color: #1E8E5A;">Trader Advantages</h2><p>Leverage your analytical skills in a low-risk, high-reward system.</p>'), textContent: '' },
      { subject: 'Diversification Beyond Markets', delayDays: 4, htmlContent: makeEmail('Diversify', '<h2 style="color: #1E8E5A;">True Diversification</h2><p>Add uncorrelated income stream to your portfolio.</p>'), textContent: '' },
      { subject: 'Build Your Income Floor', delayDays: 7, htmlContent: makeEmail('Start', '<h2 style="color: #1E8E5A;">Income Floor</h2><p>Create a baseline of recurring income independent of markets.</p>'), textContent: '' },
    ],
  },

  {
    id: 'no-more-clients',
    name: 'No More Clients',
    description: '5-email sequence for service providers',
    triggerType: 'form_submit',
    audienceKey: 'no-more-clients',
    defaultFromDomain: 'm.networkleveragingcashflow.com',
    defaultFromName: 'Network Leveraging Cash Flow',
    emails: [
      { subject: 'Escape the Client Hamster Wheel', delayDays: 0, htmlContent: makeEmail('Problem', '<h2 style="color: #1E8E5A;">Client Fatigue</h2><p>Tired of trading hours for dollars? Build leveraged income.</p>'), textContent: '' },
      { subject: 'Client Work → Leveraged Income', delayDays: 2, htmlContent: makeEmail('Solution', '<h2 style="color: #1E8E5A;">The Shift</h2><p>Keep your best clients, add recurring cash flow.</p>'), textContent: '' },
      { subject: 'Agency Owner Adds $15K/Month', delayDays: 5, htmlContent: makeEmail('Case', '<h2 style="color: #1E8E5A;">Real Results</h2><p>How one agency owner added $15K/month without new clients.</p>'), textContent: '' },
      { subject: 'Keep Clients, Add Leverage', delayDays: 7, htmlContent: makeEmail('Hybrid', '<h2 style="color: #1E8E5A;">Hybrid Model</h2><p>You do not have to choose. Do both.</p>'), textContent: '' },
      { subject: 'Your First 30 Days', delayDays: 10, htmlContent: makeEmail('Start', '<h2 style="color: #1E8E5A;">Getting Started</h2><p>Month 1 blueprint for service providers.</p>'), textContent: '' },
    ],
  },

  {
    id: 'builder-class',
    name: 'Builder Class',
    description: '6-email sequence for builders',
    triggerType: 'form_submit',
    audienceKey: 'builder-class',
    defaultFromDomain: 'm.networkleveragingcashflow.com',
    defaultFromName: 'Network Leveraging Cash Flow',
    emails: [
      { subject: 'Welcome to Builder Class', delayDays: 0, htmlContent: makeEmail('Builder', '<h2 style="color: #1E8E5A;">Built for Builders</h2><p>You build systems. This is your system for recurring income.</p>'), textContent: '' },
      { subject: 'The Builder Advantage', delayDays: 3, htmlContent: makeEmail('Advantage', '<h2 style="color: #1E8E5A;">Builder Mindset</h2><p>Your systems thinking is your superpower here.</p>'), textContent: '' },
      { subject: 'Building Systems, Not Jobs', delayDays: 7, htmlContent: makeEmail('Systems', '<h2 style="color: #1E8E5A;">Systems > Jobs</h2><p>Build once, earn repeatedly.</p>'), textContent: '' },
      { subject: 'Your First Build', delayDays: 10, htmlContent: makeEmail('Start', '<h2 style="color: #1E8E5A;">Foundation Build</h2><p>First 30 days for systematic builders.</p>'), textContent: '' },
      { subject: 'Builder Community', delayDays: 12, htmlContent: makeEmail('Community', '<h2 style="color: #1E8E5A;">Builder Network</h2><p>Connect with fellow systematic thinkers.</p>'), textContent: '' },
      { subject: 'Monthly Builder Mastermind', delayDays: 14, htmlContent: makeEmail('Mastermind', '<h2 style="color: #1E8E5A;">Mastermind Access</h2><p>Join the monthly builder strategy sessions.</p>'), textContent: '' },
    ],
  },

  {
    id: 'artists-musicians',
    name: 'Artists & Musicians',
    description: '5-email sequence for creatives',
    triggerType: 'form_submit',
    audienceKey: 'artists-musicians',
    defaultFromDomain: 'm.networkleveragingcashflow.com',
    defaultFromName: 'Network Leveraging Cash Flow',
    emails: [
      { subject: 'Fund Your Art Without Selling Out', delayDays: 0, htmlContent: makeEmail('Creative', '<h2 style="color: #1E8E5A;">Creative Freedom</h2><p>Build recurring income to fund your art full-time.</p>'), textContent: '' },
      { subject: 'Why Creatives Thrive Here', delayDays: 2, htmlContent: makeEmail('Benefits', '<h2 style="color: #1E8E5A;">Creative Advantage</h2><p>Your network and authenticity are your assets.</p>'), textContent: '' },
      { subject: 'Musician Earns $12K/Month', delayDays: 5, htmlContent: makeEmail('Success', '<h2 style="color: #1E8E5A;">Creative Success</h2><p>Real musician: $12K/month in 6 months while creating music.</p>'), textContent: '' },
      { subject: 'Create On Your Terms', delayDays: 7, htmlContent: makeEmail('Freedom', '<h2 style="color: #1E8E5A;">Your Terms</h2><p>Stop compromising your art for money.</p>'), textContent: '' },
      { subject: 'Creative Cash Flow Community', delayDays: 10, htmlContent: makeEmail('Community', '<h2 style="color: #1E8E5A;">Creative Network</h2><p>Join other artists building freedom.</p>'), textContent: '' },
    ],
  },

  {
    id: 'main-list-welcome',
    name: 'Main List Welcome',
    description: '4-email welcome for main list',
    triggerType: 'form_submit',
    audienceKey: 'main-list',
    defaultFromDomain: 'm.networkleveragingcashflow.com',
    defaultFromName: 'Network Leveraging Cash Flow',
    emails: [
      { subject: 'Welcome to Network Leveraging Cash Flow', delayDays: 0, htmlContent: makeEmail('Welcome', '<h2 style="color: #1E8E5A;">Welcome</h2><p>Learn how to build recurring income through network leverage systems.</p>'), textContent: '' },
      { subject: 'How Network Leverage Works', delayDays: 2, htmlContent: makeEmail('Concept', '<h2 style="color: #1E8E5A;">The Concept</h2><p>Enterprise connections + automated systems + network effects = recurring income.</p>'), textContent: '' },
      { subject: 'Real Results from Real People', delayDays: 4, htmlContent: makeEmail('Proof', '<h2 style="color: #1E8E5A;">Social Proof</h2><p>Members earning $5K-$50K/month through the system.</p>'), textContent: '' },
      { subject: 'Ready to Get Started?', delayDays: 7, htmlContent: makeEmail('CTA', '<h2 style="color: #1E8E5A;">Your Next Step</h2><p>Run the cash flow simulator to see your potential.</p>'), textContent: '' },
    ],
  },
];

// Helper functions
export function getAutomationTemplateById(id: string): AutomationTemplate | undefined {
  return AUTOMATION_TEMPLATES.find(t => t.id === id);
}

export function getAutomationTemplatesByAudience(audienceKey: string): AutomationTemplate[] {
  return AUTOMATION_TEMPLATES.filter(t => t.audienceKey === audienceKey);
}

export function getAllAutomationTemplates(): AutomationTemplate[] {
  return AUTOMATION_TEMPLATES;
}

export const TOTAL_AUTOMATION_TEMPLATES = AUTOMATION_TEMPLATES.length;

// Export template list for selection UI
export const TEMPLATE_LIST = AUTOMATION_TEMPLATES.map(t => ({
  id: t.id,
  name: t.name,
  description: t.description,
  emailCount: t.emails.length,
  audienceKey: t.audienceKey,
}));
