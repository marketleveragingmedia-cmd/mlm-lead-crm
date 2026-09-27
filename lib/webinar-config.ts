// NLC Webinar Configuration
// Centralized webinar event configuration
// DO NOT hard-code webinar IDs across the codebase

export const WEBINAR_EVENTS = {
  'CFI-2026-10-08': {
    webinarId: 'CFI-2026-10-08',
    name: 'Cash Flow Injection Strategy Masterclass',
    description: 'Discover How Connections, Community And Duplication Can Create Sustainable Residual Cash Flow.',
    startDateTime: new Date('2026-10-08T15:00:00.000Z'), // 11 AM ET
    timezone: 'America/New_York',
    durationMinutes: 90,
    webinarJamWebinarId: 32,
    webinarJamScheduleId: 48,
    webinarJamHash: 'kvlxyc24',
    qualificationMethod: 'skool_premium',
    requiredSkoolPlan: 'Premium',
    skoolPlansUrl: 'https://www.skool.com/network-leveraging-cash-flow-4401/plans',
    registrationPageUrl: '/register/cfi-oct-2026',
    active: true
  }
} as const;

export type WebinarEventConfig = typeof WEBINAR_EVENTS[keyof typeof WEBINAR_EVENTS];

export function getWebinarConfig(webinarId: string): WebinarEventConfig | null {
  return WEBINAR_EVENTS[webinarId as keyof typeof WEBINAR_EVENTS] || null;
}

export function getActiveWebinars(): WebinarEventConfig[] {
  return Object.values(WEBINAR_EVENTS).filter(w => w.active);
}

// Global Control Tag Templates
export const WEBINAR_TAGS = {
  lead: (webinarSlug: string) => `webinar-${webinarSlug}-lead`,
  registered: (webinarSlug: string) => `webinar-${webinarSlug}-registered`,
  attended: (webinarSlug: string) => `webinar-${webinarSlug}-attended`,
  noShow: (webinarSlug: string) => `webinar-${webinarSlug}-no-show`,
  premiumPending: () => 'webinar-premium-pending',
  registrationFailed: () => 'webinar-registration-failed',
} as const;

// Webinar slug helper
export function getWebinarSlug(webinarId: string): string {
  // Convert "CFI-2026-10-08" to "cfi-oct-2026"
  const parts = webinarId.split('-');
  if (parts.length === 3) {
    const [prefix, year, month, day] = [...parts[0].split(''), parts[1], parts[2]];
    const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const monthName = monthNames[parseInt(month) - 1];
    return `${parts[0].toLowerCase()}-${monthName}-${year}`;
  }
  return webinarId.toLowerCase();
}
