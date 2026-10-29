// Premium Member Follow-Up Email Sequence
// Final Approved Content
// Created: October 26, 2026
// Audience: Premium SKOOL Community Members (Official Cash Flow Visionaries)
// Sender: Samantha Hill | MzSamantha
// Schedule: Days 1, 2, 3, 4, 5 and 7 After Premium Activation

import { wrapEmailContent } from './email-templates-simple';

export interface PremiumEmailConfig {
  active: boolean;
  id: string;
  name: string;
  description: string;
  triggerType: string;
  audienceKey: string;
  fromDomain: string;
  fromName: string;
  replyTo: string;
  emails: PremiumEmail[];
}

export interface PremiumEmail {
  day: number;
  subject: string;
  previewText: string;
  htmlContent: string;
  textContent: string;
  ctaText?: string;
  ctaUrl?: string;
}

// Helper to create consistent email structure
function createEmail(content: string): string {
  return wrapEmailContent(content);
}

export const PREMIUM_MEMBER_SEQUENCE: PremiumEmailConfig = {
  active: true, // ACTIVE - Approved October 26, 2026
  id: 'premium-member-onboarding',
  name: 'Premium Member Follow-Up Sequence',
  description: 'Six-email sequence for Premium SKOOL members (Days 1-7)',
  triggerType: 'premium_activated',
  audienceKey: 'premium-members',
  fromDomain: 'm.networkleveragingcashflow.com',
  fromName: 'Samantha Hill | MzSamantha',
  replyTo: 'samantha@networkleveragingcashflow.com',
  
  emails: [
    // EMAIL 1 | DAY 1
    {
      day: 1,
      subject: 'Your Premium Experience Begins Here, Official Cash Flow Visionary!',
      previewText: 'Explore Your Next Steps Inside Network Leveraging Cash Flow.',
      ctaText: 'Explore Your Premium Community',
      ctaUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Welcome to the Premium Experience of <strong>Network Leveraging Cash Flow</strong>!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">You are now an <strong>Official Cash Flow Visionary</strong>, and I\'m Excited About What We\'re Building Together.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Your Decision to Become a Premium Member Represents an Opportunity to Move Beyond Awareness and Begin Exploring How Understanding, Technology, Community and Intentional Participation Can Work Together.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Our Belief Remains Simple:</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; font-weight: 600;">Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Your Premium Experience Introduces You to <strong>The Solution</strong> and Provides Access to the Resources and Masterclass Designed to Help You Better Understand the Possibilities.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>Here Are Your Next Steps:</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;"><strong>Explore Your Premium SKOOL Community.</strong> Become Familiar with Your Classroom, Resources and Available Experiences.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;"><strong>Connect with Your Community.</strong> Meaningful Connections Are at the Heart of What We\'re Building.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;"><strong>Prepare to Expand Your Understanding.</strong> Our Cash Flow Injection Strategy Masterclass Is an Important Part of Your Premium Experience.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">There\'s No Need to Rush. Become Familiar with the Resources and Begin Participating with Intention.</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Explore Your Premium Community →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 32px;"><strong>We\'re Glad You\'re Here, Official Cash Flow Visionary!</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

Welcome to the Premium Experience of Network Leveraging Cash Flow!

You are now an Official Cash Flow Visionary, and I'm Excited About What We're Building Together.

Your Decision to Become a Premium Member Represents an Opportunity to Move Beyond Awareness and Begin Exploring How Understanding, Technology, Community and Intentional Participation Can Work Together.

Our Belief Remains Simple:

Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.

Your Premium Experience Introduces You to The Solution and Provides Access to the Resources and Masterclass Designed to Help You Better Understand the Possibilities.

Here Are Your Next Steps:

Explore Your Premium SKOOL Community. Become Familiar with Your Classroom, Resources and Available Experiences.

Connect with Your Community. Meaningful Connections Are at the Heart of What We're Building.

Prepare to Expand Your Understanding. Our Cash Flow Injection Strategy Masterclass Is an Important Part of Your Premium Experience.

There's No Need to Rush. Become Familiar with the Resources and Begin Participating with Intention.

Explore Your Premium Community:
https://www.skool.com/network-leveraging-cash-flow-4401

We're Glad You're Here, Official Cash Flow Visionary!

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    },

    // EMAIL 2 | DAY 2
    {
      day: 2,
      subject: 'Your Masterclass Experience: Seeing Cash Flow Differently',
      previewText: 'Discover the Strategy Behind Connections, Networks and Community Cash Flow.',
      ctaText: 'Explore Your Masterclass Registration Options',
      ctaUrl: 'https://masterclass.cashflowvisionaries.com',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">One of the Important Benefits of Becoming an <strong>Official Cash Flow Visionary</strong> Is Access to the <strong>Cash Flow Injection Strategy Masterclass</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">This Experience Is Designed to Introduce a Different Perspective on Money and Cash Flow.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>During the Masterclass, We\'ll Explore:</strong></p>
        <ul style="font-size: 16px; line-height: 1.8; color: #333; margin-left: 20px;">
          <li>How Today\'s Economy Continues to Evolve</li>
          <li>The Distinction Between <em>Earning Money</em> and Understanding Cash Flow</li>
          <li>The Power of Meaningful Connections, Networks and Community</li>
          <li>How Technology and Intentional Participation Introduce Greater Possibilities</li>
          <li>The Potential of Immediate Cash Flow, Residual Cash Flow and Community Compounding</li>
        </ul>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">And Most Importantly, <strong>How Cash Flow Can Support the Vision, Mission and Purpose That Matter to You</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">The Masterclass Explains the <em>What</em> and <em>Why</em>. Your Premium SKOOL Community Supports the <em>How</em>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">When a Masterclass Registration Is Available, Use the Official Registration Process to Secure Your Individual Access.</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://masterclass.cashflowvisionaries.com" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Explore Your Masterclass Registration Options →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Come with an Open Mind, a Willingness to Learn and a Vision for What You Would Like Your Cash Flow Injection to Support.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Perhaps It\'s Your Family, Your Business, Your Ministry or Organization, a Community Initiative or a Vision You\'ve Been Wanting to Bring to Life.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; font-weight: 600; margin-top: 24px;">Because Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

One of the Important Benefits of Becoming an Official Cash Flow Visionary Is Access to the Cash Flow Injection Strategy Masterclass.

This Experience Is Designed to Introduce a Different Perspective on Money and Cash Flow.

During the Masterclass, We'll Explore:
- How Today's Economy Continues to Evolve
- The Distinction Between Earning Money and Understanding Cash Flow
- The Power of Meaningful Connections, Networks and Community
- How Technology and Intentional Participation Introduce Greater Possibilities
- The Potential of Immediate Cash Flow, Residual Cash Flow and Community Compounding

And Most Importantly, How Cash Flow Can Support the Vision, Mission and Purpose That Matter to You.

The Masterclass Explains the What and Why. Your Premium SKOOL Community Supports the How.

When a Masterclass Registration Is Available, Use the Official Registration Process to Secure Your Individual Access.

Explore Your Masterclass Registration Options:
https://masterclass.cashflowvisionaries.com

Come with an Open Mind, a Willingness to Learn and a Vision for What You Would Like Your Cash Flow Injection to Support.

Perhaps It's Your Family, Your Business, Your Ministry or Organization, a Community Initiative or a Vision You've Been Wanting to Bring to Life.

Because Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    },

    // EMAIL 3 | DAY 3
    {
      day: 3,
      subject: 'Beyond Awareness: Your Introduction to The Solution',
      previewText: 'Your Premium Membership Opens the Door to the Next Level of Understanding.',
      ctaText: 'Access Your Premium Community',
      ctaUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Inside our Standard Community, We Begin by Expanding Awareness and Helping Members See Money and Cash Flow from a Completely Different Perspective.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;"><strong>Your Premium Membership Introduces The Solution.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">This Is Where We Begin Connecting the Vision with a More Practical Understanding of How the Framework Can Be Applied.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>Our Learning Progression Is Intentional:</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; text-align: center; font-weight: 600; margin: 24px 0;">
          Awareness → Understanding → Research → Informed Decision-Making → Participation with Intention
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">We Believe That <strong>Understanding Should Come Before Participation</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">That\'s Why the Premium Experience Includes Educational Resources, Guidance and a Structured Introduction to The Solution.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">You Have the Opportunity to Explore the Information, Understand the Process and Decide How You Would Like to Participate.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>Your Next Step:</strong> Visit Your Premium SKOOL Classroom and Explore the Available Introduction to The Solution.</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Access Your Premium Community →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; font-weight: 600; margin-top: 32px;">Understanding Creates the Foundation for Intentional Participation.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

Inside our Standard Community, We Begin by Expanding Awareness and Helping Members See Money and Cash Flow from a Completely Different Perspective.

Your Premium Membership Introduces The Solution.

This Is Where We Begin Connecting the Vision with a More Practical Understanding of How the Framework Can Be Applied.

Our Learning Progression Is Intentional:

Awareness → Understanding → Research → Informed Decision-Making → Participation with Intention

We Believe That Understanding Should Come Before Participation.

That's Why the Premium Experience Includes Educational Resources, Guidance and a Structured Introduction to The Solution.

You Have the Opportunity to Explore the Information, Understand the Process and Decide How You Would Like to Participate.

Your Next Step: Visit Your Premium SKOOL Classroom and Explore the Available Introduction to The Solution.

Access Your Premium Community:
https://www.skool.com/network-leveraging-cash-flow-4401

Understanding Creates the Foundation for Intentional Participation.

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    },

    // EMAIL 4 | DAY 4
    {
      day: 4,
      subject: 'Connect • Activate • Duplicate: A Framework for Creating IMPACT',
      previewText: 'Discover the Framework Behind Intentional Participation and Community Compounding.',
      ctaText: 'Continue Exploring the Framework Inside Your Premium Community',
      ctaUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">At the Center of Our Cash Flow Injection Strategy Is a Simple, Duplicatable Framework:</p>
        
        <p style="font-size: 20px; line-height: 1.6; color: #1E8E5A; font-weight: 600; text-align: center; margin: 24px 0;">Connect • Activate • Duplicate</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; text-align: center; font-style: italic; margin-bottom: 24px;">Connect With Meaning. Activate With Intention. Duplicate With Purpose.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">This Framework Reflects the Power of Meaningful Connections, Understanding and Purposeful Participation.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;"><strong>Connection</strong> Creates Possibility.</p>
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;"><strong>Activation</strong> Creates Momentum.</p>
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;"><strong>Duplication</strong> Expands IMPACT.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">When Individuals, Networks and Communities Begin Connecting and Participating with Intention, We Begin to Recognize the Power of <strong>Community Compounding</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">One Connection Can Create Multiple Possibilities. One Community Can Strengthen Another Community. One Network Can Expand Into Other Networks.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>The Vision Is Bigger Than Location. The Mission Is Bigger Than Borders. The Movement Is Bigger Than What We Can See, Believe and Comprehend.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">This Is the Power of Meaningful Connections, Network Effects and Intentional Participation.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; font-style: italic;">Communities Within Communities. Networks Within Networks. Organizations Within Organizations.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">And Through That Shared Participation, We Can Explore the Potential of Immediate Cash Flow, Ongoing Residual Cash Flow and Community Compounding.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>Remember:</strong></p>
        <p style="font-size: 16px; line-height: 1.6; color: #333; font-weight: 600;">Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">The Framework Is Not Simply About Creating Cash Flow. It\'s About Understanding How Meaningful Connections and Intentional Participation Can Support Something Greater.</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Continue Exploring the Framework Inside Your Premium Community →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

At the Center of Our Cash Flow Injection Strategy Is a Simple, Duplicatable Framework:

Connect • Activate • Duplicate

Connect With Meaning. Activate With Intention. Duplicate With Purpose.

This Framework Reflects the Power of Meaningful Connections, Understanding and Purposeful Participation.

Connection Creates Possibility.
Activation Creates Momentum.
Duplication Expands IMPACT.

When Individuals, Networks and Communities Begin Connecting and Participating with Intention, We Begin to Recognize the Power of Community Compounding.

One Connection Can Create Multiple Possibilities. One Community Can Strengthen Another Community. One Network Can Expand Into Other Networks.

The Vision Is Bigger Than Location. The Mission Is Bigger Than Borders. The Movement Is Bigger Than What We Can See, Believe and Comprehend.

This Is the Power of Meaningful Connections, Network Effects and Intentional Participation.

Communities Within Communities. Networks Within Networks. Organizations Within Organizations.

And Through That Shared Participation, We Can Explore the Potential of Immediate Cash Flow, Ongoing Residual Cash Flow and Community Compounding.

Remember:

Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.

The Framework Is Not Simply About Creating Cash Flow. It's About Understanding How Meaningful Connections and Intentional Participation Can Support Something Greater.

Continue Exploring the Framework Inside Your Premium Community:
https://www.skool.com/network-leveraging-cash-flow-4401

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    },

    // EMAIL 5 | DAY 5
    {
      day: 5,
      subject: 'What Could Residual Cash Flow Allow You to Support?',
      previewText: 'Connect Your Vision with the Possibilities of Community Cash Flow.',
      ctaText: 'Explore the Cash Flow Injection Simulator',
      ctaUrl: 'https://simulator.cashflowvisionaries.com',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Today, I Want to Bring Our Conversation Back to Something Personal.</p>
        
        <p style="font-size: 18px; line-height: 1.6; color: #1E8E5A; font-weight: 600; margin: 24px 0;">What Could Residual Cash Flow Allow You to Support?</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Perhaps It\'s Your Family.</p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Perhaps It\'s a Business You\'ve Been Building.</p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Perhaps It\'s a Ministry, an Organization or a Community Initiative.</p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Perhaps It\'s a Vision or Mission That Requires Greater Resources to Bring to Life or Keep Alive.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">Whatever It May Be, the Purpose Remains at the Center.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; font-weight: 600;">Cash Flow Supports the Purpose.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">As an <strong>Official Cash Flow Visionary</strong>, You Have Access to the Cash Flow Injection Simulator, the Premium Masterclass Experience and the Resources Within Your Premium Community.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Use These Educational Experiences to Expand Your Understanding of How Networks, Technology and Participation Can Create Different Possibilities.</p>
        
        {{personalizedSimulatorResults}}
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">If You Haven\'t Already Explored the Cash Flow Injection Simulator, This Is a Great Time to Revisit It with Your Vision in Mind.</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://simulator.cashflowvisionaries.com" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Explore the Cash Flow Injection Simulator →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">The Simulator Is Available to Standard and Premium Members. Your Premium Experience Also Introduces <strong>The Solution</strong> and Its Supporting Resources.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px; font-weight: 600;">What Matters Most Is Not Simply What Cash Flow Could Become, but What It Could Allow You to Support.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
        
        <p style="font-size: 12px; line-height: 1.4; color: #999; margin-top: 32px; font-style: italic;">Simulator Scenarios Are Educational Illustrations. Actual Results Vary and Are Not Guaranteed. This Is Not Financial, Investment, Legal or Tax Advice.</p>
      `),
      textContent: `Great Day, {{firstName}}!

Today, I Want to Bring Our Conversation Back to Something Personal.

What Could Residual Cash Flow Allow You to Support?

Perhaps It's Your Family.
Perhaps It's a Business You've Been Building.
Perhaps It's a Ministry, an Organization or a Community Initiative.
Perhaps It's a Vision or Mission That Requires Greater Resources to Bring to Life or Keep Alive.

Whatever It May Be, the Purpose Remains at the Center.

Cash Flow Supports the Purpose.

As an Official Cash Flow Visionary, You Have Access to the Cash Flow Injection Simulator, the Premium Masterclass Experience and the Resources Within Your Premium Community.

Use These Educational Experiences to Expand Your Understanding of How Networks, Technology and Participation Can Create Different Possibilities.

{{personalizedSimulatorResults}}

If You Haven't Already Explored the Cash Flow Injection Simulator, This Is a Great Time to Revisit It with Your Vision in Mind.

Explore the Cash Flow Injection Simulator:
https://simulator.cashflowvisionaries.com

The Simulator Is Available to Standard and Premium Members. Your Premium Experience Also Introduces The Solution and Its Supporting Resources.

What Matters Most Is Not Simply What Cash Flow Could Become, but What It Could Allow You to Support.

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries

Simulator Scenarios Are Educational Illustrations. Actual Results Vary and Are Not Guaranteed. This Is Not Financial, Investment, Legal or Tax Advice.`
    },

    // EMAIL 6 | DAY 7
    {
      day: 7,
      subject: 'Official Cash Flow Visionary: Your Next Step Is Intentional',
      previewText: 'Continue Turning Awareness and Understanding into Purposeful Participation.',
      ctaText: 'Continue Your Premium Experience',
      ctaUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">You\'ve Now Had an Opportunity to Explore the Foundation of Your Premium Experience.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">We\'ve Discussed the Cash Flow Injection Strategy Masterclass.</p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">We\'ve Introduced The Solution.</p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">We\'ve Explored Connect • Activate • Duplicate.</p>
        <p style="font-size: 16px; line-height: 1.6; color: #333;">And We\'ve Continued Connecting the Possibilities of Cash Flow to Vision, Mission, Purpose and IMPACT.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">Now Comes the Most Important Part:</p>
        
        <p style="font-size: 20px; line-height: 1.6; color: #1E8E5A; font-weight: 600; text-align: center; margin: 24px 0;">Participation with Intention.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">That Begins with Understanding the Information Available to You, Exploring the Resources and Making Informed Decisions About Your Next Steps.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Your Premium SKOOL Community Is Where You Can Continue Learning, Connecting and Accessing the Guidance Available Within the Experience.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">You Can Move at Your Own Pace.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">The Goal Is Not Simply to Gather More Information. It\'s to Begin Recognizing How the Information Can Be Applied with Meaning and Purpose.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; font-style: italic; text-align: center; margin: 24px 0;">Connect With Meaning. Activate With Intention. Duplicate With Purpose.</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Continue Your Premium Experience →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 32px;"><strong>Remember:</strong></p>
        <p style="font-size: 18px; line-height: 1.6; color: #1E8E5A; font-weight: 600;">We the People Have the Power.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 16px;">And Together, We Can Continue Building Awareness, Expanding Understanding and Creating Greater Possibilities for IMPACT.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

You've Now Had an Opportunity to Explore the Foundation of Your Premium Experience.

We've Discussed the Cash Flow Injection Strategy Masterclass.
We've Introduced The Solution.
We've Explored Connect • Activate • Duplicate.
And We've Continued Connecting the Possibilities of Cash Flow to Vision, Mission, Purpose and IMPACT.

Now Comes the Most Important Part:

Participation with Intention.

That Begins with Understanding the Information Available to You, Exploring the Resources and Making Informed Decisions About Your Next Steps.

Your Premium SKOOL Community Is Where You Can Continue Learning, Connecting and Accessing the Guidance Available Within the Experience.

You Can Move at Your Own Pace.

The Goal Is Not Simply to Gather More Information. It's to Begin Recognizing How the Information Can Be Applied with Meaning and Purpose.

Connect With Meaning. Activate With Intention. Duplicate With Purpose.

Continue Your Premium Experience:
https://www.skool.com/network-leveraging-cash-flow-4401

Remember:

We the People Have the Power.

And Together, We Can Continue Building Awareness, Expanding Understanding and Creating Greater Possibilities for IMPACT.

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    }
  ]
};
