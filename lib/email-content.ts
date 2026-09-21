// Email content fragments for automation templates
// This keeps the main templates file cleaner

export const contentLib = {
  // Generic welcome patterns
  welcome_intro: (audience: string) => `
    <h2 style="color: #1E8E5A;">Welcome!</h2>
    <p>Thank you for joining ${audience}. You've taken an important step toward building leveraged, recurring income.</p>
    <p>Over the next few days, I'll share exactly how this system works and how you can start building your own cash flow network.</p>
  `,
  
  // System explanation
  system_overview: `
    <h2 style="color: #1E8E5A;">How The System Works</h2>
    <h3 style="color: #C9A441;">Three Core Components:</h3>
    <p><strong>1. Enterprise Connections</strong> - Build peer-to-peer partnerships, not traditional downlines</p>
    <p><strong>2. Automated Systems</strong> - Our platform handles lead generation, nurture, and onboarding</p>
    <p><strong>3. Network Compounding</strong> - As your network grows, everyone benefits from network effects</p>
  `,
  
  // Social proof template
  success_story: (name: string, result: string, timeline: string) => `
    <h2 style="color: #1E8E5A;">Real Results: Meet ${name}</h2>
    <p>${name} joined us ${timeline} ago and has achieved ${result}.</p>
    <p>The key to their success wasn't luck - it was following a proven system and staying consistent.</p>
    <h3 style="color: #C9A441;">What ${name} Did:</h3>
    <ul>
      <li>Started with the automated system (didn't reinvent the wheel)</li>
      <li>Focused on quality connections over quantity</li>
      <li>Stayed consistent for 90+ days</li>
      <li>Leveraged community resources and support</li>
    </ul>
  `,
  
  // Call to action
  cta_get_started: `
    <h3 style="color: #C9A441;">Ready to Start?</h3>
    <p>Your next step is simple: complete your profile setup and take the cash flow simulator to see your potential.</p>
    <p><a href="#" style="display: inline-block; background: #1E8E5A; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Get Started Now</a></p>
  `,
  
  // Community invite
  community_invite: `
    <h2 style="color: #1E8E5A;">Join the Community</h2>
    <p>The most successful members are those who engage with our community. Weekly calls, resources, partnerships, and support - it's all waiting for you.</p>
    <p>No gatekeeping. No upsells. Just value and collaboration.</p>
  `,
};
