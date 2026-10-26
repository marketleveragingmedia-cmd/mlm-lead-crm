// Standard Member Follow-Up Email Sequence
// Final Approved Content | Brand Writing Style Updated
// Created: October 26, 2026
// Audience: Standard SKOOL Community Members
// Sender: Samantha Hill | MzSamantha
// Schedule: Days 1, 2, 3, 4, 5 and 7 After Joining

import { wrapEmailContent } from './email-templates-simple';

export interface StandardEmailConfig {
  active: boolean;
  id: string;
  name: string;
  description: string;
  triggerType: string;
  audienceKey: string;
  fromDomain: string;
  fromName: string;
  replyTo: string;
  emails: StandardEmail[];
}

export interface StandardEmail {
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

export const STANDARD_MEMBER_SEQUENCE: StandardEmailConfig = {
  active: true, // ACTIVE - Approved October 26, 2026
  id: 'standard-member-onboarding',
  name: 'Standard Member Follow-Up Sequence',
  description: 'Six-email sequence for Standard SKOOL members (Days 1-7)',
  triggerType: 'member_joined',
  audienceKey: 'standard-members',
  fromDomain: 'm.networkleveragingcashflow.com',
  fromName: 'Samantha Hill | MzSamantha',
  replyTo: 'samantha@networkleveragingcashflow.com',
  
  emails: [
    // EMAIL 1 | DAY 1
    {
      day: 1,
      subject: 'Welcome In! Let\'s Explore Your NLC Community',
      previewText: 'Discover the Resources and Connections Waiting for You.',
      ctaText: 'Explore Your NLC Community',
      ctaUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Now that you've joined <strong>Network Leveraging Cash Flow</strong>, I want to personally encourage you to <strong>Explore Your Community</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">This is more than another online group. We\'re <strong>Building a Community Focused on Expanding Awareness, Changing Perspectives and Creating a Greater Understanding of How Money and Cash Flow Work in Today\'s Economy</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>Here are three ways to begin:</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;"><strong>Explore the Classroom.</strong> Discover Educational Resources Designed to Help You See Money and Cash Flow from a Different Perspective.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;"><strong>Join the Conversation.</strong> Introduce Yourself and Begin Connecting with other Members who are Interested in Learning, Growing and Creating IMPACT.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;"><strong>Explore the Cash Flow Injection Simulator.</strong> Begin Discovering the Possibilities of Community, Networks and Cash Flow in Action.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">There's no need to figure everything out on your first day.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;"><strong>Start with Awareness. Expand Your Understanding. Participate with Intention.</strong></p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Explore Your NLC Community →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 32px;"><strong>We\'re Glad You\'re Here!</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

Now that you've joined Network Leveraging Cash Flow, I want to personally encourage you to Explore Your Community.

This is more than another online group. We\'re Building a Community Focused on Expanding Awareness, Changing Perspectives and Creating a Greater Understanding of How Money and Cash Flow Work in Today\'s Economy.

Here are three ways to begin:

Explore the Classroom. Discover Educational Resources Designed to Help You See Money and Cash Flow from a Different Perspective.

Join the Conversation. Introduce Yourself and Begin Connecting with other Members who are Interested in Learning, Growing and Creating IMPACT.

Explore the Cash Flow Injection Simulator. Begin Discovering the Possibilities of Community, Networks and Cash Flow in Action.

There's no need to figure everything out on your first day.

Start with Awareness. Expand Your Understanding. Participate with Intention.

Explore Your NLC Community:
https://www.skool.com/network-leveraging-cash-flow-4401

We\'re Glad You\'re Here!

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    },

    // EMAIL 2 | DAY 2
    {
      day: 2,
      subject: 'What Could a Cash Flow Injection Make Possible?',
      previewText: 'Explore the Potential of Meaningful Connections and Community Compounding.',
      ctaText: 'Explore the Cash Flow Injection Simulator',
      ctaUrl: 'https://simulator.cashflowvisionaries.com',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;"><strong>What if you could Look at Cash Flow from a Completely Different Perspective?</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Most People Have Been Taught How to Earn Money, but Very Few Have Been Taught How to <strong>Recognize, Create and Participate in Cash Flow</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">That's why we created the <strong>Cash Flow Injection Simulator</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">It's an <strong>Interactive Educational Experience</strong> Designed to Help You Explore:</p>
        
        <ul style="font-size: 16px; line-height: 1.8; color: #333; margin-left: 20px;">
          <li>The Potential of Immediate Cash Flow</li>
          <li>The Possibilities of Ongoing Residual Cash Flow</li>
          <li>How Community and Network Participation Can Create a Compounding Effect</li>
          <li>What Different Participation Scenarios Could Look Like Over Time</li>
        </ul>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">And here's something important: <strong>As a Standard Member, You Have Access to the Full Cash Flow Injection Simulator Experience.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">The Objective isn\'t to Promise an Outcome. It's to Help You <strong>See Possibilities, Explore Scenarios and Expand Your Understanding</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Because Once Your Perspective Changes, Opportunities That Were Already Present Can Become <strong>Visible and Executable</strong>.</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://simulator.cashflowvisionaries.com" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Explore the Cash Flow Injection Simulator →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 32px;"><strong>A Different Perspective Can Open the Door to a Different Financial Future.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
        
        <p style="font-size: 12px; line-height: 1.4; color: #999; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <em>Simulator Scenarios Are Educational Illustrations. Actual Results Vary and Are Not Guaranteed. This Is Not Financial, Investment, Legal or Tax Advice.</em>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

What if you could Look at Cash Flow from a Completely Different Perspective?

Most People Have Been Taught How to Earn Money, but Very Few Have Been Taught How to Recognize, Create and Participate in Cash Flow.

That's why we created the Cash Flow Injection Simulator.

It's an Interactive Educational Experience Designed to Help You Explore:
- The Potential of Immediate Cash Flow
- The Possibilities of Ongoing Residual Cash Flow
- How Community and Network Participation Can Create a Compounding Effect
- What Different Participation Scenarios Could Look Like Over Time

And here's something important: As a Standard Member, You Have Access to the Full Cash Flow Injection Simulator Experience.

The Objective isn\'t to Promise an Outcome. It's to Help You See Possibilities, Explore Scenarios and Expand Your Understanding.

Because Once Your Perspective Changes, Opportunities That Were Already Present Can Become Visible and Executable.

Explore the Cash Flow Injection Simulator:
https://simulator.cashflowvisionaries.com

A Different Perspective Can Open the Door to a Different Financial Future.

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries

Simulator Scenarios Are Educational Illustrations. Actual Results Vary and Are Not Guaranteed. This Is Not Financial, Investment, Legal or Tax Advice.`
    },

    // EMAIL 3 | DAY 3
    {
      day: 3,
      subject: 'The Economy Has Changed. Has Your Perspective?',
      previewText: 'Understanding the Industrial Economy, Platform Economy and Today\'s Cash Flow Possibilities.',
      ctaText: 'Visit Your NLC Community',
      ctaUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">For Generations, much of our Financial Education has centered around a Familiar Idea:</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; font-style: italic; margin-left: 20px;">Go to School. Get a Job. Earn an Income. Pay Your Bills. Save What You Can.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>But there's another Conversation we need to have.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;"><strong>How Is Cash Flow Actually Generated and Created in Today\'s Economy?</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">We now operate within both the <strong>Industrial Economy</strong> and the <strong>Platform Economy</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">These Economic Structures <strong>Exist Alongside Each Other</strong>, Creating Different Ways for Individuals, Businesses, Organizations and Communities to Participate.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          <strong>Technology</strong> Has Expanded How We Connect.<br>
          <strong>Platforms</strong> Have Expanded How We Organize.<br>
          <strong>Networks</strong> Have Expanded How We Share Information, Resources and Possibilities.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">And <strong>Communities</strong> Can Now Coordinate Participation in Ways That Were Once Far More Difficult.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">This is why we believe:</p>
        
        <p style="font-size: 18px; line-height: 1.6; color: #1E8E5A; font-weight: 600; text-align: center; margin: 24px 0;">We the People Have the Power.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">The Power to Connect. The Power to Learn. The Power to Leverage Relationships, Technology and Community with Intention.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">The Question is no longer simply <em>how much Money you can Earn</em>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">It's also <strong>how well you Understand the Systems through which Cash Flow can be Generated, Created and Circulated</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">Continue Exploring these Conversations inside Your Community.</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Visit Your NLC Community →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 32px;"><strong>A Different Perspective Changes What You\'re Able to Recognize.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

For Generations, much of our Financial Education has centered around a Familiar Idea:

Go to School. Get a Job. Earn an Income. Pay Your Bills. Save What You Can.

But there's another Conversation we need to have.

How Is Cash Flow Actually Generated and Created in Today\'s Economy?

We now operate within both the Industrial Economy and the Platform Economy.

These Economic Structures Exist Alongside Each Other, Creating Different Ways for Individuals, Businesses, Organizations and Communities to Participate.

Technology Has Expanded How We Connect.
Platforms Have Expanded How We Organize.
Networks Have Expanded How We Share Information, Resources and Possibilities.
And Communities Can Now Coordinate Participation in Ways That Were Once Far More Difficult.

This is why we believe:

We the People Have the Power.

The Power to Connect. The Power to Learn. The Power to Leverage Relationships, Technology and Community with Intention.

The Question is no longer simply how much Money you can Earn.

It's also how well you Understand the Systems through which Cash Flow can be Generated, Created and Circulated.

Continue Exploring these Conversations inside Your Community.

Visit Your NLC Community:
https://www.skool.com/network-leveraging-cash-flow-4401

A Different Perspective Changes What You\'re Able to Recognize.

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    },

    // EMAIL 4 | DAY 4
    {
      day: 4,
      subject: 'Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.',
      previewText: 'Discover the Vision Behind the Cash Flow Visionaries Movement.',
      ctaText: 'Connect With Your Community',
      ctaUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Today, I want to share something that's at the very <strong>Heart of the Cash Flow Visionaries Movement</strong>.</p>
        
        <p style="font-size: 18px; line-height: 1.6; color: #1E8E5A; font-weight: 600; text-align: center; margin: 24px 0;">Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Think about that for a moment.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>What Could Residual Cash Flow Allow You to Support?</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;">
          Your Family?<br>
          Your Business?<br>
          Your Ministry or Organization?<br>
          Your Community?<br>
          A Vision or Mission You've Wanted to Bring to Life?
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">This is why our Movement Focuses on More Than Money Alone.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">We believe that <strong>Meaningful Connections, Intentional Participation and the Ability to Duplicate a Process with Purpose</strong> can Create Possibilities that Extend Beyond Any One Individual.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;"><strong>Our Framework is:</strong></p>
        
        <p style="font-size: 20px; line-height: 1.4; color: #C9A441; font-weight: 600; text-align: center; margin: 20px 0;">Connect • Activate • Duplicate</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; text-align: center; font-style: italic;">Connect With Meaning. Activate With Intention. Duplicate With Purpose.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          <strong>Connection</strong> Creates Possibility.<br>
          <strong>Activation</strong> Creates Momentum.<br>
          <strong>Duplication</strong> Expands IMPACT.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">And when Communities Begin Working Together with Shared Understanding and Intention, the Possibilities Become Even Greater.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">You are already part of this Conversation as a Member of Network Leveraging Cash Flow.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;"><strong>Continue Learning. Continue Connecting. And Begin Thinking About What Cash Flow Could Allow You to Support.</strong></p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://www.skool.com/network-leveraging-cash-flow-4401" style="display: inline-block; background: #1E8E5A; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Connect With Your Community →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 32px;"><strong>Because the Purpose Is Bigger Than the Cash Flow.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

Today, I want to share something that's at the very Heart of the Cash Flow Visionaries Movement.

Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.

Think about that for a moment.

What Could Residual Cash Flow Allow You to Support?

Your Family?
Your Business?
Your Ministry or Organization?
Your Community?
A Vision or Mission You've Wanted to Bring to Life?

This is why our Movement Focuses on More Than Money Alone.

We believe that Meaningful Connections, Intentional Participation and the Ability to Duplicate a Process with Purpose can Create Possibilities that Extend Beyond Any One Individual.

Our Framework is:

Connect • Activate • Duplicate

Connect With Meaning. Activate With Intention. Duplicate With Purpose.

Connection Creates Possibility.
Activation Creates Momentum.
Duplication Expands IMPACT.

And when Communities Begin Working Together with Shared Understanding and Intention, the Possibilities Become Even Greater.

You are already part of this Conversation as a Member of Network Leveraging Cash Flow.

Continue Learning. Continue Connecting. And Begin Thinking About What Cash Flow Could Allow You to Support.

Connect With Your Community:
https://www.skool.com/network-leveraging-cash-flow-4401

Because the Purpose Is Bigger Than the Cash Flow.

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    },

    // EMAIL 5 | DAY 5
    {
      day: 5,
      subject: 'Standard or Premium? Understanding Your NLC Membership',
      previewText: 'Two Membership Experiences, One Shared Vision.',
      ctaText: 'Explore Standard and Premium Membership',
      ctaUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401/plans?src=join',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">You've spent some time getting acquainted with Network Leveraging Cash Flow.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Now I want to explain the <strong>Distinction between our two SKOOL Membership Options</strong>.</p>
        
        <h3 style="color: #1E8E5A; font-size: 18px; margin-top: 32px;">STANDARD MEMBERSHIP | FREE</h3>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Your Standard Membership Introduces You to the Movement.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">You can <strong>Participate in Your Community, Explore Our Educational Resources, Connect with Members and Access the Full Cash Flow Injection Simulator Experience</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">It's a Place to Begin Expanding Your Awareness and Understanding.</p>
        
        <h3 style="color: #C9A441; font-size: 18px; margin-top: 32px;">PREMIUM MEMBERSHIP | $50 PER YEAR</h3>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Premium Membership is the Next Level of Participation.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">When you Upgrade, you <strong>Become an Official Cash Flow Visionary</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Premium Introduces <strong>The Solution</strong>, along with Access to Our <strong>Premium SKOOL Experience</strong> and the <strong>Cash Flow Injection Strategy Masterclass</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">The Distinction is Intentional:</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #1E8E5A; font-weight: 600; font-style: italic;">The Free Community Introduces the Movement. The Premium Membership Introduces The Solution.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">Both Experiences Have Value.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;"><strong>The Difference is How Deeply You Choose to Participate.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">If you\'re Ready to Explore Premium, you can View Both Membership Options Here:</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://www.skool.com/network-leveraging-cash-flow-4401/plans?src=join" style="display: inline-block; background: #C9A441; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">Explore Standard and Premium Membership →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 32px;"><strong>The Decision Is Yours, and We\'re Glad You\'re Part of Your Community.</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

You've spent some time getting acquainted with Network Leveraging Cash Flow.

Now I want to explain the Distinction between our two SKOOL Membership Options.

STANDARD MEMBERSHIP | FREE

Your Standard Membership Introduces You to the Movement.

You can Participate in Your Community, Explore Our Educational Resources, Connect with Members and Access the Full Cash Flow Injection Simulator Experience.

It's a Place to Begin Expanding Your Awareness and Understanding.

PREMIUM MEMBERSHIP | $50 PER YEAR

Premium Membership is the Next Level of Participation.

When you Upgrade, you Become an Official Cash Flow Visionary.

Premium Introduces The Solution, along with Access to Our Premium SKOOL Experience and the Cash Flow Injection Strategy Masterclass.

The Distinction is Intentional:

The Free Community Introduces the Movement. The Premium Membership Introduces The Solution.

Both Experiences Have Value.

The Difference is How Deeply You Choose to Participate.

If you\'re Ready to Explore Premium, you can View Both Membership Options Here:

Explore Standard and Premium Membership:
https://www.skool.com/network-leveraging-cash-flow-4401/plans?src=join

The Decision Is Yours, and We\'re Glad You\'re Part of Your Community.

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    },

    // EMAIL 6 | DAY 7
    {
      day: 7,
      subject: 'Are You Ready to Become an Official Cash Flow Visionary?',
      previewText: 'Your Invitation to Take the Next Step in the Movement.',
      ctaText: 'Become an Official Cash Flow Visionary',
      ctaUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401/plans?src=join',
      htmlContent: createEmail(`
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Great Day, {{firstName}}!</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">Over the past several days, we've Introduced You to a Different Conversation about Money, Cash Flow, Technology and Community.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;">
          We've Explored How Today\'s Economy Is Changing.<br>
          We've Discussed the Power of Networks and Meaningful Connections.<br>
          We've Introduced the Cash Flow Injection Simulator.<br>
          And we've Shared the Belief That Guides Everything We Do:
        </p>
        
        <p style="font-size: 18px; line-height: 1.6; color: #1E8E5A; font-weight: 600; text-align: center; margin: 24px 0;">Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">Now comes an Important Question.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;"><strong>What Would You Like to Accomplish, Create or Support if Greater Cash Flow Possibilities Became Part of Your Financial Future?</strong></p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-left: 20px;">
          Perhaps it's Something Personal.<br>
          Perhaps it's a Vision for Your Family.<br>
          Perhaps it's Your Business, Ministry, Organization or Community.
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">Whatever that Vision may be, <strong>Understanding Is Where the Journey Begins</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">And <strong>Intentional Participation Is How You Begin Putting That Understanding Into Action</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 24px;">That's why we\'re extending an Invitation to <strong>Become an Official Cash Flow Visionary</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">For <strong>$50 per Year</strong>, Premium Membership Provides Access to the <strong>Premium SKOOL Experience</strong>, the <strong>Cash Flow Injection Strategy Masterclass</strong> and the <strong>Introduction to The Solution</strong>.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333;">It's an Opportunity to Move Beyond Awareness and Begin Exploring What Participation Could Mean for You.</p>
        
        <p style="text-align: center; margin: 32px 0;">
          <a href="https://www.skool.com/network-leveraging-cash-flow-4401/plans?src=join" style="display: inline-block; background: #C9A441; color: white; padding: 16px 36px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 17px;">Become an Official Cash Flow Visionary →</a>
        </p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 32px;"><strong>Remember:</strong></p>
        
        <p style="font-size: 18px; line-height: 1.6; color: #1E8E5A; font-weight: 600; text-align: center; margin: 20px 0;">We the People Have the Power.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; text-align: center;">And Together, Meaningful Connections, Shared Understanding and Intentional Participation Can Create a Greater Capacity for IMPACT.</p>
        
        <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 32px;">
          Samantha Hill | MzSamantha<br>
          <span style="color: #666;">Founding Visionary - Network Leveraging Cash Flow</span><br>
          <span style="color: #C9A441; font-weight: 600;">Home Of The Cash Flow Visionaries</span>
        </p>
      `),
      textContent: `Great Day, {{firstName}}!

Over the past several days, we've Introduced You to a Different Conversation about Money, Cash Flow, Technology and Community.

We've Explored How Today\'s Economy Is Changing.
We've Discussed the Power of Networks and Meaningful Connections.
We've Introduced the Cash Flow Injection Simulator.
And we've Shared the Belief That Guides Everything We Do:

Cash Flow Is Not the Purpose. Cash Flow Supports the Purpose.

Now comes an Important Question.

What Would You Like to Accomplish, Create or Support if Greater Cash Flow Possibilities Became Part of Your Financial Future?

Perhaps it's Something Personal.
Perhaps it's a Vision for Your Family.
Perhaps it's Your Business, Ministry, Organization or Community.

Whatever that Vision may be, Understanding Is Where the Journey Begins.

And Intentional Participation Is How You Begin Putting That Understanding Into Action.

That's why we\'re extending an Invitation to Become an Official Cash Flow Visionary.

For $50 per Year, Premium Membership Provides Access to the Premium SKOOL Experience, the Cash Flow Injection Strategy Masterclass and the Introduction to The Solution.

It's an Opportunity to Move Beyond Awareness and Begin Exploring What Participation Could Mean for You.

Become an Official Cash Flow Visionary:
https://www.skool.com/network-leveraging-cash-flow-4401/plans?src=join

Remember:

We the People Have the Power.

And Together, Meaningful Connections, Shared Understanding and Intentional Participation Can Create a Greater Capacity for IMPACT.

Samantha Hill | MzSamantha
Founding Visionary - Network Leveraging Cash Flow
Home Of The Cash Flow Visionaries`
    }
  ]
};
