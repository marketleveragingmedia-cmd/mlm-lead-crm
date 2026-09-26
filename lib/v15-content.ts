// V15 Static Content
// This preserves the exact V15 HTML for non-form sections

export const v15Navigation = `
<nav class="nav">
  <div class="shell nav-inner">
    <div class="brand serif">CASH FLOW VISIONARIES<small>NETWORK LEVERAGING CASH FLOW</small></div>
    <a class="btn" href="#register">Reserve My Seat</a>
  </div>
</nav>
`;

export const v15HeroText = {
  kicker: 'Cash Flow Injection Strategy Masterclass',
  h1: 'Nobody Teaches This.',
  h2: 'How Connections, Community And Duplication Can Create Sustainable Residual Cash Flow.',
  lead: 'A Live Masterclass Designed To Introduce A Different Way Of Seeing Cash Flow, Community And What Is Possible In Today's Economy.',
  pills: [
    'Thursday, October 8, 2026',
    '11:00 AM Eastern Time',
    'Premium SKOOL Membership: $50 Per Year'
  ],
  note: 'The $50 Annual Premium Membership Includes The Live Masterclass, One Year Of Premium SKOOL Access And Official Cash Flow Visionary Status.'
};

export const v15RegistrationCard = {
  kicker: 'Reserve Your Seat',
  h3: 'Cash Flow Injection Strategy Masterclass',
  description: 'See What Has Changed, Why Cash Flow Matters Now And How Strategy, Community, Technology And Participation Can Be Leveraged To Create Sustainable Residual Cash Flow.',
  memberNote: 'Already A Member? Use The Email Address Associated With Your SKOOL Membership.'
};

// Due to file size constraints, I'll load the rest of the V15 content at build time
export function getV15BodyContent(): string {
  // This will be populated with the actual V15 body content
  // For now, return empty string - will be filled during build
  return '';
}
